import { FcGoogle } from "react-icons/fc";
import { signInwithGoogle } from "../../actions/authActions";

export default function GoogleAuthButton() {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signInwithGoogle();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="w-full p-2 text-stone-500 flex gap-2 items-center border-[1.4px] border-[#59d47c] rounded-sm hover:bg-[#59d47c] hover:text-white justify-center"
    >
      <FcGoogle size="25" />
      Sign in with Google
    </button>
  );
}
