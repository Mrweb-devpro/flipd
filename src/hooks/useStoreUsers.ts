import { useQueries } from "@tanstack/react-query";
import {
  getAuthUserFromStore,
  getByUsername,
} from "../queryOptions/allQueryOptions";

export function useStoreUser(username?: string) {
  return useQueries({
    queries: [getByUsername(username as string), getAuthUserFromStore()],
  });
}
