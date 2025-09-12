"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import { createThreadAction } from "../actions";
import Link from "next/link";

export const ThreadForm = ({ userId }: { userId: string }) => {
  const router = useRouter();

  const formSchema = z.object({
    title: z.string().min(0, "Please enter thread title"),
    content: z.string().min(0, "Please enter thread content"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const newThread = await createThreadAction(
      values.title,
      values.content,
      userId
    );
    console.log(newThread);

    if (newThread) {
      router.push(`/${newThread.id}`);
      form.reset();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 h-screen">
      <Form {...form}>
        <form
          className="flex flex-col items-center justify-center space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center justify-center space-y-2">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center justify-center space-y-2">
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Input placeholder="Content" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">create thread</Button>
        </form>
      </Form>
      <Button variant="secondary">
        <Link href="/">cancel</Link>
      </Button>
    </div>
  );
};
