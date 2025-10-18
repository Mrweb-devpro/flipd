import { useParams } from "react-router-dom";
import image404 from "/src/assets/icons/404.svg";
import GoBackButton from "../components/button/goBackButton";

type NotFoundType = "User-Not-Found";

export default function PageNotfound({
  type,
  contentElement,
}: {
  type?: NotFoundType;
  contentElement?: React.ReactNode;
}) {
  return (
    <div className="w-full h-full gap-10 text-3xl font-extrabold text-[var(--main)] flex items-center justify-center flex-col">
      <NotFoundImage />
      {!!type || <PageNotFoundContent />}
      {type === "User-Not-Found" && <UserNotFound />}
      <div className="text-lg">
        <GoBackButton />
      </div>
    </div>
  );
}

function UserNotFound() {
  const { username } = useParams();
  return (
    <h1 className="text-center text-sm w-3/4 capitalize text-green-800 flex flex-col gap-2">
      <strong>
        Sorry, the profile section for{" "}
        <i className="normal-case text-red-400">
          (the URL: {location.pathname}){" "}
        </i>
        does not exist.
        <br />
        It may have been removed or never created. Please check the username and
        try again.
      </strong>
    </h1>
  );
}
function PageNotFoundContent() {
  return (
    <>
      <i className="text-red-500 font-normal text-lg flex gap-4 items-center">
        <span className="text-4xl">&times;</span>
        URL: {location.pathname}
      </i>
      <h1> Page not found</h1>
    </>
  );
}

function NotFoundImage() {
  return (
    <img src={image404} alt="Page not found" className="max-w-[300px] w-3/4" />
  );
}
