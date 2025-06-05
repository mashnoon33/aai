"use client";
import "@/styles/globals.css";

import { Geist } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { SidebarProvider } from "@/context/sidebar-context";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <TRPCReactProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
