import { fetchUserByIdAction } from "@/lib/actions/user";

import { SimplePostCard } from "./simple-post-card";

type Props = {
  posts: NonNullable<Awaited<ReturnType<typeof fetchUserByIdAction>>>["posts"];
};

export const UserPostList = ({ posts }: Props) => {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <SimplePostCard key={post.id} post={post} />
      ))}
    </div>
  );
};
