import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="space-y-4">
        {/* ThreadHeader Skeleton */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-10 w-24" />
        </div>
        <div className="flex items-center space-x-4 mt-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-48" />
        </div>

        {/* PostList Skeleton */}
        <div className="mt-8 space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;
