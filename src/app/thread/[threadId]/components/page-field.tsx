"use client";

import { Session } from "next-auth";
import Link from "next/link";
import { useEffect, useState } from "react";

import { PlusIcon } from "@/components/icons/plus-icon";
import { Button } from "@/components/ui/button";
import { ThreadPageData } from "@/types/thread";

import { PostList } from "./post/post-list";
import { PostListSkeleton } from "./post/post-list-skeleton";
import { ThreadHeader } from "./thread/thread-header";
import { ThreadHeaderSkeleton } from "./thread/thread-header-skeleton";
import { fetchThreadByIdAction } from "@/lib/actions/thread";
import { supabase } from "@/lib/db/supabase";

export const PageField = ({
  threadId,
  session,
}: {
  threadId: string;
  session: Session | null;
}) => {
  const [thread, setThread] = useState<ThreadPageData | null>(null);

  useEffect(() => {
    const fetchThreadById = async () => {
      const response = await fetchThreadByIdAction(threadId);
      if (response.success) {
        setThread(response.data);
      } else {
        console.error("Failed to fetch thread by ID:", response.error);
        setThread(null);
      }
    };

    if (threadId) {
      fetchThreadById();
    }

    const subscription = supabase
      .channel("post")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Thread" },
        async (payload) => {
          if (payload.eventType === "DELETE") return;
          await fetchThreadById();
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Post" },
        async (payload) => {
          if (payload.eventType === "DELETE") return;
          await fetchThreadById();
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Tag" },
        async (payload) => {
          if (payload.eventType === "DELETE") return;
          await fetchThreadById();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [threadId]);

  if (!thread) {
    return (
      <div className="container mx-auto py-8">
        <ThreadHeaderSkeleton />
        <PostListSkeleton />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <ThreadHeader thread={thread} user={session?.user} />
      <PostList posts={thread.posts} user={session?.user} />
      <Link
        href={`/thread/${threadId}/post/create`}
        className="fixed bottom-3 right-3"
      >
        <Button className="flex items-center justify-center rounded-full pr-4 shadow-lg bg-primary/70 backdrop-blur-lg border border-primary/50 hover:bg-primary/80">
          <PlusIcon className="mr-2 size-4" />
          New Post
        </Button>
      </Link>
    </div>
  );
};
