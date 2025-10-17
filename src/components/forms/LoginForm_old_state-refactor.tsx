import * as z from "zod";
import { loginAction } from "../../actions/authActions";
import { formatZodErrors } from "../../utils/formatError";
import type { ErrorType } from "../../pages/Login";
import { useAuthUser } from "../../hooks/useAuthUser";

const LoginSchema = z.object({
  email: z.string("Invalid Email").email(),
  password: z.string("Password is required").min(4, "Invalid password"),
  remember: z.string().nullish(),
});

export default function LoginForm({
  children,
  setErrors,
  setIsLoading,
}: {
  children: React.ReactNode;
  setErrors: (obj: ErrorType) => void;
  setIsLoading: (value: boolean) => void;
}) {
  const { refetch } = useAuthUser();
  //
  //-- handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const FormDataObj = new FormData(e.currentTarget);
    const formDataValues = Object.fromEntries(FormDataObj);

    setErrors({});
    try {
      setIsLoading(true);
      const result = LoginSchema.parse(formDataValues);
      await loginAction(result.email, result.password, !!result.remember);
      await refetch();
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((curr) => ({ ...curr, ...formatZodErrors(error) }));
      } else {
        setErrors((curr) => ({ ...curr, firebase: error }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit} //-- i used this instead becuase i still needed to retain the input fields values
      // action={formAction}
      className=" flex flex-col items-center justify-center gap-6 py-6 min-w-[500px] px-4 "
    >
      {children}
    </form>
  );
}

// const formAction = (formData: formData) => {
//   console.log(FormData.get("email"));
//   const email = FormDataObj.get("email");
//   const password = FormDataObj.get("password");
//   const remember = !!FormDataObj.get("remember");
//   console.log(email, password, remember);
// };
