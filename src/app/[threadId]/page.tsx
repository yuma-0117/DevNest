import { prisma } from "@/lib/db/prisma";

import { PostCard } from "./components/post-card";
import { ThreadOverview } from "./components/thread-overview";

export default async function ThreadPage({
  params,
}: {
  params: Promise<{ threadId: string }>;
}) {
  const { threadId } = await params;

  const thread = await prisma.thread.findFirst({ where: { id: threadId } });
  const user = await prisma.user.findFirst({ where: { id: thread?.authorId } });
  const posts = await prisma.post.findMany({ where: { threadId } });

  return (
    <div className="p-2 space-y-3">
      {thread && user && <ThreadOverview thread={thread} user={user} />}
      {posts.map((post, index) => (
        <PostCard key={post.id} posts={posts} post={post} index={index + 1} />
      ))}
    </div>
  );
}
