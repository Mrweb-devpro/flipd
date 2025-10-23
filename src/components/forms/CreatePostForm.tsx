import { useState, type FormEvent } from "react";
import { MdOutlinePostAdd } from "react-icons/md";

import CloseModalButton from "../modal/CloseModalButton";
import { createPostAction } from "../../actions/postActions";

import { useModal } from "../../hooks/useModal";
import { useAuthUser } from "../../hooks/useAuthUser";
import Loader from "../Loader";

export default function CreatePostForm() {
  const [isLoading, setIsloading] = useState(false);
  const [post, setPost] = useState("");
  const [error, setError] = useState<string>("");

  const { close } = useModal();
  const { data: user } = useAuthUser();

  // create the post
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (post.trim().length <= 1) return setError("Add a post content");
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
      className="max-w-[475px] w-full md:w-1/2 bg-white border flex justify-center p-10 rounded-xl flex-col gap-6 items-center text-center h-fit my-auto"
      onSubmit={handleSubmit}
    >
      <h1 className="text-[var(--main)] font-bold text-xl md:text-2xl sm:text-xl">
        {"< "}Create a new Post {" />"}
      </h1>

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
      {error && (
        <i className="text-red-500 space-x-4 text-sm">
          <span>&#9888;</span>
          <span>{error}</span>
        </i>
      )}

      <div className="flex items-center justify-center gap-6">
        <button
          type="submit"
          disabled={isLoading}
          className=" p-2 hover:text-[var(--main)] flex gap-2 items-center border-[1.4px] border-[var(--main)] hover:bg-transparent rounded-sm bg-[var(--main)] text-white justify-center disabled:border-amber-500 disabled:text-amber-500 disabled:bg-transparent"
        >
          {isLoading ? (
            <>
              Loading
              <Loader.MiniLoader />
            </>
          ) : (
            "Create Post"
          )}
        </button>
        {isLoading || (
          <CloseModalButton disabled={isLoading}>Cancel</CloseModalButton>
        )}
      </div>
    </form>
  );
}
