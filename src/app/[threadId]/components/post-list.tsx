"use client";

import { Dispatch, useEffect, useState } from "react";

import { fetchAllUsersAction } from "@/app/actions";
import { supabase } from "@/lib/db/supabase";
import { Post, User } from "@prisma/client";

import { fetchAllPostsAction } from "../actions";
import { PostCard } from "./post-card";

export const PostList = ({
  threadId,
  sessionUserId,
  posts,
  setPosts,
  setEditingPost,
}: {
  threadId: string;
  sessionUserId: string | undefined;
  posts: Post[];
  setPosts: Dispatch<React.SetStateAction<Post[]>>;
  setEditingPost: Dispatch<React.SetStateAction<number | false>>;
}) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      const posts = await fetchAllPostsAction(threadId);
      if (!posts) return;
      setPosts(posts);
    };

    const fetchAllUsers = async () => {
      const users = await fetchAllUsersAction();
      if (!users) return;
      setUsers(users);
    };

    fetchAllPosts();
    fetchAllUsers();

    const subscription = supabase
      .channel("post-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "posts" },
        async () => {
          fetchAllPosts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [threadId, setPosts]);

  return (
    <div className="space-y-2">
      {posts.map((post, index) => (
        <PostCard
          key={post.id}
          posts={posts}
          post={post}
          index={index + 1}
          user={users.find((user) => user.id === post.authorId)}
          sessionUserId={sessionUserId}
          setEditingPost={setEditingPost}
        />
      ))}
    </div>
  );
};
