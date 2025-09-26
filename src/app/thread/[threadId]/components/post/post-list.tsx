import { ThreadPageData } from "@/types/thread";
import { PostCard } from "./post-card";
import { Session } from "next-auth";

type Posts = ThreadPageData["posts"];

export const PostList = ({
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
        <div className="text-center text-muted-foreground mt-8">
          No posts found. Be the first to reply!
        </div>
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
