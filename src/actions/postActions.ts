import {
  arrayUnion,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, postCOlRef, usersColRef } from "../db/firebase";
import type { Dispatch, SetStateAction } from "react";
import type { PostsType } from "../types/DatabaseTypes";
import { nanoid } from "nanoid";

export async function createPostAction(postData: {
  sender: string;
  content: string;
}) {
  try {
    const time = new Date().toISOString();
    const postId = nanoid();

    await setDoc(doc(postCOlRef, postId), {
      ...postData,
      time,
      date: new Date(),
    });
    await updateDoc(doc(usersColRef, auth.currentUser?.uid), {
      posts: arrayUnion(postId),
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
    const unSub = await onSnapshot(
      query(postCOlRef, orderBy("date", "desc")),
      async (docs) => {
        if (docs.empty) resetState([]);
        else
          resetState(
            docs.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as PostsType
          );
      }
    );

    return unSub;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
