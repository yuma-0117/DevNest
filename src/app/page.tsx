import { Button } from "@/components/ui/button";
import { ThreadList } from "./components/thread-list";
import Link from "next/link";

export default function Home() {
  return (
    <main className="p-2">
      <div className="p-2">
        <Button>
          <Link href="/create-thread">Create Thread</Link>
        </Button>
      </div>
      <ThreadList />
    </main>
  );
}
