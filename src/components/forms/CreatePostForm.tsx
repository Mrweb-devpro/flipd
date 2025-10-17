import { MdOutlinePostAdd } from "react-icons/md";
import CloseModalButton from "../modal/CloseModalButton";
import { useState, type FormEvent } from "react";
import { createPostAction } from "../../actions/postActions";
import { useModal } from "../../hooks/useModal";
import { useAuthUser } from "../../hooks/useAuthUser";

export default function CreatePostForm() {
  const [_, setIsloading] = useState(false);
  const [post, setPost] = useState("");

  const { close } = useModal();
  const { data: user } = useAuthUser();

  // create the post
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (post.length <= 1) return;
    setIsloading(true);
    await createPostAction({
      sender: user?.displayName as string,
      content: post,
    }).finally(() => setIsloading(false));
    close();
    setPost("");
  };

  return (
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
        <CloseModalButton>Cancel</CloseModalButton>
      </div>
    </form>
  );
}
