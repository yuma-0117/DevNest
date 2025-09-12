import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";

import { PostCard } from "./components/post-card";
import { PostForm } from "./components/post-form";
import { ThreadOverview } from "./components/thread-overview";

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
  const posts = await prisma.post.findMany({ where: { threadId } });

  return (
    <div className="p-2 space-y-3 w-screen h-full absolute">
      {thread && user && <ThreadOverview thread={thread} user={user} />}
      {posts.map((post, index) => (
        <PostCard key={post.id} posts={posts} post={post} index={index + 1} />
      ))}
      <div className="fixed bottom-0 w-screen p-2">
        <PostForm threadId={threadId} userId={session?.user?.id || ""} />
      </div>
    </div>
  );
}
