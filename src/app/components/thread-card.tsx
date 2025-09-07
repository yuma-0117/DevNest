import { prisma } from "@/lib/db/prisma";
import { Thread } from "@prisma/client";

export const ThreadCard = async ({ thread }: { thread: Thread }) => {
  const user = await prisma.user.findFirst({ where: { id: thread.authorId } });

  return (
    <div className="flex flex-col space-y-2 bg-gray-200 dark:bg-gray-800 p-3 box-border border-l-8 border-l-blue-200 dark:border-l-blue-700 rounded shadow-md hover:bg-gray-300 hover:dark:bg-gray-700">
      <span className="text-2xl font-bold">{thread.title}</span>
      <div className="flex items-center justify-between pr-4 pl-4">
        <span>{user?.name}</span>
        <span>{`${thread.createdAt.getFullYear()}/${thread.createdAt.getMonth()}/${thread.createdAt.getDate()}`}</span>
      </div>
    </div>
  );
};
