// Server actions for managing tags (e.g., fetching all tags).
"use server";

import { prisma } from "@/lib/db/prisma";
import { ActionResponse } from "@/types/common";
import { TaggedPost, TaggedThread } from "@/types/tag";
import { Prisma } from "@prisma/client";

export const fetchAllTagsAction = async (): Promise<
  ActionResponse<
    Prisma.TagGetPayload<{} /* eslint-disable-line @typescript-eslint/no-empty-object-type */>[]
  >
> => {
  try {
    const tags = await prisma.tag.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return { success: true, data: tags };
  } catch (e) {
    console.error("Error fetching all tags:", e);
    return { success: false, error: "Failed to fetch tags." };
  }
};

export const fetchThreadsAndPostsByTagAction = async (
  tagId: string
): Promise<
  ActionResponse<{
    threads: TaggedThread[];
    posts: TaggedPost[];
    tagName: string | undefined;
  }>
> => {
  try {
    const tag = await prisma.tag.findUnique({
      where: {
        id: tagId,
      },
      select: {
        name: true,
      },
    });

    const threads = await prisma.thread.findMany({
      where: {
        tags: {
          some: {
            id: tagId,
          },
        },
      },
      include: {
        user: true,
        tags: true,
        _count: {
          select: {
            posts: true,
          },
        },
      },
      orderBy: {
        createAt: "desc",
      },
    });

    const posts = await prisma.post.findMany({
      where: {
        tags: {
          some: {
            id: tagId,
          },
        },
      },
      include: {
        user: true,
        tags: true,
        thread: true,
        parent: true,
        replies: {
          include: {
            user: true,
          },
        },
      },
      orderBy: {
        createAt: "desc",
      },
    });

    return { success: true, data: { threads, posts, tagName: tag?.name } };
  } catch (e) {
    console.error("Error fetching threads and posts by tag:", e);
    return { success: false, error: "Failed to fetch threads and posts." };
  }
};

export const searchTagsByNameAction = async (
  name: string
): Promise<ActionResponse<Prisma.TagGetPayload<Prisma.TagDefaultArgs>[]>> => {
  try {
    const tags = await prisma.tag.findMany({
      where: {
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
    });
    return { success: true, data: tags };
  } catch (e) {
    console.error("Error searching tags by name:", e);
    return { success: false, error: "Failed to search tags." };
  }
};
