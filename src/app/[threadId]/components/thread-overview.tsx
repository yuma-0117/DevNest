import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Thread, User } from "@prisma/client";

export const ThreadOverview = ({
  thread,
  user,
  sessionUserId,
}: {
  thread: Thread;
  user: User;
  sessionUserId?: string;
}) => {
  return (
    <div className="flex flex-col bg-gray-200 dark:bg-gray-800 p-2 space-y-3 rounded shadow-md">
      <div className="flex justify-between">
        <span className="text-3xl font-bold">{thread?.title}</span>
        <span className="self-end mr-3">
          {new Date(thread.createdAt).toLocaleDateString()}
        </span>
      </div>
      <div className="p-2">{thread?.content}</div>
      <div className="flex justify-between items-center">
        <Button variant="ghost">
          <Link href={`/profile/${user?.id}`}>{user?.name}</Link>
        </Button>
        {sessionUserId === thread?.authorId && (
          <Button
            variant="ghost"
            className="bg-green-500/20 hover:bg-green-500/30"
          >
            <Link href={`/${thread?.id}/edit`}>Edit</Link>
          </Button>
        )}
      </div>
    </div>
  );
};
