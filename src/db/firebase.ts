// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { collection, doc, getFirestore } from "firebase/firestore";
import {
  VITE_FIREBASE_API_KEY,
  VITE_FIREBASE_PROJECT_ID,
  VITE_FIREBASE_AUTH_DOMAIN,
  VITE_FIREBASE_STORAGE_BUCKET,
  VITE_FIREBASE_MESSAGING_SENDER_ID,
  VITE_FIREBASE_APP_ID,
} from "../utils/Config";

const firebaseConfig = {
  apiKey: VITE_FIREBASE_API_KEY,
  authDomain: VITE_FIREBASE_AUTH_DOMAIN,
  projectId: VITE_FIREBASE_PROJECT_ID,
  storageBucket: VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: VITE_FIREBASE_APP_ID,
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
