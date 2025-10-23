import type { ModalNameSpace } from "../../context/ModalContext";
import { useModal } from "../../hooks/useModal";

export default function ModalButton({
  children,
  name,
  className,
}: {
  children: React.ReactNode;
  name: ModalNameSpace;
  className: string;
}) {
  const { setIsOpen } = useModal();
  const open = () => {
    setIsOpen(name);
  };

  return (
    <button onClick={() => open} className={className}>
      {children}
    </button>
  );
}
