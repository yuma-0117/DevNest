// src/app/components/auth/session-provider-wrapper.tsx
"use client";

import { SessionProvider } from "next-auth/react";

interface SessionProviderWrapperProps {
  children: React.ReactNode;
}

export const SessionProviderWrapper = ({ children }: SessionProviderWrapperProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};
