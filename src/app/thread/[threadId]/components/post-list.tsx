import { ThreadPageData } from "@/types";
import { PostCard } from "./post-card";

type Posts = ThreadPageData["posts"];

export const PostList = ({ posts }: { posts: Posts }) => {
  return (
    <main>
      <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-50">
        Posts
      </h2>
      <div className="space-y-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
};
