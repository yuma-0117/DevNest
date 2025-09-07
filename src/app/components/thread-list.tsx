import { prisma } from "@/lib/db/prisma";

import { ThreadCard } from "./thread-card";

export const ThreadList = async () => {
  const threads = await prisma.thread.findMany({
    orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
  });

  return (
    <div className="space-y-3">
      {threads.map((thread) => (
        <div key={thread.id}>
          <ThreadCard thread={thread} />
        </div>
      ))}
    </div>
  );
};
