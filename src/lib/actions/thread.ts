// src/lib/actions/thread.ts
// Server actions for managing threads (create, read, update).
"use server";

import { prisma } from "@/lib/db/prisma";
import { ActionResponse } from "@/types/common";
import { ThreadWithUserAndTags, ThreadPageData, ThreadHeaderData, ThreadSortOrder } from "@/types/thread";
import { PostWithUserAndTagsAndReplies, PostSortOrder } from "@/types/post";
import { Prisma } from "@prisma/client";
import { auth } from "@/lib/auth";

import { unstable_cache, revalidateTag } from 'next/cache';

// ... other imports

export const fetchAllThreadsAction = async (
  sortOrder: ThreadSortOrder = "newest"
): Promise<ActionResponse<ThreadWithUserAndTags[]>> => {
  try {
    // unstable_cache: Next.js 15's experimental cache API.
    // TODO: Consider migrating to stable caching APIs when available.
    // Current revalidation interval is set to 1 hour (3600 seconds).
    const getCachedThreads = unstable_cache(
      async (sortOrder: ThreadSortOrder) => {
        const threads = await prisma.thread.findMany({
          orderBy: (() => {
            switch (sortOrder) {
              case "oldest":
                return [{ isPinned: "desc" }, { createAt: "asc" }];
              case "newest":
                return [{ isPinned: "desc" }, { createAt: "desc" }];
              case "most_comments":
                return [{ isPinned: "desc" }, { posts: { _count: "desc" } }];
              case "most_comments_last_week":
                // TODO: Implement more complex logic to count comments in the last week.
                // For now, it will sort by total comments.
                return [{ isPinned: "desc" }, { posts: { _count: "desc" } }];
              default:
                return [{ isPinned: "desc" }, { createAt: "desc" }];
            }
          })(),
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
                id: true,
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
        return threads;
      },
      ['all-threads', sortOrder], // Key for the cache
      {
        tags: ['threads'], // Tag for revalidation
        revalidate: 3600, // Revalidate every hour
      }
    );

    const threads = await getCachedThreads(sortOrder);

    return { success: true, data: threads };
  } catch (e) {
    console.error("Error fetching all threads:", e);
    return { success: false, error: "Failed to fetch threads.", message: "An error occurred while fetching threads." };
  }
};

export const fetchThreadByIdAction = async (id?: string): Promise<ActionResponse<ThreadPageData>> => {
  if (!id) {
    return { success: false, error: "Thread ID is required." };
  }

  try {
    // unstable_cache: Next.js 15's experimental cache API.
    // TODO: Consider migrating to stable caching APIs when available.
    // Current revalidation interval is set to 1 hour (3600 seconds).
    const getCachedThread = unstable_cache(
      async (threadId: string) => {
        const thread = await prisma.thread.findUnique({
          where: { id: threadId },
          select: {
            id: true,
            title: true,
            description: true,
            createAt: true,
            isPinned: true,

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
                    id: true,
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
                id: true,
                name: true,
              },
            },
          },
        });
        return thread;
      },
      ['thread', id || 'default'], // Key for the cache, includes the ID
      {
        tags: ['thread-' + id, 'threads'], // Tags for revalidation, specific and general
        revalidate: 3600, // Revalidate every hour
      }
    );

    const thread = await getCachedThread(id || 'default'); // Call the cached function with the ID

    if (!thread) {
      return { success: false, error: "Not Found", message: "Thread not found." };
    }

    return { success: true, data: thread };
  } catch (e) {
    console.error("Error fetching thread by ID:", e);
    return { success: false, error: "Failed to fetch thread.", message: "An error occurred while fetching the thread." };
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

    revalidateTag('threads'); // Revalidate cached threads
    revalidateTag('thread-' + thread.id); // Revalidate specific thread cache
    return { success: true, data: thread };
  } catch (e) {
    console.error("Error creating thread:", e);
    return { success: false, error: "Failed to create thread.", message: "An error occurred while creating the thread." };
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

    revalidateTag('threads'); // Revalidate cached threads
    revalidateTag('thread-' + id); // Revalidate specific thread cache
    return { success: true, data: thread };
  } catch (e) {
    console.error("Error updating thread:", e);
    return { success: false, error: "Failed to update thread.", message: "An error occurred while updating the thread." };
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
    revalidateTag('threads'); // Revalidate cached threads
    revalidateTag('thread-' + threadId); // Revalidate specific thread cache
    return { success: true, data: true };
  } catch (e) {
    console.error("Error updating thread pinned status:", e);
    return { success: false, error: "Failed to update thread pinned status.", message: "An error occurred while updating the thread's pinned status." };
  }
};

export const deleteThreadAction = async (
  threadId: string
): Promise<ActionResponse<boolean>> => {
  const session = await auth();
  if (!session?.user?.id) {
    return {
      success: false,
      error: "Unauthorized",
      message: "User not authenticated.",
    };
  }

  try {
    const thread = await prisma.thread.findUnique({
      where: { id: threadId },
      select: { userId: true },
    });

    if (!thread) {
      return {
        success: false,
        error: "Not Found",
        message: "Thread not found.",
      };
    }

    if (thread.userId !== session.user.id) {
      return {
        success: false,
        error: "Forbidden",
        message: "User not authorized to delete this thread.",
      };
    }

    await prisma.thread.delete({
      where: { id: threadId },
    });

    revalidateTag("threads");
    revalidateTag(`thread-${threadId}`);

    return { success: true, data: true };
  } catch (e) {
    console.error("Error deleting thread:", e);
    return { success: false, error: "Failed to delete thread.", message: "An error occurred while deleting the thread." };
  }
};

export const fetchThreadHeaderAction = async (id?: string): Promise<ActionResponse<ThreadHeaderData>> => {
  if (!id) {
    return { success: false, error: "Thread ID is required." };
  }

  try {
    // unstable_cache: Next.js 15's experimental cache API.
    // TODO: Consider migrating to stable caching APIs when available.
    // Current revalidation interval is set to 1 hour (3600 seconds).
    const getCachedThreadHeader = unstable_cache(
      async (threadId: string) => {
        const thread = await prisma.thread.findUnique({
          where: { id: threadId },
          select: {
            id: true,
            title: true,
            description: true,
            createAt: true,
            isPinned: true,
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
                id: true,
                name: true,
              },
            },
          },
        });
        return thread;
      },
      ['thread-header', id || 'default'],
      {
        tags: ['thread-header-' + id, 'threads'],
        revalidate: 3600,
      }
    );

    const thread = await getCachedThreadHeader(id || 'default');

    if (!thread) {
      return { success: false, error: "Not Found", message: "Thread not found." };
    }

    return { success: true, data: thread };
  } catch (e) {
    console.error("Error fetching thread header by ID:", e);
    return { success: false, error: "Failed to fetch thread header.", message: "An error occurred while fetching the thread header." };
  }
};

export const fetchPostsForThreadAction = async (
  id?: string,
  sortOrder: PostSortOrder = "oldest"
): Promise<ActionResponse<PostWithUserAndTagsAndReplies[]>> => {
  if (!id) {
    return { success: false, error: "Thread ID is required." };
  }

  try {
    // unstable_cache: Next.js 15's experimental cache API.
    // TODO: Consider migrating to stable caching APIs when available.
    // Current revalidation interval is set to 1 hour (3600 seconds).
    const getCachedPosts = unstable_cache(
      async (threadId: string) => {
        const posts = await prisma.post.findMany({
          where: { threadId: threadId, parentId: { equals: null } },
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
                id: true,
                name: true,
              },
            },
            replies: {
              select: {
                id: true,
              },
            },
          },
          orderBy: (() => {
            switch (sortOrder) {
              case "newest":
                return { createAt: "desc" };
              case "oldest":
                return { createAt: "asc" };
              case "most_replies":
                return { replies: { _count: "desc" } };
              default:
                return { createAt: "asc" };
            }
          })(),
        });
        return posts;
      },
      ['posts-for-thread', id || 'default', sortOrder],
      {
        tags: ['posts-for-thread-' + id, 'posts'],
        revalidate: 3600,
      }
    );

    const posts = await getCachedPosts(id || 'default');

    return { success: true, data: posts };
  } catch (e) {
    console.error("Error fetching posts for thread:", e);
    return { success: false, error: "Failed to fetch posts for thread.", message: "An error occurred while fetching posts for the thread." };
  }
};