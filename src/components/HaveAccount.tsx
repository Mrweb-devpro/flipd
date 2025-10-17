import { Link } from "react-router-dom";

export default function HaveAccount({
  children,
  href,
  linkText,
}: {
  children: React.ReactNode;
  linkText: string;
  href: "/login" | "/sign-up";
}) {
  return (
    <p className="text-sm text-stone-600">
      {children}{" "}
      <Link to={href} className="text-[var(--main)]">
        {linkText}
      </Link>
    </p>
  );
}
