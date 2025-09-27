// src/app/components/thread/thread-card.tsx
"use client";

import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useSession } from "next-auth/react"; // New import
import { useTransition } from "react"; // New import
import clsx from "clsx"; // New import for conditional class names

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ThreadWithUserAndTags } from "@/types/thread";

import { TagList } from "@/components/common/tag-list";
import { MessageCircleIcon } from "@/components/icons/message-circle-icon";
import { PinIcon } from "@/components/icons/pin-icon";
import { Button } from "@/components/ui/button";

import { UserDisplay } from "@/components/common/user-display";
import { updateThreadPinnedStatusAction } from "@/lib/actions/thread";
// import { toast } from "sonner"; // Assuming sonner is used for toasts

export const ThreadCard = ({ thread, isPinnedCard }: { thread: ThreadWithUserAndTags; isPinnedCard?: boolean }) => {
  const { title, description, createAt, user, tags, _count, id, isPinned } = thread;

  const router = useRouter();
  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition();

  const isAuthor = session?.user?.id === user.id;

  const handlePinToggle = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click from triggering
    startTransition(async () => {
      const response = await updateThreadPinnedStatusAction(id, !isPinned);
      if (response.success) {
        alert(`Thread ${!isPinned ? "pinned" : "unpinned"} successfully!`);
        router.refresh();
      } else {
        alert(response.error || "Failed to update pin status.");
      }
    });
  };

  return (
    <Card
      className={clsx(
        "transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] cursor-pointer liquid-glass-card liquid-glass-filter",
        isPinnedCard && "border-2 border-primary ring-2 ring-primary/50" // Distinct style for pinned cards
      )}
      onClick={() => router.push(`/thread/${thread.id}`)}
    >
      <CardHeader>
        <div className="flex justify-between items-start">
          <UserDisplay user={user} createAt={createAt} />
          {isAuthor && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePinToggle}
              disabled={isPending}
              className="text-muted-foreground hover:text-foreground"
            >
              <PinIcon className={`size-5 ${isPinned ? "text-primary" : ""}`} />
            </Button>
          )}
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
        <TagList tags={tags} />
        <div className="flex items-center gap-1 text-muted-foreground">
          <MessageCircleIcon className="size-4" />
          <span>{_count.posts}</span>
        </div>
      </CardFooter>
    </Card>
  );
};
