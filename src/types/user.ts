import { Prisma } from "@prisma/client";

export type UserWithThreadsAndPosts = Prisma.UserGetPayload<{
  select: {
    id: true;
    name: true;
    email: true;
    image: true;
    isAnonymous: true;
    threads: {
      select: {
        id: true;
        title: true;
        description: true;
        createAt: true;
        user: {
          select: {
            name: true;
            image: true;
            isAnonymous: true;
          };
        };
        tags: {
          select: {
            name: true;
          };
        };
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
        user: {
          select: {
            id: true;
            name: true;
            image: true;
            isAnonymous: true;
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