"use client";

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
import { fetchPostsByIdsAction } from "@/lib/actions/post";
import { supabase } from "@/lib/db/supabase";
import { formatDistanceToNow } from "@/lib/utils";
import { PostWithUserAndTagsAndReplies } from "@/types/post";

import { EditIcon } from "@/components/icons/edit-icon";
import { ReplyIcon } from "@/components/icons/reply-icon";
import { PostDeleteButton } from "./post-delete-button";

export const PostCard = ({
  post,
  user,
}: {
  post: PostWithUserAndTagsAndReplies;
  user: Session["user"] | undefined;
}) => {
  const [replies, setReplies] = useState<PostWithUserAndTagsAndReplies[]>([]);
  const [showReplies, setShowReplies] = useState(false);

  const isAuthor = post.user.id === user?.id;
  const displayName = post.user.isAnonymous ? "anonymous" : post.user.name;

  const fetchReplies = useCallback(async () => {
    if (post.replies.length === 0) return;
    const replyIds = post.replies.map((reply) => reply.id);
    const response = await fetchPostsByIdsAction(replyIds);
    if (response.success) {
      setReplies(response.data);
    } else {
      console.error("Failed to fetch replies:", response.error);
    }
  }, [post.replies]);

  useEffect(() => {
    // Only subscribe if there are potential replies to listen to
    if (post.replies.length > 0) {
      const channel = supabase.channel(`post-card-${post.id}`);
      channel
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "Post",
            filter: `parent_id=eq.${post.id}`,
          },
          () => {
            // On any change to replies, refetch them
            fetchReplies();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [post.id, post.replies.length, fetchReplies]);

  const handleShowReplies = () => {
    fetchReplies();
    setShowReplies(true);
  };

  return (
    <div>
      <Card key={post.id} className="liquid-glass-card liquid-glass-filter">
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center space-x-4">
              {post.user.isAnonymous ? (
                <Avatar>
                  <AvatarImage src={""} alt={displayName ?? ""} />
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
      {post.replies && post.replies.length > 0 && !showReplies && (
        <Button variant="ghost" onClick={handleShowReplies}>
          Show replies ({post.replies.length})
        </Button>
      )}
      {showReplies && (
        <div className="flex flex-col gap-4 mt-4 pl-4 border-l-2 border-primary/20">
          {replies.map((reply) => (
            <PostCard key={reply.id} post={reply} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};
