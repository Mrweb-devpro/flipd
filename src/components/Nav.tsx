import { useState } from "react";
import { Link } from "react-router-dom";
import type { User } from "firebase/auth";

import { useAuthUser } from "../hooks/useAuthUser";

import LogoutButton from "./button/LogoutButton";
import testUserImage from "/src/assets/images/test-user.png";
import NotificationBellButton from "./notifications/NotificationBellButton";
import Logo from "./Logo";

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
                <h2 className="hidden md:inline-block">{user?.displayName}</h2>
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
              {location.pathname !== "/login" &&
                location.pathname !== "/sign-up" && <NotificationBellButton />}
              <span className="hidden md:inline-block">
                <LogoutButton onlyIcon={true} />
              </span>
            </span>
          </li>
        )}
      </ul>
    </nav>
  );
}
