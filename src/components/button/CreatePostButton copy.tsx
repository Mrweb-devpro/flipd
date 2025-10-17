import {
  useState,
  type Dispatch,
  type FormEvent,
  type FormEventHandler,
  type SetStateAction,
} from "react";
import { IoIosAdd } from "react-icons/io";
import { MdOutlinePostAdd } from "react-icons/md";
import { createPostAction } from "../../actions/postActions";
import { useAuthUser } from "../../hooks/useAuthUser";

export default function CreatePostButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [post, setPost] = useState("");

  const { data: user } = useAuthUser();

  // handle closing of the modal
  const closeModal = () => {
    setIsOpen(false);
  };
  // create the post
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (post.length <= 1) return;
    setIsloading(true);
    await createPostAction({
      sender: user?.displayName as string,
      content: post,
    }).finally(() => setIsloading(false));
    closeModal();
    setPost("");
  };

  return (
    <>
      {isOpen && (
        <Modal
          closeModal={closeModal}
          post={post}
          setPost={setPost}
          handleSubmit={handleSubmit}
        />
      )}

      <button
        type="submit"
        onClick={() => setIsOpen((cur) => !cur)}
        className="p-2  flex gap-2 items-center border-[1.4px] border-[var(--main)] rounded-sm bg-[var(--main)] text-white justify-center"
      >
        <IoIosAdd size="25" />
        Create Post
      </button>
    </>
  );
}

function Modal({
  post,
  setPost,
  handleSubmit,
  closeModal,
}: {
  post: string;
  setPost: Dispatch<SetStateAction<string>>;
  handleSubmit: FormEventHandler;
  closeModal: () => void;
}) {
  return (
    <div className="absolute w-full h-screen flex justify-center top-0 left-1/2 -translate-x-1/2 bg-emerald-50 p-2 overflow-auto ">
      <form
        className="w-3/4 md:w-1/2 bg-white border flex justify-center p-10 rounded-xl flex-col gap-6 items-center text-center h-fit"
        onSubmit={handleSubmit}
      >
        <h1 className="text-[var(--main)] font-bold text-3xl">
          {"< "}Create a new Post {" />"}
        </h1>
        <p className="text-stone-400">
          Welcome Back, Login now to continue Exploring
        </p>

        <div className="flex flex-col items-center gap-6 w-full">
          <div className="flex flex-col gap-4 items-center w-full justify-center">
            <span className="w-full flex items-center gap-6">
              <MdOutlinePostAdd size="36" color="var(--main)" />
              <label
                htmlFor="post"
                className="text-stone-600 flex items-center gap-1"
              >
                Post Content <i className="text-red-500">*</i>
              </label>
            </span>
            <textarea
              autoComplete="off"
              id="post"
              required
              name="post"
              value={post}
              onChange={(e) => setPost(e.target.value)}
              placeholder="Type something..."
              className="bg-[#F6F9F7] border rounded-sm border-[var(--main-light)]  px-4 py-2 w-full max-w-[380px] resize-none 
              outline-none
                h-50"
            />
          </div>
        </div>

        <div className="flex items-center justify-center gap-6">
          <button
            type="submit"
            className=" p-2 hover:text-[var(--main)] flex gap-2 items-center border-[1.4px] border-[var(--main)] hover:bg-transparent rounded-sm bg-[var(--main)] text-white justify-center"
          >
            Create Post
          </button>
          <button
            type="submit"
            onClick={closeModal}
            className="p-2 text-red-500 flex gap-2 items-center border-[1.4px] border-red-500 rounded-sm hover:bg-red-500 hover:text-white justify-center"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
