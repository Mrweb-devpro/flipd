import { useContext } from "react";
import { PostContext } from "../context/PostContext";

export function usePost() {
  const context = useContext(PostContext);
  if (!context)
    throw new Error("Post Context can not be used outside of post provider");
  return context;
}
