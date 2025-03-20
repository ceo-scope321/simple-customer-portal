import { useLocation } from "react-router-dom";
import {
  Home,
  Users,
  PieChart,
  CheckSquare,
  MessageSquare,
  Settings,
} from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

const navItems = [
  { name: "Dashboard", path: "/", icon: Home },
  { name: "Customers", path: "/customers", icon: Users },
  { name: "Pipeline", path: "/pipeline", icon: PieChart },
  { name: "Tasks", path: "/tasks", icon: CheckSquare },
  { name: "Messages", path: "/messages", icon: MessageSquare },
  { name: "Settings", path: "/settings", icon: Settings },
] as const;

export function MainNav() {
  const location = useLocation();

  return (
    <SidebarMenu>
      {navItems.map((item) => {
        const isActive =
          location.pathname === item.path ||
          (item.path !== "/" && location.pathname.startsWith(item.path));
        const Icon = item.icon;

        return (
          <SidebarMenuItem key={item.path}>
            <SidebarMenuButton asChild isActive={isActive} tooltip={item.name}>
              <a
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = item.path;
                }}
              >
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
