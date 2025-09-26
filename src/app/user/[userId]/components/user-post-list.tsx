import { UserWithThreadsAndPosts } from "@/types/user";

import { SimplePostCard } from "./simple-post-card";

type Props = {
  posts: UserWithThreadsAndPosts["posts"];
};

export const UserPostList = ({ posts }: Props) => {
  if (posts.length === 0) {
    return (
      <div className="text-center text-muted-foreground mt-8">
        This user has not made any posts yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <SimplePostCard key={post.id} post={post} />
      ))}
    </div>
  );
};
