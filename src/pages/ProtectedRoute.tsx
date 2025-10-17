import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthUser } from "../hooks/useAuthUser";
import Loader from "../components/Loader";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const { data: user, isLoading } = useAuthUser(); // load the authenticated user

  useEffect(() => {
    if (user === undefined) return; // if reactQuery hasn't processed the user state
    if (!user && !isLoading) {
      const isNotAuthPage =
        location.pathname !== "/login" && location.pathname !== "/sign-up";

      return navigate(
        "/login" + (isNotAuthPage ? `?fallback_URL=${location.pathname}` : "")
      ) as void; // if the user is not authenicated
    }
  }, [user, navigate, isLoading]);

  if (isLoading) return <Loader />; // Show loading-skeleton on loading state

  if (user) return <>{children}</>; // Show the dashboard if the user is signed-in
}
