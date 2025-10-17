import { CiCircleAlert } from "react-icons/ci";
import { NoRememberStorageKey } from "../actions/authActions";
import { useLocalStorage } from "../hooks/useLocalStorage";

export default function LogStatusMessage() {
  const { storageHasItem } = useLocalStorage();

  return (
    <div>
      {storageHasItem(NoRememberStorageKey) && (
        <span className="flex flex-col justify-center gap-4 items-center border-x-2 border-amber-600 px-4 py-2 rounded-lg">
          <CiCircleAlert className="text-amber-600" size="30" />
          <p className="text-stone-400 flex flex-col items-center gap-1.5">
            You where loggout automatically on you last visit.
            <i>
              Click on
              <label
                htmlFor="remember"
                className=" font-bold hover:text-[var(--main)] cursor-pointer"
              >
                &nbsp;remember me&nbsp;
              </label>
              to stop this action
            </i>
          </p>
        </span>
      )}
    </div>
  );
}
