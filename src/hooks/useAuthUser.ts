import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { onAuthChangedAction } from "../actions/authActions";
import type { User } from "firebase/auth";

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
