"use server";

import { prisma } from "@/lib/db/prisma";

export const addPostAction = async (
  content: string,
  threadId: string,
  authorId: string
) => {
  const newPost = await prisma.post.create({
    data: {
      content,
      authorId,
      threadId,
    },
  });
  return newPost;
};

export const fetchAllPostsAction = async (threadId: string) => {
  const posts = await prisma.post.findMany({
    where: { threadId },
    orderBy: { createdAt: "asc" },
  });
  return posts;
};

export const updatePostAction = async (id: string, content: string) => {
  const updatedPost = await prisma.post.update({
    where: { id },
    data: { content },
  });
  return updatedPost;
};

export const deletePostAction = async (id: string) => {
  await prisma.post.delete({
    where: { id },
  });
};
