import { Link } from "react-router-dom";
import UserIcon from "./icons/UserIcon";
import { formatDatePeriod } from "../utils/formatDate";

interface PostPropsType {
  time: string;
  username: string;
  imgURL?: string;
  post: string;
}

export default function Post({ time, username, imgURL, post }: PostPropsType) {
  const formatedDate = formatDatePeriod(time);

  return (
    <div className="flex flex-col gap-6 border-[1.5px] border-[var(--main)] p-3 rounded-xl w-full">
      <span className="flex justify-between items-center gap-4">
        <Link to={`/profile/${username}`} className="flex items-center gap-2">
          {imgURL ? (
            <img src={imgURL} alt={`${username} profile image`} />
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
