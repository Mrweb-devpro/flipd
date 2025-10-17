import {
  doc,
  getDocs,
  query,
  setDoc,
  where,
  type DocumentData,
} from "firebase/firestore";
import { usersColRef } from "../db/firebase";
import type { User } from "firebase/auth";

//-- getting one user for the user store
export async function getOneUserAction(
  username: string
): Promise<DocumentData> {
  const isExistUsernameQuery = query(
    usersColRef,
    where("username", "==", username)
  );

  const querySnap = await getDocs(isExistUsernameQuery);

  return new Promise((resolve, reject) => {
    if (querySnap.docs.length === 0)
      reject({
        message: `User with the usename :${username} does not exist`,
      });
    querySnap.docs.forEach((doc) =>
      resolve({ ...doc.data(), user_id: doc.id })
    );
  });
}

//-- geting user id by their username
export async function getUserIdByUsername(username: string) {
  let userId: string = "";
  // getting the userID
  const q = query(usersColRef, where("username", "==", username));
  (await getDocs(q)).forEach((doc) => {
    if (doc.exists()) userId = doc.id;
    else
      throw new Error("Failed to get userID: User with that id does not exist");
  });

  return userId;
}

//-- create user object in the store for new users
export async function createStoreUserObj(
  user: User,
  username: string,
  bio: string = ""
) {
  await setDoc(doc(usersColRef, user.uid), {
    photoURL: user.photoURL,
    username,
    posts: [],
    bio,
    createdAt: new Date().toISOString(),
    friends: [],
    blocked: [],
    settings: {},
  });
}
//-- Checking if the users exists
export async function checkIfUsernameExist(
  username: string,
  returnBoolean?: true | false
) {
  const isExistUsernameQuery = query(
    usersColRef,
    where("username", "==", username)
  );

  const querySnap = await getDocs(isExistUsernameQuery);
  if (returnBoolean) return (await querySnap).docs.length === 0;

  if (await querySnap.docs.length)
    throw { code: "custom-Auth-Error/username-is-already-used" };
}

//-- searching for users by user
export async function searchForUsersByUsername(searchQuery: string) {
  const usersArr: {}[] = [];
  const querySnap = await getDocs(usersColRef);

  if (!searchQuery) {
    querySnap.forEach((doc) => {
      const userObj = doc.data();
      usersArr.push(userObj);
    });
  } else
    querySnap.forEach((doc) => {
      const userObj = doc.data();
      if (userObj.username.toLowerCase().includes(searchQuery.toLowerCase()))
        usersArr.push(userObj);
    });
  console.log(usersArr);

  return usersArr;
}
