"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { Suspense } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import SignIn from "../auth/sign-in-form";
import SignOut from "../auth/sign-out-form";
import { ThemeToggle } from "../theme/theme-trigger";
import Link from "next/link";

export const Header = () => {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-between bg-gray-300 dark:bg-gray-700 p-2">
      <div className="flex items-center">
        <Image src="/logo.png" alt="DevNest" width={60} height={60} />
        <Link
          href="/"
          className="text-2xl font-bold text-gray-800 dark:text-gray-200 ml-2"
        >
          DevNest
        </Link>
      </div>
      <div>
        <ThemeToggle />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <div>
          {session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage
                    src={session.user.image ?? ""}
                    alt={session.user.name ?? ""}
                    width={30}
                    height={30}
                  />
                  <AvatarFallback>
                    {session.user.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{session.user.name ?? ""}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <SignOut />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <SignIn />
          )}
        </div>
      </Suspense>
    </div>
  );
};
