import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Loader from "../components/Loader";
import Section from "../components/Section";
import { useStoreUser } from "../hooks/useStoreUsers";
import { usePost } from "../hooks/usePost";

import UserProfileButton from "../components/button/UserProfileButton";
import AboutUser from "../components/AboutUser";
import { BiShare } from "react-icons/bi";

type TabType = "post" | "about";

export default function UserProfile() {
  //-- hooks
  const { username } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const tabParams = searchParams.get("tab");

  //--  custom_hooks
  const posts = usePost();
  const [{ data: user, isPending }, authUserStore] = useStoreUser(username);
  const { data: currentAuthUser } = authUserStore;

  //-- utils
  const allUsersPost = posts.filter((post) => user?.posts?.includes(post.time));
  const colorObj = (tab: TabType) => {
    if (tabParams === null && tab === "post") return { color: "var(--main)" };

    return {
      color: tabParams === tab ? "var(--main)" : "",
    };
  };

  const isBlocked = currentAuthUser?.blocked?.includes(user?.user_id);
  const isFriends = currentAuthUser?.friends?.includes(user?.user_id);

  console.log(user);
  //-- Loading page
  if (isPending) return <Loader />;

  return (
    <Section>
      <div className=" relative flex flex-col items-center gap-10 p-5 w-full bg-green-50">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="self-start hover:bg-[var(--main)] hover:text-stone-100 py-2 px-3 text-stone-600 rounded-sm "
        >
          ← go back
        </button>
        <div className="flex flex-col gap-2">
          <img
            src={user?.photoURL || "/test-user.png"}
            alt=""
            className="md:w-56 w-40 md:h-56 h-40 rounded-2xl"
          />
          <h2 className="font-bold text-xl text-[var(--main)] text-center">
            {user.username}
          </h2>
          <p className="text-center text-stone-600 text-sm">
            {user?.friends.length} friends
          </p>
        </div>

        <div className="flex gap-4">
          {isBlocked || isFriends || (
            <UserProfileButton action="add_friend" user={user}>
              Add friend
            </UserProfileButton>
          )}
          {isBlocked ||
            (isFriends && (
              <UserProfileButton action="unfriend" user={user}>
                Unfriend
              </UserProfileButton>
            ))}
          {isBlocked || (
            <UserProfileButton action="block_friend" user={user}>
              block friend
            </UserProfileButton>
          )}
          {isBlocked && (
            <UserProfileButton action="unblock_friend" user={user}>
              Unblock friend
            </UserProfileButton>
          )}

          {isBlocked || (
            <UserProfileButton action="share" user={user}>
              <BiShare />
              Share
            </UserProfileButton>
          )}
        </div>

        <ul className="flex gap-5 border-t border-stone-400/70 w-full">
          <li>
            <button
              onClick={() => setSearchParams("?tab=post")}
              style={colorObj("post")}
              className="p-3 underline inline-block underline-offset-8 text-stone-600 decoration-current"
            >
              Post
            </button>
          </li>
          <li>
            <button
              onClick={() => setSearchParams("?tab=about")}
              style={colorObj("about")}
              className="p-3 underline inline-block underline-offset-8 text-stone-600 decoration-current"
            >
              About
            </button>
          </li>
        </ul>
      </div>
      <main className="flex flex-col gap-5 items-center p-5 bg-green-50 rounded-lg w-[96%] ">
        <article className="flex flex-col w-full gap-2">
          {tabParams === "about" ? (
            <blockquote>
              <AboutUser user={user} numOfPosts={allUsersPost.length} />
            </blockquote>
          ) : (
            <>
              {allUsersPost.map((post) => (
                <blockquote
                  key={post.time}
                  className="flex flex-col gap-4 bg-green-200/60 w-full px-4 py-6 rounded-lg border border-transparent hover:border-green-500 "
                >
                  <div className="flex  gap-4">
                    <img
                      src={user?.photoURL}
                      className="w-10 h-10 rounded-full"
                      alt=""
                    />
                    <span className="flex flex-col">
                      <h3 className="font-bold text-sm">{user.username}</h3>
                      <p className="text-sm text-green-400">
                        {new Date(post.time).toDateString()}
                      </p>
                    </span>
                  </div>
                  <div className="text-stone-600 text-sm leading-6">
                    {post.content}
                  </div>
                </blockquote>
              ))}
            </>
          )}
        </article>
      </main>
    </Section>
  );
}
