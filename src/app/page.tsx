import { auth } from "@/lib/auth";
import { SignOutForm } from "./components/auth/sign-out-form";
import { SignInForm } from "./components/auth/sign-in-form";

export default async function Home() {
  const session = await auth();

  return (
    <main>
      <h1>Hello World</h1>
      {session?.user ? <SignOutForm /> : <SignInForm />}
      {session?.user && <div>{JSON.stringify(session)}</div>}
    </main>
  );
}
