// src/lib/actions/supabase-metrics.ts
"use server";

import { ActionResponse } from "@/types/common"; // Assuming ActionResponse is defined here

interface SupabaseRealtimeMetrics {
  activeConnections: number;
  // You can add more metrics here as needed, e.g., messages_in_total, messages_out_total
}

export async function getSupabaseRealtimeMetrics(): Promise<ActionResponse<SupabaseRealtimeMetrics>> {
  const projectRef = process.env.SUPABASE_PROJECT_REF;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!projectRef || !serviceRoleKey) {
    return {
      success: false,
      error: "Supabase project reference or service role key not configured. Please set SUPABASE_PROJECT_REF and SUPABASE_SERVICE_ROLE_KEY environment variables.",
    };
  }

  const metricsUrl = `https://${projectRef}.supabase.co/customer/v1/privileged/metrics`;

  try {
    // For HTTP Basic Auth, the header format is 'Basic base64(username:password)'
    // Supabase documentation implies service_role_key is the password.
    // Let's try using the projectRef as username, which is a common pattern.
    const authString = btoa(`${projectRef}:${serviceRoleKey}`);

    const response = await fetch(metricsUrl, {
      headers: {
        Authorization: `Basic ${authString}`,
      },
      // Ensure no-cache to get fresh metrics
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Failed to fetch Supabase metrics: ${response.status} - ${errorText}`);
      return {
        success: false,
        error: `Failed to fetch Supabase metrics: ${response.status} - ${errorText}`,
      };
    }

    const metricsText = await response.text();
    // console.log("Raw Supabase Metrics:", metricsText); // For debugging

    // Parse Prometheus-formatted metrics
    // Example: supabase_realtime_connections_total 10
    const activeConnectionsMatch = metricsText.match(/supabase_realtime_connections_total (\d+)/);
    const activeConnections = activeConnectionsMatch ? parseInt(activeConnectionsMatch[1], 10) : 0;

    // You can parse other metrics here if needed, e.g.:
    // const messagesInMatch = metricsText.match(/supabase_realtime_messages_in_total (\d+)/);
    // const messagesIn = messagesInMatch ? parseInt(messagesInMatch[1], 10) : 0;

    return {
      success: true,
      data: {
        activeConnections,
        // messagesIn,
      },
    };
  } catch (error) {
    console.error("Error fetching Supabase metrics:", error);
    return {
      success: false,
      error: "An unexpected error occurred while fetching Supabase metrics.",
    };
  }
}