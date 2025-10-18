import { useNavigate } from "react-router-dom";

export default function GoBackButton() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className="self-start hover:bg-[var(--main)] hover:text-stone-100 py-2 px-3 text-stone-600 rounded-sm "
    >
      ← go back
    </button>
  );
}
