import { notFound } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchPostByIdAction } from "@/lib/actions/post";
import { fetchAllTagsAction } from "@/lib/actions/tag";
import { auth } from "@/lib/auth";

import { PostReplyForm } from "./components/post-reply-form";

const ReplyPostPage = async ({
  params,
}: {
  params: Promise<{ postId: string }>;
}) => {
  const session = await auth();
  const post = await fetchPostByIdAction((await params).postId);
  const allTags = await fetchAllTagsAction();

  if (!post) {
    notFound();
  }

  if (session?.user?.id !== post.user.id) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 flex justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Reply post</CardTitle>
        </CardHeader>
        <CardContent>
          <PostReplyForm post={post} allTags={allTags} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ReplyPostPage;
