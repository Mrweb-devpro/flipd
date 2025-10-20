import { createContext, type Context } from "react";

export interface UserNotificationType {
  type: string;
  message: string;
  seen: boolean;
  special: /*unresolved*/ any;
}
interface NotificationContextType {
  toggleDropDown: (actionType: "open" | "close") => void;
  notifications: UserNotificationType[];
}

const initialState: NotificationContextType | null = null;

export const NotificationContext: Context<typeof initialState> =
  createContext(initialState);
