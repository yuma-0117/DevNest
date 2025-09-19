import { fetchAllPostsAction } from "@/lib/actions/post";
import { fetchAllThreadsAction } from "@/lib/actions/thread";
import { fetchUserByIdAction } from "@/lib/actions/user";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();
  const user = await fetchUserByIdAction(session?.user?.id);
  const threads = await fetchAllThreadsAction();
  const posts = await fetchAllPostsAction();

  return (
    <div>
      <pre>{JSON.stringify(session, null, 4)}</pre>
      <pre>{JSON.stringify(user, null, 4)}</pre>
      <pre>{JSON.stringify(threads, null, 4)}</pre>
      <pre>{JSON.stringify(posts, null, 4)}</pre>
    </div>
  );
}
