"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { formSchema } from "@/app/thread/create/components/schema";
import { updateThreadAction } from "@/lib/actions/thread";
import { TitleField } from "@/app/thread/create/components/fields/title-field";
import { DescriptionField } from "@/app/thread/create/components/fields/description-field";
import { TagsField } from "@/app/thread/create/components/fields/tags-field";
import { TagSuggestion } from "@/app/thread/create/components/fields/tag-suggestion";
import { ThreadPageData } from "@/types/thread";

type Tag = {
  id: string;
  name: string;
};

interface ThreadEditFormProps {
  allTags: Tag[];
  thread: ThreadPageData;
}

export const ThreadEditForm = ({ allTags, thread }: ThreadEditFormProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: thread.title,
      description: thread.description ?? "",
      tags: thread.tags.map((tag) => tag.name).join(","),
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (values.tags.charAt(values.tags.length - 1) === ",") {
      values.tags = values.tags.slice(0, -1);
    }

    const tagsArray = values.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag, index, self) => self.indexOf(tag) === index && tag !== "");

    const response = await updateThreadAction(
      thread.id,
      values.title,
      values.description,
      tagsArray
    );

    if (response.success) {
      router.push(`/thread/${response.data.id}`);
    } else {
      console.error("Failed to update thread:", response.error);
      // Optionally, display an error message to the user
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
          <div className="flex gap-4">
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Updating..." : "Update Thread"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </FormProvider>
  );
};
