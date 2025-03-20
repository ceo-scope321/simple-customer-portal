import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AppSidebar } from "@/layout/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { ThemeButton } from "@/components/ui/ThemeButton";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
// import { MainNav } from "./MainNav";
import { FileText, LayoutDashboard, Settings, Users } from "lucide-react";

export default function AppLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="fixed top-0 z-10 flex h-16 w-full shrink-0 items-center justify-between gap-2 border-b bg-background transition-[width,height] ease-linear peer-data-[collapsible=icon]:w-[calc(100%-var(--sidebar-width-icon))] peer-data-[collapsible=offcanvas]:w-full group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
          <div className="flex items-center gap-2 px-4">
            <ThemeButton />
          </div>
        </header>
        {/* Page Content */}
        <main className="flex-1 pt-16">
          <div className="flex-1 space-y-4 p-4 md:p-8 md:pt-6">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

// export default function AppLayout() {
//   return (
//     <SidebarProvider defaultOpen>
//       <div className="relative flex min-h-screen">
//         {/* Sidebar */}
//         <Sidebar>
//           <SidebarContent className="flex flex-col h-full">
//             <SidebarHeader>
//               <div className="flex h-[60px] items-center px-4">
//                 <div className="flex items-center gap-2">
//                   <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
//                     <span className="text-primary-foreground font-bold text-lg">
//                       A
//                     </span>
//                   </div>
//                   <span className="font-semibold text-lg">Acme Inc</span>
//                 </div>
//               </div>
//             </SidebarHeader>

//             <SidebarSeparator />

//             <div className="flex-1 overflow-auto">
//               <MainNav />

//               <SidebarSeparator className="my-4" />

//               <SidebarMenu>
//                 <SidebarMenuItem>
//                   <SidebarMenuButton asChild tooltip="Documentation">
//                     <a href="#">
//                       <FileText className="h-4 w-4" />
//                       <span>Documentation</span>
//                     </a>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//                 <SidebarMenuItem>
//                   <SidebarMenuButton asChild tooltip="Projects">
//                     <a href="#">
//                       <LayoutDashboard className="h-4 w-4" />
//                       <span>Projects</span>
//                     </a>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//                 <SidebarMenuItem>
//                   <SidebarMenuButton asChild tooltip="Team">
//                     <a href="#">
//                       <Users className="h-4 w-4" />
//                       <span>Team</span>
//                     </a>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               </SidebarMenu>
//             </div>

//             <SidebarFooter>
//               <div className="p-4 border-t border-border">
//                 <div className="flex items-center gap-2">
//                   <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
//                     <span className="font-medium text-sm">JD</span>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium">John Doe</p>
//                     <p className="text-xs text-muted-foreground">
//                       Administrator
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </SidebarFooter>
//           </SidebarContent>
//         </Sidebar>

//         {/* Main Content */}
//         <div className="flex flex-col flex-1 min-h-screen">
//           {/* Fixed Header */}

//           <main className="flex-1">
//             <div className="flex-1 space-y-4 p-8 pt-6">
//               <Outlet />
//             </div>
//           </main>
//         </div>

//         <Toaster />
//       </div>
//     </SidebarProvider>
//   );
// }
