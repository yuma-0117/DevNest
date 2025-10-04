'use client';

import { useFormContext } from 'react-hook-form';
import { FormField } from '@/components/ui/form';
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from '@/components/ui/input';

export const TitleField = () => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="title"
      render={({ field }) => (
        <Field>
          <FieldLabel>Title</FieldLabel>
          <Input placeholder="Thread title" {...field} />
          <FieldError />
        </Field>
      )}
    />
  );
};
