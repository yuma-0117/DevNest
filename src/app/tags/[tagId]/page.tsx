import { fetchThreadsAndPostsByTagAction } from "@/lib/actions/tag";
import { notFound } from "next/navigation";
import { TaggedThreadList } from "./components/tagged-thread-list";
import { TaggedPostList } from "./components/tagged-post-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TagPage = async ({ params }: { params: { tagId: string } }) => {
  const { tagId } = params;
  const response = await fetchThreadsAndPostsByTagAction(tagId);

  if (!response.success || !response.data) {
    return notFound();
  }

  const { threads, posts, tagName } = response.data;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">#{tagName}</h1>
      <Tabs defaultValue="threads" className="w-full">
        <TabsList>
          <TabsTrigger value="threads">Threads</TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
        </TabsList>
        <TabsContent value="threads">
          <TaggedThreadList threads={threads} />
        </TabsContent>
        <TabsContent value="posts">
          <TaggedPostList posts={posts} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TagPage;
