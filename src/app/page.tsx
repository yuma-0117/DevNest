import { auth } from "@/lib/auth";

import SignIn from "./components/sign-in-form";
import SignOut from "./components/sign-out-form";

export default async function Home() {
  const session = await auth();

  return (
    <div>
      <div>{session ? <SignOut /> : <SignIn />}</div>
      {session && <div>{JSON.stringify(session, null, 2)}</div>}
    </div>
  );
}
