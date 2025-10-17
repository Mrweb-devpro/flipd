import type { Dispatch, SetStateAction } from "react";
import { FaCheck } from "react-icons/fa";

export default function FormRememberMe({
  remember,
  setRemember,
}: {
  remember: boolean;
  setRemember: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <span className="flex gap-3 items-center justify-center">
      <input
        type="checkbox"
        id="remember"
        name="remember"
        hidden={true}
        checked={remember}
        onChange={(e) => setRemember(e.target.checked)}
      />
      <label
        htmlFor="remember"
        className="w-4.5 h-4.5 border border-[var(--main-light)] rounded-sm flex flex-col items-center justify-center cursor-pointer"
      >
        {remember && <FaCheck size="13" className="text-[var(--main-light)]" />}
      </label>
      <label htmlFor="remember" className="text-stone-600">
        Remember me
      </label>
    </span>
  );
}
