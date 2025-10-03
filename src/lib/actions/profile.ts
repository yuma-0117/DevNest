// src/lib/actions/profile.ts
// Server actions for managing user profiles
"use server";

import { prisma } from "@/lib/db/prisma";
import { ActionResponse } from "@/types/common";
import { auth } from "@/lib/auth";
import { revalidateTag } from 'next/cache';

export const updateProfileAction = async (
  userId: string,
  name: string,
  bio: string
): Promise<ActionResponse<boolean>> => {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized", message: "User not authenticated." };
  }

  // Ensure the authenticated user is updating their own profile
  if (session.user.id !== userId) {
    return { success: false, error: "Forbidden", message: "You can only update your own profile." };
  }

  try {
    // Update user profile with new name and bio
    await prisma.user.update({
      where: { id: userId },
      data: { 
        name: name,
        bio: bio
      },
    });
    
    // Revalidate the user cache to reflect the changes
    revalidateTag('user-' + userId);
    
    return { success: true, data: true };
  } catch (e) {
    console.error("Error updating profile:", e);
    return { success: false, error: "Failed to update profile." };
  }
};