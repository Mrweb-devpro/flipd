import { StoreUserContext } from "./StoreUserContext";
import { useEffect, useRef, useState } from "react";
import { auth } from "../db/firebase";
import { type Unsubscribe } from "firebase/auth";
import { getOneUserAction2 } from "../actions/userStoreAction";

export default function StoreUserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const username = "";
  const queryUsername = username ? username : auth?.currentUser?.displayName;
  const unSubRef = useRef<Unsubscribe | undefined>(undefined);
  const [queryData, setQueryData] = useState({});

  useEffect(() => {
    [
      async () => {
        try {
          getOneUserAction2(queryUsername as string, false, (data) =>
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
  console.log(queryData);

  return (
    <StoreUserContext.Provider value={{ data: queryData }}>
      {children}
    </StoreUserContext.Provider>
  );
}
