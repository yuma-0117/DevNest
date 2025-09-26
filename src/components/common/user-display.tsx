// Reusable component to display user avatar, name, and creation timestamp.
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "@/lib/utils";

interface UserDisplayProps {
  user: { name: string | null; image: string | null };
  createAt: Date;
}

export const UserDisplay = ({ user, createAt }: UserDisplayProps) => {
  return (
    <div className="flex items-center space-x-4">
      <Avatar>
        <AvatarImage src={user.image ?? ""} alt={user.name ?? ""} />
        <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <p className="font-semibold text-foreground dark:text-foreground">
          {user.name}
        </p>
        <p className="text-sm text-muted-foreground dark:text-muted-foreground">
          {formatDistanceToNow(createAt)}
        </p>
      </div>
    </div>
  );
};
