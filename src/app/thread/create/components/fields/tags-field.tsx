'use client';

import { useFormContext } from 'react-hook-form';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export const TagsField = () => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="tags"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Tags (comma-separated)</FormLabel>
          <FormControl>
            <Input placeholder="react, nextjs, typescript" {...field} />
          </FormControl>
          <FormDescription>
            Tags should be comma-separated.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
