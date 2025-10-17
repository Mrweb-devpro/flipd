import type { ModalNameSpace } from "../../context/ModalContext";
import { useModal } from "../../hooks/useModal";

export default function Modal({
  name,
  children,
}: {
  name: ModalNameSpace;
  children: React.ReactNode;
}) {
  const { isOpen } = useModal();

  if (name !== isOpen) return "";
  return (
    <div className="absolute w-full h-screen flex flex-col items-center top-0 left-1/2 -translate-x-1/2 bg-emerald-50 p-2 overflow-auto gap-5">
      {children}
    </div>
  );
}
