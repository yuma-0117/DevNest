import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ThreadPageData } from "@/types";

export const ThreadHeader = ({ thread }: { thread: ThreadPageData }) => {
  return (
    <header className="mb-8">
      <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50">{thread.title}</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">{thread.description}</p>
      <div className="flex items-center mt-4 space-x-4">
        <Avatar>
          <AvatarImage src={thread.user.image ?? ""} alt={thread.user.name ?? ""} />
          <AvatarFallback>{thread.user.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-slate-900 dark:text-slate-50">{thread.user.name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {thread.createAt.toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {thread.tags.map((tag) => (
          <Badge key={tag.name} variant="default">
            {tag.name}
          </Badge>
        ))}
      </div>
    </header>
  );
};