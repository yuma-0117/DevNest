import { Prisma } from "@prisma/client";

export type PostSortOrder = "newest" | "oldest" | "most_replies";

export type PostWithUserAndTagsAndReplies = Prisma.PostGetPayload<{
  select: {
    id: true;
    content: true;
    createAt: true;
    threadId: true;
    user: {
      select: {
        id: true;
        name: true;
        image: true;
        isAnonymous: true;
      };
    };
    tags: {
      select: {
        id: true,
        name: true,
      },
    },
    replies: {
      select: {
        id: true;
      };
    };
  };
}>;