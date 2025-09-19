import { fetchThreadByIdAction } from "@/lib/actions/thread";
import { ThreadHeader } from "./components/thread-header";
import { PostList } from "./components/post-list";
import { ThreadPageData } from "@/types";

const ThreadPage = async ({ params }: { params: { threadId: string } }) => {
  const thread: ThreadPageData | null = await fetchThreadByIdAction(
    params.threadId
  );

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