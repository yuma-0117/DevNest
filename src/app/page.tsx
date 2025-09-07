import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();

  return (
    <main>
      <h1>Hello World</h1>
      {session?.user && <div>{JSON.stringify(session)}</div>}
    </main>
  );
}
