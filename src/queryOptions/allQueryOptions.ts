import { queryOptions } from "@tanstack/react-query";
import { getOneUserAction } from "../actions/userStoreAction";
import { auth } from "../db/firebase";

export function getByUsername(username: string) {
  return queryOptions({
    queryKey: [username],
    queryFn: () => getOneUserAction(username),
  });
}

export function getAuthUserFromStore() {
  return queryOptions({
    queryKey: ["authUserStore"],
    queryFn: () => getOneUserAction(auth.currentUser?.displayName as string),
  });
}
