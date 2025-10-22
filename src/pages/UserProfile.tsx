import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { BiShare } from "react-icons/bi";

import Loader from "../components/Loader";
import Section from "../components/Section";
import AboutUser from "../components/AboutUser";
import testUserImage from "/src/assets/images/test-user.png";
import UserProfileButton from "../components/button/UserProfileButton";

// custom hooks
import { usePost } from "../hooks/usePost";
import { useStoreUser } from "../hooks/useStoreUsers";
import GoBackButton from "../components/button/GoBackButton";
import { Suspense, useEffect } from "react";
import { friendStatus } from "../actions/profileAction";

//-- Tab variable types
type TabType = "post" | "about";

export default function UserProfile() {
  //-- hooks
  const naviagate = useNavigate();
  const { username } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const tabParams = searchParams.get("tab");

  //--  custom_hooks
  const posts = usePost();
  const [{ data: user, isPending }, authUserStore] = useStoreUser(username);
  const { data: currentAuthUser } = authUserStore;

  if (!isPending && !user)
    throw new Error(`The User With The Username: ${username}. Does not exist`);

  // --useEffects;
  useEffect(() => {
    if (!currentAuthUser || !user) return;
    if (currentAuthUser.username === user.username)
      naviagate("/profile", { replace: true });
  }, [currentAuthUser, user]);

  //-- utils
  const allUsersPost = posts.filter((post) => user?.posts?.includes(post.time));
  const colorObj = (tab: TabType) => {
    if (tabParams === null && tab === "post") return { color: "var(--main)" };

    return {
      color: tabParams === tab ? "var(--main)" : "",
    };
  };

  const isBlocked = currentAuthUser?.blocked?.includes(user?.user_id);
  const isFriends = currentAuthUser?.friends?.some(({ id }: { id: string }) =>
    id.includes(user?.user_id)
  );

  const isFriendPending = currentAuthUser?.friends?.find(
    ({ id }: { id: string }) => id.includes(user?.user_id)
  )?.status;
  const isHisFriendPending = user?.friends?.find(({ id }: { id: string }) =>
    id.includes(currentAuthUser?.user_id)
  )?.status;
  //-- Loading page
  if (isPending) return <Loader />;

  return (
    <Section>
      <div className=" relative flex flex-col items-center gap-10 p-5 w-full bg-green-50">
        <GoBackButton url="/" />
        <div className="flex flex-col gap-2">
          <img
            src={(isBlocked ? false : user?.photoURL) || testUserImage}
            alt=""
            className="md:w-56 w-40 md:h-56 h-40 rounded-2xl"
          />
          <h2 className="font-bold text-xl text-[var(--main)] text-center">
            {isBlocked ? "user" : user.username}
          </h2>
          {isBlocked || (
            <p className="text-center text-stone-600 text-sm">
              {
                user?.friends?.filter(
                  (friend: { status: string }) =>
                    friend.status === friendStatus.accepted
                )?.length
              }{" "}
              friends
            </p>
          )}
        </div>

        <div className="flex gap-4 flex-wrap items-center justify-center">
          {isBlocked || isFriends || (
            <UserProfileButton action="add_friend" user={user}>
              {isHisFriendPending === friendStatus.pending
                ? "Accept Friend Request"
                : "Send Friend request"}
            </UserProfileButton>
          )}
          {isBlocked ||
            (isFriends && (
              <Suspense fallback={<Loader.MiniLoader />}>
                <UserProfileButton action="unfriend" user={user}>
                  {isFriendPending === friendStatus.pending
                    ? "Cancel Request"
                    : "UnFriend"}
                </UserProfileButton>
              </Suspense>
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

        {isBlocked || (
          <ul className="flex gap-5 border-t border-stone-400/70 w-full">
            <li>
              <button
                onClick={() => setSearchParams("?tab=post")}
                style={colorObj("post")}
                className="p-3 underline inline-block underline-offset-8 text-stone-600 decoration-current"
              >
                Posts
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
        )}
      </div>

      <main className="flex flex-col gap-5 items-center p-5 bg-green-50 rounded-lg w-[96%] ">
        {isBlocked || (
          <article className="flex flex-col w-full gap-2">
            {tabParams === "about" ? (
              <blockquote>
                <AboutUser user={user} numOfPosts={allUsersPost.length} />
              </blockquote>
            ) : (
              <>
                {!allUsersPost.length ? (
                  <blockquote className=" text-stone-400">
                    No post yet
                  </blockquote>
                ) : (
                  allUsersPost.map((post) => (
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
                  ))
                )}
              </>
            )}
          </article>
        )}
      </main>
    </Section>
  );
}
