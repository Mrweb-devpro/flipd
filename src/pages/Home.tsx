import { Suspense } from "react";

import { usePost } from "../hooks/usePost";
import { useModal } from "../hooks/useModal";
import { useAuthUser } from "../hooks/useAuthUser";

import Post from "../components/Post";
import Search from "../components/Search";
import Modal from "../components/modal/Modal";
import SearchResult from "../components/SearchResult";
import CreatePostForm from "../components/forms/CreatePostForm";
import CloseModalButton from "../components/modal/CloseModalButton";
import CreatePostButton from "../components/button/CreatePostButton";
import OpenSearchButton from "../components/button/OpenSearchButton";
import Loader from "../components/Loader";
import UserIcon from "../components/icons/UserIcon";

export default function Home() {
  const { data: user } = useAuthUser();
  const { isOpen } = useModal();

  const posts = usePost();

  if (!user) return <h1 className="text-center">Loading... </h1>;
  return (
    <main className="flex flex-col items-center w-full p-4 gap-2 overscroll-y-auto ">
      <span
        style={{
          height: isOpen ? "0" : "",
          border: isOpen ? "none" : "",
          padding: isOpen ? "0 0" : "",
          transitionDuration: "0.2s",
        }}
        className="transition-all sticky bottom-0 w-full md:w-1/2 flex items-center justify-center border-2 border-green-500  p-2 rounded-lg bg-green-100/25 backdrop-blur-xs shadow overflow-hidden gap-4"
      >
        <CreatePostButton />
        <OpenSearchButton />
      </span>

      {/* Search for users Modal */}
      <Modal name="search">
        <Suspense fallback={<Loader />}>
          <span className="self-end">
            <CloseModalButton type="x" />
          </span>
          <Search />
          <SearchResult />
        </Suspense>
      </Modal>

      {/* Create Post Modal*/}
      <Modal name="create-post">
        <CreatePostForm />
      </Modal>

      {!posts.length ||
        posts.map((post) => (
          <Suspense fallback={<PostCardSkeleton />}>
            <Post
              key={post.time}
              time={post.time}
              post={post.content}
              username={post.sender}
            />
          </Suspense>
        ))}
    </main>
  );
}
function PostCardSkeleton() {
  return (
    <div className="relative w-full">
      <span className="absolute top-1/2 left-1/2 -translate-1/2">
        <Loader.MiniLoader color="var(--main)" />
      </span>
      <div className=" flex flex-col gap-6 border-[1.5px] border-[var(--main)] p-3 rounded-xl w-full bg-green-200 animate-pulse blur-[2.5px]">
        <span className="flex justify-between items-center gap-4">
          <i className="flex items-center gap-2">
            <UserIcon size="30" />

            <strong>
              <i className="text-stone-600">username</i>
            </strong>
          </i>

          <p className="text-stone-500 text-xs">formatedDate</p>
        </span>
        <p className="text-stone-600">post</p>
      </div>
    </div>
  );
}
