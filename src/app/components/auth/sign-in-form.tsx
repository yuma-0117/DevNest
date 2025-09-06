import { signIn } from "@/lib/auth";

export const SignInForm = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
    >
      <button type="submit">Sign in with GitHub</button>
    </form>
  );
};
