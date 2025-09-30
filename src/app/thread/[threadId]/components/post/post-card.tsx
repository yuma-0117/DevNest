import { Session } from "next-auth";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { fetchPostByIdAction } from "@/lib/actions/post";
import { formatDistanceToNow } from "@/lib/utils";
import { ThreadPageData } from "@/types/thread";

import { EditIcon } from "@/components/icons/edit-icon";
import { ReplyIcon } from "@/components/icons/reply-icon";
import { PostDeleteButton } from "./post-delete-button";
import { supabase } from "@/lib/db/supabase";

type Post = ThreadPageData["posts"][0];

export const PostCard = ({
  post,
  user,
}: {
  post: Post;
  user: Session["user"] | undefined;
}) => {
  const [replies, setReplies] = useState<Post[]>([]);

  const isAuthor = post.user.id === user?.id;

  // Determine display name based on isAnonymous status
  const displayName = post.user.isAnonymous ? "anonymous" : post.user.name;
  // No need for displayImage, AvatarFallback will handle it

  const fetchReplies = useCallback(async () => {
    post.replies.map(async (reply) => {
      const response = await fetchPostByIdAction(reply.id);
      setReplies((prevReplies) => {
        if (response.success) {
          return [...prevReplies, response.data];
        } else {
          console.error("Failed to fetch reply:", response.error);
          return prevReplies;
        }
      });
    });
  }, [post.replies]);

  useEffect(() => {
    const subscription = supabase
      .channel("reply")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "Post",
          filter: `thread_id=eq.${post.threadId}`,
        },
        () => {
          window.location.reload();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [post.id, post.threadId, fetchReplies, replies.length]);

  return (
    <div>
      <Card key={post.id} className="liquid-glass-card liquid-glass-filter">
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center space-x-4">
              {/* Link to user profile, but only if not anonymous */}
              {post.user.isAnonymous ? (
                <Avatar>
                  <AvatarImage src={""} alt={displayName ?? ""} />{" "}
                  {/* src is empty */}
                  <AvatarFallback>
                    {displayName?.charAt(0) ?? "A"}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <Link href={`/user/${post.user.id}`}>
                  <Avatar>
                    <AvatarImage
                      src={post.user.image ?? ""}
                      alt={displayName ?? ""}
                    />
                    <AvatarFallback>
                      {displayName?.charAt(0) ?? "A"}
                    </AvatarFallback>
                  </Avatar>
                </Link>
              )}
              <div>
                {post.user.isAnonymous ? (
                  <p className="font-semibold text-foreground dark:text-foreground">
                    {displayName}
                  </p>
                ) : (
                  <Link href={`/user/${post.user.id}`}>
                    <p className="font-semibold text-foreground dark:text-foreground hover:underline">
                      {displayName}
                    </p>
                  </Link>
                )}
                <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                  {formatDistanceToNow(post.createAt)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {isAuthor && (
                <div className="flex gap-2">
                  <Link href={`/thread/${post.threadId}/post/${post.id}/edit`}>
                    <Button
                      variant="outline"
                      className="bg-secondary/70 backdrop-blur-lg border border-border/50 hover:bg-secondary/80"
                    >
                      <EditIcon className="size-4 sm:mr-2" />
                      <span className="hidden sm:inline">Edit Post</span>
                    </Button>
                  </Link>
                  <PostDeleteButton postId={post.id} />
                </div>
              )}
              <div>
                <Link href={`/thread/${post.threadId}/post/${post.id}/reply`}>
                  <Button
                    variant="outline"
                    className="bg-secondary/70 backdrop-blur-lg border border-border/50 hover:bg-secondary/80"
                  >
                    <ReplyIcon className="size-4 sm:mr-2" />
                    <span className="hidden sm:inline">Reply</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <article className="text-foreground dark:text-muted-foreground prose dark:prose-invert">
            <Markdown remarkPlugins={[remarkGfm]}>{post.content}</Markdown>
          </article>
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
      {post.replies && post.replies.length > 0 && replies.length === 0 && (
        <Button variant="ghost" onClick={fetchReplies}>
          Show replies
        </Button>
      )}
      {replies.length > 0 && (
        <div className="flex flex-col gap-4 mt-4 scale-95">
          {replies.map((reply) => (
            <PostCard key={reply.id} post={reply} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};
