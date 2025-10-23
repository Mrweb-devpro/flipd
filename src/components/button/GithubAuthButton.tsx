import type { MouseEventHandler } from "react";
import { signInWithGithub } from "../../actions/authActions";
import { BsGithub } from "react-icons/bs";

export default function GithubAuthButton() {
  const handleClick: MouseEventHandler = (e) => {
    e.preventDefault();
    signInWithGithub();
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      className="w-full p-2 text-stone-500 flex gap-2 items-center border-[1.4px] border-[#59d47c] rounded-sm hover:bg-[#59d47c] hover:text-white justify-center"
    >
      <BsGithub size="25" /> Sign in with Github
    </button>
  );
}
