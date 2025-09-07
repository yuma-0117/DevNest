import { signOut } from "@/lib/auth";
import { LogoutIcon } from "../icons/logout-icon";

export const SignOutForm = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button type="submit" className="flex items-center">
        <LogoutIcon />
        <span>Sign out</span>
      </button>
    </form>
  );
};
