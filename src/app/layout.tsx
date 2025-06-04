"use client"
import "@/styles/globals.css";

import { Geist } from "next/font/google";

import { TrialProvider } from "@/context/trial-context";
import { TRPCReactProvider } from "@/trpc/react";


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
          <TrialProvider>
            {children}
          </TrialProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
