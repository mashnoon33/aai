"use client";

import type { Trial } from "@/data/trial-store";
import { createContext, useContext, useState, type ReactNode } from "react";

type SidebarTab = "details" | "chat";

type SidebarContextType = {
  activeTab: SidebarTab;
  setActiveTab: (tab: SidebarTab) => void;
  selectedTrial: Trial | null;
  setSelectedTrial: (trial: Trial | null) => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<SidebarTab>("details");
  const [selectedTrial, setSelectedTrial] = useState<Trial | null>(null);
  return (
    <SidebarContext.Provider
      value={{ activeTab, setActiveTab, selectedTrial, setSelectedTrial }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
