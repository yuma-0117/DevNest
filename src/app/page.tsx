import Link from "next/link";

import { Button } from "@/components/ui/button";

import { PlusIcon } from "../components/icons/plus-icon";
import { ThreadList } from "./components/thread/thread-list";

export default function Home() {
  return (
    <div className="p-2">
      <div className="max-w-4xl mx-auto">
        <ThreadList />
      </div>
      <div className="fixed bottom-3 right-3">
        <Link href="/thread/create">
          <Button className="rounded-full pr-4 shadow-lg bg-primary/70 backdrop-blur-lg border border-primary/50 hover:bg-primary/80">
            <PlusIcon className="mr-2 size-4" />
            New Thread
          </Button>
        </Link>
      </div>
    </div>
  );
}
