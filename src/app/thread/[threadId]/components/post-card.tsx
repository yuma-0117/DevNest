import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";
import { Session } from "next-auth";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThreadPageData } from "@/types";
import { EditIcon } from "./icons/edit-icon";
import { PostDeleteButton } from "./post-delete-button";

type Post = ThreadPageData["posts"][0];

export const PostCard = ({
  post,
  user,
}: {
  post: Post;
  user: Session["user"] | undefined;
}) => {
  const isAuthor = post.user.id === user?.id;

  return (
    <Card key={post.id}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage
                src={post.user.image ?? ""}
                alt={post.user.name ?? ""}
              />
              <AvatarFallback>{post.user.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-slate-900 dark:text-slate-50">
                {post.user.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {post.createAt.toLocaleDateString()}
              </p>
            </div>
          </div>
          {isAuthor && (
            <div className="flex gap-2">
              <Link href={`/thread/${post.threadId}/post/${post.id}/edit`}>
                <Button variant="edit">
                  <EditIcon />
                </Button>
              </Link>
              <PostDeleteButton postId={post.id} />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <article className="text-gray-700 dark:text-gray-300 prose dark:prose-invert">
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
  );
};
