import {
  useQueries,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  getAuthUserFromStoreOption,
  getByUsernameOption,
} from "../queryOptions/allQueryOptions";
import { auth } from "../db/firebase";
import {
  getOneUserAction,
  getOneUserAction2,
} from "../actions/userStoreAction";
import { useEffect, useRef } from "react";
import type { Unsubscribe } from "firebase/firestore";

export function useStoreUser(username?: string) {
  // useGetStoreUser(username);

  return useQueries({
    queries: [
      getByUsernameOption(username as string),
      getAuthUserFromStoreOption(),
    ],
  });
}

export function useGetStoreUser(username?: string) {
  const queryClient = useQueryClient();
  const queryUsername = username ? username : auth?.currentUser?.displayName;
  const unSubRef = useRef<Unsubscribe | undefined>(undefined);

  useEffect(() => {
    [
      async () => {
        unSubRef.current = await getOneUserAction2(
          queryUsername as string,
          false,
          (data) =>
            queryClient.setQueryData(
              [username ? username : "authUserStore"],
              data
            )
        );
      },
    ][0]();

    return () => {
      if (unSubRef.current) unSubRef.current();
    };
  });

  return useQuery({
    queryKey: [queryUsername],
    queryFn: async () => await getOneUserAction(queryUsername as string),
  });
}
