import { ThreadCard } from "@/app/components/thread/thread-card";
import { ThreadWithUserAndTags } from "@/types";

type Props = {
  threads: ThreadWithUserAndTags[];
};

export const UserThreadList = ({ threads }: Props) => {
  return (
    <div className="space-y-4">
      {threads.map((thread) => (
        <ThreadCard key={thread.id} thread={thread} />
      ))}
    </div>
  );
};
