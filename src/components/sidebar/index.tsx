// uses shadcn tabs component

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SidebarDetails } from "./details"
import { SidebarChat } from "./chat"

export function Sidebar() {
  return (
    <Tabs defaultValue="details" className="h-full flex flex-col bg-neutral-100 p-4">
      <TabsList className="w-full flex  bg-neutral-300">
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="chat">Chat</TabsTrigger>
      </TabsList>
      <div className="flex-1 overflow-hidden">
        <TabsContent value="details" className="h-full">
          <SidebarDetails />
        </TabsContent>
        <TabsContent value="chat" className="h-full">
          <SidebarChat />
        </TabsContent>
      </div>
    </Tabs>
  )
}