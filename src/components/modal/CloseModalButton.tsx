import { useModal } from "../../hooks/useModal";
import { IoClose } from "react-icons/io5";

export default function CloseModalButton({
  children,
  disabled = false,
  type = "",
}: {
  disabled?: boolean;
  children?: React.ReactNode;
  type?: string;
}) {
  const { close } = useModal();

  if (type === "x")
    return (
      <button
        onClick={close}
        disabled={disabled}
        type="submit"
        className="p-2 text-red-500 flex gap-2 items-center border-[1.4px] border-red-500 rounded-sm hover:bg-red-500 hover:text-white justify-center"
      >
        <IoClose size="30" />
      </button>
    );

  return (
    <button
      onClick={close}
      type="submit"
      className="p-2 text-red-500 flex gap-2 items-center border-[1.4px] border-red-500 rounded-sm hover:bg-red-500 hover:text-white justify-center"
    >
      {children}
    </button>
  );
}
