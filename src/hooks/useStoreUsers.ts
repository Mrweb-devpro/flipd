import { useEffect, useRef } from "react";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";

import type { Unsubscribe } from "firebase/firestore";

import {
  getOneUserAction,
  getOneUserSnapshotAction,
} from "../actions/userStoreAction";

export function useStoreUser(username: string) {
  const queryClient = useQueryClient();
  const unSubRef = useRef<Unsubscribe | undefined>(null);

  const query = useSuspenseQuery({
    queryKey: [username],
    queryFn: async () => await getOneUserAction(username),
  });

  useEffect(() => {
    const fetchData = async () => {
      unSubRef.current = await getOneUserSnapshotAction(
        username,
        false,
        (data) => {
          queryClient.setQueryData([username], data);
        }
      );
    };
    fetchData();

    return () => {
      if (unSubRef.current) unSubRef.current();
    };
  }, []);

  return query;
}
