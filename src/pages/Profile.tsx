import { useState, type FormEvent } from "react";
import BioIcon from "../components/icons/BioIcon";
import EditIcon from "../components/icons/EditIcon";
import EmailIcon from "../components/icons/EmailIcon";
import UserIcon from "../components/icons/UserIcon";
import { FcCancel } from "react-icons/fc";
import { BiSave } from "react-icons/bi";
import { updateProfileAction } from "../actions/profileAction";
import { formatFirbaseError } from "../utils/formatError";
import UserDetailCont from "../components/profile/UserDetails";
import ProfileButton from "../components/profile/ProfileButton";
import ImageUploader from "../components/ImageUploader";
import { useAuthUser } from "../hooks/useAuthUser";
import { useStoreUser } from "../hooks/useStoreUsers";
import PasswordIcon from "../components/icons/PasswordIcon";

export default function Profile() {
  const [errorInImg, setErrorInImg] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [hasEmail, setHasEmail] = useState(false);

  console.log(hasEmail);
  const { data: user, refetch } = useAuthUser();
  const [_, { data: storeUser }] = useStoreUser();

  const iconSize = "24";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const formValues = Object.fromEntries(formData);

    const email = formValues.email;
    const username = formValues.username;
    const password = formValues.password;
    const bio = formValues.bio;

    if ((email && password) || username || file || bio) {
      await updateProfileAction({ ...formValues, file }, setIsSaving, setError);

      setIsEditMode(false);
      refetch();
    }
  };

  if (!user) return <h1>Loading...</h1>;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-8 py-10 items-center"
    >
      <h2 className="font-bold text-xl text-[var(--main)]">
        {isEditMode && "Update "}Your Profile
      </h2>

      <div className="relative flex gap-4">
        {isEditMode ? (
          <ImageUploader file={file} setFile={setFile} />
        ) : (
          <img
            src={user.photoURL || "/test-user.png"}
            alt=""
            className="md:w-56 w-40 md:h-56 h-40 rounded-2xl"
            onError={() => {
              console.log("Error happened while fetching the image");
              setErrorInImg(true);
            }}
          />
        )}
      </div>

      <ul className="flex flex-col gap-5 items-center">
        <UserDetailCont
          title="Username"
          isEditMode={isEditMode}
          Icon={<UserIcon size={iconSize} />}
          content={user.displayName as string}
        />
        <UserDetailCont
          title="Email"
          isEditMode={isEditMode}
          Icon={<EmailIcon size={iconSize} />}
          content={user.email as string}
          handleChange={(e) => {
            if (e.target.value.trim()) {
              setHasEmail(true);
            } else setHasEmail(false);
          }}
        />
        {isEditMode && hasEmail && (
          <li className="flex items-center justify-center gap-2 -mt-5 ml-32">
            <span className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-sm text-stone-600">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="xxxxxxxxxxxxxxxxxxx"
                className="border border-[var(--main)] rounded-sm bg-stone-100 px-2 text-sm py-1 w-64 "
              />
              <i className="text-xs text-amber-400 w-1/2 text-center">
                Password is required in other to change primary email
              </i>
            </span>
          </li>
        )}

        <UserDetailCont
          title="Bio"
          isEditMode={isEditMode}
          Icon={<BioIcon size={iconSize} />}
          content={storeUser?.bio ? storeUser?.bio : "Empty"}
        />

        <li className="w-52 self-center ">
          <i className="w-34 text-red-500 text-xs ">
            {formatFirbaseError(error)}
          </i>
        </li>

        <li className="w-full  flex justify-center gap-4 mt-3">
          {isEditMode ? (
            <>
              <ProfileButton type="save" isSaving={isSaving}>
                <BiSave size={+iconSize - 3} />
                Save
              </ProfileButton>

              <ProfileButton
                type="cancel"
                isSaving={isSaving}
                handleClick={() => {
                  setError("");
                  setIsEditMode(false);
                }}
              >
                <FcCancel size={+iconSize - 3} className=" cancel_style" />
                Cancel
              </ProfileButton>
            </>
          ) : (
            <ProfileButton
              handleClick={() => {
                setError("");
                setIsEditMode(true);
              }}
              isSaving={isSaving}
            >
              <EditIcon />
              Edit
            </ProfileButton>
          )}
        </li>
      </ul>
    </form>
  );
}
