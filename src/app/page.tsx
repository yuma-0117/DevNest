import { auth } from "@/lib/auth";

import SignIn from "./components/sign-in-form";

export default async function Home() {
  const session = await auth();

  return (
    <div>
      <div>
        <SignIn />
      </div>
      {session && <div>{JSON.stringify(session, null, 2)}</div>}
    </div>
  );
}
