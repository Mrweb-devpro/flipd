import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsInfoSquare } from "react-icons/bs";

import Nav from "../components/Nav";
import OrLine from "../components/OrLine";
import Section from "../components/Section";
import HaveAccount from "../components/HaveAccount";
import FormInput from "../components/input/FormInput";
import FormTextarea from "../components/FormTextarea";
import EmailIcon from "../components/icons/EmailIcon";
import SignUpForm from "../components/forms/SignUpForm";
import UsernameIcon from "../components/icons/UsernameIcon";
import PasswordIcon from "../components/icons/PasswordIcon";
import FormRememberMe from "../components/input/FormRememberMe";
import GithubAuthButton from "../components/button/GithubAuthButton";
import GoogleAuthButton from "../components/button/GoogleAuthButton";
import AuthSubmitButton from "../components/button/AuthSubmitButton";

import { formatFirbaseError } from "../utils/formatError";
import { useAuthUser } from "../hooks/useAuthUser";

export interface ErrorType {
  username?: string;
  email?: string;
  bio?: string;
  password?: string;
  confirmPassword?: string;
  firebase?: string;
}

export default function SignUp() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<ErrorType>({});
  const [remember, setRemember] = useState<boolean>(false);

  const navigate = useNavigate();

  // custom hook !!
  const { data: user } = useAuthUser();

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  return (
    <Section>
      <Nav />

      <SignUpForm setErrors={setErrors} setIsLoading={setIsLoading}>
        <Heading1>Sign Up</Heading1>
        <p className="text-stone-400 text-center">
          Welcome to flipd, create an now account to connect with world.
        </p>
        <div className="flex w-full flex-col gap-3">
          <GoogleAuthButton />
          <GithubAuthButton />
        </div>
        <OrLine />

        <div className="flex flex-col items-center justify-center gap-6 w-full">
          <FormInput
            error={errors.username}
            id="username"
            Icon={UsernameIcon}
            placeholder="Ex.James john"
            title="Username"
          />

          <FormInput
            type="email"
            error={errors.email}
            id="email"
            Icon={EmailIcon}
            placeholder="Ex.example@gmail.com"
            title="Email"
          />

          <FormInput
            type="password"
            error={errors.password}
            id="password"
            Icon={PasswordIcon}
            placeholder="xxxxxxxxxxxx"
            title="Password"
          />
          <FormInput
            type="password"
            error={errors.confirmPassword}
            id="confirmPassword"
            Icon={PasswordIcon}
            placeholder="xxxxxxxxxxxx"
            title="Confirm Password"
          />

          <FormTextarea
            error={errors.bio}
            id="bio"
            Icon={BsInfoSquare}
            placeholder="Type something..."
            title="Add Bio"
          />

          <FormRememberMe remember={remember} setRemember={setRemember} />

          {errors.firebase && (
            <i className="text-red-500 text-center">
              {formatFirbaseError(errors.firebase as never)}
            </i>
          )}
          <HaveAccount href="/login" linkText="Login">
            Already have an account?
          </HaveAccount>
          {/* <AuthSubmitButton isLoading={isLoading}>Next {">"}</AuthSubmitButton> */}

          <AuthSubmitButton isLoading={isLoading}>
            Create Account
          </AuthSubmitButton>
        </div>
      </SignUpForm>
    </Section>
  );
}

function Heading1({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-[var(--main-light)] font-bold text-3xl">{children}</h1>
  );
}
