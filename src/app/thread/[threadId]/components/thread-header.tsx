import { Session } from "next-auth";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThreadPageData } from "@/types";

import { EditIcon } from "./icons/edit-icon";
import { ThreadDeleteButton } from "./thread-delete-button";

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
      <div className="prose dark:prose-invert mt-2 max-w-none scale-95 border rounded-md p-4 shadow-md">
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
            className="font-semibold text-foreground dark:text-foreground"
          >
            {thread.user.name}
          </Link>
          <p className="text-sm text-muted-foreground dark:text-muted-foreground">
            {thread.createAt.toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {thread.tags.map((tag) => (
          <Badge key={tag.name} variant="default">
            {tag.name}
          </Badge>
        ))}
      </div>
      {user?.id === thread.user.id && (
        <div className="mt-3 flex gap-2">
          <Link href={`/thread/${thread.id}/edit`}>
            <Button variant="edit">
              <EditIcon />
            </Button>
          </Link>
          <ThreadDeleteButton threadId={thread.id} />
        </div>
      )}
    </header>
  );
};
