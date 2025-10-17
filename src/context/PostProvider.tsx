import { useEffect, useMemo, useState } from "react";
import { initialState, PostContext } from "./PostContext";
import { getAllPostsAction } from "../actions/postActions";
import { doc } from "firebase/firestore";

export function PostProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState(initialState);
  const [isLoading, setIsloading] = useState(false);

  // fetch post on mount and on posts updates
  useEffect(() => {
    const fetchAllPosts = async () => {
      const unSub = await getAllPostsAction(setPosts);

      // setPosts(posts);
      return () => {
        unSub();
      };
    };
    fetchAllPosts();
  }, []);

  return (
    <PostContext.Provider value={useMemo(() => posts, [posts])}>
      {children}
    </PostContext.Provider>
  );
}
