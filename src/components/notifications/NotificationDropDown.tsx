import { MdPersonAdd } from "react-icons/md";
import { friendRequestNotification } from "../../utils/notificationTypeStrings";
import useNotifications from "../../hooks/useNotifications";
import type { FormEvent, MouseEventHandler } from "react";

export default function NotificationDropDown() {
  const { notifications } = useNotifications();
  console.log(notifications);

  const handleReject = (e: MouseEventHandler<HTMLButtonElement>) => {
    console.log("Reject request");
  };
  return (
    <div className="absolute z-20 top-2 shadow right-0 bg-stone-100 border border-stone-200 rounded-sm flex p-5 flex-col gap-3">
      <h3 className="font-bold text-[var(--main)]">Notifications</h3>
      <ul className="text-sm">
        {notifications?.map((notification) => {
          if (notification.type === friendRequestNotification)
            return (
              <li className="border-b border-stone-200 py-2 text-stone-700 flex gap-2">
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
                  onClick={handleReject}
                >
                  reject
                </button>
              </li>
            );
          else
            return (
              <li className="border-b border-stone-200 py-2 text-stone-700 flex gap-2">
                {notification.message}
              </li>
            );
        })}
      </ul>
    </div>
  );
}
