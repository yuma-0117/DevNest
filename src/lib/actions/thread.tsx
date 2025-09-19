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
          name: true,
        },
      },

      posts: {
        select: {
          id: true,
          content: true,
          createAt: true,
          user: {
            select: {
              name: true,
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

export const createThreadAction = async (
  title: string,
  description: string,
  userId: string,
  tags: string[]
) => {
  const thread = await prisma.thread.create({
    data: {
      title,
      description,
      userId,
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
  description: string
) => {
  const thread = await prisma.thread.update({
    where: { id },
    data: {
      title,
      description,
    },
    include: {
      tags: true,
    },
  });

  console.log(thread);
  return thread;
};

export const deleteThreadAction = async (id?: string) => {
  if (!id) return null;
  await prisma.thread.delete({
    where: { id },
  });
  return true;
};
