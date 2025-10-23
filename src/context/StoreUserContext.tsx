import { createContext } from "react";

export interface StoreUserType {
  data: { [key: string]: boolean | string };
}

export const StoreUserContext = createContext<StoreUserType | null>(null);
