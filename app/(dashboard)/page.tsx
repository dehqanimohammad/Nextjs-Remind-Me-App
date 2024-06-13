import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();

  if (!user) {
    return <div>can't find username, please log in</div>;
  }
  return (
    <div className="flex w-full">
      <div className="text-4xl font-bold">
        Welcome,,
        <br /> {user.username}
      </div>
    </div>
  );
}
