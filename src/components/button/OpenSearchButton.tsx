import { BiUser } from "react-icons/bi";
import { useModal } from "../../hooks/useModal";

export default function OpenSearchButton() {
  const { setIsOpen } = useModal();
  return (
    <button
      className="p-2  flex gap-2 items-center border-[1.4px] border-[var(--main)] rounded-sm bg-[var(--main)] text-white justify-center"
      onClick={() => setIsOpen("search")}
    >
      <BiUser />
      Search for a user
    </button>
  );
}
