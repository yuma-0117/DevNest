"use client";

import { Session } from "next-auth";
import Link from "next/link";
import { useEffect, useState } from "react";

import { PlusIcon } from "@/components/icons/plus-icon";
import { Button } from "@/components/ui/button";
import { ThreadPageData } from "@/types";

import { PostList } from "./post/post-list";
import { ThreadHeader } from "./thread/thread-header";
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
      const thread = await fetchThreadByIdAction(threadId);
      setThread(thread);
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
    return <div>Loading thread...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <ThreadHeader thread={thread} user={session?.user} />
      <PostList posts={thread.posts} user={session?.user} />
      <Link
        href={`/thread/${threadId}/post/create`}
        className="fixed bottom-3 right-3"
      >
        <Button className="rounded-full size-14" asChild>
          <PlusIcon />
        </Button>
      </Link>
    </div>
  );
};
