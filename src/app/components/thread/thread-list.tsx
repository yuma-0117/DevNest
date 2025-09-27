// src/app/components/thread/thread-list.tsx
"use client";

import { useEffect, useState } from "react";

import { fetchAllThreadsAction } from "@/lib/actions/thread";
import { getSupabaseRealtimeMetrics } from "@/lib/actions/supabase-metrics"; // New import
import { ThreadWithUserAndTags } from "@/types/thread";

import { ThreadCard } from "./thread-card";
import { ThreadCardSkeleton } from "./thread-card-skeleton";
import { supabase } from "@/lib/db/supabase";

// Constants for Realtime limits
const REALTIME_CONNECTION_LIMIT = 200;
const REALTIME_THRESHOLD_PERCENTAGE = 0.8; // 80%
const REALTIME_WARNING_THRESHOLD = REALTIME_CONNECTION_LIMIT * REALTIME_THRESHOLD_PERCENTAGE;
const METRICS_POLLING_INTERVAL = 30 * 1000; // Poll every 30 seconds

export const ThreadList = () => {
  const [threads, setThreads] = useState<ThreadWithUserAndTags[]>([]);
  const [loading, setLoading] = useState(true);
  const [showRealtimeWarning, setShowRealtimeWarning] = useState(false); // New state for warning

  // Effect for fetching threads and subscribing to real-time updates
  useEffect(() => {
    const fetchAllThreads = async () => {
      setLoading(true);
      const response = await fetchAllThreadsAction();
      if (response.success) {
        setThreads(response.data);
      } else {
        console.error("Failed to fetch threads:", response.error);
        setThreads([]);
      }
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

  // New useEffect for monitoring Supabase Realtime metrics
  useEffect(() => {
    const fetchRealtimeMetrics = async () => {
      const response = await getSupabaseRealtimeMetrics();
      if (response.success) {
        if (response.data.activeConnections >= REALTIME_WARNING_THRESHOLD) {
          setShowRealtimeWarning(true);
        } else {
          setShowRealtimeWarning(false);
        }
      } else {
        console.error("Failed to fetch realtime metrics:", response.error);
        // Optionally, you might want to show a warning if metrics can't be fetched
      }
    };

    // Fetch immediately and then set up polling
    fetchRealtimeMetrics();
    const intervalId = setInterval(fetchRealtimeMetrics, METRICS_POLLING_INTERVAL);

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  return (
    <>
      {showRealtimeWarning && (
        <div className="mb-4 p-3 rounded-md bg-yellow-100 border border-yellow-400 text-yellow-800">
          <h4 className="font-bold">Realtime Usage Warning</h4>
          <p>Supabase Realtime connections are approaching the free tier limit. Realtime updates may become unreliable.</p>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {[...Array(6)].map((_, i) => (
            <ThreadCardSkeleton key={i} />
          ))}
        </div>
      ) : threads.length === 0 ? (
        <div className="text-center text-muted-foreground mt-8">
          No threads found. Be the first to create one!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {threads.map((thread) => (
            <ThreadCard key={thread.id} thread={thread} />
          ))}
        </div>
      )}
    </>
  );
};