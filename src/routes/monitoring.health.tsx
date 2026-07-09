import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { RefreshCw, Server, Database, ListChecks, HardDrive, Cpu, MemoryStick, Bot, Activity } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { StatCard } from "@/components/stat-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/status-badge";

export const Route = createFileRoute("/monitoring/health")({
  head: () => ({ meta: [{ title: "Health Check — Novadoc" }] }),
  component: HealthPage,
});

function HealthPage() {
  const [spin, setSpin] = useState(false);
  const [ts, setTs] = useState(new Date().toLocaleTimeString());

  const refresh = () => {
    setSpin(true);
    setTimeout(() => { setSpin(false); setTs(new Date().toLocaleTimeString()); }, 900);
  };

  return (
    <AppShell
      title="Health Check"
      subtitle={`Cập nhật lần cuối: ${ts}`}
      actions={<Button variant="outline" onClick={refresh}><RefreshCw className={`h-4 w-4 ${spin?"animate-spin":""}`} /> Refresh</Button>}
    >
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard label="API" value="Online" hint="Latency 42ms" icon={Server} tone="success" />
        <StatCard label="Database" value="Online" hint="3/50 conn" icon={Database} tone="success" />
        <StatCard label="Queue" value="Online" hint="12 jobs pending" icon={ListChecks} tone="info" />
        <StatCard label="Storage" value="Online" hint="8.4TB / 20TB" icon={HardDrive} tone="success" />
        <StatCard label="LLM" value="Degraded" hint="OpenAI: 620ms" icon={Bot} tone="warning" />
        <StatCard label="CPU" value="34%" icon={Cpu} tone="info" />
        <StatCard label="Memory" value="62%" icon={MemoryStick} tone="warning" />
        <StatCard label="Disk" value="41%" icon={HardDrive} tone="success" />
      </div>

      <Card className="p-5 bg-card border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="font-semibold flex items-center gap-2">
              <Activity className="h-4 w-4 text-brand" /> Chi tiết tài nguyên
            </div>
            <div className="text-xs text-muted-foreground">7 ngày gần nhất</div>
          </div>
          <StatusBadge tone="success">Ổn định</StatusBadge>
        </div>
        <div className="space-y-4">
          {[
            ["CPU trung bình", 34],
            ["Memory", 62],
            ["Disk I/O", 27],
            ["Network egress", 48],
            ["Vector DB load", 55],
          ].map(([l,v]) => (
            <div key={l as string}>
              <div className="flex justify-between text-sm mb-1">
                <span>{l as string}</span><span className="text-muted-foreground">{v as number}%</span>
              </div>
              <Progress value={v as number} />
            </div>
          ))}
        </div>
      </Card>
    </AppShell>
  );
}
