import { useEffect } from "react";
import { MdPersonAdd } from "react-icons/md";

// custom hooks
import useNotifications from "../../hooks/useNotifications";

// utils
import {
  acceptedfriendRequestNotification,
  friendRequestNotification,
} from "../../utils/notificationTypeStrings";

// actions
import { handleSeenAction } from "../../actions/notificationActions";
import { rejectFriendRequestAction } from "../../actions/profileAction";

// types
import type { UserNotificationType } from "../../context/NotificationContext";

export default function NotificationDropDown() {
  const { notifications }: { notifications: UserNotificationType[] } =
    useNotifications();

  const handleReject = (notificationObj: UserNotificationType) => {
    rejectFriendRequestAction(notificationObj);
    console.log("reject request");
  };
  return (
    <div className="absolute z-20 top-2 shadow right-0 bg-stone-100 border border-stone-200 rounded-sm flex p-5 flex-col gap-3">
      <h3 className="font-bold text-[var(--main)]">Notifications</h3>
      <ul className="text-sm">
        {!notifications?.length ? (
          <li className="line-through text-stone-400 text-xs">
            No notifications yet
          </li>
        ) : (
          notifications?.map((notification, i) => {
            if (notification.type === friendRequestNotification)
              return (
                <Li key={i} notificationObj={notification}>
                  <a
                    href={`profile/${notification.special}`}
                    className="text-[var(--main)] italic underline flex items-center gap-2"
                  >
                    <MdPersonAdd size="20" />
                    {notification.special}
                  </a>
                  sent you a friend request
                  <button
                    type="button"
                    className="border-b border-red-500 text-red-500 font-bold"
                    onClick={() => handleReject(notification)}
                  >
                    reject
                  </button>
                </Li>
              );
            else if (notification.type === acceptedfriendRequestNotification)
              return (
                <Li key={i} notificationObj={notification}>
                  <a
                    href={`profile/${notification.special}`}
                    className="text-[var(--main)] italic underline flex items-center gap-2"
                  >
                    {notification.special}
                  </a>
                  {notification.message}
                </Li>
              );
            else
              return (
                <Li notificationObj={notification} key={i}>
                  {notification.message}
                </Li>
              );
          })
        )}
      </ul>
    </div>
  );
}

function Li({
  children,
  notificationObj,
}: {
  children: React.ReactNode;
  notificationObj: UserNotificationType;
}) {
  useEffect(() => {
    handleSeenAction(notificationObj);
  }, []);

  return (
    <li className="border-b border-stone-200 py-2 text-stone-700 flex gap-2">
      {children}
    </li>
  );
}
