// src/lib/actions/thread.ts
// Server actions for managing threads (create, read, update).
"use server";

import { prisma } from "@/lib/db/prisma";
import { ActionResponse } from "@/types/common";
import { ThreadWithUserAndTags, ThreadPageData } from "@/types/thread";
import { Prisma } from "@prisma/client";
import { auth } from "@/lib/auth";

export const fetchAllThreadsAction = async (): Promise<ActionResponse<ThreadWithUserAndTags[]>> => {
  try {
    const threads = await prisma.thread.findMany({
      orderBy: [
        { isPinned: "desc" }, // Pinned threads first
        { createAt: "desc" }, // Then by creation date
      ],
      select: {
        id: true,
        title: true,
        description: true,
        createAt: true,
        isPinned: true, // Include new field

        user: {
          select: {
            name: true,
            image: true,
            id: true,
            isAnonymous: true,
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
    });

    return { success: true, data: threads };
  } catch (e) {
    console.error("Error fetching all threads:", e);
    return { success: false, error: "Failed to fetch threads." };
  }
};

export const fetchThreadByIdAction = async (id?: string): Promise<ActionResponse<ThreadPageData>> => {
  if (!id) {
    return { success: false, error: "Thread ID is required." };
  }

  try {
    const thread = await prisma.thread.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        createAt: true,
        isPinned: true, // Include new field

        user: {
          select: {
            id: true,
            name: true,
            image: true,
            isAnonymous: true,
          },
        },

        posts: {
          where: { parentId: { equals: null } },
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
                isAnonymous: true,
              },
            },

            tags: {
              select: {
                name: true,
              },
            },
            replies: {
              select: {
                id: true,
              },
            },
          },

          orderBy: { createAt: "asc" },
        },

        tags: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!thread) {
      return { success: false, error: "Not Found", message: "Thread not found." };
    }

    return { success: true, data: thread };
  } catch (e) {
    console.error("Error fetching thread by ID:", e);
    return { success: false, error: "Failed to fetch thread." };
  }
};

export const createThreadAction = async (
  title: string,
  description: string,
  tags: string[]
): Promise<ActionResponse<Prisma.ThreadGetPayload<{ include: { tags: true } }>>> => {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized", message: "User not authenticated." };
  }

  try {
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

    return { success: true, data: thread };
  } catch (e) {
    console.error("Error creating thread:", e);
    return { success: false, error: "Failed to create thread." };
  }
};

export const updateThreadAction = async (
  id: string,
  title: string,
  description: string,
  tags: string[]
): Promise<ActionResponse<Prisma.ThreadGetPayload<{ include: { tags: true } }>>> => {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized", message: "User not authenticated." };
  }

  try {
    const existingThread = await prisma.thread.findUnique({
      where: { id },
      select: { userId: true },
    });

    if (!existingThread) {
      return { success: false, error: "Not Found", message: "Thread not found." };
    }

    if (existingThread.userId !== session.user.id) {
      return { success: false, error: "Forbidden", message: "User not authorized to update this thread." };
    }

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

    return { success: true, data: thread };
  } catch (e) {
    console.error("Error updating thread:", e);
    return { success: false, error: "Failed to update thread." };
  }
};

// New server action to update thread's pinned status
export const updateThreadPinnedStatusAction = async (
  threadId: string,
  isPinned: boolean
): Promise<ActionResponse<boolean>> => {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized", message: "User not authenticated." };
  }

  try {
    const thread = await prisma.thread.findUnique({
      where: { id: threadId },
      select: { userId: true },
    });

    if (!thread) {
      return { success: false, error: "Not Found", message: "Thread not found." };
    }

    // Only the thread author can pin/unpin their thread
    if (thread.userId !== session.user.id) {
      return { success: false, error: "Forbidden", message: "You can only update your own thread's pinned status." };
    }

    await prisma.thread.update({
      where: { id: threadId },
      data: { isPinned: isPinned },
    });
    return { success: true, data: true };
  } catch (e) {
    console.error("Error updating thread pinned status:", e);
    return { success: false, error: "Failed to update thread pinned status." };
  }
};
