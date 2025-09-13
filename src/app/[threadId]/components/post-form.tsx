"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Post } from "@prisma/client";

import { addPostAction, updatePostAction } from "../actions";
import { CrossIcon } from "./icons/cross-icon";

export const PostForm = ({
  threadId,
  userId,
  posts,
  editingPost,
  setEditingPost,
}: {
  threadId: string;
  userId: string;
  posts: Post[];
  editingPost: number | false;
  setEditingPost: React.Dispatch<React.SetStateAction<number | false>>;
}) => {
  const formSchema = z.object({
    content: z
      .string()
      .min(1, "Please enter a content")
      .max(255, "Content is too long"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (editingPost) {
      await updatePostAction(posts[editingPost - 1].id, data.content);
    } else {
      await addPostAction(data.content, threadId, userId);
    }
    setEditingPost(false);
    form.reset();
  };

  useEffect(() => {
    if (editingPost) {
      form.reset({
        content: posts[editingPost - 1]?.content || "",
      });
    } else {
      form.reset({
        content: "",
      });
    }
  }, [editingPost, posts, form]);

  return (
    <div>
      {editingPost && (
        <div className="flex items-center justify-between text-center bg-gray-200 dark:bg-gray-600 rounded shadow-md p-2 mr-2 ml-2">
          <span>Editing mode</span>
          <CrossIcon onClick={() => setEditingPost(false)} />
        </div>
      )}
      <Form {...form}>
        <form
          className="flex space-x-2 items-center w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            name="content"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input placeholder="content" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="rounded-full w-10 h-10 p-0">
            ↑
          </Button>
        </form>
      </Form>
    </div>
  );
};
