import type { Dispatch, MouseEventHandler, SetStateAction } from "react";
import { useFileReader } from "../hooks/useFileReader";
import { DEFAULT_PHOTO_URL } from "../db/supabase";
import { useAuthUser } from "../hooks/useAuthUser";

export default function ImageUploader({
  file,
  setFile,
}: {
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
}) {
  const { imageRef, handleFileChange } = useFileReader(setFile);
  const { data: user } = useAuthUser();

  const isDefaultPhoto =
    user.photoURL?.includes(DEFAULT_PHOTO_URL) || file?.name === "fake_file";

  const handleClearImage: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    console.log(user.photoURL);
    if (isDefaultPhoto) return;
    console.log("Is not default photo");
    const fakeFile = new File(["lmsm"], "fake_file", {
      type: "image/jpg",
    });

    setFile(fakeFile);

    if (imageRef.current) {
      imageRef.current.src = "/test-user.png";
    }
  };

  return (
    <>
      <img
        src={user.photoURL || "/test-user.png"}
        alt="The imge yu"
        ref={imageRef}
        className="md:w-26 w-16 md:h-26 h-16 rounded-lg"
      />

      <span className="flex flex-col gap-2">
        <p>
          {file?.name === "fake_file" ||
            (file?.name?.length > 14
              ? `${file?.name.slice(0, 14)}...`
              : file?.name)}
        </p>

        <label
          htmlFor="file"
          className="px-4 py-1 border border-[var(--main)] text-sm text-[var(--main)] hover:text-white hover:bg-[var(--main)] rounded-sm"
        >
          Upload new Image
          <input
            type="file"
            name="file"
            accept="image/png, image/jpeg, image/jpg"
            id="file"
            hidden
            onChange={handleFileChange}
          />
        </label>

        <button
          type="button"
          onClick={handleClearImage}
          className="px-4 py-1 border border-red-500 text-sm text-red-500 rounded-sm hover:bg-red-500  hover:text-white"
        >
          Remove
        </button>
      </span>
    </>
  );
}
