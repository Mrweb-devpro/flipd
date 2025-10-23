import type { ChangeEvent } from "react";

export default function UserDetailCont({
  title,
  content,
  isEditMode,
  Icon,
  handleChange = () => {},
}: {
  title: string;
  content: string;
  isEditMode?: boolean;
  Icon: React.ReactNode;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  // console.log(value);
  // const [inpValue, setInpValue] = useState(content);
  const idAndName = title.toLowerCase();

  return (
    <li className="flex items-center justify-center gap-2">
      {Icon}
      <span className="flex flex-col gap-1.5">
        <label htmlFor={idAndName} className="text-sm text-stone-600">
          {title}
        </label>

        {isEditMode && (
          <input
            type={idAndName === "email" ? "email" : "text"}
            id={idAndName}
            name={idAndName}
            onChange={handleChange}
            className="border border-[var(--main)] rounded-sm bg-stone-100 px-2 text-sm py-1 w-64 "
          />
        )}
        {isEditMode ? (
          <p className="text-xs text-stone-400">Old: {content}</p>
        ) : (
          <p
            style={{
              fontStyle: content === "Empty" ? "italic" : "",
              textDecoration: content === "Empty" ? "line-through" : "",
            }}
            className="font-semibold text-sm text-stone-600"
          >
            {content}
          </p>
        )}
      </span>
    </li>
  );
}
