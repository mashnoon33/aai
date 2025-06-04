"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { useTrial } from "../../../context/trial-context"

export function SidebarDetails() {
  const { selectedTrial } = useTrial()

  if (!selectedTrial) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        Select a trial to view details
      </div>
    )
  }

  return (
      <ScrollArea className="space-y-4 h-full">
            <h1 className="text-2xl font-bold">{selectedTrial["Study Title"]}</h1>
            <div>
              <h3 className="font-semibold">NCT Number</h3>
              <p>{selectedTrial["NCT Number"]}</p>
            </div>
            <div>
              <h3 className="font-semibold">Status</h3>
              <p>{selectedTrial["Study Status"]}</p>
            </div>
            <div>
              <h3 className="font-semibold">Brief Summary</h3>
              <p className="whitespace-pre-wrap">{selectedTrial["Brief Summary"]}</p>
            </div>
            <div>
              <h3 className="font-semibold">Conditions</h3>
              <p>{selectedTrial.Conditions}</p>
            </div>
            <div>
              <h3 className="font-semibold">Interventions</h3>
              <p>{selectedTrial.Interventions}</p>
            </div>
            <div>
              <h3 className="font-semibold">Sponsor</h3>
              <p>{selectedTrial.Sponsor}</p>
            </div>
            <div>
              <h3 className="font-semibold">Study Type</h3>
              <p>{selectedTrial["Study Type"]}</p>
            </div>
            <div>
              <h3 className="font-semibold">Study Design</h3>
              <p>{selectedTrial["Study Design"]}</p>
            </div>
            <div>
              <h3 className="font-semibold">Enrollment</h3>
              <p>{selectedTrial.Enrollment}</p>
            </div>
            <div>
              <h3 className="font-semibold">Dates</h3>
              <p>Start: {selectedTrial["Start Date"]}</p>
              <p>Completion: {selectedTrial["Completion Date"]}</p>
            </div>
      </ScrollArea>
  )
}