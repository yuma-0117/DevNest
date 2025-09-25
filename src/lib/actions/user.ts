"use server";

import { prisma } from "../db/prisma";

export const fetchUserByIdAction = async (id?: string) => {
  if (!id) return null;
  const user = await prisma.user.findFirst({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,

      threads: {
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
          _count: {
            select: {
              posts: true,
            },
          },
        },
      },

      posts: {
        select: {
          id: true,
          content: true,
          createAt: true,
          threadId: true,
          thread: {
            select: {
              title: true,
            },
          },
        },
      },
    },
  });

  console.log(user);
  return user;
};

export const deleteUserByIdAction = async (id?: string) => {
  if (!id) return null;
  await prisma.user.delete({
    where: { id },
  });
};
