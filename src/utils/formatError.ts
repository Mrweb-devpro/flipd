import type { FirebaseError } from "firebase/app";
import type { ZodError } from "zod";

export function formatFirbaseError(error: FirebaseError) {
  const newMessage = error?.message
    ?.slice(17, -2)
    .replaceAll("/", " ")
    .replace("auth", "")
    .replaceAll("-", " ");

  const errorCodeMessage = error?.code?.split("/").at(-1)?.replaceAll("-", " ");

  if (errorCodeMessage === "email already in use")
    return "Email is Already in use.";
  if (errorCodeMessage === "weak password")
    return " Password is too weak try adding numbers and special charaters(like ., %, $, -,)";
  if (errorCodeMessage === "network request failed")
    return "Please check you internet connection and try again";
  if (errorCodeMessage === "operation not allowed")
    return "Verify the new email before changing email";

  return errorCodeMessage;
}

export function formatZodErrors(zodErrors: ZodError) {
  return Object.entries(zodErrors.flatten().fieldErrors).reduce(
    (prev, [key, arrValue]) => {
      return {
        ...prev,
        // [key]: (arrValue as string[]).join("<br/>"),
        [key]: arrValue as string[],
      };
    },
    {}
  );

  // return z
  //   .prettifyError(zodErrors)
  //   .split("\n")
  //   .reduce((prev, curr, i, arr) => {
  //     if (!curr.includes("at")) {
  //       return {
  //         ...prev,
  //         [`${arr[i + 1].replaceAll("→ at ", "")}`.trimStart()]: curr,
  //       };
  //     }
  //     return prev;
  //   }, {});
}
