import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchAllTagsAction } from "@/lib/actions/tag";
import { ThreadCreateForm } from "./components/thread-create-form";

const CreateThreadPage = async () => {
  const allTagsResponse = await fetchAllTagsAction();
  if (!allTagsResponse.success) {
    console.error("Failed to fetch tags:", allTagsResponse.error);
    return null;
  }
  const allTags = allTagsResponse.data;

  return (
    <div className="container mx-auto py-8 flex justify-center">
      <Card className="w-full max-w-2xl liquid-glass-card">
        <CardHeader>
          <CardTitle>Create a new thread</CardTitle>
        </CardHeader>
        <CardContent>
          <ThreadCreateForm allTags={allTags} />
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateThreadPage;