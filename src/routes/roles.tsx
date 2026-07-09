import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Shield, Trash2 } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import { toast } from "sonner";

export const Route = createFileRoute("/roles")({
  head: () => ({ meta: [{ title: "Vai trò — Novadoc" }] }),
  component: RolesPage,
});

const INIT = [
  { id: "r1", name: "Super Admin", desc: "Toàn quyền cấu hình hệ thống", users: 2, perms: 32 },
  { id: "r2", name: "Admin", desc: "Quản trị workspace và người dùng", users: 6, perms: 24 },
  { id: "r3", name: "Editor", desc: "Tải lên, chỉnh sửa và index tài liệu", users: 18, perms: 12 },
  { id: "r4", name: "Viewer", desc: "Chỉ tra cứu và chat với RAG", users: 74, perms: 4 },
  { id: "r5", name: "Auditor", desc: "Xem log và báo cáo", users: 3, perms: 8 },
];

function RolesPage() {
  const [items, setItems] = useState(INIT);
  return (
    <AppShell
      title="Vai trò"
      subtitle="Định nghĩa các vai trò và bộ quyền tương ứng"
      actions={
        <div className="flex gap-2">
          <Button asChild variant="outline"><Link to="/permissions">Ma trận quyền</Link></Button>
          <Button onClick={()=>toast.info("Mở form thêm vai trò (demo)")}>
            <Plus className="h-4 w-4" /> Thêm vai trò
          </Button>
        </div>
      }
    >
      <div className="grid gap-3 md:grid-cols-2">
        {items.map((r) => (
          <Card key={r.id} className="p-4 bg-card border-border">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg bg-brand/15 text-brand flex items-center justify-center">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold flex items-center gap-2">
                    {r.name}
                    <StatusBadge tone="info">{r.users} user</StatusBadge>
                  </div>
                  <div className="text-sm text-muted-foreground mt-0.5">{r.desc}</div>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400"
                onClick={()=>{setItems(items.filter((x)=>x.id!==r.id));toast.success("Đã xóa vai trò");}}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{r.perms} quyền</span>
              <Button variant="link" className="h-auto p-0" asChild>
                <Link to="/permissions">Xem chi tiết</Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
