// Server actions for managing tags (e.g., fetching all tags).
'use server';

import { prisma } from "@/lib/db/prisma";
import { ActionResponse } from "@/types/common";
import { Prisma } from "@prisma/client";

export const fetchAllTagsAction = async (): Promise<ActionResponse<Prisma.TagGetPayload<{} /* eslint-disable-line @typescript-eslint/no-empty-object-type */>[]>> => {
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
