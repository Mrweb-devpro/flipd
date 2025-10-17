import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateProfile,
  verifyBeforeUpdateEmail,
  type User,
} from "firebase/auth";
import { auth, usersColRef } from "../db/firebase";
import { UploadProfileImageSupabase } from "../db/supabase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { checkIfUsernameExist, getUserIdByUsername } from "./userStoreAction";

interface UserData {
  username?: string | FormDataEntryValue;
  file?: File | null;
  photoURL?: string | FormDataEntryValue;
  email?: string;
  bio?: string | FormDataEntryValue;
  password?: string;
}

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
//-- ADDING OF USERS
export async function addFriendAction(username: string, state = []) {
  try {
    state[1]?.(true);
    //  getting the user id
    const userId = await getUserIdByUsername(username);

    //  add user to the current user friend-list
    await updateDoc(doc(usersColRef, auth.currentUser?.uid), {
      friends: arrayUnion(userId),
    });
  } catch (err) {
    console.error("Adding of friends Failed: ", err);
    throw err;
  } finally {
    state[1]?.(false);
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
// BLOCKING OF USERS
export async function unblockFriendAction(username: string) {
  try {
    // getting the user id
    const userId = await getUserIdByUsername(username);

    //  add user to the current user blocked-list
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

    await updateDoc(doc(usersColRef, auth.currentUser?.uid), {
      friends: arrayRemove(userId),
    });
    console.log("done");
  } catch (err) {
    console.error("Blocking of USERS Failed: ", err);
    throw err;
  }
}
