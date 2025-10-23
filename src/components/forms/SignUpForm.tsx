import type { Dispatch, SetStateAction } from "react";
import * as z from "zod";

import { SignUpAction } from "../../actions/authActions";
import { formatZodErrors } from "../../utils/formatError";

const SignUpSchema = z
  .object({
    username: z
      .string("Username")
      .min(2, "Username must have a length greater than 1")
      .max(100)
      .trim(),
    email: z.string("Invalid Email").email(),
    bio: z.string().optional().default(""),
    password: z
      .string("Password is required")
      .min(4, "Password must be at least 4 characters long"),
    confirmPassword: z
      .string()
      .min(4, "Confirm password must be at least 4 characters long"),
    remember: z.string().nullish(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",

        message: "The password does not match",
        path: ["confirmPassword"],
      });
      console.log(ctx.issues);
    }
  });

export default function SignUpForm({
  children,
  setErrors,
  setIsLoading,
}: {
  children: React.ReactNode;
  setErrors: Dispatch<SetStateAction<{}>>;
  setIsLoading: (value: boolean) => void;
}) {
  //
  //-- handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const FormDataObj = new FormData(e.currentTarget as HTMLFormElement);
    const formDataValues = Object.fromEntries(FormDataObj);
    setErrors({});
    try {
      setIsLoading(true);
      const result = SignUpSchema.parse(formDataValues);
      await SignUpAction({ ...result, remember: !!result.remember });
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log(error);
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
