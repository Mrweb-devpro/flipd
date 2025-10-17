// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { collection, doc, getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWwdI-GBTtrRcKbB7sC2_SJzNfwM_Bm48",
  authDomain: "roadmaptomastery.firebaseapp.com",
  projectId: "roadmaptomastery",
  storageBucket: "roadmaptomastery.firebasestorage.app",
  messagingSenderId: "282110068670",
  appId: "1:282110068670:web:31281e5f7a6d1282df1bef",
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

//-- doc refs
export const postDocRef = doc(postCOlRef, "publicPosts");

//-- auth provider
export const GoogleProvider = new GoogleAuthProvider();
export const GithubProvider = new GithubAuthProvider();
