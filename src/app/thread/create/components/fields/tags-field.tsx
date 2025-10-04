'use client';

import { useFormContext } from 'react-hook-form';
import { FormField } from '@/components/ui/form';
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field";
import { Input } from '@/components/ui/input';

export const TagsField = () => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="tags"
      render={({ field }) => (
        <Field>
          <FieldLabel>Tags (comma-separated)</FieldLabel>
          <Input placeholder="react, nextjs, typescript" {...field} />
          <FieldDescription>
            Tags should be comma-separated.
          </FieldDescription>
          <FieldError />
        </Field>
      )}
    />
  );
};
