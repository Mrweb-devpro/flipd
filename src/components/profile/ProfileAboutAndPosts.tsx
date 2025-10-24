import { useNavigate, useSearchParams } from "react-router-dom";

import { usePost } from "../../hooks/usePost";

import AboutUser from "../AboutUser";

import type { StoreUserType } from "../../types/DatabaseTypes";
import testUserImage from "/src/assets/images/test-user.png";
import type { DocumentData } from "firebase/firestore";

//-- Tab variable types
type TabType = "post" | "about";

export default function ProfileAboutAndPosts({
  user,
  isBlocked = false,
  showButtons = true,
}: {
  user: StoreUserType | DocumentData;
  showButtons?: true | false;
  isBlocked?: false | true;
}) {
  const [searchParams] = useSearchParams();
  const posts = usePost();

  const tabParams = searchParams.get("tab");
  console.log(tabParams);

  const allUsersPost = posts.filter((post) => user?.posts?.includes(post.id));

  return (
    <>
      {showButtons && (
        <ProfileAboutAndPosts.Buttons
          isBlocked={isBlocked}
          tabParams={tabParams}
        />
      )}
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
                          src={user?.photoURL ? user.photoURL : testUserImage}
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
    </>
  );
}

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
//-- BUTTONS
ProfileAboutAndPosts.Buttons = function ({
  isBlocked = false,
  tabParams,
}: {
  isBlocked: true | false;
  tabParams: string | null;
}) {
  const navigate = useNavigate();

  const colorObj = (tab: TabType) => {
    if (tabParams === null && tab === "post") return { color: "var(--main)" };

    return {
      color: tabParams === tab ? "var(--main)" : "",
    };
  };

  return (
    <>
      {isBlocked || (
        <ul className="flex gap-5 border-t border-stone-400/70 w-full">
          <li>
            <button
              onClick={() => navigate("?tab=post", { replace: true })}
              style={colorObj("post")}
              className="p-3 underline inline-block underline-offset-8 text-stone-600 decoration-current"
            >
              Posts
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("?tab=about", { replace: true })}
              style={colorObj("about")}
              className="p-3 underline inline-block underline-offset-8 text-stone-600 decoration-current"
            >
              About
            </button>
          </li>
        </ul>
      )}
    </>
  );
};
