import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Post, User } from "@prisma/client";

export const PostCard = ({
  posts,
  post,
  index,
  user,
}: {
  posts: Post[];
  post: Post;
  index: number;
  user: User | undefined;
}) => {
  let parentPostIndex;
  if (post.parentId) {
    const parentId = post.parentId;
    parentPostIndex = posts.findIndex((post) => post.id === parentId) + 1;
  }

  return (
    <div className="bg-gray-300 dark:bg-gray-700 rounded shadow-md p-2 hover:bg-gray-200 hover:dark:bg-gray-600 transition-all duration-300">
      <div className="flex justify-between">
        <div>
          <span>{index}</span>
          {parentPostIndex && <span>{` << ${parentPostIndex}`}</span>}
          <Button variant="ghost">
            <Link href={`/profile/${user?.email}`}>{user?.name}</Link>
          </Button>
        </div>
        <span>{post.createdAt.toLocaleDateString()}</span>
      </div>
      <div className="text-2xl font-bold">{post.content}</div>
    </div>
  );
};
