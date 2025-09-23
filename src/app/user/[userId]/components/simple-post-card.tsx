import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { fetchUserByIdAction } from "@/lib/actions/user";

type Props = {
  post: NonNullable<
    Awaited<ReturnType<typeof fetchUserByIdAction>>
  >["posts"][0];
};

export const SimplePostCard = ({ post }: Props) => {
  return (
    <Card>
      <CardHeader>
        <Link href={`/thread/${post.threadId}`}>
          <p className="text-sm text-muted-foreground hover:underline">
            in Thread
          </p>
        </Link>
      </CardHeader>
      <CardContent>
        <article className="prose dark:prose-invert">
          <Markdown remarkPlugins={[remarkGfm]}>{post.content}</Markdown>
        </article>
      </CardContent>
    </Card>
  );
};
