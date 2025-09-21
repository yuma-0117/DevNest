'use client';

import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const DescriptionField = () => {
  const { control, watch } = useFormContext();
  const [tab, setTab] = useState<'write' | 'preview'>('write');
  const description = watch('description');

  return (
    <FormField
      control={control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Description</FormLabel>
          <div className="flex gap-2 mb-2">
            <Button
              type="button"
              variant={tab === 'write' ? 'secondary' : 'ghost'}
              onClick={() => setTab('write')}
            >
              Write
            </Button>
            <Button
              type="button"
              variant={tab === 'preview' ? 'secondary' : 'ghost'}
              onClick={() => setTab('preview')}
            >
              Preview
            </Button>
          </div>
          <FormControl>
            <div>
              {tab === 'write' ? (
                <Textarea
                  placeholder="Describe your thread in Markdown"
                  {...field}
                />
              ) : (
                <div className="prose dark:prose-invert p-3 min-h-[120px] rounded-md border border-input bg-background">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {description || 'Nothing to preview'}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
