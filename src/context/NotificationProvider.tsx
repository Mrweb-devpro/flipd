import type React from "react";
import { NotificationContext } from "./NotificationContext";
import { useEffect, useRef, useState } from "react";
import { getUserNotifications } from "../actions/notificationActions";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { DocumentData, Unsubscribe } from "firebase/firestore";

export default function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const cleanUpRef = useRef<Unsubscribe | []>(null);

  const { data: notifications } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () =>
      await getUserNotifications(
        (data: DocumentData[]) =>
          queryClient.setQueryData(["notifications"], data),
        true
      ),
  });

  useEffect(() => {
    const fetchData = async () => {
      cleanUpRef.current = await getUserNotifications((data: DocumentData[]) =>
        queryClient.setQueryData(["notifications"], data)
      );
    };
    fetchData();
    return () => {
      if (cleanUpRef.current && !Array.isArray(cleanUpRef.current))
        cleanUpRef.current();
    };
  }, [notifications]);

  const toggleDropDown = (actionType?: "open" | "close") => {
    if (actionType === "open" && !isOpen) setIsOpen(true);
    if (actionType === "close" && isOpen) setIsOpen(false);
    if (!actionType) setIsOpen((cur) => !cur);
  };

  return (
    <NotificationContext.Provider
      value={{ toggleDropDown, notifications, isOpen }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
