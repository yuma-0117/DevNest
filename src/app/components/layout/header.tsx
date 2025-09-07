import { SignInForm } from "@/app/components/auth/sign-in-form";
import { SignOutForm } from "@/app/components/auth/sign-out-form";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth } from "@/lib/auth";
import { ThemeToggle } from "../theme/theme-toggle";

export const Header = async () => {
  const session = await auth();

  return (
    <div className="flex justify-between items-center p-4 bg-gray-400 dark:bg-gray-600">
      <span className="flex-3 text-3xl font-bold">DevNest</span>
      <div className="flex flex-2 items-center justify-between">
        <ThemeToggle />
        {!session?.user && <SignInForm />}
        {session?.user?.image && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage
                  src={session.user.image}
                  alt={session.user.name ?? ""}
                />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
              <DropdownMenuItem>{session.user.email}</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <SignOutForm />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};
