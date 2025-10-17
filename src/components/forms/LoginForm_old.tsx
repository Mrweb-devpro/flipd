import { loginAction } from "../../actions/authActions";

export default function LoginForm({
  children,

  formData: { email, password, remember },
  setError,
  setIsLoading,
}: {
  children: React.ReactNode;
  setError: (value: string) => void;
  setIsLoading: (value: boolean) => void;
  formData: {
    email: string;
    password: string;
    remember: true | false;
  };
}) {
  //
  //-- hande form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() && !password.trim() && password.includes(" "))
      throw new Error("Invalid form data");

    setIsLoading(true);
    loginAction(email, password, remember)
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" flex flex-col items-center justify-center gap-6 pt-6 min-w-[500px] px-4"
    >
      {children}
    </form>
  );
}
