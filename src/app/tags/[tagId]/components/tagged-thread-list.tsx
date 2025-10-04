import { ThreadCard } from "@/app/components/thread/thread-card";
import { Empty } from "@/components/ui/empty";
import { TaggedThread } from "@/types/tag";

interface TaggedThreadListProps {
  threads: TaggedThread[];
}

export const TaggedThreadList = ({ threads }: TaggedThreadListProps) => {
  if (threads.length === 0) {
    return <Empty>No threads found.</Empty>;
  }

  return (
    <div className="flex flex-col gap-2">
      {threads.map((thread) => (
        <ThreadCard key={thread.id} thread={thread} />
      ))}
    </div>
  );
};
