import { IoIosAdd } from "react-icons/io";
import { useModal } from "../../hooks/useModal";

export default function CreatePostButton() {
  const { setIsOpen } = useModal();

  return (
    <button
      type="submit"
      onClick={() => setIsOpen("create-post")}
      className="p-2  flex gap-2 items-center border-[1.4px] border-[var(--main)] rounded-sm bg-[var(--main)] text-white justify-center"
    >
      <IoIosAdd size="25" />
      Create Post
    </button>
  );
}
