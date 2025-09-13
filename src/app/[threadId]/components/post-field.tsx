"use client";

import { useState } from "react";

import { Post } from "@prisma/client";

import { PostForm } from "./post-form";
import { PostList } from "./post-list";

export const PostField = ({
  threadId,
  sessionUserId,
}: {
  threadId: string;
  sessionUserId: string | undefined;
}) => {
  const [editingPost, setEditingPost] = useState<number | false>(false);
  const [posts, setPosts] = useState<Post[]>([]);

  return (
    <div>
      <PostList
        threadId={threadId}
        sessionUserId={sessionUserId}
        posts={posts}
        setPosts={setPosts}
        setEditingPost={setEditingPost}
      />
      {sessionUserId && (
        <div className="fixed bottom-0 w-screen p-2">
          <PostForm
            threadId={threadId}
            userId={sessionUserId}
            posts={posts}
            editingPost={editingPost}
            setEditingPost={setEditingPost}
          />
        </div>
      )}
    </div>
  );
};
