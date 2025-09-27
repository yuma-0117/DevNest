import { Prisma } from "@prisma/client";

export type ThreadWithUserAndTags = Prisma.ThreadGetPayload<{
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
}>;

export type ThreadPageData = Prisma.ThreadGetPayload<{
  select: {
    id: true;
    title: true;
    description: true;
    createAt: true;
    user: {
      select: {
        id: true;
        name: true;
        image: true;
        isAnonymous: true;
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


        tags: {
          select: {
            name: true;
          };
        };
        replies: {
          select: {
            id: true;
          };
        };
      };
    };
    tags: {
      select: {
        name: true;
      };
    };
  };
}>;