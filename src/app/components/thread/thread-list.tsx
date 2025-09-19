"use client";

import { useEffect, useState } from "react";

import { fetchAllThreadsAction } from "@/lib/actions/thread";
import { ThreadWithUserAndTags } from "@/types";

import { ThreadCard } from "./thread-card";

export const ThreadList = () => {
  const [threads, setThreads] = useState<ThreadWithUserAndTags[]>([]);

  useEffect(() => {
    const fetchAllThreads = async () => {
      const threads = await fetchAllThreadsAction();
      setThreads(threads);
    };
    fetchAllThreads();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
      {threads.map((thread) => (
        <ThreadCard key={thread.id} thread={thread} />
      ))}
    </div>
  );
};