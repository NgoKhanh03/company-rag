import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, MessagesSquare, Library, BarChart3, Settings, Sparkles,
  Bell, Users2, Building2, Shield, KeyRound, Boxes, Activity, ListChecks,
  DatabaseBackup,
} from "lucide-react";

import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useI18n, useT } from "@/lib/i18n";

type Item = { title: string; url: string; icon: typeof LayoutDashboard };

export function AppSidebar() {
  const t = useT();
  const { dir } = useI18n();
  const pathname = useRouterState({ select: (r) => r.location.pathname });

  const workspace: Item[] = [
    { title: t("nav.overview"), url: "/", icon: LayoutDashboard },
    { title: t("nav.chat"), url: "/chat", icon: MessagesSquare },
    { title: t("nav.library"), url: "/documents", icon: Library },
    { title: t("nav.analytics"), url: "/analytics", icon: BarChart3 },
    { title: t("notif.page_title"), url: "/notifications", icon: Bell },
  ];
  const admin: Item[] = [
    { title: "Người dùng", url: "/users", icon: Users2 },
    { title: "Phòng ban", url: "/departments", icon: Building2 },
    { title: "Vai trò", url: "/roles", icon: Shield },
    { title: "Phân quyền", url: "/permissions", icon: KeyRound },
    { title: "Workspaces", url: "/workspaces", icon: Boxes },
  ];
  const system: Item[] = [
    { title: "Cài đặt", url: "/settings", icon: Settings },
    { title: "Health Check", url: "/monitoring/health", icon: Activity },
    { title: "Event Log", url: "/monitoring/events", icon: ListChecks },
    { title: "Backup", url: "/backup", icon: DatabaseBackup },
  ];

  const renderGroup = (label: string, items: Item[]) => (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const active = pathname === item.url || (item.url !== "/" && pathname.startsWith(item.url + "/"));
            return (
              <SidebarMenuItem key={item.url}>
                <SidebarMenuButton asChild isActive={active} tooltip={item.title}>
                  <Link to={item.url as "/"} className="flex items-center gap-2">
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <Sidebar collapsible="icon" side={dir === "rtl" ? "right" : "left"}>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-2 py-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-brand-foreground">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="flex flex-col leading-tight group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-semibold">Novadoc</span>
            <span className="text-xs text-muted-foreground">{t("brand.tagline")}</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {renderGroup(t("nav.workspace"), workspace)}
        {renderGroup("Quản trị", admin)}
        {renderGroup("Hệ thống", system)}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <div className="px-2 py-2 group-data-[collapsible=icon]:hidden">
          <div className="flex items-center gap-2 rounded-lg bg-sidebar-accent px-2 py-2">
            <div className="h-8 w-8 rounded-full bg-brand/20 text-brand flex items-center justify-center text-xs font-semibold">
              MT
            </div>
            <div className="text-xs leading-tight">
              <div className="font-medium text-sidebar-foreground">Minh Tuấn</div>
              <div className="text-muted-foreground">Acme Corp</div>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
