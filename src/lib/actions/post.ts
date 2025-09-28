// Server actions for managing posts (create, read, update, delete).
"use server";

import { prisma } from "@/lib/db/prisma";
import { auth } from "@/lib/auth";
import { ActionResponse } from "@/types/common";
import { PostWithUserAndTagsAndReplies } from "@/types/post";
import { Prisma } from "@prisma/client";
import { revalidateTag } from 'next/cache';

export const fetchPostByIdAction = async (id?: string): Promise<ActionResponse<PostWithUserAndTagsAndReplies>> => {
  if (!id) {
    return { success: false, error: "Post ID is required." };
  }

  try {
    const post = await prisma.post.findUnique({
      where: { id },
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
            isAnonymous: true, // Added isAnonymous
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
    });

    if (!post) {
      return { success: false, error: "Post not found." };
    }

    return { success: true, data: post };
  } catch (e) {
    console.error("Error fetching post by ID:", e);
    return { success: false, error: "Failed to fetch post." };
  }
};

export const createPostAction = async (
  content: string,
  threadId: string,
  tags: string[],
  parentId?: string
): Promise<ActionResponse<Prisma.PostGetPayload<{} /* eslint-disable-line @typescript-eslint/no-empty-object-type */>>> => {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized", message: "User not authenticated." };
  }

  try {
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
        parentId,
      },
    });

    revalidateTag('thread-' + threadId); // Revalidate specific thread cache
    revalidateTag('threads'); // Revalidate all threads cache
    revalidateTag('user-' + session.user.id); // Revalidate specific user cache
    return { success: true, data: post };
  } catch (e) {
    console.error("Error creating post:", e);
    return { success: false, error: "Failed to create post." };
  }
};

export const updatePostAction = async (
  id: string,
  content: string,
  tags: string[]
): Promise<ActionResponse<Prisma.PostGetPayload<{} /* eslint-disable-line @typescript-eslint/no-empty-object-type */>>> => {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized", message: "User not authenticated." };
  }

  try {
    const postToUpdate = await prisma.post.findUnique({
      where: { id },
      select: { userId: true, threadId: true }, // Select userId and threadId
    });

    if (!postToUpdate) {
      return { success: false, error: "Not Found", message: "Post not found." };
    }

    if (postToUpdate.userId !== session.user.id) {
      return { success: false, error: "Forbidden", message: "User not authorized to update this post." };
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

    revalidateTag('thread-' + postToUpdate.threadId); // Revalidate specific thread cache
    revalidateTag('threads'); // Revalidate all threads cache
    revalidateTag('user-' + postToUpdate.userId); // Revalidate specific user cache
    return { success: true, data: updatedPost };
  } catch (e) {
    console.error("Error updating post:", e);
    return { success: false, error: "Failed to update post." };
  }
};

export const deletePostAction = async (id?: string): Promise<ActionResponse<boolean>> => {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized", message: "User not authenticated." };
  }

  if (!id) {
    return { success: false, error: "Post ID is required." };
  }

  try {
    const postToDelete = await prisma.post.findUnique({
      where: { id },
      select: { userId: true, threadId: true }, // Select userId and threadId
    });

    if (!postToDelete) {
      return { success: false, error: "Not Found", message: "Post not found." };
    }

    if (postToDelete.userId !== session.user.id) {
      return { success: false, error: "Forbidden", message: "User not authorized to delete this post." };
    }

    await prisma.post.delete({
      where: { id },
    });

    revalidateTag('thread-' + postToDelete.threadId); // Revalidate specific thread cache
    revalidateTag('threads'); // Revalidate all threads cache
    revalidateTag('user-' + postToDelete.userId); // Revalidate specific user cache
    return { success: true, data: true };
  } catch (e) {
    console.error("Error deleting post:", e);
    return { success: false, error: "Failed to delete post." };
  }
};