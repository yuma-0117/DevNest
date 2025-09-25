import { ThreadCard } from "@/app/components/thread/thread-card";
import { ThreadWithUserAndTags } from "@/types";

type Props = {
  threads: ThreadWithUserAndTags[];
};

export const UserThreadList = ({ threads }: Props) => {
  if (threads.length === 0) {
    return (
      <div className="text-center text-muted-foreground mt-8">
        This user has not created any threads yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {threads.map((thread) => (
        <ThreadCard key={thread.id} thread={thread} />
      ))}
    </div>
  );
};
