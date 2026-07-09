import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Download, RotateCcw, Trash2, Search } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { StatusBadge } from "@/components/status-badge";
import { RestoreDialog } from "@/components/restore-dialog";
import { toast } from "sonner";

export const Route = createFileRoute("/backup/history")({
  head: () => ({ meta: [{ title: "Backup History — Novadoc" }] }),
  component: HistoryPage,
});

const INIT = [
  { id: "b1", name: "backup-2026-07-08", size: "1.2 GB", type: "Full",   dest: "S3",    status: "success", when: "2 giờ trước" },
  { id: "b2", name: "backup-2026-07-01", size: "1.1 GB", type: "Full",   dest: "Local", status: "success", when: "8 ngày trước" },
  { id: "b3", name: "backup-2026-06-24", size: "980 MB", type: "Incremental", dest: "S3", status: "success", when: "15 ngày trước" },
  { id: "b4", name: "backup-2026-06-17", size: "1.3 GB", type: "Full",   dest: "S3",    status: "failed",  when: "22 ngày trước" },
];

function HistoryPage() {
  const [items, setItems] = useState(INIT);
  const [q, setQ] = useState("");
  const [type, setType] = useState("all");
  const [restoreOpen, setRestoreOpen] = useState(false);

  const filtered = items.filter(
    (i) => (type === "all" || i.type === type) && i.name.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <AppShell title="Lịch sử backup" subtitle={`${items.length} bản sao lưu`}>
      <Card className="bg-card border-border">
        <div className="p-3 flex flex-wrap gap-2 border-b border-border">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input className="pl-9" value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Tìm theo tên..." />
          </div>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả loại</SelectItem>
              <SelectItem value="Full">Full</SelectItem>
              <SelectItem value="Incremental">Incremental</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên</TableHead>
              <TableHead>Loại</TableHead>
              <TableHead>Kích thước</TableHead>
              <TableHead>Đích</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Thời gian</TableHead>
              <TableHead className="w-40 text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((b) => (
              <TableRow key={b.id}>
                <TableCell className="font-mono text-xs">{b.name}</TableCell>
                <TableCell>{b.type}</TableCell>
                <TableCell>{b.size}</TableCell>
                <TableCell>{b.dest}</TableCell>
                <TableCell>
                  <StatusBadge tone={b.status === "success" ? "success" : "error"}>
                    {b.status === "success" ? "Thành công" : "Thất bại"}
                  </StatusBadge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{b.when}</TableCell>
                <TableCell className="text-right">
                  <div className="inline-flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={()=>toast.success("Đang tải xuống")}>
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={()=>setRestoreOpen(true)}>
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400"
                      onClick={()=>{setItems(items.filter((x)=>x.id!==b.id));toast.success("Đã xóa");}}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      <RestoreDialog open={restoreOpen} onOpenChange={setRestoreOpen} />
    </AppShell>
  );
}
