import { Button } from "@/components/ui/button";
import { ThreadList } from "./components/thread/thread-list";
import Link from "next/link";

export default function Home() {
  return (
    <div className="p-2">
      <div>
        <Link href="/thread/create">
          <Button>Create Thread</Button>
        </Link>
      </div>
      <div className="max-w-4xl mx-auto">
        <ThreadList />
      </div>
    </div>
  );
}
