import Post from "../components/Post";
import { usePost } from "../hooks/usePost";
import { useAuthUser } from "../hooks/useAuthUser";
import Modal from "../components/modal/Modal";
import CreatePostButton from "../components/button/CreatePostButton";
import Search from "../components/Search";
import { useModal } from "../hooks/useModal";
import CloseModalButton from "../components/modal/CloseModalButton";
import CreatePostForm from "../components/forms/CreatePostForm";
import OpenSearchButton from "../components/button/OpenSearchButton";
import SearchResult from "../components/SearchResult";
import { Suspense } from "react";
import Loader from "../components/Loader";
import { useGetStoreUser } from "../hooks/useStoreUsers";

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
          <Post
            key={post.time}
            time={post.time}
            post={post.content}
            username={post.sender}
          />
        ))}
    </main>
  );
}
