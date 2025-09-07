import { auth } from "@/lib/auth";
import { ThreadList } from "./components/thread-list";

export default async function Home() {
  const session = await auth();

  return (
    <main className="p-2">
      <ThreadList />
    </main>
  );
}
