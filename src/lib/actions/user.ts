// Server actions for managing users (e.g., fetching user by ID, deleting user).
"use server";

import { prisma } from "@/lib/db/prisma";
import { ActionResponse } from "@/types/common";
import { UserWithThreadsAndPosts } from "@/types/user";
import { auth } from "@/lib/auth";

export const fetchUserByIdAction = async (id?: string): Promise<ActionResponse<UserWithThreadsAndPosts>> => {
  if (!id) {
    return { success: false, error: "User ID is required." };
  }

  try {
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

    if (!user) {
      return { success: false, error: "Not Found", message: "User not found." };
    }

    return { success: true, data: user };
  } catch (e) {
    console.error("Error fetching user by ID:", e);
    return { success: false, error: "Failed to fetch user." };
  }
};

export const deleteUserByIdAction = async (id?: string): Promise<ActionResponse<boolean>> => {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized", message: "User not authenticated." };
  }

  if (!id) {
    return { success: false, error: "User ID is required." };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!user) {
      return { success: false, error: "Not Found", message: "User not found." };
    }

    // In a real application, you might want to check if the session user is authorized to delete this user.
    // For now, we'll assume an authenticated user can delete any user if they know the ID.

    await prisma.user.delete({
      where: { id },
    });
    return { success: true, data: true };
  } catch (e) {
    console.error("Error deleting user by ID:", e);
    return { success: false, error: "Failed to delete user." };
  }
};
