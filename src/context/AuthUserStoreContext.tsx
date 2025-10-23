import { createContext } from "react";
import type { StoreUserType } from "../types/DatabaseTypes";

export interface AuthUserStore {
  data: StoreUserType;
}

export const AuthUserStoreContext = createContext<AuthUserStore | null>(null);
