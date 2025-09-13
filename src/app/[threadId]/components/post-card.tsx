import Link from "next/link";
import { Dispatch } from "react";

import { Button } from "@/components/ui/button";
import { Post, User } from "@prisma/client";
import { deletePostAction } from "../actions";

export const PostCard = ({
  posts,
  post,
  index,
  user,
  sessionUserId,
  setEditingPost,
}: {
  posts: Post[];
  post: Post;
  index: number;
  user: User | undefined;
  sessionUserId: string | undefined;
  setEditingPost: Dispatch<React.SetStateAction<number | false>>;
}) => {
  let parentPostIndex;
  if (post.parentId) {
    const parentId = post.parentId;
    parentPostIndex = posts.findIndex((post) => post.id === parentId) + 1;
  }

  const handleDelete = async () => {
    await deletePostAction(post.id);
  };

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
      <div className="flex items-center justify-between mt-2">
        <span className="text-2xl font-bold">{post.content}</span>
        {sessionUserId === post.authorId && (
          <div className="flex space-x-2">
            <Button onClick={() => setEditingPost(index)}>Edit</Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
