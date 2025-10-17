import { createContext } from "react";

export type PostsType = {
  sender: string;
  time: string;
  userId: string;
  content: "";
}[];
export const initialState: PostsType = [];

export const PostContext = createContext(initialState);
