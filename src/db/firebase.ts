// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { collection, doc, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
//-- Initialize Firebase
const app = initializeApp(firebaseConfig);

//-- Auth
export const auth = getAuth(app);

//-- firestore
export const db = getFirestore(app);

//-- collections refs
export const postCOlRef = collection(db, "allPosts");
export const usersColRef = collection(db, "allUsers");
export const userNotificationColRef = (ID: string) =>
  collection(db, `allUsers/${ID}/notifications`);

//-- doc refs
export const postDocRef = doc(postCOlRef, "publicPosts");

//-- auth provider
export const GoogleProvider = new GoogleAuthProvider();
export const GithubProvider = new GithubAuthProvider();
