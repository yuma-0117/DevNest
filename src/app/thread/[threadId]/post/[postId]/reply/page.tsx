import { notFound } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchPostByIdAction } from "@/lib/actions/post";
import { fetchAllTagsAction } from "@/lib/actions/tag";


import { PostReplyForm } from "./components/post-reply-form";

const ReplyPostPage = async ({
  params,
}: {
  params: Promise<{ postId: string }>;
}) => {
  const postId = (await params).postId;
  const postResponse = await fetchPostByIdAction(postId);

  if (!postResponse.success) {
    console.error("Failed to fetch post:", postResponse.error);
    notFound();
  }
  const post = postResponse.data;

  const allTagsResponse = await fetchAllTagsAction();
  if (!allTagsResponse.success) {
    console.error("Failed to fetch tags:", allTagsResponse.error);
    notFound();
  }
  const allTags = allTagsResponse.data;

  return (
    <div className="container mx-auto py-8 flex justify-center">
      <Card className="w-full max-w-2xl liquid-glass-card">
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
