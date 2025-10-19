import { createContext } from "react";

interface NotificationContextType {
  toggleDropDown: (actionType: "open" | "close") => void;
  notifications: { type: string; message: string; special: /*unresolved*/ any };
}

const initialState: NotificationContextType | null = null;

export const NotificationContext = createContext(initialState);
