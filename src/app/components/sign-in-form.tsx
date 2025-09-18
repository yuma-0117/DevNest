import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
    >
      <Button type="submit">Sign in with GitHub</Button>
    </form>
  );
}
