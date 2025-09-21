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
      };
    };
    tags: {
      select: {
        name: true;
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
      };
    };
    posts: {
      select: {
        id: true;
        content: true;
        createAt: true;
        user: {
          select: {
            name: true;
            image: true;
          };
        };
        tags: {
          select: {
            name: true;
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
