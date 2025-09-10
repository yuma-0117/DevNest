import Link from "next/link";

import { prisma } from "@/lib/db/prisma";
import { Post } from "@prisma/client";
import { Button } from "@/components/ui/button";

export const PostCard = async ({
  posts,
  post,
  index,
}: {
  posts: Post[];
  post: Post;
  index: number;
}) => {
  const user = await prisma.user.findFirst({ where: { id: post.authorId } });

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
        <span>{`${post.createdAt.getFullYear()}/${post.createdAt.getMonth()}/${post.createdAt.getDate()} ${post.createdAt.getHours()}:${post.createdAt.getMinutes()}`}</span>
      </div>
      <div className="text-2xl font-bold">{post.content}</div>
    </div>
  );
};
