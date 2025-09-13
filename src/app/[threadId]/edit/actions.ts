"use server";

import { prisma } from "@/lib/db/prisma";

export const updateThreadAction = async (
  id: string,
  title: string,
  content: string
) => {
  const updatedThread = await prisma.thread.update({
    where: { id },
    data: { title, content },
  });

  return updatedThread;
};

export const deleteThreadAction = async (id: string) => {
  const deletedThread = await prisma.thread.delete({ where: { id } });

  return deletedThread;
};
