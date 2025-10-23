import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import type { User } from "firebase/auth";
import { onAuthChangedAction } from "../actions/authActions";

export function useAuthUser() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["authUser"],
    queryFn: getUser, // ✅ solution
    // queryFn: () => auth.currentUser, // ❌ doesnt work
    staleTime: Infinity,
  });

  useEffect(() => {
    const unsubscribe = onAuthChangedAction((user) => {
      queryClient.setQueryData(["authUser"], user as User);
    });
    return unsubscribe;
  }, [queryClient]);

  return query;
}

async function getUser(): Promise<User | null> {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthChangedAction((user) => {
      resolve(user);
    });
    reject(unsubscribe());
  });
}
