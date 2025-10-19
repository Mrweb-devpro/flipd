import { IoIosNotifications } from "react-icons/io";
import useNotifications from "../../hooks/useNotifications";

export default function NotificationBellButton() {
  const { toggleDropDown } = useNotifications();
  return (
    <button
      type="button"
      onClick={() => toggleDropDown()}
      className="text-[var(--main)] p-1 border-2 rounded-sm border-[var(--main)] hover:bg-[var(--main)] hover:text-stone-100"
    >
      <IoIosNotifications size="23" />
    </button>
  );
}
