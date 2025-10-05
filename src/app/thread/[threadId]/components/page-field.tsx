"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";

import { PlusIcon } from "@/components/icons/plus-icon";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  fetchThreadHeaderAction,
  fetchPostsForThreadAction,
} from "@/lib/actions/thread";
import { supabase } from "@/lib/db/supabase";
import { PostWithUserAndTagsAndReplies, PostSortOrder } from "@/types/post";
import { ThreadHeaderData } from "@/types/thread";
import { useRouter } from "next/navigation";

import { PostList } from "./post/post-list";
import { PostListSkeleton } from "./post/post-list-skeleton";
import { ThreadHeader } from "./thread/thread-header";
import { ThreadHeaderSkeleton } from "./thread/thread-header-skeleton";
import { Session } from "next-auth";

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
  const [posts, setPosts] = useState<PostWithUserAndTagsAndReplies[]>([]);
  const [sortOrder, setSortOrder] = useState<PostSortOrder>("oldest");
  const router = useRouter();

  const fetchThreadHeader = useCallback(async () => {
    const response = await fetchThreadHeaderAction(threadId);
    if (response.success) {
      setThreadHeader(response.data);
    } else {
      console.error("Failed to fetch thread header:", response.error);
      setThreadHeader(null);
    }
  }, [threadId]);

  const fetchPosts = useCallback(async () => {
    const response = await fetchPostsForThreadAction(threadId, sortOrder);
    if (response.success) {
      setPosts(response.data);
    } else {
      console.error("Failed to fetch posts:", response.error);
    }
  }, [threadId, sortOrder]);

  useEffect(() => {
    if (threadId) {
      fetchThreadHeader();
      fetchPosts();
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
            fetchThreadHeader();
          }
          if (payload.eventType === "DELETE") {
            setThreadHeader(null);
            router.push("/");
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
          fetchPosts();
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
          fetchThreadHeader();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [threadId, fetchThreadHeader, fetchPosts, router, sortOrder]);

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
      <PostList posts={posts} user={session?.user} />
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
