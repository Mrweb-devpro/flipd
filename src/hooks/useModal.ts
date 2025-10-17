import { useContext } from "react";
import { ModalContext } from "../context/ModalContext";

export function useModal() {
  const context = useContext(ModalContext);

  if (!context)
    throw new Error("Modal Context must not be used outside of the provider");
  return context;
}
