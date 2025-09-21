"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { formSchema } from "./schema";
import { createThreadAction } from "@/lib/actions/thread";
import { TitleField } from "./fields/title-field";
import { DescriptionField } from "./fields/description-field";
import { TagsField } from "./fields/tags-field";
import { TagSuggestion } from "./fields/tag-suggestion";

type Tag = {
  id: string;
  name: string;
};

interface ThreadCreateFormProps {
  allTags: Tag[];
}

export const ThreadCreateForm = ({ allTags }: ThreadCreateFormProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      tags: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (values.tags.charAt(values.tags.length - 1) == ",") {
      values.tags = values.tags.slice(0, -1);
    }

    const tagsArray = values.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag, index, self) => self.indexOf(tag) === index && tag !== " ");

    const newThread = await createThreadAction(
      values.title,
      values.description,
      tagsArray
    );

    if (newThread) {
      router.push(`/thread/${newThread.id}`);
    }
  };

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <TitleField />
          <DescriptionField />
          <TagsField />
          <TagSuggestion allTags={allTags} />
          <Button type="submit">Create Thread</Button>
        </form>
      </Form>
    </FormProvider>
  );
};
