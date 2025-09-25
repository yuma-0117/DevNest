import { Session } from "next-auth";
import Link from "next/link";
import { useState } from "react";
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
import { ThreadPageData } from "@/types";

import { EditIcon } from "../icons/edit-icon";
import { ReplyIcon } from "../icons/reply-icon";
import { PostDeleteButton } from "./post-delete-button";

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

  const fetchReplies = async () => {
    post.replies.map(async (reply) => {
      const replyData = await fetchPostByIdAction(reply.id);
      setReplies((prevReplies) => {
        if (!replyData) return prevReplies;
        return [...prevReplies, replyData];
      });
    });
  };

  return (
    <div>
      <Card key={post.id} className="bg-card/70 backdrop-blur-lg shadow-lg rounded-xl border border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href={`/user/${post.user.id}`}>
                <Avatar>
                  <AvatarImage
                    src={post.user.image ?? ""}
                    alt={post.user.name ?? ""}
                  />
                  <AvatarFallback>{post.user.name?.charAt(0)}</AvatarFallback>
                </Avatar>
              </Link>
              <div>
                <Link href={`/user/${post.user.id}`}>
                  <p className="font-semibold text-foreground dark:text-foreground hover:underline">
                    {post.user.name}
                  </p>
                </Link>
                <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                  {formatDistanceToNow(post.createAt)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {isAuthor && (
                <div className="flex gap-2">
                  <Link href={`/thread/${post.threadId}/post/${post.id}/edit`}>
                    <Button variant="outline" className="bg-secondary/70 backdrop-blur-lg border border-border/50 hover:bg-secondary/80">
                      <EditIcon className="mr-2 size-4" />
                      Edit Post
                    </Button>
                  </Link>
                  <PostDeleteButton postId={post.id} />
                </div>
              )}
              <div>
                <Link href={`/thread/${post.threadId}/post/${post.id}/reply`}>
                  <Button variant="outline" className="bg-secondary/70 backdrop-blur-lg border border-border/50 hover:bg-secondary/80">
                    <ReplyIcon className="mr-2 size-4" />
                    Reply
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
        <div className="scale-95">
          {replies.map((reply) => (
            <PostCard key={reply.id} post={reply} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};
