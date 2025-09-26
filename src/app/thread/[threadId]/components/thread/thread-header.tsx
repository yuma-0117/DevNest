import { Session } from "next-auth";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThreadPageData } from "@/types/thread";
import { formatDistanceToNow } from "@/lib/utils";

import { EditIcon } from "@/components/icons/edit-icon";

export const ThreadHeader = ({
  thread,
  user,
}: {
  thread: ThreadPageData;
  user: Session["user"] | undefined;
}) => {
  return (
    <header className="mb-8">
      <h1 className="text-4xl font-bold text-foreground dark:text-foreground">
        {thread.title}
      </h1>
      <div className="prose dark:prose-invert mt-2 max-w-none p-4 liquid-glass-card liquid-glass-filter">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {thread.description ?? ""}
        </ReactMarkdown>
      </div>
      <div className="flex items-center mt-4 space-x-4">
        <Link href={`/user/${thread.user.id}`}>
          <Avatar>
            <AvatarImage
              src={thread.user.image ?? ""}
              alt={thread.user.name ?? ""}
            />
            <AvatarFallback>{thread.user.name?.charAt(0)}</AvatarFallback>
          </Avatar>
        </Link>
        <div>
          <Link
            href={`/user/${thread.user.id}`}
            className="font-semibold text-foreground dark:text-foreground hover:underline"
          >
            {thread.user.name}
          </Link>
          <p className="text-sm text-muted-foreground dark:text-muted-foreground">
            {formatDistanceToNow(thread.createAt)}
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {thread.tags.map((tag) => (
          <Badge key={tag.name} variant="secondary">
            {tag.name}
          </Badge>
        ))}
      </div>
      {user?.id === thread.user.id && (
        <div className="mt-3 flex gap-2">
          <Link href={`/thread/${thread.id}/edit`}>
            <Button variant="outline" className="bg-secondary/70 backdrop-blur-lg border border-border/50 hover:bg-secondary/80">
              <EditIcon className="mr-2 size-4" />
              Edit Thread
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
};
