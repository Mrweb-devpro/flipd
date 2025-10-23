import { useContext } from "react";
import { StoreUserContext } from "../context/StoreUserContext";

export function useAuthUserStore() {
  const context = useContext(StoreUserContext);
  if (context === null)
    throw new Error(
      "❌ StoreUserContext Can't be used outside of its provider"
    );

  return context;
}
