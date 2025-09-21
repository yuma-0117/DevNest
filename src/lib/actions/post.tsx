"use server";

import { prisma } from "../db/prisma";
import { auth } from "@/lib/auth";

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

export const fetchPostByIdAction = async (id?: string) => {
  if (!id) return null;

  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      tags: true,
    },
  });

  return post;
};

export const createPostAction = async (
  content: string,
  threadId: string,
  tags: string[]
) => {
  const session = await auth();
  if (!session?.user?.id) return null;

  const post = await prisma.post.create({
    data: {
      content,
      userId: session.user.id,
      threadId,
      tags: {
        connectOrCreate: tags.map((tag) => ({
          where: { name: tag },
          create: { name: tag },
        })),
      },
    },
  });
  console.log(post);
  return post;
};

export const updatePostAction = async (
  id: string,
  content: string,
  tags: string[]
) => {
  const session = await auth();
  if (!session?.user?.id) return null;

  const post = await prisma.post.findUnique({
    where: { id },
    select: { userId: true },
  });

  if (!post || post.userId !== session.user.id) {
    return null;
  }

  const tagCreateOperations = tags.map((tagName) =>
    prisma.tag.upsert({
      where: { name: tagName },
      update: {},
      create: { name: tagName },
    })
  );
  const createdTags = await prisma.$transaction(tagCreateOperations);

  const updatedPost = await prisma.post.update({
    where: { id },
    data: {
      content,
      tags: {
        set: createdTags.map((tag) => ({ id: tag.id })),
      },
    },
  });
  console.log(updatedPost);
  return updatedPost;
};

export const deletePostAction = async (id?: string) => {
  const session = await auth();
  if (!session?.user?.id) return null;

  if (!id) return null;

  const post = await prisma.post.findUnique({
    where: { id },
    select: { userId: true },
  });

  if (!post || post.userId !== session.user.id) {
    return null;
  }

  await prisma.post.delete({
    where: { id },
  });
  return true;
};