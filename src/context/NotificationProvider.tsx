import type React from "react";
import { NotificationContext } from "./NotificationContext";
import { useState } from "react";
import { useStoreUser } from "../hooks/useStoreUsers";

export default function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [_, { data: user }] = useStoreUser();

  const toggleDropDown = (actionType?: "open" | "close") => {
    if (actionType === "open" && !isOpen) setIsOpen(true);
    if (actionType === "close" && isOpen) setIsOpen(false);
    if (!actionType) setIsOpen((cur) => !cur);
  };
  console.log(user?.notifications);

  return (
    <NotificationContext.Provider
      value={{ toggleDropDown, notifications: user?.notifications, isOpen }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
