import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Bell,
  CheckCheck,
  FileText,
  MessagesSquare,
  ShieldAlert,
  UserPlus,
  Wallet,
} from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useT } from "@/lib/i18n";

export type Notification = {
  id: string;
  icon: typeof Bell;
  titleKey: string;
  bodyKey: string;
  time: { key: string; vars?: Record<string, string | number> };
  unread: boolean;
  tone: "brand" | "warning" | "success" | "muted";
};

export const initialNotifications: Notification[] = [
  {
    id: "1",
    icon: FileText,
    titleKey: "notif.n1.title",
    bodyKey: "notif.n1.body",
    time: { key: "time.min", vars: { n: 2 } },
    unread: true,
    tone: "brand",
  },
  {
    id: "2",
    icon: MessagesSquare,
    titleKey: "notif.n2.title",
    bodyKey: "notif.n2.body",
    time: { key: "time.min", vars: { n: 15 } },
    unread: true,
    tone: "muted",
  },
  {
    id: "3",
    icon: ShieldAlert,
    titleKey: "notif.n3.title",
    bodyKey: "notif.n3.body",
    time: { key: "time.hour", vars: { n: 1 } },
    unread: true,
    tone: "warning",
  },
  {
    id: "4",
    icon: UserPlus,
    titleKey: "notif.n4.title",
    bodyKey: "notif.n4.body",
    time: { key: "time.yesterday" },
    unread: false,
    tone: "success",
  },
  {
    id: "5",
    icon: Wallet,
    titleKey: "notif.n5.title",
    bodyKey: "notif.n5.body",
    time: { key: "time.days", vars: { n: 2 } },
    unread: false,
    tone: "warning",
  },
];

export const toneClass: Record<Notification["tone"], string> = {
  brand: "bg-brand/15 text-brand",
  warning: "bg-warning/15 text-warning",
  success: "bg-success/15 text-success",
  muted: "bg-secondary text-foreground",
};

export function NotificationsPopover() {
  const t = useT();
  const [items, setItems] = useState(initialNotifications);
  const unread = items.filter((i) => i.unread).length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {unread > 0 && (
            <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-brand text-brand-foreground text-[10px] font-semibold flex items-center justify-center">
              {unread}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-96 p-0">
        <div className="px-4 py-3 flex items-center justify-between border-b border-border">
          <div>
            <div className="text-sm font-semibold">{t("notif.title")}</div>
            <div className="text-xs text-muted-foreground">
              {t("notif.unread", { n: unread })}
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs gap-1"
            onClick={() =>
              setItems((prev) => prev.map((p) => ({ ...p, unread: false })))
            }
          >
            <CheckCheck className="h-3.5 w-3.5" />
            {t("notif.mark_all")}
          </Button>
        </div>
        <ScrollArea className="max-h-96">
          <div className="divide-y divide-border">
            {items.slice(0, 4).map((n) => {
              const Icon = n.icon;
              return (
                <button
                  key={n.id}
                  onClick={() =>
                    setItems((prev) =>
                      prev.map((p) => (p.id === n.id ? { ...p, unread: false } : p)),
                    )
                  }
                  className="w-full text-left px-4 py-3 flex gap-3 hover:bg-accent/40 transition-colors"
                >
                  <div
                    className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 ${toneClass[n.tone]}`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium truncate">
                        {t(n.titleKey)}
                      </div>
                      {n.unread && (
                        <span className="h-2 w-2 rounded-full bg-brand shrink-0" />
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                      {t(n.bodyKey)}
                    </div>
                    <div className="text-[11px] text-muted-foreground/70 mt-1">
                      {t(n.time.key, n.time.vars)}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </ScrollArea>
        <div className="px-4 py-2 border-t border-border">
          <Button asChild variant="ghost" size="sm" className="w-full text-xs">
            <Link to="/notifications">{t("notif.view_all")}</Link>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
