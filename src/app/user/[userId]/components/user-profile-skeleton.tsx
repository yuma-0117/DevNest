import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const UserProfileSkeleton = () => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Skeleton className="h-20 w-20 rounded-full" />
            <div>
              <CardTitle className="text-2xl font-bold">
                <Skeleton className="h-6 w-32" />
              </CardTitle>
              <div className="text-muted-foreground">
                <Skeleton className="h-4 w-48 mt-2" />
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>
      <Tabs defaultValue="threads">
        <TabsList>
          <TabsTrigger value="threads">
            <Skeleton className="h-5 w-20" />
          </TabsTrigger>
          <TabsTrigger value="posts">
            <Skeleton className="h-5 w-20" />
          </TabsTrigger>
        </TabsList>
        {/* Content skeletons can be added here if needed for each tab */}
      </Tabs>
    </div>
  );
};
