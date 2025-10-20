import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateProfile,
  verifyBeforeUpdateEmail,
  type User,
} from "firebase/auth";
import { auth, userNotificationColRef, usersColRef } from "../db/firebase";
import { UploadProfileImageSupabase } from "../db/supabase";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  checkIfUsernameExist,
  getOneUserAction,
  getUserIdByUsername,
} from "./userStoreAction";
import {
  acceptedfriendRequestNotification,
  friendRequestNotification,
} from "../utils/notificationTypeStrings";

interface UserData {
  username?: string | FormDataEntryValue;
  file?: File | null;
  photoURL?: string | FormDataEntryValue;
  email?: string;
  bio?: string | FormDataEntryValue;
  password?: string;
}

export const friendStatus = {
  pending: "pending",
  accepted: "accepted",
};
export async function updateProfileAction(
  data: UserData,
  setIsLoading: (value: boolean) => void,
  setError: (value: string) => void
) {
  const newData: {
    displayName?: string;
    photoURL?: string;
    bio?: UserData["bio"];
  } = {};
  // Clear Error
  setError("");

  await Object.keys(data).forEach((key) => {
    if (!data[key]) return;

    if (key === "username" || key === "email" || key === "file") {
      if (key === "username") return (newData.displayName = data[key]);
      if (key === "file") return;
      return (newData[key] = data[key]);
    }
  });

  try {
    // set the loading state
    setIsLoading(true);

    // check in if useranme already exist
    if (newData.displayName) await checkIfUsernameExist(newData.displayName);

    // Update the email
    if (data?.email) {
      const credential = await EmailAuthProvider.credential(
        (await auth.currentUser?.email) as string,
        data.password as string
      );

      const result = reauthenticateWithCredential(
        auth.currentUser as User,
        credential
      );
      const user = (await result).user;

      await verifyBeforeUpdateEmail(user, data.email);
    }
    if (data?.file) {
      // Update/upload image using supabase
      const { photoURL } = await UploadProfileImageSupabase(
        data.file,

        auth.currentUser?.uid
      );

      newData.photoURL = `${photoURL}?t=${new Date().getTime()}`;
    }
    if (data?.bio) newData.bio = data.bio;

    //Update the photoURL and username
    await updateProfile(auth.currentUser as User, newData);
    await updateDoc(doc(usersColRef, auth.currentUser?.uid), {
      ...newData,
    });
  } catch (err: any) {
    console.error("Updated User Failed :", err);
    setError(err);
    throw err;
  } finally {
    setIsLoading(false);
  }
}
//-- ADDING OF USERS as friends
export async function addFriendAction(username: string) {
  try {
    //  getting the user id
    const userId = await getUserIdByUsername(username);

    const friend = await getDoc(doc(usersColRef, userId));
    const isPendingFriendfriend = (await friend.data())?.friends?.find(
      ({ id }) => id === auth.currentUser?.uid
    );

    if (isPendingFriendfriend) {
      //  add user to the current user friend-list
      await updateDoc(doc(usersColRef, auth.currentUser?.uid), {
        friends: arrayUnion({ id: userId, status: friendStatus.accepted }),
      });

      // remove the old status
      await updateDoc(doc(usersColRef, userId), {
        friends: arrayRemove({
          id: auth.currentUser?.uid,
          status: friendStatus.pending,
        }),
      });
      // add the new  status
      await updateDoc(doc(usersColRef, userId), {
        friends: arrayUnion({
          id: auth.currentUser?.uid,
          status: friendStatus.accepted,
        }),
      });

      await setDoc(doc(userNotificationColRef(userId), auth.currentUser?.uid), {
        type: acceptedfriendRequestNotification,
        message: `${auth.currentUser?.displayName} Accpeted your a friend request`,
        special: auth.currentUser?.displayName,
        seen: false,
      });
    } else {
      await updateDoc(doc(usersColRef, auth.currentUser?.uid), {
        friends: arrayUnion({ id: userId, status: friendStatus.pending }),
      });

      await setDoc(doc(userNotificationColRef(userId), auth.currentUser?.uid), {
        type: friendRequestNotification,
        message: `${auth.currentUser?.displayName} sent you a friend request`,
        special: auth.currentUser?.displayName,
        seen: false,
      });
    }
  } catch (err) {
    console.error("Adding of friends Failed: ", err);
    throw err;
  } finally {
  }
}
// BLOCKING OF USERS
export async function blockFriendAction(username: string) {
  try {
    // getting the user id
    const userId = await getUserIdByUsername(username);

    //  add user to the current user blocked-list
    await updateDoc(doc(usersColRef, auth.currentUser?.uid), {
      blocked: arrayUnion(userId),
    });
  } catch (err) {
    console.error("Blocking of USERS Failed: ", err);
    throw err;
  }
}
// unBLOCKING OF USERS
export async function unblockFriendAction(username: string) {
  try {
    // getting the user id
    const userId = await getUserIdByUsername(username);

    //  remove user from the current user blocked-list
    await updateDoc(doc(usersColRef, auth.currentUser?.uid), {
      blocked: arrayRemove(userId),
    });
  } catch (err) {
    console.error("Blocking of USERS Failed: ", err);
    throw err;
  }
}

//-- UNFRIEND OF USERS
export async function unFriendAction(username: string) {
  try {
    //getting the user id

    const userId = await getUserIdByUsername(username);
    //  removed user to the current user friend-list
    const currentUserStoreObj = await getOneUserAction(
      auth.currentUser?.displayName as string
    );
    const friendObj = await currentUserStoreObj.friends.find(
      ({ id }) => id === userId
    );

    if (!friendObj) throw new Error("You are not friend the the this user");

    if (friendObj.status === friendStatus.pending) {
      // delete the notification if he hasnt accepted the request
      await deleteDoc(
        doc(userNotificationColRef(userId), auth.currentUser?.uid)
      );
    } else if (friendObj.status === friendStatus.accepted) {
      // removed the me from his friend list if we are friends
      await updateDoc(doc(usersColRef, userId), {
        friends: arrayRemove(friendObj),
      });
    }

    // removed the him from my friend weather we are friends or not
    await updateDoc(doc(usersColRef, auth.currentUser?.uid), {
      friends: arrayRemove(friendObj),
    });

    // change the status of the our fiendship
    await updateDoc(doc(usersColRef, userId), {
      friends: arrayRemove({
        id: auth.currentUser?.uid,
        status: friendStatus.pending,
      }),
    });
    await updateDoc(doc(usersColRef, userId), {
      friends: arrayUnion({
        id: auth.currentUser?.uid,
        status: friendStatus.pending,
      }),
    });
  } catch (err) {
    console.error("UnFriending users of USERS Failed: ", err);
    throw err;
  }
}
