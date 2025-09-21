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
          <Button>
            <PlusIcon />
          </Button>
        </Link>
      </div>
    </div>
  );
}
