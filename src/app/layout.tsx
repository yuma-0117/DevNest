import type { Metadata } from "next";
import "./globals.css";

import { SessionProvider } from "next-auth/react";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "./components/theme/theme-provider";

import { Header } from "./components/layout/header";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "DevNest",
  description: "An internet message board for engineers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            <Header />
          </SessionProvider>
        </ThemeProvider>
        <main>{children}</main>
      </body>
    </html>
  );
}
