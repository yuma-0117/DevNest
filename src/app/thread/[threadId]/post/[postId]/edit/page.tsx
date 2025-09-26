import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchPostByIdAction } from "@/lib/actions/post";
import { notFound } from "next/navigation";
import { PostEditForm } from "./components/post-edit-form";
import { auth } from "@/lib/auth";
import { fetchAllTagsAction } from "@/lib/actions/tag";

const EditPostPage = async ({
  params,
}: {
  params: Promise<{ postId: string }>;
}) => {
  const session = await auth();
  const postId = (await params).postId;
  const postResponse = await fetchPostByIdAction(postId);

  if (!postResponse.success) {
    console.error("Failed to fetch post:", postResponse.error);
    notFound();
  }
  const post = postResponse.data;

  if (session?.user?.id !== post.user.id) {
    notFound();
  }

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
          <CardTitle>Edit post</CardTitle>
        </CardHeader>
        <CardContent>
          <PostEditForm post={post} allTags={allTags} />
        </CardContent>
      </Card>
    </div>
  );
};

export default EditPostPage;
