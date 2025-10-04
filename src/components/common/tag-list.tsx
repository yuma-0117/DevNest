import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface TagListProps {
  tags: { id: string; name: string }[];
}

export const TagList = ({ tags }: TagListProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Link key={tag.id} href={`/tags/${tag.id}`}>
          <Badge variant="secondary">{tag.name}</Badge>
        </Link>
      ))}
    </div>
  );
};