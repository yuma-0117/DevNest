import Link from "next/link";

import { Button } from "@/components/ui/button";
import { fetchThreadByIdAction } from "@/lib/actions/thread";
import { auth } from "@/lib/auth";
import { ThreadPageData } from "@/types";

import { PlusIcon } from "../../../components/icons/plus-icon";
import { PostList } from "./components/post/post-list";
import { ThreadHeader } from "./components/thread/thread-header";

const ThreadPage = async ({
  params,
}: {
  params: Promise<{ threadId: string }>;
}) => {
  const { threadId } = await params;
  const session = await auth();

  const thread: ThreadPageData | null = await fetchThreadByIdAction(threadId);

  if (!thread) {
    return <div>Thread not found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <ThreadHeader thread={thread} user={session?.user} />
      <PostList posts={thread.posts} user={session?.user} />
      <Link
        href={`/thread/${threadId}/post/create`}
        className="fixed bottom-3 right-3"
      >
        <Button className="rounded-full size-14" asChild>
          <PlusIcon />
        </Button>
      </Link>
    </div>
  );
};

export default ThreadPage;
