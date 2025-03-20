import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AppSidebar } from "@/layout/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { ThemeButton } from "@/components/ui/ThemeButton";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { PageHeader } from "@/layout/components/page-header";

export default function AppLayout() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Generate breadcrumbs based on current path
  const generateBreadcrumbs = () => {
    const breadcrumbs = [
      {
        label: "Home",
        href: "/",
        active: pathnames.length === 0,
      },
    ];

    pathnames.forEach((value, index) => {
      const href = `/${pathnames.slice(0, index + 1).join("/")}`;
      breadcrumbs.push({
        label: value.charAt(0).toUpperCase() + value.slice(1),
        href,
        active: index === pathnames.length - 1,
      });
    });

    return breadcrumbs;
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <PageHeader
          title={
            pathnames[pathnames.length - 1]?.charAt(0).toUpperCase() +
              pathnames[pathnames.length - 1]?.slice(1) || "Dashboard"
          }
          breadcrumbs={generateBreadcrumbs()}
        />

        <main className="flex-1 p-4 md:p-8 md:pt-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
