"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/db/supabase";
import { Thread, User } from "@prisma/client";

import { fetchAllThreadsAction, fetchAllUsersAction } from "../actions";
import { ThreadCard } from "./thread-card";

export const ThreadList = () => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchThreads = async () => {
      const threads = await fetchAllThreadsAction();
      if (!threads) return;
      setThreads(threads);
    };

    const fetchAllUsers = async () => {
      const users = await fetchAllUsersAction();
      if (!users) return;
      setUsers(users);
    };

    fetchThreads();
    fetchAllUsers();

    const subscription = supabase
      .channel("thread-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "threads" },
        async () => {
          fetchThreads();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  useEffect(() => {
    console.log(threads);
  }, [threads]);

  return threads.length === 0 ? null : (
    <div className="space-y-3 pt-4">
      {threads.map((thread) => (
        <div key={thread.id}>
          <ThreadCard
            thread={thread}
            user={users.find((user) => user.id === thread.authorId)}
          />
        </div>
      ))}
    </div>
  );
};
