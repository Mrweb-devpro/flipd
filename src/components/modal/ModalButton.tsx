import { useModal } from "../../hooks/useModal";

export default function ModalButton({
  children,
  name,
  className,
}: {
  children: React.ReactNode;
  name: string;
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
