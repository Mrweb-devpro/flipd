//-- Database
import {
  doc,
  onSnapshot,
  updateDoc,
  type DocumentData,
} from "firebase/firestore";
import { auth, userNotificationColRef } from "../db/firebase";

//-- actions
import { getUserIdByUsername } from "./userStoreAction";
import type { UserNotificationType } from "../types/DatabaseTypes";

//-- types

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//-- get notifcations
export async function getUserNotifications(
  resetState: any,
  fakeReturn = false
) {
  try {
    let staticPromise: [] | PromiseLike<DocumentData[]> = [];

    const unsub = await onSnapshot(
      userNotificationColRef(auth.currentUser?.uid as string),
      (snapDocs) => {
        const data: DocumentData[] = snapDocs.docs.map((doc) => doc.data());
        staticPromise = new Promise((resolve) => {
          resolve(data);
        });
        resetState(data);
      }
    );

    return fakeReturn ? staticPromise : unsub;
  } catch (err) {
    console.error("Error occured while fetching notifications:", err);
    throw err;
  }
}

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//--  handle Seen notifications
export async function handleSeenAction(notificationObj: UserNotificationType) {
  const userId = await getUserIdByUsername(notificationObj.special);

  await updateDoc(
    doc(userNotificationColRef(auth.currentUser?.uid as string), userId),
    {
      seen: true,
    }
  );
}
