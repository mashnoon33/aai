"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useSidebar } from "@/context/sidebar-context";
import type { Trial } from "@/data/trial-store";

export function SidebarDetails() {
  const { selectedTrial } = useSidebar();

  if (!selectedTrial) {
    return (
      <div className="text-muted-foreground p-4 text-center">
        Select a trial to view details
      </div>
    );
  }

  const trialFields = Object.keys(selectedTrial).map((key) => ({
    label: key,
    value: selectedTrial[key as keyof Trial],
  }));

  return (
    <ScrollArea className="h-full px-4">
      <header className="mb-6">
        <h1 className="text-primary text-2xl font-bold">
          {selectedTrial["Study Title"]}
        </h1>
      </header>
      <section className="grid grid-cols-1 gap-2">
        {trialFields.map(({ label, value }) => (
          <article key={label} className="">
            <h3 className="text-lg font-medium">{label}</h3>
            <p className="mt-1 text-sm text-gray-600">{value || "N/A"}</p>
          </article>
        ))}
      </section>
    </ScrollArea>
  );
}
