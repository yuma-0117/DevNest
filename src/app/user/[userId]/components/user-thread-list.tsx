import { ThreadCard } from "@/app/components/thread/thread-card";
import { Empty, EmptyTitle, EmptyDescription } from "@/components/ui/empty";
import { ItemGroup } from "@/components/ui/item";
import { ThreadWithUserAndTags } from "@/types/thread";

type Props = {
  threads: ThreadWithUserAndTags[];
};

export const UserThreadList = ({ threads }: Props) => {
  if (threads.length === 0) {
    return (
      <Empty>
        <EmptyTitle>No Threads Yet</EmptyTitle>
        <EmptyDescription>This user has not created any threads yet.</EmptyDescription>
      </Empty>
    );
  }

  return (
    <ItemGroup>
      {threads.map((thread) => (
        <ThreadCard key={thread.id} thread={thread} />
      ))}
    </ItemGroup>
  );
};
