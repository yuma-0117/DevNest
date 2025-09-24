"use client";

import { useEffect, useState } from "react";

import { fetchAllThreadsAction } from "@/lib/actions/thread";
import { ThreadWithUserAndTags } from "@/types";

import { ThreadCard } from "./thread-card";
import { ThreadCardSkeleton } from "./thread-card-skeleton";
import { supabase } from "@/lib/db/supabase";

export const ThreadList = () => {
  const [threads, setThreads] = useState<ThreadWithUserAndTags[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllThreads = async () => {
      setLoading(true);
      const threads = await fetchAllThreadsAction();
      setThreads(threads);
      setLoading(false);
    };
    fetchAllThreads();

    const subscription = supabase
      .channel("thread")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Thread" },
        async (payload) => {
          if (payload.eventType === "DELETE") return;
          await fetchAllThreads();
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Tag" },
        async (payload) => {
          if (payload.eventType === "DELETE") return;
          await fetchAllThreads();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {[...Array(6)].map((_, i) => (
          <ThreadCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
      {threads.map((thread) => (
        <ThreadCard key={thread.id} thread={thread} />
      ))}
    </div>
  );
};
