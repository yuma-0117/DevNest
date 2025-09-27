"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { z } from "zod";

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
import { createPostAction } from "@/lib/actions/post";
import { zodResolver } from "@hookform/resolvers/zod";

import { formSchema } from "./schema";

type Tag = {
  id: string;
  name: string;
};

export const PostCreateForm = ({
  threadId,
  allTags,
}: {
  threadId: string;
  allTags: Tag[];
}) => {
  const [tab, setTab] = useState<"write" | "preview">("write");
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      tags: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const tagsArray = values.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag, index, self) => self.indexOf(tag) === index && tag !== "");

    await createPostAction(values.content, threadId, tagsArray);
    router.push(`/thread/${threadId}`);
    router.refresh();
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
              {form.formState.isSubmitting ? "Creating..." : "Create Post"}
            </Button>
          </form>
        </Form>
      </FormProvider>
      <Button variant="secondary" onClick={() => router.back()}>
        Cancel
      </Button>
    </div>
  );
};
