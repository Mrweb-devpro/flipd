import { useContext } from "react";
import { AuthUserStoreContext } from "../context/AuthUserStoreContext";

export function useAuthUserStore() {
  const context = useContext(AuthUserStoreContext);
  if (context === null)
    throw new Error(
      "❌ StoreUserContext Can't be used outside of its provider"
    );

  return context;
}
