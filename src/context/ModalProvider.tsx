import { useState } from "react";
import { ModalContext, type ModalNameSpace } from "./ModalContext";

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState<ModalNameSpace>("");
  const [modalData, setModalData] = useState(null);

  const close = () => {
    setIsOpen("");
  };
  return (
    <ModalContext.Provider
      value={{ isOpen, setIsOpen, modalData, setModalData, close }}
    >
      {children}
    </ModalContext.Provider>
  );
}
