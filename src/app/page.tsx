"use client";
import { TrialsDataGrid } from "@/components/data-grid";
import { Sidebar } from "@/components/sidebar";

export default function Home() {
  return (
    <main className="flex h-screen min-h-screen w-full">
      <div className="min-w-0 flex-1 p-2">
        <TrialsDataGrid />
      </div>
      <div className="h-full w-[400px] flex-shrink-0 border-l">
        <Sidebar />
      </div>
    </main>
  );
}
