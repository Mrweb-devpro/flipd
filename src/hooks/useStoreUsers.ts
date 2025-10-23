import { useEffect, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import type { Unsubscribe } from "firebase/firestore";

import {
  getOneUserAction,
  getOneUserSnapshotAction,
} from "../actions/userStoreAction";

// export function useStoreUser(username?: string) {
//   return useQueries({
//     queries: [
//       getByUsernameOption(username as string),
//       // getAuthUserFromStoreOption(),
//     ],
//   });
// }

export function useStoreUser(username: string) {
  const queryClient = useQueryClient();
  const unSubRef = useRef<Unsubscribe | undefined>(null);

  const query = useQuery({
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

// export function useGetStoreUser(username?: string) {
//   const queryClient = useQueryClient();
//   const queryUsername = username ? username : auth?.currentUser?.displayName;
//   const unSubRef = useRef<Unsubscribe | undefined>(undefined);

//   useEffect(() => {
//     [
//       async () => {
//         unSubRef.current = await getOneUserAction2(
//           queryUsername as string,
//           false,
//           (data) =>
//             queryClient.setQueryData(
//               [username ? username : "authUserStore"],
//               data
//             )
//         );
//       },
//     ][0]();

//     return () => {
//       if (unSubRef.current) unSubRef.current();
//     };
//   });

//   return useQuery({
//     queryKey: [queryUsername],
//     queryFn: async () => await getOneUserAction(queryUsername as string),
//   });
// }

// export function useGetStoreUser() {
//   const context = useContext(StoreUserContext);
//   if (context === null)
//     throw new Error(
//       "❌ StoreUserContext Can't be used outside of its provider"
//     );

//   return context;
// }
