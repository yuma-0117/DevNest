import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import * as z from "zod";
import { toast } from "sonner";

import { formSchema } from "@/app/thread/[threadId]/post/create/components/schema";
import { TagSuggestion } from "@/app/thread/create/components/fields/tag-suggestion";
import { TagsField } from "@/app/thread/create/components/fields/tags-field";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { updatePostAction } from "@/lib/actions/post";
import { ThreadPageData } from "@/types/thread";
import { zodResolver } from "@hookform/resolvers/zod";

type Post = ThreadPageData["posts"][0];

type Tag = {
  id: string;
  name: string;
};

export const PostEditForm = ({
  post,
  allTags,
}: {
  post: Post; // Include tags in Post type
  allTags: Tag[];
}) => {
  const [tab, setTab] = useState<"write" | "preview">("write");
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: post.content,
      tags: post.tags.map((tag) => tag.name).join(","), // Populate tags
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const tagsArray = values.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag, index, self) => self.indexOf(tag) === index && tag !== "");

      const response = await updatePostAction(
        post.id,
        values.content,
        tagsArray
      );

      if (response.success) {
        toast.success("Post updated successfully!");
        router.push(`/thread/${post.threadId}`);
        router.refresh();
      } else {
        toast.error(response.message || "Failed to update post.");
      }
    } catch (error) {
      console.error("Failed to update post:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="space-y-8">
      <FormProvider {...form}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex space-x-2 mb-4">
              <Button
                type="button"
                variant={tab === "write" ? "secondary" : "ghost"}
                onClick={() => setTab("write")}
              >
                Write
              </Button>
              <Button
                type="button"
                variant={tab === "preview" ? "secondary" : "ghost"}
                onClick={() => setTab("preview")}
              >
                Preview
              </Button>
            </div>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    {tab === "write" ? (
                      <Textarea
                        placeholder="Write your post content here..."
                        {...field}
                        rows={15}
                      />
                    ) : (
                      <div className="prose dark:prose-invert min-h-[300px] border rounded-md p-4">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {form.getValues("content")}
                        </ReactMarkdown>
                      </div>
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <TagsField />
            <TagSuggestion allTags={allTags} />
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Updating..." : "Update Post"}
            </Button>
          </form>
        </Form>
      </FormProvider>
      <Link href={`/thread/${post.threadId}`}>
        <Button variant="secondary">Cancel</Button>
      </Link>
    </div>
  );
};
