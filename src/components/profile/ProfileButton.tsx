export default function ProfileButton({
  children,
  handleClick = () => {},
  isSaving,
  type = "edit",
}: {
  children: React.ReactNode;
  handleClick?: () => void;
  type?: "save" | "edit" | "cancel";
  isSaving: boolean;
}) {
  return (
    <button
      type={type === "save" ? "submit" : "button"}
      // onClick={handleClick}
      onClick={(e) => {
        if (type !== "save") e.preventDefault();
        handleClick();
      }}
      disabled={isSaving}
      className={
        type === "cancel"
          ? "border border-red-500 text-red-500 flex hover:bg-red-500 items-center gap-1 py-2 px-5 hover:text-stone-100 rounded-sm disabled:bg-stone-700"
          : "bg-[var(--main)]  flex items-center gap-1 py-2 px-5 text-stone-100 rounded-sm disabled:bg-stone-700"
      }
    >
      {children}
    </button>
  );
}
