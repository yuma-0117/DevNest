'use client';

import { Button } from '@/components/ui/button';
import { deleteThreadAction } from '@/lib/actions/thread';
import { useRouter } from 'next/navigation';
import { DeleteIcon } from './icons/delete-icon';

interface ThreadDeleteButtonProps {
  threadId: string;
}

export const ThreadDeleteButton = ({ threadId }: ThreadDeleteButtonProps) => {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this thread?'
    );
    if (confirmed) {
      const result = await deleteThreadAction(threadId);
      if (result) {
        router.push('/');
      } else {
        alert('Failed to delete the thread.');
      }
    }
  };

  return (
    <Button variant="delete" onClick={handleDelete}>
      <DeleteIcon />
    </Button>
  );
};
