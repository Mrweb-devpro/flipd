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
      queryClient.setQueryData(["authUser"], user);
    });
    return unsubscribe;
  }, [queryClient]);

  return query;
}

async function getUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthChangedAction((user) => {
      console.log("User testing: ", user);
      resolve(user as User);
    });
    reject(unsubscribe());
  });
}
