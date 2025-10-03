import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileEditLoading() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-8 w-36" />
        <Skeleton className="mt-2 h-4 w-80" />
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">
              <Skeleton className="h-4 w-20" />
            </Label>
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">
              <Skeleton className="h-4 w-10" />
            </Label>
            <Skeleton className="h-32 w-full" />
          </div>
          <div className="flex justify-end gap-4">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-28" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}