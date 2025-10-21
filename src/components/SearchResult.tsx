import { Link } from "react-router-dom";
import { useSearchedUsers } from "../hooks/useSearchedUsers";
import UserIcon from "./icons/UserIcon";
// import { IoAddOutline } from "react-icons/io5";

export default function SearchResult() {
  const { data, isLoading } = useSearchedUsers();
  console.log(data);
  return (
    <>
      <h2>Search Result ({data.length})</h2>

      <ul className="w-full space-y-1">
        {data?.map((userObj) => (
          <li className="flex bg-green-500/10 hover:bg-green-500/30 w-full px-4 py-3 justify-between text-stone-800">
            <Link
              to={`/profile/${userObj.username}`}
              className="flex items-center gap-2 "
            >
              {userObj.photoURL ? (
                <img src={userObj.photoURL} alt="" className="w-8 rounded-sm" />
              ) : (
                <UserIcon size="30" />
              )}
              <h4 className="text-sm font-bold">{userObj.username}</h4>
            </Link>
            {/* <button type="button">
              <IoAddOutline / >
              add
            </button> */}
          </li>
        ))}
      </ul>
    </>
  );
}
