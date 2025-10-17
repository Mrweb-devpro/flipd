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

export default function Profile() {
  const [errorInImg, setErrorInImg] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const { data: user, refetch } = useAuthUser();
  const [_, { data: storeUser }] = useStoreUser();
  console.log(user);

  const iconSize = "24";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (email || username || file || bio) {
      await updateProfileAction(
        { email, username, file, bio },
        setIsSaving,
        setError
      );

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
        {/* <span className="absolute w-full h-full bg-[var(--main)]/30"></span> */}
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

      <ul className="flex flex-col gap-5 items-start">
        <UserDetailCont
          title="Username"
          isEditMode={isEditMode}
          Icon={<UserIcon size={iconSize} />}
          content={user.displayName}
          value={username}
          setValue={setUsername}
        />
        <UserDetailCont
          title="Email"
          isEditMode={isEditMode}
          Icon={<EmailIcon size={iconSize} />}
          content={user.email}
          value={email}
          setValue={setEmail}
        />
        <UserDetailCont
          title="Bio"
          isEditMode={isEditMode}
          Icon={<BioIcon size={iconSize} />}
          content={storeUser?.bio}
          value={bio}
          setValue={setBio}
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
