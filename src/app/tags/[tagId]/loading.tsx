import { ThreadCardSkeleton } from "@/app/components/thread/thread-card-skeleton";

const Loading = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold"></h1>
      <div className="flex flex-col gap-2">
        <ThreadCardSkeleton />
        <ThreadCardSkeleton />
        <ThreadCardSkeleton />
      </div>
    </div>
  );
};

export default Loading;
