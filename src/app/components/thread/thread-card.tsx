import { useRouter } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ThreadWithUserAndTags } from "@/types";

export const ThreadCard = ({ thread }: { thread: ThreadWithUserAndTags }) => {
  const { title, description, createAt, user, tags } = thread;

  const router = useRouter();

  return (
    <Card
      className="transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]"
      onClick={() => router.push(`/thread/${thread.id}`)}
    >
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={user.image ?? ""} alt={user.name ?? ""} />
            <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="font-semibold text-slate-900 dark:text-slate-50">
              {user.name}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {createAt.toLocaleDateString()}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
          {title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2 truncate">
          {description}
        </p>
      </CardContent>
      <CardFooter>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag.name} variant="default">
              {tag.name}
            </Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};
