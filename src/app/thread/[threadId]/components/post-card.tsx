import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ThreadOverView } from "@/types";

type Post = ThreadOverView["posts"][0];

export const PostCard = ({ post }: { post: Post }) => {
  return (
    <Card key={post.id}>
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={post.user.image ?? ""} alt={post.user.name ?? ""} />
            <AvatarFallback>{post.user.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-slate-900 dark:text-slate-50">{post.user.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {post.createAt.toLocaleDateString()}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 dark:text-gray-300">{post.content}</p>
      </CardContent>
      {post.tags && post.tags.length > 0 && (
        <CardFooter>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag.name} variant="default">
                {tag.name}
              </Badge>
            ))}
          </div>
        </CardFooter>
      )}
    </Card>
  );
};