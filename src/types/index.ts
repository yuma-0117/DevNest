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
