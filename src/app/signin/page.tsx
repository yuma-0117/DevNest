"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SignInPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Sign in to DevNest</CardTitle>
          <CardDescription>
            Choose your preferred method to sign in
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => signIn("github", { callbackUrl: "/" })}
          >
            Sign in with GitHub
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => signIn("google", { callbackUrl: "/" })}
          >
            Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInPage;
