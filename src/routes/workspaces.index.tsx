import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Search, Building2, Users2, Bot } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { StatusBadge } from "@/components/status-badge";
import { toast } from "sonner";

export const Route = createFileRoute("/workspaces/")({
  head: () => ({ meta: [{ title: "Workspace — Novadoc" }] }),
  component: WsPage,
});

const INIT = [
  { id: "acme", name: "Acme Corp", dept: "HQ", members: 42, agents: 5, status: "active" },
  { id: "hr", name: "Nhân sự", dept: "HR", members: 12, agents: 2, status: "active" },
  { id: "eng", name: "Kỹ thuật", dept: "Engineering", members: 34, agents: 4, status: "active" },
  { id: "legal", name: "Pháp chế", dept: "Legal", members: 5, agents: 1, status: "paused" },
  { id: "ops", name: "Vận hành", dept: "Operations", members: 21, agents: 3, status: "active" },
];

function WsPage() {
  const [q, setQ] = useState("");
  const [dept, setDept] = useState("all");
  const items = INIT.filter(
    (w) =>
      (dept === "all" || w.dept === dept) &&
      w.name.toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <AppShell
      title="Workspace"
      subtitle="Quản lý các không gian làm việc theo bộ phận"
      actions={<Button onClick={()=>toast.info("Mở form workspace (demo)")}><Plus className="h-4 w-4" /> Workspace mới</Button>}
    >
      <Card className="p-3 bg-card border-border mb-4 flex flex-wrap gap-2">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input className="pl-9" value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Tìm workspace..." />
        </div>
        <Select value={dept} onValueChange={setDept}>
          <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả phòng ban</SelectItem>
            {["HQ","HR","Engineering","Legal","Operations"].map((d)=>(<SelectItem key={d} value={d}>{d}</SelectItem>))}
          </SelectContent>
        </Select>
      </Card>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {items.map((w) => (
          <Link key={w.id} to="/workspaces/$workspaceId" params={{workspaceId:w.id}}>
            <Card className="p-5 bg-card border-border hover:border-brand/60 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-xl bg-brand/15 text-brand flex items-center justify-center">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold">{w.name}</div>
                    <div className="text-xs text-muted-foreground">{w.dept}</div>
                  </div>
                </div>
                <StatusBadge tone={w.status === "active" ? "success" : "warning"}>
                  {w.status === "active" ? "Hoạt động" : "Tạm dừng"}
                </StatusBadge>
              </div>
              <div className="mt-4 flex gap-4 text-sm">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Users2 className="h-4 w-4" /> {w.members}
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Bot className="h-4 w-4" /> {w.agents} agents
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </AppShell>
  );
}
