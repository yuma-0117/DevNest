import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchAllTagsAction } from "@/lib/actions/tag";
import { fetchThreadByIdAction } from "@/lib/actions/thread";
import { ThreadEditForm } from "./components/thread-edit-form";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";

const EditThreadPage = async ({ params }: { params: { threadId: string } }) => {
  const session = await auth();
  const thread = await fetchThreadByIdAction(params.threadId);

  if (!thread) {
    notFound();
  }

  if (session?.user?.id !== thread.user.id) {
    // Or redirect to an unauthorized page
    notFound();
  }

  const allTags = await fetchAllTagsAction();

  return (
    <div className="container mx-auto py-8 flex justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Edit thread</CardTitle>
        </CardHeader>
        <CardContent>
          <ThreadEditForm allTags={allTags} thread={thread} />
        </CardContent>
      </Card>
    </div>
  );
};

export default EditThreadPage;
