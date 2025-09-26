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
        <svg style={{ display: "none" }}>
          <filter id="liquidGlassFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.05"
              numOctaves="3"
              result="turbulence"
            />
            <feGaussianBlur in="turbulence" stdDeviation="5" result="softMap" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="softMap"
              scale="50"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displacement"
            />
          </filter>
        </svg>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header session={session} />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
