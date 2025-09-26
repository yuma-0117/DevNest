// Skeleton loading state for the TagList component.
import { Skeleton } from "@/components/ui/skeleton";

export const TagListSkeleton = () => {
  return (
    <div className="flex flex-wrap gap-2">
      <Skeleton className="h-6 w-16" />
      <Skeleton className="h-6 w-20" />
    </div>
  );
};
