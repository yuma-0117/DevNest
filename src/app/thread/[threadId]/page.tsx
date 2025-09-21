import Link from "next/link";

import { Button } from "@/components/ui/button";
import { fetchThreadByIdAction } from "@/lib/actions/thread";
import { ThreadPageData } from "@/types";

import { PlusIcon } from "../../../components/icons/plus-icon";
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
      <Link
        href={`/thread/${threadId}/post/create`}
        className="fixed bottom-3 right-3"
      >
        <Button className="rounded-full">
          <PlusIcon />
        </Button>
      </Link>
    </div>
  );
};

export default ThreadPage;
