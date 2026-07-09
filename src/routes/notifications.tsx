import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCheck } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  initialNotifications,
  toneClass,
} from "@/components/notifications-popover";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — Novadoc" },
      {
        name: "description",
        content: "All workspace notifications, alerts, and activity log.",
      },
    ],
  }),
  component: NotificationsPage,
});

function NotificationsPage() {
  const t = useT();
  const [items, setItems] = useState(initialNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const visible = filter === "unread" ? items.filter((i) => i.unread) : items;
  const unread = items.filter((i) => i.unread).length;

  return (
    <AppShell
      title={t("notif.page_title")}
      subtitle={t("notif.page_sub")}
      actions={
        <Button
          variant="outline"
          className="gap-1.5"
          onClick={() =>
            setItems((prev) => prev.map((p) => ({ ...p, unread: false })))
          }
          disabled={unread === 0}
        >
          <CheckCheck className="h-4 w-4" />
          {t("notif.mark_all")}
        </Button>
      }
    >
      <Card className="bg-card border-border overflow-hidden">
        <div className="p-3 border-b border-border">
          <Tabs
            value={filter}
            onValueChange={(v) => setFilter(v as "all" | "unread")}
          >
            <TabsList>
              <TabsTrigger value="all">
                {t("notif.filter_all")} · {items.length}
              </TabsTrigger>
              <TabsTrigger value="unread">
                {t("notif.filter_unread")} · {unread}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {visible.length === 0 ? (
          <div className="py-16 text-center text-sm text-muted-foreground">
            {t("notif.empty")}
          </div>
        ) : (
          <div className="divide-y divide-border">
            {visible.map((n) => {
              const Icon = n.icon;
              return (
                <button
                  key={n.id}
                  onClick={() =>
                    setItems((prev) =>
                      prev.map((p) =>
                        p.id === n.id ? { ...p, unread: false } : p,
                      ),
                    )
                  }
                  className="w-full text-left px-5 py-4 flex gap-4 hover:bg-accent/30 transition-colors"
                >
                  <div
                    className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${toneClass[n.tone]}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-semibold">{t(n.titleKey)}</div>
                      {n.unread && (
                        <span className="h-2 w-2 rounded-full bg-brand shrink-0" />
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {t(n.bodyKey)}
                    </div>
                    <div className="text-[11px] text-muted-foreground/70 mt-2">
                      {t(n.time.key, n.time.vars)}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </Card>
    </AppShell>
  );
}
