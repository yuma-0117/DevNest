import { PostCard } from "@/app/thread/[threadId]/components/post/post-card";
import { Empty } from "@/components/ui/empty";
import { auth } from "@/lib/auth";
import { PostWithUserAndTagsAndReplies } from "@/types/post";
import { TaggedPost } from "@/types/tag";
import { use } from "react";

interface TaggedPostListProps {
  posts: TaggedPost[];
}

type ReplyWithId = {
  id: string;
};

const adaptTaggedPostToPostWithReplies = (post: TaggedPost): PostWithUserAndTagsAndReplies => {
  return {
    id: post.id,
    content: post.content,
    createAt: post.createAt,
    threadId: post.threadId,
    user: {
      id: post.user.id,
      name: post.user.name,
      image: post.user.image,
      isAnonymous: post.user.isAnonymous,
    },
    tags: post.tags.map((tag) => ({ id: tag.id, name: tag.name })),
    replies: (post.replies as ReplyWithId[]).map((reply) => ({ id: reply.id })),
  };
};

export const TaggedPostList = ({ posts }: TaggedPostListProps) => {
  const session = use(auth());
  const user = session?.user;

  if (posts.length === 0) {
    return <Empty>No posts found.</Empty>;
  }

  return (
    <div className="flex flex-col gap-2">
      {posts.map((post) => (
        <PostCard key={post.id} post={adaptTaggedPostToPostWithReplies(post)} user={user} />
      ))}
    </div>
  );
};
