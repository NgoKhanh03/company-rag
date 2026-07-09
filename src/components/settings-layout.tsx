import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Settings2, Cpu, Layers, Bot, Brain, Minimize2, Scissors,
} from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const NAV: { to: string; label: string; icon: typeof Settings2 }[] = [
  { to: "/settings", label: "Chung", icon: Settings2 },
  { to: "/settings/llm", label: "LLM", icon: Cpu },
  { to: "/settings/embedding", label: "Embedding", icon: Layers },
  { to: "/settings/agent", label: "Default Agent", icon: Bot },
  { to: "/settings/memory", label: "Memory", icon: Brain },
  { to: "/settings/compression", label: "Context Compression", icon: Minimize2 },
  { to: "/settings/trimming", label: "Context Trimming", icon: Scissors },
];

export function SettingsLayout({ title, children }: { title: string; children: ReactNode }) {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  return (
    <AppShell title="Cài đặt" subtitle={title}>
      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <Card className="p-2 bg-card border-border h-fit">
          <nav className="space-y-0.5">
            {NAV.map((n) => {
              const active = pathname === n.to;
              const Icon = n.icon;
              return (
                <Link
                  key={n.to}
                  to={n.to as "/settings"}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                    active ? "bg-brand/15 text-brand" : "hover:bg-accent/40 text-foreground",
                  )}
                >
                  <Icon className="h-4 w-4" /> {n.label}
                </Link>
              );
            })}
          </nav>
        </Card>
        <div>{children}</div>
      </div>
    </AppShell>
  );
}
