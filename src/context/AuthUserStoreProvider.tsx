import { AuthUserStoreContext } from "./AuthUserStoreContext";
import { useEffect, useRef, useState } from "react";
import { auth } from "../db/firebase";
import { type Unsubscribe } from "firebase/auth";
import { getOneUserSnapshotAction } from "../actions/userStoreAction";
import type { StoreUserType } from "../types/DatabaseTypes";

export default function AuthUserStoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const username = "";
  const queryUsername = username ? username : auth?.currentUser?.displayName;
  const unSubRef = useRef<Unsubscribe | undefined>(undefined);
  const [queryData, setQueryData] = useState<StoreUserType | {}>({});

  useEffect(() => {
    [
      async () => {
        try {
          getOneUserSnapshotAction(queryUsername as string, false, (data) =>
            setQueryData(data as any)
          );
        } finally {
        }
      },
    ][0]();

    return () => {
      if (unSubRef.current) unSubRef.current();
    };
  }, []);

  return (
    <AuthUserStoreContext.Provider value={{ data: queryData as StoreUserType }}>
      {children}
    </AuthUserStoreContext.Provider>
  );
}
