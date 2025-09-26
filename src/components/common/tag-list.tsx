// Reusable component to display a list of tags.
import { Badge } from "@/components/ui/badge";

interface TagListProps {
  tags: { name: string }[];
}

export const TagList = ({ tags }: TagListProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge key={tag.name} variant="secondary">
          {tag.name}
        </Badge>
      ))}
    </div>
  );
};
