import { BiSearch } from "react-icons/bi";
import { useSearchedUsers } from "../hooks/useSearchedUsers";
import { type FormEvent } from "react";

export default function Search() {
  // const [search, setSearch] = useState("");
  const { search: searchUsers } = useSearchedUsers();

  const handlesubmit = (e: FormEvent) => {
    e.preventDefault();
    const search = new FormData(
      e.currentTarget as HTMLFormElement | undefined
    ).get("search");
    searchUsers(search as string);
  };

  return (
    <form
      onSubmit={handlesubmit}
      className="flex justify-between items-center gap-4 border-2 border-[var(--main)] w-full px-5 rounded-sm py-2 h-fit"
    >
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Search for a user..."
        className="w-full h-full outline-none"
      />
      <button className="flex bg-[var(--main)] text-stone-100 items-center gap-3 px-3 py-2 rounded-sm">
        <BiSearch /> Search
      </button>
    </form>
  );
}
