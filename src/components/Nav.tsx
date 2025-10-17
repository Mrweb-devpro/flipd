import { Link } from "react-router-dom";
import Logo from "./Logo";
import LogoutButton from "./button/LogoutButton";
import { useAuthUser } from "../hooks/useAuthUser";
import type { User } from "firebase/auth";
import { useState } from "react";
import testUserImage from "/public/test-user.png";

export default function Nav() {
  const { data: user } = useAuthUser();
  const [errorInImg, setErrorInImg] = useState(false);
  const showFallbackImage = errorInImg || !user?.photoURL;

  return (
    <nav className="w-full ">
      <ul
        className={
          "flex items-center p-4 border-b justify-between border-stone-300 w-full list-none"
        }
      >
        <li>
          <Logo />
        </li>

        {(user as User) && (
          <li>
            <span className="flex items-center justify-between gap-4">
              <Link to="/profile" className="flex items-center gap-2">
                <h2>{user.displayName}</h2>
                <img
                  loading="eager"
                  src={showFallbackImage ? testUserImage : user?.photoURL}
                  // src="../assets/icons/user.svg"
                  onError={() => {
                    console.log("Error happened while fetching the image");
                    setErrorInImg(true);
                  }}
                  alt="Your profile photo"
                  width="30"
                  height="30"
                  style={{
                    borderColor: showFallbackImage ? "transparent" : "",
                  }}
                  className="border-2 border-[var(--main-light)] rounded-sm text-xs"
                />
              </Link>
              <LogoutButton />
            </span>
          </li>
        )}
      </ul>
    </nav>
  );
}
