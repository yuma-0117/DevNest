'use client';

import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

export const DescriptionField = () => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea placeholder="Describe your thread" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
