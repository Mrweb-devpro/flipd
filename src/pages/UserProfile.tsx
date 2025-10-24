import { Suspense, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { BiShare } from "react-icons/bi";

import Loader from "../components/Loader";
import Section from "../components/Section";
import testUserImage from "/src/assets/images/test-user.png";
import UserProfileButton from "../components/button/UserProfileButton";
import GoBackButton from "../components/button/GoBackButton";

// custom hooks
import { useAuthUserStore } from "../hooks/useAuthUserStore";
import { useStoreUser } from "../hooks/useStoreUsers";

import { friendStatus } from "../actions/profileAction";
import ProfileAboutAndPosts from "../components/profile/ProfileAboutAndPosts";

export default function UserProfile() {
  //-- hooks
  const naviagate = useNavigate();
  const { username } = useParams();
  const [searchParams] = useSearchParams();

  const tabParams = searchParams.get("tab");

  //--  custom_hooks
  const { data: user, isPending } = useStoreUser(username as string);
  const { data: currentAuthUser } = useAuthUserStore();

  if (!isPending && !user)
    throw new Error(`The User With The Username: ${username}. Does not exist`);

  //-- useEffects;
  useEffect(() => {
    if (!currentAuthUser || !user) return;
    if (currentAuthUser.username === user.username)
      naviagate("/profile", { replace: true });
  }, [currentAuthUser, user]);

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

        <ProfileAboutAndPosts.Buttons
          isBlocked={isBlocked}
          tabParams={tabParams}
        />
      </div>

      <ProfileAboutAndPosts
        showButtons={false}
        isBlocked={isBlocked}
        user={user}
      />
    </Section>
  );
}
