import { useContext } from "react";
import { NotificationContext } from "../context/NotificationContext";

export default function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context)
    throw new Error(
      "Notification context must not be used outside of its provider"
    );
  return context;
}
