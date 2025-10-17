export default function AuthSubmitButton({
  children,
  isLoading,
  typeOf = "submit",
  onClick = () => {},
}: {
  children: React.ReactNode;
  isLoading: boolean;
  onClick?: () => void;
  typeOf?: "submit" | "reset" | "button" | undefined;
}) {
  return (
    <button
      onClick={onClick}
      type={typeOf}
      disabled={isLoading}
      className="bg-[var(--main)] disabled:bg-stone-600 border rounded-sm border-[var(--main-light)]  px-4 py-2 w-fit text-white"
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}
