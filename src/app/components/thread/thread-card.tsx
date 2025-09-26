"use client";

import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ThreadWithUserAndTags } from "@/types";
import { formatDistanceToNow } from "@/lib/utils";
import { MessageCircleIcon } from "../icons/message-circle-icon";

export const ThreadCard = ({ thread }: { thread: ThreadWithUserAndTags }) => {
  const { title, description, createAt, user, tags, _count } = thread;

  const router = useRouter();

  return (
    <Card
      className="transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] cursor-pointer liquid-glass-card liquid-glass-filter"
      onClick={() => router.push(`/thread/${thread.id}`)}
    >
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={user.image ?? ""} alt={user.name ?? ""} />
            <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="font-semibold text-foreground dark:text-foreground">
              {user.name}
            </p>
            <p className="text-sm text-muted-foreground dark:text-muted-foreground">
              {formatDistanceToNow(createAt)}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <h2 className="text-3xl font-extrabold text-foreground dark:text-foreground mb-3">
          {title}
        </h2>
        <div className="prose dark:prose-invert mt-2 line-clamp-3">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {description ?? ""}
          </ReactMarkdown>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag.name} variant="secondary">
              {tag.name}
            </Badge>
          ))}
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <MessageCircleIcon className="size-4" />
          <span>{_count.posts}</span>
        </div>
      </CardFooter>
    </Card>
  );
};
