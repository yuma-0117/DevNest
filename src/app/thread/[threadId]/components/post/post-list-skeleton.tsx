import { PostCardSkeleton } from "./post-card-skeleton";

export const PostListSkeleton = () => {
  return (
    <main>
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <PostCardSkeleton key={i} />
        ))}
      </div>
    </main>
  );
};
