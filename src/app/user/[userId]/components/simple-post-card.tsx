import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { fetchUserByIdAction } from "@/lib/actions/user";
import { formatDistanceToNow } from "@/lib/utils";

type Props = {
  post: NonNullable<
    Awaited<ReturnType<typeof fetchUserByIdAction>>
  >["posts"][0];
};

export const SimplePostCard = ({ post }: Props) => {
  return (
    <Card className="liquid-glass-card liquid-glass-filter">
      <CardHeader>
        <Link href={`/thread/${post.threadId}`}>
          <p className="text-sm text-muted-foreground hover:underline">
            {post.thread.title}
          </p>
        </Link>
        <p className="text-xs text-muted-foreground">
          {formatDistanceToNow(post.createAt)}
        </p>
      </CardHeader>
      <CardContent>
        <article className="prose dark:prose-invert">
          <Markdown remarkPlugins={[remarkGfm]}>{post.content}</Markdown>
        </article>
      </CardContent>
    </Card>
  );
};
