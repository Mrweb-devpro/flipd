import { arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { auth, postDocRef, usersColRef } from "../db/firebase";
import type { Dispatch, SetStateAction } from "react";
import type { PostsType } from "../context/PostContext";

export async function createPostAction(postData: {
  sender: string;
  content: string;
}) {
  try {
    const time = new Date().toISOString();
    await updateDoc(postDocRef, {
      posts: arrayUnion({
        ...postData,
        time,
      }),
    });
    await updateDoc(doc(usersColRef, auth.currentUser?.uid), {
      posts: arrayUnion(time),
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getAllPostsAction(
  resetState: Dispatch<SetStateAction<PostsType>>
) {
  try {
    const unSub = await onSnapshot(postDocRef, async (doc) => {
      resetState(doc.data()?.posts.reverse() || []);
    });
    return unSub;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
