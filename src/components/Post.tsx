import { Link } from "react-router-dom";

import UserIcon from "./icons/UserIcon";
import { formatDatePeriod } from "../utils/formatDate";
import { useStoreUser } from "../hooks/useStoreUsers";

interface PostPropsType {
  time: string;
  username: string;
  post: string;
}
//
export default function Post({ time, username, post }: PostPropsType) {
  const formatedDate = formatDatePeriod(time);
  const { data: user } = useStoreUser(username);
  const imgURL = user.photoURL;

  return (
    <div className="flex flex-col gap-6 border-[1.5px] border-[var(--main)] p-3 rounded-xl w-full">
      <span className="flex justify-between items-center gap-4">
        <Link to={`/profile/${username}`} className="flex items-center gap-2">
          {imgURL ? (
            <img
              src={imgURL}
              alt={`${username} profile image`}
              className="w-7.5 border-2 border-[var(--main)] rounded-sm"
            />
          ) : (
            <UserIcon size="30" />
          )}

          <strong>
            <i className="text-stone-600">{username}</i>
          </strong>
        </Link>

        <p className="text-stone-500 text-xs">{formatedDate}</p>
      </span>
      <p className="text-stone-600">{post}</p>
    </div>
  );
}
