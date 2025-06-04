"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { Trial } from "@/lib/load-csv"

type TrialContextType = {
  selectedTrial: Trial | null
  setSelectedTrial: (trial: Trial | null) => void
}

const TrialContext = createContext<TrialContextType | undefined>(undefined)

export function TrialProvider({ children }: { children: ReactNode }) {
  const [selectedTrial, setSelectedTrial] = useState<Trial | null>(null)

  return (
    <TrialContext.Provider value={{ selectedTrial, setSelectedTrial }}>
      {children}
    </TrialContext.Provider>
  )
}

export function useTrial() {
  const context = useContext(TrialContext)
  if (context === undefined) {
    throw new Error("useTrial must be used within a TrialProvider")
  }
  return context
} 