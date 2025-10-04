
import { Prisma } from '@prisma/client';

export type TaggedThread = Prisma.ThreadGetPayload<{
  include: {
    user: true;
    tags: true;
    _count: {
      select: {
        posts: true;
      };
    };
  };
}>;

export type TaggedPost = Prisma.PostGetPayload<{
  include: {
    user: true;
    tags: true;
    thread: true;
    parent: true;
    replies: {
      include: {
        user: true,
      },
    },
  };
}>;
