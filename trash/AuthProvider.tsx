import { useEffect, useMemo, useState } from "react";
import { onAuthChangedAction } from "../actions/authActions";
import { AuthContext } from "./AuthContext";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../db/firebase";

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   console.log(user);

//   useEffect(() => {
//     const unsubscribe = onAuthChangedAction(setUser, setIsLoading);
//     console.log("chisbisbusbuobsubssbuo", isLoading);

//     return async () => (await unsubscribe)();
//   }, [isLoading, user]);

//   const value = useMemo(() => ({ user, isLoading }), [user, isLoading]);

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // const unsubscribe = onAuthChangedAction(setUser, setIsLoading);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoading(true);

      try {
        if (user) {
          setUser(user);
        } else throw new Error("Unauthenticated");
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, [user, isLoading]);

  const userMomoized = useMemo(() => user, [user]);

  return (
    <AuthContext.Provider value={{ user: userMomoized, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
