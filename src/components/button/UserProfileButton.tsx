import {
  addFriendAction,
  blockFriendAction,
  unblockFriendAction,
  unFriendAction,
} from "../../actions/profileAction";
import type { DocumentData } from "firebase/firestore";

import { useStoreUser } from "../../hooks/useStoreUsers";
import Loader from "../Loader";
import { shareContentAction } from "../../actions/windowsActions";
import { useState } from "react";

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
  const [_, { refetch, isRefetching }] = useStoreUser();
  const [isLoading, setIsLoading] = useState(false);

  async function handleProfileButton() {
    if (!action) return;

    setIsLoading(true);
    if (action === "add_friend") {
      await addFriendAction(user.username);
    } else if (action === "unfriend") {
      await unFriendAction(user.username);
    } else if (action === "block_friend") {
      await blockFriendAction(user.username);
    } else if (action === "unblock_friend") {
      await unblockFriendAction(user.username);
    } else if (action === "share") {
      await shareContentAction({
        title: "FlipD profile",
        text: `Checkout ${user.username}'s profile on linkedin.`,
        url: `${location.origin}/profile/${user.username}`,
      });
    }
    setIsLoading(false);
    refetch();
  }

  return (
    <button
      onClick={handleProfileButton}
      disabled={isLoading}
      className={
        "flex gap-4 items-center disabled:grayscale-75 " +
        (action === "add_friend"
          ? "text-sm bg-[var(--main)] text-white px-4 py-2 rounded-xl"
          : action === "block_friend"
          ? "text-sm bg-red-500 text-white px-4 py-2 rounded-xl"
          : action === "unblock_friend"
          ? "text-sm border border-red-500 text-red-500 px-4 py-2 rounded-xl"
          : "text-sm border border-[var(--main)] text-[var(--main)] px-4 py-2 rounded-xl")
      }
    >
      {isLoading && <Loader.MiniLoader />}
      {children}
    </button>
  );
}
