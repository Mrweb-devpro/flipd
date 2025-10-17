import { useState } from "react";
import { ModalContext } from "./ModalContext";

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState("");
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
