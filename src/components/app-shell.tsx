import type { ReactNode } from "react";
import { Search } from "lucide-react";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Input } from "@/components/ui/input";
import { NotificationsPopover } from "@/components/notifications-popover";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Separator } from "@/components/ui/separator";
import { useT } from "@/lib/i18n";

export function AppShell({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const t = useT();
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="sticky top-0 z-10 flex h-14 items-center gap-3 border-b border-border bg-background/80 backdrop-blur px-4">
            <SidebarTrigger />
            <div className="hidden md:flex items-center gap-2 flex-1 max-w-md">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t("header.search")}
                  className="pl-9 bg-card border-border"
                />
              </div>
            </div>
            <div className="ml-auto flex items-center gap-1">
              <LanguageSwitcher />
              <Separator orientation="vertical" className="mx-1 h-6" />
              <NotificationsPopover />
              <div className="ml-2 h-8 w-8 rounded-full bg-brand/20 text-brand flex items-center justify-center text-xs font-semibold">
                MT
              </div>
            </div>
          </header>


          <div className="border-b border-border px-6 py-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
              {subtitle && (
                <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
              )}
            </div>
            {actions}
          </div>

          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
