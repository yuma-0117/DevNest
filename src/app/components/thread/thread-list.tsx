"use client";

import { useEffect, useState } from "react";

import { fetchAllThreadsAction } from "@/lib/actions/thread";
import { ThreadWithUserAndTags } from "@/types";

import { ThreadCard } from "./thread-card";
import { ThreadCardSkeleton } from "./thread-card-skeleton";

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