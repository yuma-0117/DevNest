'use server';

import { prisma } from '../db/prisma';

export const fetchAllTagsAction = async () => {
  const tags = await prisma.tag.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  return tags;
};
