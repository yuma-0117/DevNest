"use server";

import { prisma } from "../db/prisma";

export const fetchAllThreadsAction = async () => {
  const threads = await prisma.thread.findMany({
    orderBy: { createAt: "desc" },
    select: {
      id: true,
      title: true,
      description: true,
      createAt: true,

      user: {
        select: {
          name: true,
          image: true,
        },
      },

      tags: {
        select: {
          name: true,
        },
      },
    },
  });
  console.log(threads);
  return threads;
};

export const fetchThreadByIdAction = async (id?: string) => {
  if (!id) return null;

  const thread = await prisma.thread.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      description: true,
      createAt: true,

      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },

      posts: {
        select: {
          id: true,
          content: true,
          createAt: true,
          threadId: true,
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },

          tags: {
            select: {
              name: true,
            },
          },
        },

        orderBy: { createAt: "desc" },
      },

      tags: {
        select: {
          name: true,
        },
      },
    },
  });

  console.log(thread);
  return thread;
};

import { auth } from "@/lib/auth";

export const createThreadAction = async (
  title: string,
  description: string,
  tags: string[]
) => {
  const session = await auth();
  if (!session?.user?.id) return null;

  const thread = await prisma.thread.create({
    data: {
      title,
      description,
      userId: session.user.id,
      tags: {
        connectOrCreate: tags.map((tag) => ({
          where: { name: tag },
          create: { name: tag },
        })),
      },
    },
    include: {
      tags: true,
    },
  });

  console.log(thread);
  return thread;
};

export const updateThreadAction = async (
  id: string,
  title: string,
  description: string,
  tags: string[]
) => {
  const tagCreateOperations = tags.map((tagName) =>
    prisma.tag.upsert({
      where: { name: tagName },
      update: {},
      create: { name: tagName },
    })
  );
  const createdTags = await prisma.$transaction(tagCreateOperations);

  const thread = await prisma.thread.update({
    where: { id },
    data: {
      title,
      description,
      tags: {
        set: createdTags.map((tag) => ({ id: tag.id })),
      },
    },
    include: {
      tags: true,
    },
  });

  console.log(thread);
  return thread;
};

export const deleteThreadAction = async (id?: string) => {
  const session = await auth();
  if (!session?.user?.id) return null;

  if (!id) return null;

  const thread = await prisma.thread.findUnique({
    where: { id },
    select: { userId: true },
  });

  if (!thread || thread.userId !== session.user.id) {
    return null;
  }

  await prisma.thread.delete({
    where: { id },
  });
  return true;
};
