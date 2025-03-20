"use client";

import * as React from "react";
import { useLocation } from "react-router-dom";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Home,
  Users,
  CheckSquare,
  MessageSquare,
  Settings,
} from "lucide-react";

import { NavSecondary } from "./nav-secondary";
import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";
import { NavMain } from "./nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data with React Router routes
const data = {
  user: {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navSecondary: [
    {
      title: "Secondary",
      url: "/",
      icon: SquareTerminal,
      items: [
        {
          title: "Overview",
          url: "/",
        },
        {
          title: "Analytics",
          url: "/analytics",
        },
        {
          title: "Reports",
          url: "/reports",
        },
      ],
    },
    {
      title: "Products",
      url: "/products",
      icon: Bot,
      items: [
        {
          title: "All Products",
          url: "/products",
        },
        {
          title: "Categories",
          url: "/products/categories",
        },
        {
          title: "Inventory",
          url: "/products/inventory",
        },
      ],
    },
    {
      title: "Documentation",
      url: "/docs",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "/docs",
        },
        {
          title: "Get Started",
          url: "/docs/getting-started",
        },
        {
          title: "Tutorials",
          url: "/docs/tutorials",
        },
        {
          title: "API Reference",
          url: "/docs/api",
        },
      ],
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "/settings",
        },
        {
          title: "Team",
          url: "/settings/team",
        },
        {
          title: "Billing",
          url: "/settings/billing",
        },
        {
          title: "Security",
          url: "/settings/security",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "/projects/design",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "/projects/sales",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "/projects/travel",
      icon: Map,
    },
  ],
  navMain: [
    { name: "Dashboard", path: "/", icon: Home },
    { name: "Customers", path: "/customers", icon: Users },
    { name: "Pipeline", path: "/pipeline", icon: PieChart },
    { name: "Tasks", path: "/tasks", icon: CheckSquare },
    { name: "Messages", path: "/messages", icon: MessageSquare },
    { name: "Settings", path: "/settings", icon: Settings },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();
  const pathname = location.pathname;

  // Process the navigation data to set active states based on current path
  const processedNavSecondary = React.useMemo(() => {
    return data.navSecondary.map((section) => {
      // Check if the current path matches the section or any of its items
      const sectionActive =
        pathname === section.url || pathname.startsWith(section.url + "/");

      const items = section.items?.map((item) => ({
        ...item,
        isActive: pathname === item.url,
      }));

      return {
        ...section,
        isActive: sectionActive,
        items,
      };
    });
  }, [pathname]);

  // Process projects data to set active states
  const processedProjects = React.useMemo(() => {
    return data.projects.map((project) => ({
      ...project,
      isActive: pathname === project.url,
    }));
  }, [pathname]);

  // Process main navigation data to set active states
  const processedNavMain = React.useMemo(() => {
    return data.navMain.map((item) => ({
      ...item,
      isActive:
        pathname === item.path ||
        (item.path !== "/" && pathname.startsWith(item.path)),
    }));
  }, [pathname]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={processedNavMain.map((item) => ({
            title: item.name,
            url: item.path,
            icon: item.icon,
          }))}
        />
        <NavSecondary items={processedNavSecondary} />
        <NavProjects projects={processedProjects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
