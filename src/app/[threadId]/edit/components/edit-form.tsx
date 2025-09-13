"use client";

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
import { Thread } from "@prisma/client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateThreadAction } from "../actions";
import { useRouter } from "next/navigation";
import { DeleteDialog } from "./delete-dialog";

export const EditForm = ({ thread }: { thread: Thread }) => {
  const router = useRouter();

  const formSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    content: z.string().min(1, { message: "Content is required" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: thread.title, content: thread.content },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await updateThreadAction(thread.id, data.title, data.content);
    router.push(`/${thread.id}`);
  };

  return (
    <div className="flex flex-col items-center justify-center p-2 space-y-3 rounded shadow-md h-screen">
      <Form {...form}>
        <form
          className="flex flex-col items-center justify-center space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="content"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <DeleteDialog thread={thread} />
      <Button variant="secondary">
        <Link href={`/${thread.id}`}>Cancel</Link>
      </Button>
    </div>
  );
};
