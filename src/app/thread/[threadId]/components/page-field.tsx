"use client";

import { Session } from "next-auth";
import Link from "next/link";
import { useEffect, useState } from "react";

import { PlusIcon } from "@/components/icons/plus-icon";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { supabase } from "@/lib/db/supabase";
import { PostSortOrder } from "@/types";
import { ThreadHeaderData } from "@/types/thread";

import { PostList } from "./post/post-list";
import { PostListSkeleton } from "./post/post-list-skeleton";
import { ThreadHeader } from "./thread/thread-header";
import { ThreadHeaderSkeleton } from "./thread/thread-header-skeleton";

export const PageField = ({
  threadId,
  session,
}: {
  threadId: string;
  session: Session | null;
}) => {
  const [threadHeader, setThreadHeader] = useState<ThreadHeaderData | null>(
    null
  );
  const [sortOrder, setSortOrder] = useState<PostSortOrder>("oldest");

  useEffect(() => {
    if (threadId) {
      // fetchThreadHeader(); // Removed
      // fetchPosts(); // Removed
    }

    const channel = supabase.channel(`thread-page-${threadId}`);

    channel
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "Thread",
          filter: `id=eq.${threadId}`,
        },
        (payload) => {
          if (payload.eventType === "UPDATE") {
            // fetchThreadHeader(); // Removed
          }
          if (payload.eventType === "DELETE") {
            setThreadHeader(null);
            // router.push("/"); // Removed
          }
        }
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "Post",
          filter: `thread_id=eq.${threadId}`,
        },
        () => {
          // fetchPosts(); // Removed
        }
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "Tag",
        },
        () => {
          // fetchThreadHeader(); // Removed
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [threadId, sortOrder]);

  if (!threadHeader) {
    return (
      <div className="container mx-auto py-8">
        <ThreadHeaderSkeleton />
        <PostListSkeleton />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <ThreadHeader thread={threadHeader} user={session?.user} />
      <div className="flex justify-end mb-4">
        <ButtonGroup>
          <Button
            variant={sortOrder === "newest" ? "default" : "outline"}
            onClick={() => setSortOrder("newest")}
          >
            Newest
          </Button>
          <Button
            variant={sortOrder === "oldest" ? "default" : "outline"}
            onClick={() => setSortOrder("oldest")}
          >
            Oldest
          </Button>
          <Button
            variant={sortOrder === "most_replies" ? "default" : "outline"}
            onClick={() => setSortOrder("most_replies")}
          >
            Most Replies
          </Button>
        </ButtonGroup>
      </div>
      <PostList
        threadId={threadId}
        user={session?.user}
        sortOrder={sortOrder}
      />
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
