import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type NextOrObserver,
  type User,
} from "firebase/auth";
import { auth, GithubProvider, GoogleProvider } from "../db/firebase";
import { checkIfUsernameExist, createStoreUserObj } from "./userStoreAction";

export const NoRememberStorageKey = "no-remember-recent-login";

//-- listening for auth state changes (login, signup, logout, or profile changes)
export function onAuthChangedAction(callback: NextOrObserver<User>) {
  return onAuthStateChanged(auth, callback);
}

// getAuthUser
//-- Sign in with google
export async function signInwithGoogle() {
  try {
    const result = await signInWithPopup(auth, GoogleProvider);
    // check in if useranme already exist in the firestore (meaning that the user is not signing in for the first time )
    const isNewUser = await checkIfUsernameExist(
      result.user.displayName as string,
      true
    );
    if (isNewUser)
      await createStoreUserObj(result.user, result.user.displayName as string);

    return result.user; //return firebase user object
  } catch (err) {
    console.error("Google login failed:", err);
    throw err;
  }
}

//  sign in with Github
export async function signInWithGithub() {
  try {
    const result = await signInWithPopup(auth, GithubProvider);

    // check in if useranme already exist in the firestore (meaning that the user is not signing in for the first time )
    const isNewUser = await checkIfUsernameExist(
      result.user.displayName as string,
      true
    );
    if (isNewUser)
      await createStoreUserObj(result.user, result.user.displayName as string);

    return result;
  } catch (err) {
    console.error("Github login failed:", err);
    throw err;
  }
}
//-- Logging out users
export async function logoutAction(onSuccess: () => void) {
  try {
    await signOut(auth);
    onSuccess();
  } catch (err) {
    console.error("Logout failed:", err);
    throw err;
  }
}

//-- login
export async function loginAction(
  email: string,
  password: string,
  remember: true | false
) {
  try {
    if (!remember) await setPersistence(auth, browserSessionPersistence);
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    const user = userCred.user;
    console.log(user);

    if (!remember)
      localStorage.setItem(NoRememberStorageKey, JSON.stringify(true));
    else localStorage.removeItem(NoRememberStorageKey);

    return user;
  } catch (err: any) {
    console.error("Login Failed:", err || err?.message);
    throw err;
  }
}
//-- Sign up
export async function SignUpAction({
  email,
  username,
  password,
  remember,
  bio,
}: {
  email: string;
  bio: string;
  username: string;
  password: string;
  remember: true | false;
}) {
  try {
    const trimedUsername = username.trim();
    // check in if useranme already exist
    await checkIfUsernameExist(trimedUsername);

    // active remember me functionality
    if (!remember) await setPersistence(auth, browserSessionPersistence);
    const userCred = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    // const user = userCred.user;

    // Add username to profile
    await updateProfile(userCred.user, {
      displayName: trimedUsername,
    });

    // Store user details with the in the firestore
    await createStoreUserObj(userCred.user, trimedUsername, bio);

    if (!remember)
      localStorage.setItem(NoRememberStorageKey, JSON.stringify(true));
    else localStorage.removeItem(NoRememberStorageKey);
  } catch (err: any) {
    console.error("Login Failed:", err || err?.message);
    console.log(err.code);
    throw err;
  }
}
