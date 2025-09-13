import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";

import { ThreadOverview } from "./components/thread-overview";
import { PostField } from "./components/post-field";

export default async function ThreadPage({
  params,
}: {
  params: Promise<{ threadId: string }>;
}) {
  const { threadId } = await params;

  const session = await auth();

  console.log(threadId, session);

  const thread = await prisma.thread.findFirst({ where: { id: threadId } });
  const user = await prisma.user.findFirst({ where: { id: thread?.authorId } });

  return (
    <div className="p-2 space-y-3 w-full h-full absolute">
      {thread && user && (
        <ThreadOverview
          thread={thread}
          user={user}
          sessionUserId={session?.user?.id}
        />
      )}
      <PostField threadId={threadId} sessionUserId={session?.user?.id} />
    </div>
  );
}
