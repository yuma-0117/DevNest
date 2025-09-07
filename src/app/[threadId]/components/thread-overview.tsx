import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Thread, User } from "@prisma/client";

export const ThreadOverview = ({
  thread,
  user,
}: {
  thread: Thread;
  user: User;
}) => {
  return (
    <div className="flex flex-col bg-gray-200 dark:bg-gray-800 p-2 space-y-3 rounded shadow-md">
      <div className="flex justify-between">
        <span className="text-3xl font-bold">{thread?.title}</span>
        <span className="self-end mr-3">{`${thread?.createdAt.getFullYear()}/${thread?.createdAt.getMonth()}/${thread?.createdAt.getDate()}`}</span>
      </div>
      <div className="p-2">{thread?.content}</div>
      <div>
        <Button variant="ghost">
          <Link href={`/profile/${user?.id}`}>{user?.name}</Link>
        </Button>
      </div>
    </div>
  );
};
