"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { z } from "zod";

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

export const PostCreateForm = ({
  threadId,
  userId,
}: {
  threadId: string;
  userId: string;
}) => {
  const [tab, setTab] = useState<"write" | "preview">("write");
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!userId) {
      console.log("no session");
      return;
    }
    await createPostAction(values.content, userId, threadId);
    router.push(`/thread/${threadId}`);
    router.refresh();
  };

  return (
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
        <Button type="submit">Create Post</Button>
      </form>
    </Form>
  );
};
