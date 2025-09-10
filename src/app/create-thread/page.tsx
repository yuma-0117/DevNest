import { auth } from "@/lib/auth";
import { ThreadForm } from "./components/thread-form";

export default async function CreateThreadPage() {
  const session = await auth();

  return (
    <div>
      <ThreadForm userId={session?.user?.id || ""} />
    </div>
  );
}
