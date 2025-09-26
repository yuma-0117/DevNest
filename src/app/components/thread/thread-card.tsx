"use client";

import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";



import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ThreadWithUserAndTags } from "@/types/thread";

import { TagList } from "@/components/common/tag-list";
import { MessageCircleIcon } from "@/components/icons/message-circle-icon";

import { UserDisplay } from "@/components/common/user-display";

export const ThreadCard = ({ thread }: { thread: ThreadWithUserAndTags }) => {
  const { title, description, createAt, user, tags, _count } = thread;

  const router = useRouter();

  return (
    <Card
      className="transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] cursor-pointer liquid-glass-card liquid-glass-filter"
      onClick={() => router.push(`/thread/${thread.id}`)}
    >
      <CardHeader>
        <UserDisplay user={user} createAt={createAt} />
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
        <TagList tags={tags} />
        <div className="flex items-center gap-1 text-muted-foreground">
          <MessageCircleIcon className="size-4" />
          <span>{_count.posts}</span>
        </div>
      </CardFooter>
    </Card>
  );
};
