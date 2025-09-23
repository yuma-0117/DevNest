import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchUserByIdAction } from "@/lib/actions/user";

import { UserPostList } from "./user-post-list";
import { UserThreadList } from "./user-thread-list";

type Props = {
  userId: string;
};

export const UserProfile = async ({ userId }: Props) => {
  const user = await fetchUserByIdAction(userId);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.image ?? ""} />
              <AvatarFallback>{user.name?.[0]}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl font-bold">{user.name}</CardTitle>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </div>
        </CardHeader>
      </Card>
      <Tabs defaultValue="threads">
        <TabsList>
          <TabsTrigger value="threads">Threads</TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
        </TabsList>
        <TabsContent value="threads">
          <UserThreadList threads={user.threads} />
        </TabsContent>
        <TabsContent value="posts">
          <UserPostList posts={user.posts} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
