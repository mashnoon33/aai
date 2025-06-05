"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SidebarDetails } from "./details";
import { SidebarChat } from "./chat";
import { useSidebar } from "@/context/sidebar-context";

export function Sidebar() {
  const { activeTab, setActiveTab } = useSidebar();

  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as "details" | "chat")}
      className="flex h-full w-full flex-1 flex-col bg-neutral-100 py-4"
    >
      <div className="px-4">
        <TabsList className="flex w-full overflow-x-scroll bg-neutral-300">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
        </TabsList>
      </div>
      <div className="flex-1 overflow-hidden">
        <TabsContent value="details" className="h-full">
          <SidebarDetails />
        </TabsContent>
        <TabsContent value="chat" className="h-full">
          <SidebarChat />
        </TabsContent>
      </div>
    </Tabs>
  );
}
