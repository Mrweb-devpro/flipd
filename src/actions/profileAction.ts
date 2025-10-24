//-- Database
import { UploadProfileImageSupabase } from "../db/supabase";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateProfile,
  verifyBeforeUpdateEmail,
  type User,
} from "firebase/auth";
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
  auth,
  postCOlRef,
  userNotificationColRef,
  usersColRef,
} from "../db/firebase";

//--  actions
import {
  checkIfUsernameExist,
  getOneUserAction,
  getUserIdByUsername,
} from "./userStoreAction";

//-- utils
import {
  acceptedfriendRequestNotification,
  friendRequestNotification,
} from "../utils/notificationTypeStrings";

//-- types
import type { UserNotificationType } from "../types/DatabaseTypes";

//-- types
interface UserData {
  username?: string;
  file?: File | null;
  photoURL?: string;
  email?: string;
  bio?: string;
  password?: string;
}
export const friendStatus = {
  pending: "pending",
  accepted: "accepted",
};

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//-- Update profile actions
export async function updateProfileAction(
  data: UserData,
  setIsLoading: (value: boolean) => void,
  setError: (value: string) => void
) {
  const newData: {
    displayName?: string;
    photoURL?: string;
    bio?: UserData["bio"];
    email?: string;
    username?: string;
  } = {};
  // Clear Error
  setError("");
  console.log(data);

  await (Object.keys(data) as (keyof UserData)[]).forEach((key) => {
    if (!data[key]) return;

    if (key === "username" || key === "email" || key === "file") {
      if (key === "username" && typeof data[key] === "string")
        return (newData.displayName = data[key]);
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

    if (newData.displayName || newData.username) {
      const user = await getDoc(doc(usersColRef, auth.currentUser?.uid));
      const postsIdArr = user.data()?.posts;

      postsIdArr.forEach(async (postId: string) => {
        const docRef = doc(postCOlRef, postId);
        await updateDoc(docRef, {
          sender: newData.displayName,
        });
      });
      await updateDoc(doc(usersColRef, auth.currentUser?.uid), {
        username: newData.displayName,
        ...newData,
        displayName: "",
      });
    } else {
      await updateDoc(doc(usersColRef, auth.currentUser?.uid), {
        ...newData,
      });
    }
  } catch (err: any) {
    console.error("Updated User Failed :", err);
    setError(err);
    throw err;
  } finally {
    setIsLoading(false);
  }
}

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//-- ADDING OF USERS as friends
export async function addFriendAction(username: string) {
  try {
    // getting the user id
    const userId = await getUserIdByUsername(username);

    // get user stores obj
    const friend = await getDoc(doc(usersColRef, userId));
    //

    const usersFriendStatusObj = (await friend.data())?.friends?.find(
      ({ id }: { id: string }) => id === auth.currentUser?.uid
    );

    // check they are already friends
    if (usersFriendStatusObj?.status === friendStatus.accepted)
      return console.log("You are already friends with this user");

    const userHasSentRequest = !!usersFriendStatusObj;

    if (userHasSentRequest) {
      //  add user to the currentUsers friend-list
      await updateDoc(doc(usersColRef, auth.currentUser?.uid), {
        friends: arrayUnion({ id: userId, status: friendStatus.accepted }),
      });

      // remove the old status from the user
      await updateDoc(doc(usersColRef, userId), {
        friends: arrayRemove({
          id: auth.currentUser?.uid,
          status: friendStatus.pending,
        }),
      });
      // add the new  status to the user
      await updateDoc(doc(usersColRef, userId), {
        friends: arrayUnion({
          id: auth.currentUser?.uid,
          status: friendStatus.accepted,
        }),
      });

      await setDoc(doc(userNotificationColRef(userId), auth.currentUser?.uid), {
        type: acceptedfriendRequestNotification,
        message: `Accpeted your a friend request`,
        special: auth.currentUser?.displayName,
        seen: false,
      });
      await deleteDoc(
        doc(userNotificationColRef(auth.currentUser?.uid as string), userId)
      );
    } else {
      // the user to the currentUsers friend-list
      await updateDoc(doc(usersColRef, auth.currentUser?.uid), {
        friends: arrayUnion({ id: userId, status: friendStatus.pending }),
      });

      // send the user a friend request notifcation
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
  }
}
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//-- UNFRIEND/cancel friend request OF USERS
export async function unFriendAction(username: string) {
  try {
    //getting the user id
    const userId = await getUserIdByUsername(username);

    //  removed user to the current user friend-list
    const currentUserStoreObj = await getOneUserAction(
      auth.currentUser?.displayName as string
    );

    const currendUserfriendObj = await currentUserStoreObj.friends.find(
      ({ id }: { id: string }) => id === userId
    );

    // check if currentUser has sent/accpeted the friend request
    if (!currendUserfriendObj)
      throw new Error(
        "You havn't sent this user a friend request OR you havn't accepted this users friend request"
      );

    // for cancel-friend-request
    if (currendUserfriendObj.status === friendStatus.pending) {
      // delete the notification sent to the user
      await deleteDoc(
        doc(userNotificationColRef(userId), auth.currentUser?.uid)
      );
    } else {
      // unfriend user

      // change the status of the user friend status
      await updateDoc(doc(usersColRef, userId), {
        friends: arrayRemove({
          id: auth.currentUser?.uid,
          status: friendStatus.accepted,
        }),
      });
      await updateDoc(doc(usersColRef, userId), {
        friends: arrayUnion({
          id: auth.currentUser?.uid,
          status: friendStatus.pending,
        }),
      });
    }

    // removed the him from my friend-list weather we are friends or not
    await updateDoc(doc(usersColRef, auth.currentUser?.uid), {
      friends: arrayRemove(currendUserfriendObj),
    });
  } catch (err) {
    console.error("UnFriending users of USERS Failed: ", err);
    throw err;
  }
}

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//-- reject Friend Request Action
export async function rejectFriendRequestAction(
  notificationObj: UserNotificationType
) {
  const username = notificationObj.special;

  const userId = await getUserIdByUsername(username);

  // remove currentuser from his friends list
  await updateDoc(doc(usersColRef, userId), {
    friends: arrayRemove({
      id: auth.currentUser?.uid,
      status: friendStatus.pending,
    }),
  });

  // delete the notification he sent to me
  await deleteDoc(
    doc(userNotificationColRef(auth.currentUser?.uid as string), userId)
  );
}

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//-- BLOCKING OF USERS
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
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//-- UNBLOCKING OF USERS
export async function unblockFriendAction(username: string) {
  try {
    // getting the user id
    const userId = await getUserIdByUsername(username);

    //  remove user from the current user blocked-list
    await updateDoc(doc(usersColRef, auth.currentUser?.uid), {
      blocked: arrayRemove(userId),
    });
  } catch (err) {
    console.error("UnBlocking of USERS Failed: ", err);
    throw err;
  }
}
