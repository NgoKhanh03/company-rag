import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Save } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/status-badge";
import { BackupDialog } from "@/components/backup-dialog";
import { toast } from "sonner";

export const Route = createFileRoute("/backup/tenants")({
  head: () => ({ meta: [{ title: "Tenant Backup — Novadoc" }] }),
  component: TenantsPage,
});

const TENANTS = [
  { id: "acme", name: "Acme Corp", size: "62 GB", last: "2 giờ trước" },
  { id: "hr", name: "HR Cluster", size: "8 GB", last: "1 ngày trước" },
  { id: "eng", name: "Engineering", size: "34 GB", last: "6 giờ trước" },
  { id: "legal", name: "Legal", size: "4 GB", last: "3 ngày trước" },
  { id: "ops", name: "Operations", size: "12 GB", last: "12 giờ trước" },
];

function TenantsPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const toggle = (id: string) =>
    setSelected((s) => s.includes(id) ? s.filter((x)=>x!==id) : [...s, id]);
  const all = selected.length === TENANTS.length;
  const toggleAll = () => setSelected(all ? [] : TENANTS.map((t)=>t.id));

  return (
    <AppShell
      title="Tenant Backup"
      subtitle="Sao lưu riêng biệt cho từng tenant"
      actions={
        <Button disabled={selected.length===0} onClick={()=>{
          if (selected.length === 1) setOpen(true);
          else toast.success(`Đã xếp hàng backup cho ${selected.length} tenant`);
        }}>
          <Save className="h-4 w-4" /> Backup ({selected.length})
        </Button>
      }
    >
      <Card className="bg-card border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10"><Checkbox checked={all} onCheckedChange={toggleAll} /></TableHead>
              <TableHead>Tenant</TableHead>
              <TableHead>Kích thước</TableHead>
              <TableHead>Backup lần cuối</TableHead>
              <TableHead>Trạng thái</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {TENANTS.map((t) => (
              <TableRow key={t.id}>
                <TableCell><Checkbox checked={selected.includes(t.id)} onCheckedChange={()=>toggle(t.id)} /></TableCell>
                <TableCell>
                  <div className="font-medium">{t.name}</div>
                  <div className="text-xs text-muted-foreground font-mono">{t.id}</div>
                </TableCell>
                <TableCell>{t.size}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{t.last}</TableCell>
                <TableCell><StatusBadge tone="success">OK</StatusBadge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      <BackupDialog open={open} onOpenChange={setOpen} />
    </AppShell>
  );
}
