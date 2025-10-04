import { Prisma } from "@prisma/client";

export type UserWithThreadsAndPosts = Prisma.UserGetPayload<{
  include: {
    threads: {
      select: {
        id: true;
        title: true;
        description: true;
        createAt: true;
        isPinned: true;
        userId: true;
        user: {
          select: {
            name: true;
            image: true;
            id: true;
            isAnonymous: true;
            bio: true;  // Include bio in user selection
          };
        };
        tags: {
          select: {
            id: true,
            name: true,
          },
        },
        _count: {
          select: {
            posts: true;
          };
        };
      };
    };
    posts: {
      select: {
        id: true;
        content: true;
        createAt: true;
        threadId: true;
        userId: true;
        parentId: true;
        user: {
          select: {
            id: true;
            name: true;
            image: true;
            isAnonymous: true;
            bio: true;  // Include bio in user selection
          };
        };
        thread: {
          select: {
            title: true;
          };
        };
      };
    };
  };
}>;