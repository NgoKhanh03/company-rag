import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { RefreshCw, CheckCircle2, AlertTriangle } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/backup/system-check")({
  head: () => ({ meta: [{ title: "System Check — Novadoc" }] }),
  component: SystemCheckPage,
});

const CHECKS = [
  { name: "pg_dump", status: "ok", detail: "PostgreSQL 16.3 · sẵn sàng" },
  { name: "Disk Space", status: "ok", detail: "1.2TB trống trên /var/backups" },
  { name: "Database Size", status: "ok", detail: "142 GB" },
  { name: "Workspace Size", status: "warn", detail: "Workspace 'eng' đạt 62GB (~ ngưỡng 80GB)" },
  { name: "Data Folder", status: "ok", detail: "/var/novadoc/data · quyền ghi OK" },
  { name: "Free Space", status: "ok", detail: "S3 bucket còn 11.6TB" },
];

function SystemCheckPage() {
  const [spin, setSpin] = useState(false);
  return (
    <AppShell
      title="System Check"
      subtitle="Kiểm tra điều kiện tiên quyết cho backup"
      actions={<Button variant="outline" onClick={()=>{setSpin(true); setTimeout(()=>setSpin(false),900);}}>
        <RefreshCw className={`h-4 w-4 ${spin?"animate-spin":""}`} /> Refresh
      </Button>}
    >
      <div className="grid gap-3 md:grid-cols-2">
        {CHECKS.map((c) => (
          <Card key={c.name} className="p-4 bg-card border-border flex items-start gap-3">
            {c.status === "ok"
              ? <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              : <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />}
            <div className="flex-1">
              <div className="font-medium">{c.name}</div>
              <div className="text-sm text-muted-foreground">{c.detail}</div>
              <Progress className="mt-2" value={c.status === "ok" ? 100 : 78} />
            </div>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
