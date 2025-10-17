import { createContext, type Dispatch, type SetStateAction } from "react";

//-- to same the value of each name, for typesafety
export type ModalNameSpace = "create-post" | "search" | "";

export const initialState: {
  isOpen: ModalNameSpace;
  setIsOpen: Dispatch<SetStateAction<ModalNameSpace>>;
  modalData: any;
  setModalData: Dispatch<SetStateAction<any>>;
  close: () => void;
} = {
  isOpen: "",
  close: () => {},
  setIsOpen: () => {},
  modalData: {},
  setModalData: () => {},
};

export const ModalContext = createContext(initialState);
