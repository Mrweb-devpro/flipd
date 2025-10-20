import {
  arrayRemove,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
  type DocumentData,
} from "firebase/firestore";
import { auth, userNotificationColRef, usersColRef } from "../db/firebase";
import { getUserIdByUsername } from "./userStoreAction";
import { friendStatus } from "./profileAction";
import type { UserNotificationType } from "../context/NotificationContext";
//

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

export async function handleSeenAction(notificationObj: UserNotificationType) {
  const userId = await getUserIdByUsername(notificationObj.special);

  await updateDoc(
    doc(userNotificationColRef(auth.currentUser?.uid as string), userId),
    {
      seen: true,
    }
  );
}
