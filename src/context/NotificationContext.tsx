import type { Unsubscribe } from "firebase/firestore";
import { createContext } from "react";

export interface UserNotificationType {
  type: string;
  message: string;
  seen: boolean;
  special: /*unresolved*/ any;
}
export interface NotificationContextType {
  toggleDropDown: (actionType: "open" | "close") => void;
  notifications: UserNotificationType[] | undefined | Unsubscribe;
  isOpen: boolean;
}

export const NotificationContext =
  createContext<NotificationContextType | null>(null);
