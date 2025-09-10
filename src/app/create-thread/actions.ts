"use server";

import { prisma } from "@/lib/db/prisma";

export const createThreadAction = async (
  title: string,
  content: string,
  authorId: string
) => {
  const newThread = await prisma.thread.create({
    data: {
      title,
      content,
      authorId,
    },
  });

  return newThread;
};
