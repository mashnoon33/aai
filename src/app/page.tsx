"use client"
import { TrialsDataGrid } from "@/components/data-grid";
import { Sidebar } from "@/components/sidebar";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full h-screen">
      <div className="flex-1 min-w-0 ">
        <TrialsDataGrid />
      </div>
      <div className="w-[400px] flex-shrink-0 border-l h-full">
        <Sidebar />
      </div>
    </main>
  );
}
