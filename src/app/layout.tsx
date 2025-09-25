import type { Metadata } from "next";
import "./globals.css";

import { Roboto } from "next/font/google";
import { ThemeProvider } from "./components/theme/theme-provider";

import { Header } from "./components/layout/header";
import { auth } from "@/lib/auth";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "DevNest",
  description: "An internet message board for engineers",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.variable} antialiased min-h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header session={session} />
        </ThemeProvider>
        <main>{children}</main>
      </body>
    </html>
  );
}
