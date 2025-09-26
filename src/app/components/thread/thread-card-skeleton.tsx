import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

import { UserDisplaySkeleton } from "@/components/common/user-display-skeleton";
import { TagListSkeleton } from "@/components/common/tag-list-skeleton";

export const ThreadCardSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <UserDisplaySkeleton />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full" />
      </CardContent>
      <CardFooter>
        <TagListSkeleton />
      </CardFooter>
    </Card>
  );
};
