// Skeleton loading state for the UserDisplay component.
import { Skeleton } from "@/components/ui/skeleton";

export const UserDisplaySkeleton = () => {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[70px]" />
      </div>
    </div>
  );
};
