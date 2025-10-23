import { createContext } from "react";
import type { PostsType } from "../types/DatabaseTypes";

export const initialState: PostsType = [];

export const PostContext = createContext<typeof initialState>(initialState);
