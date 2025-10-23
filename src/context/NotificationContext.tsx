import { createContext } from "react";

import type { Unsubscribe } from "firebase/firestore";
import type { UserNotificationType } from "../types/DatabaseTypes";

export interface NotificationContextType {
  toggleDropDown: (actionType: "open" | "close") => void;
  notifications: UserNotificationType[] | undefined | Unsubscribe;
  isOpen: boolean;
}

export const NotificationContext =
  createContext<NotificationContextType | null>(null);
