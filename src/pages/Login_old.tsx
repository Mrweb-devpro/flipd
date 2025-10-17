import FacebookAuthButton from "../components/button/GithubAuthButton";
import GoogleAuthButton from "../components/button/GoogleAuthButton";
import PasswordIcon from "../components/icons/PasswordIcon";
import EmailIcon from "../components/icons/EmailIcon";
import Nav from "../components/Nav";

import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/forms/LoginForm";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { NoRememberStorageKey } from "../actions/authActions";
import { formatFirbaseError } from "../utils/formatError";
import { CiCircleAlert } from "react-icons/ci";
import Section from "../components/Section";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // custom hook !!
  const { user } = useAuth();
  const { storageHasItem } = useLocalStorage();

  if (user) navigate("/");

  console.log(user);

  return (
    <Section>
      <Nav />

      <LoginForm
        formData={{ email, password, remember }}
        setError={setError}
        setIsLoading={setIsLoading}
      >
        <h1 className="text-[var(--main-light)] font-bold text-3xl">Login</h1>
        <p className="text-stone-400">
          Welcome Back, Login now to continue Exploring
        </p>
        <div className="flex w-full flex-col gap-3">
          <GoogleAuthButton />
          <FacebookAuthButton />
        </div>
        {/*  */}
        <div className="flex gap-6 w-full items-center text-stone-500">
          <span className="w-full h-0.5 bg-stone-200 block"></span>
          <p>Or</p>
          <span className="w-full h-0.5 bg-stone-200 block"></span>
        </div>
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

        {/*  */}
        <div className="flex flex-col items-center gap-6 w-full">
          <div className="flex gap-4 items-center w-full justify-center">
            <EmailIcon size="36" />
            <span className="w-full">
              <label
                htmlFor="email"
                className="text-stone-600 flex items-center gap-1"
              >
                Email <i className="text-red-500">*</i>
              </label>
              <input
                type="text"
                autoComplete="off"
                id="email"
                required
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#F6F9F7] border rounded-sm border-[var(--main-light)]  px-4 py-2 w-full max-w-[380px]"
              />
            </span>
          </div>

          <div className="flex gap-4 items-center w-full justify-center">
            <PasswordIcon size="40" />
            <span className="w-full">
              <label
                htmlFor="password"
                className="text-stone-600 flex items-center gap-1"
              >
                Password<i className="text-red-500">*</i>
              </label>
              <input
                type="password"
                id="password"
                required
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[#F6F9F7] border rounded-sm border-[var(--main-light)]  px-4 py-2 w-full max-w-[380px]"
              />
            </span>
          </div>

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
              {remember && (
                <FaCheck size="13" className="text-[var(--main-light)]" />
              )}
            </label>
            <label htmlFor="remember" className="text-stone-600">
              Remember me
            </label>
          </span>
          <i className="text-red-500">{formatFirbaseError(error)}</i>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-[var(--main)] disabled:bg-stone-600 border rounded-sm border-[var(--main-light)]  px-4 py-2 w-fit text-white"
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </div>
      </LoginForm>
    </Section>
  );
}
