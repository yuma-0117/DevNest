import Link from "next/link";

import { Thread, User } from "@prisma/client";

export const ThreadCard = ({
  thread,
  user,
}: {
  thread: Thread;
  user: User | undefined;
}) => {
  return (
    <Link
      href={thread.id}
      className="flex flex-col space-y-2 bg-gray-200 dark:bg-gray-800 p-3 box-border border-l-8 border-l-blue-200 dark:border-l-blue-700 rounded shadow-md hover:bg-gray-300 hover:dark:bg-gray-700 transition-all duration-300"
    >
      <div className="flex items-center justify-between pr-4">
        <span className="text-2xl font-bold">{thread.title}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {new Date(thread.createdAt).toLocaleDateString()}
        </span>
      </div>
      <div className="flex items-center justify-between p-2">
        <span className="font-semibold text-blue-600 dark:text-blue-400">
          {user?.name ? user.name : "Unknown User"}
        </span>
      </div>
    </Link>
  );
};
