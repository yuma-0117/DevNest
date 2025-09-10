"use server";

import { supabase } from "@/lib/db/supabase";
import { v4 as uuidv4 } from "uuid";

export const createThreadAction = async (
  title: string,
  content: string,
  author_id: string
) => {
  const id = uuidv4();

  const { error } = await supabase.from("threads").insert([
    {
      id,
      title,
      content,
      author_id,
      created_at: new Date(),
      updated_at: new Date(),
      last_activity_at: new Date(),
      is_pinned: false,
      is_locked: false,
      view_count: 0,
      reply_count: 0,
    },
  ]);

  if (error) {
    console.error("Error creating thread:", error);
    return null;
  } else {
    console.log("Thread created successfully");
    return id;
  }
};
