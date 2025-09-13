import Link from "next/link";
import { Suspense } from "react";

import { Button } from "@/components/ui/button";

import { ThreadList } from "./components/thread-list";

export default function Home() {
  return (
    <main className="p-2">
      <div className="p-2">
        <Button>
          <Link href="/create-thread">Create Thread</Link>
        </Button>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <ThreadList />
      </Suspense>
    </main>
  );
}
