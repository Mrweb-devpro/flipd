import { createContext } from "react";

export const initialState: {
  sender: string;
  time: string;
  userId: string;
  content: "";
}[] = [];

export const PostContext = createContext(initialState);
