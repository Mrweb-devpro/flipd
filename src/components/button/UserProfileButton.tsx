import {
  addFriendAction,
  blockFriendAction,
  unblockFriendAction,
  unFriendAction,
} from "../../actions/profileAction";
import type { DocumentData } from "firebase/firestore";

import { useStoreUser } from "../../hooks/useStoreUsers";
import { Suspense } from "react";
import Loader from "../Loader";
import { shareContentAction } from "../../actions/windowsActions";

type ProfileButtonActionType =
  | "add_friend"
  | "block_friend"
  | "unfriend"
  | "unblock_friend"
  | "share";

export default function UserProfileButton({
  children,
  action,
  user,
}: {
  children: React.ReactNode;
  action: ProfileButtonActionType;
  user: DocumentData;
}) {
  const [_, { refetch }] = useStoreUser();

  // const x = useState(false);
  function handleProfileButton() {
    if (!action) return;

    if (action === "add_friend") {
      addFriendAction(user.username);
    } else if (action === "unfriend") {
      unFriendAction(user.username);
    } else if (action === "block_friend") {
      blockFriendAction(user.username);
    } else if (action === "unblock_friend") {
      unblockFriendAction(user.username);
    } else if (action === "share") {
      shareContentAction({
        title: "FlipD profile",
        text: `Checkout ${user.username}'s profile on linkedin.`,
        url: `${location.origin}/profile/${user.username}`,
      });
    }
    refetch();
  }

  return (
    <Suspense fallback={<Loader.MiniLoader />}>
      <button
        onClick={handleProfileButton}
        className={
          "flex gap-4 items-center " +
          (action === "add_friend"
            ? "text-sm bg-[var(--main)] text-white px-4 py-2 rounded-xl"
            : action === "block_friend"
            ? "text-sm bg-red-500 text-white px-4 py-2 rounded-xl"
            : action === "unblock_friend"
            ? "text-sm border border-red-500 text-red-500 px-4 py-2 rounded-xl"
            : "text-sm border border-[var(--main)] text-[var(--main)] px-4 py-2 rounded-xl")
        }
      >
        {children}
      </button>
    </Suspense>
  );
}
