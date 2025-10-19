import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import Section from "../components/Section";
import { PostProvider } from "../context/PostProvider";
import NotificationDropDown from "../components/notifications/NotificationDropDown";
import useNotifications from "../hooks/useNotifications";

export default function Dashboard() {
  const { isOpen } = useNotifications();

  return (
    <PostProvider>
      <Section>
        <Nav />
        {isOpen && (
          <span className="relative w-full">
            <NotificationDropDown />
          </span>
        )}
        <Outlet />
      </Section>
    </PostProvider>
  );
}
