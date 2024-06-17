import CollectionCard from "@/components/CollectionCard";
import CreateCollectionBtn from "@/components/CreateCollectionBtn";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { Suspense } from "react";

export default async function Home() {
  const user = await currentUser();

  if (!user) {
    return <div>can't find username, please log in</div>;
  }
  return (
    <div className="flex flex-col">
      <div className="text-4xl font-bold">
        Welcome,,
        <br /> {user.username}
      </div>
      <div className="mt-12">
        <Suspense fallback={<div>Loading ...</div>}>
          <CollectionList />
        </Suspense>
      </div>
    </div>
  );
}

async function CollectionList() {
  const user = await currentUser();
  const collections = await prisma.collection.findMany({
    include: {
      tasks: true,
    },
    where: {
      userId: user?.id,
    },
  });

  if (collections.length === 0) {
    return (
      <div className="flex flex-col gap-5">
        <Alert>
          <AlertTitle>There is no collections yet!!!</AlertTitle>
          <AlertDescription>you can create collection :x </AlertDescription>
        </Alert>
        <CreateCollectionBtn />
      </div>
    );
  }

  return (
    <>
      <CreateCollectionBtn />
      <div className="flex flex-col gap-4 mt-10">
        {collections.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>
    </>
  );
}
