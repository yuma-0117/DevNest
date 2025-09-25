import { Skeleton } from "@/components/ui/skeleton";

export const ThreadHeaderSkeleton = () => {
  return (
    <header className="mb-8">
      <Skeleton className="h-10 w-3/4 mb-4" />
      <Skeleton className="h-32 w-full mb-4" />
      <div className="flex items-center mt-4 space-x-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[120px]" />
          <Skeleton className="h-4 w-[80px]" />
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-12" />
      </div>
    </header>
  );
};
