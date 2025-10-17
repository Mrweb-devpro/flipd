import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import Section from "../components/Section";
import { PostProvider } from "../context/PostProvider";

export default function Dashboard() {
  return (
    <PostProvider>
      <Section>
        <Nav />
        <Outlet />
      </Section>
    </PostProvider>
  );
}
