import { UserWithThreadsAndPosts } from "@/types/user";

import { SimplePostCard } from "./simple-post-card";
import { Empty, EmptyTitle, EmptyDescription } from "@/components/ui/empty";
import { ItemGroup } from "@/components/ui/item";

type Props = {
  posts: UserWithThreadsAndPosts["posts"];
};

export const UserPostList = ({ posts }: Props) => {
  if (posts.length === 0) {
    return (
      <Empty>
        <EmptyTitle>No Posts Yet</EmptyTitle>
        <EmptyDescription>This user has not made any posts yet.</EmptyDescription>
      </Empty>
    );
  }

  return (
    <ItemGroup>
      {posts.map((post) => (
        <SimplePostCard key={post.id} post={post} />
      ))}
    </ItemGroup>
  );
};
