import { fetchThreadByIdAction } from "@/lib/actions/thread";
import { ThreadPageData } from "@/types";

import { PostList } from "./components/post-list";
import { ThreadHeader } from "./components/thread-header";

const ThreadPage = async ({
  params,
}: {
  params: Promise<{ threadId: string }>;
}) => {
  const { threadId } = await params;

  const thread: ThreadPageData | null = await fetchThreadByIdAction(threadId);

  if (!thread) {
    return <div>Thread not found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <ThreadHeader thread={thread} />
      <PostList posts={thread.posts} />
    </div>
  );
};

export default ThreadPage;
