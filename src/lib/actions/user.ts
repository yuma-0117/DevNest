// src/lib/actions/user.ts
// Server actions for managing users (e.g., fetching user by ID, deleting user).
"use server";

import { prisma } from "@/lib/db/prisma";
import { ActionResponse } from "@/types/common";
import { UserWithThreadsAndPosts } from "@/types/user";
import { auth } from "@/lib/auth";
import { unstable_cache, revalidateTag } from 'next/cache';
import { Prisma } from "@prisma/client"; // Import Prisma

const userQuery = {
  include: {
    threads: {
      select: {
        id: true,
        title: true,
        description: true,
        createAt: true,
        isPinned: true,
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
            isAnonymous: true,
          },
        },
        thread: {
          select: {
            title: true,
          },
        },
      },
    },
  },
};

type UserQueryResult = Prisma.UserGetPayload<typeof userQuery>;

export const fetchUserByIdAction = async (id?: string): Promise<ActionResponse<UserWithThreadsAndPosts>> => {
  if (!id) {
    return { success: false, error: "User ID is required." };
  }

  try {
    const getCachedUser = unstable_cache(
      async (userId: string) => {
        const user = await prisma.user.findFirst({
          where: { id: userId },
          ...userQuery, // Spread the query object
        }) as UserQueryResult; // Cast the result

        return user;
      },
      ['user', id || 'default'], // Key for the cache, includes the ID
      {
        tags: ['user-' + id], // Tag for revalidation
        revalidate: 3600, // Revalidate every hour
      }
    );

    const user = await getCachedUser(id || 'default'); // Call the cached function with the ID

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
    revalidateTag('user-' + id); // Revalidate specific user cache
    return { success: true, data: true };
  } catch (e) {
    console.error("Error deleting user by ID:", e);
    return { success: false, error: "Failed to delete user." };
  }
};

// New server action to update user's anonymous status
export const updateUserAnonymousStatusAction = async (
  userId: string,
  isAnonymous: boolean
): Promise<ActionResponse<boolean>> => {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized", message: "User not authenticated." };
  }

  // Ensure the authenticated user is updating their own profile
  if (session.user.id !== userId) {
    return { success: false, error: "Forbidden", message: "You can only update your own anonymous status." };
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { isAnonymous: isAnonymous },
    });
    revalidateTag('user-' + userId); // Revalidate specific user cache
    return { success: true, data: true };
  } catch (e) {
    console.error("Error updating user anonymous status:", e);
    return { success: false, error: "Failed to update anonymous status." };
  }
};