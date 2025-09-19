"use server";

import { prisma } from "../db/prisma";

export const fetchAllPostsAction = async (threadId?: string) => {
  const posts = await prisma.post.findMany({
    where: { threadId },
    orderBy: { createAt: "desc" },
    select: {
      id: true,
      content: true,
      createAt: true,

      user: {
        select: {
          id: true,
          name: true,
        },
      },

      tags: {
        select: {
          name: true,
        },
      },
    },
  });
  console.log(posts);
  return posts;
};

export const createPostAction = async (
  content: string,
  userId: string,
  threadId: string
) => {
  const post = await prisma.post.create({
    data: {
      content,
      userId,
      threadId,
    },
  });
  console.log(post);
  return post;
};

export const updatePostAction = async (id: string, content: string) => {
  const post = await prisma.post.update({
    where: { id },
    data: {
      content,
    },
  });
  console.log(post);
  return post;
};

export const deletePostAction = async (id?: string) => {
  if (!id) return null;
  await prisma.post.delete({
    where: { id },
  });
  return true;
};
