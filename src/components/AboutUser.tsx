export default function AboutUser({
  user,
  numOfPosts,
}: {
  numOfPosts: number;
}) {
  console.log(user);
  return (
    <ul className="flex flex-col text-stone-600">
      <ListItem title={"Username:"}> {user.username}</ListItem>
      <ListItem title={"Bio:"}>
        {user.bio ? (
          user.bio
        ) : (
          <i className="text-xs line-through text-stone-400 font-normal">
            empty
          </i>
        )}
      </ListItem>
      <ListItem title={"Last Active:"}> now</ListItem>
      <ListItem title={"Total number of posts:"}> {numOfPosts}</ListItem>
      <ListItem title={"Joined on:"}>
        {new Date(user.createdAt).toDateString()}
      </ListItem>
    </ul>
  );
}

function ListItem({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <li className="flex ">
        <h2 className="font-medium">{title}</h2>
        <i>
          <strong className="text-[var(--main)">{children}</strong>
        </i>
      </li>
      <br />
    </>
  );
}
