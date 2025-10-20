import { IoIosNotifications } from "react-icons/io";
import useNotifications from "../../hooks/useNotifications";

export default function NotificationBellButton() {
  const { toggleDropDown, notifications } = useNotifications();

  const numberOfUnRead = notifications?.reduce((prev, curr) => {
    if (!curr.seen) return ++prev;
  }, 0);

  return (
    <button
      type="button"
      onClick={() => toggleDropDown()}
      className="relative text-[var(--main)] p-1 border-2 rounded-sm border-[var(--main)] hover:bg-[var(--main)] hover:text-stone-100 group"
    >
      {!!numberOfUnRead && (
        <strong className="absolute top-3/4 left-3/4 bg-[var(--main)] text-stone-100 w-4 h-4 text-xs rounded group-hover:bg-stone-100 border border-transparent group-hover:border-[var(--main)] group-hover:text-[var(--main)]">
          {numberOfUnRead}
        </strong>
      )}
      <IoIosNotifications size="23" />
    </button>
  );
}
