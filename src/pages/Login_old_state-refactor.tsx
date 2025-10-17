// utils
import { formatFirbaseError } from "../utils/formatError";

// components
import GithubAuthButton from "../components/button/GithubAuthButton";
import GoogleAuthButton from "../components/button/GoogleAuthButton";
import AuthSubmitButton from "../components/button/AuthSubmitButton";
import FormRememberMe from "../components/input/FormRememberMe";
import LogStatusMessage from "../components/LogStatusMessage";
import PasswordIcon from "../components/icons/PasswordIcon";
import LoginForm from "../components/forms/LoginForm";
import FormInput from "../components/input/FormInput";
import EmailIcon from "../components/icons/EmailIcon";
import Section from "../components/Section";
import OrLine from "../components/OrLine";
import Nav from "../components/Nav";

// React
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//custom hooks
import { useAuthUser } from "../hooks/useAuthUser";
import HaveAccount from "../components/HaveAccount";

// Types
export interface ErrorType {
  email?: string;
  password?: string;
  firebase?: string;
}

export default function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<ErrorType>({});
  const [remember, setRemember] = useState<boolean>(false);

  const navigate = useNavigate();

  // custom hooks !!
  const { data: user } = useAuthUser();

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  return (
    <Section>
      <Nav />

      <LoginForm setErrors={setErrors} setIsLoading={setIsLoading}>
        <h1 className="text-[var(--main-light)] font-bold text-3xl">Login</h1>
        <p className="text-stone-400">
          Welcome Back, Login now to continue Exploring
        </p>
        <div className="flex w-full flex-col gap-3">
          <GoogleAuthButton />
          <GithubAuthButton />
        </div>
        {/*  */}
        <OrLine />
        <LogStatusMessage />

        {/*  */}
        <div className="flex flex-col items-center gap-6 w-full">
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

          <FormRememberMe remember={remember} setRemember={setRemember} />

          {errors.firebase && (
            <i className="text-red-500">
              {formatFirbaseError(errors.firebase as never)}
            </i>
          )}
          <HaveAccount href="/sign-up" linkText="SignUp">
            Don't have an account?
          </HaveAccount>
          <AuthSubmitButton isLoading={isLoading}>Login</AuthSubmitButton>
        </div>
      </LoginForm>
    </Section>
  );
}
