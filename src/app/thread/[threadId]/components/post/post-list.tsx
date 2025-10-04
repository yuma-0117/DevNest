import { ThreadPageData } from "@/types/thread";
import { PostCard } from "./post-card";
import { Empty, EmptyTitle, EmptyDescription } from "@/components/ui/empty";
import { Session } from "next-auth";
import { memo } from "react";

type Posts = ThreadPageData["posts"];

const PostListComponent = ({
  posts,
  user,
}: {
  posts: Posts;
  user: Session["user"] | undefined;
}) => {
  if (posts.length === 0) {
    return (
      <main>
        <h2 className="text-2xl font-bold mb-4 text-foreground dark:text-foreground">
          Posts
        </h2>
        <Empty>
          <EmptyTitle>No Posts Found</EmptyTitle>
          <EmptyDescription>Be the first to reply!</EmptyDescription>
        </Empty>
      </main>
    );
  }

  return (
    <main>
      <h2 className="text-2xl font-bold mb-4 text-foreground dark:text-foreground">
        Posts
      </h2>
      <div className="space-y-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} user={user} />
        ))}
      </div>
    </main>
  );
};

export const PostList = memo(PostListComponent);
