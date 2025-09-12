"use client";

import { useForm } from "react-hook-form";
import z from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { addPostAction } from "../actions";

export const PostForm = ({
  threadId,
  userId,
}: {
  threadId: string;
  userId: string;
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
    await addPostAction(data.content, threadId, userId);
    form.reset();
  };

  return (
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
  );
};
