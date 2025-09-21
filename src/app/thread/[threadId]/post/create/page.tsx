import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { fetchAllTagsAction } from "@/lib/actions/tag";

import { PostCreateForm } from "./components/post-create-form";

const CreatePostPage = async ({
  params,
}: {
  params: Promise<{ threadId: string }>;
}) => {
  const { threadId } = await params;
  const session = await auth();

  if (!session?.user?.id) return null;

  const allTags = await fetchAllTagsAction();

  return (
    <div className="container mx-auto py-8 flex justify-center">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Create a new post</CardTitle>
        </CardHeader>
        <CardContent>
          <PostCreateForm threadId={threadId} allTags={allTags} />
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePostPage;
