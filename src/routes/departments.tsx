import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Building2, Trash2, Pencil } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/departments")({
  head: () => ({ meta: [{ title: "Phòng ban — Novadoc" }] }),
  component: DeptPage,
});

type Dept = { id: string; name: string; manager: string; members: number };

const INIT: Dept[] = [
  { id: "d1", name: "Nhân sự", manager: "Lan Anh", members: 12 },
  { id: "d2", name: "Kỹ thuật", manager: "Minh Tuấn", members: 34 },
  { id: "d3", name: "Tài chính", manager: "Quang Huy", members: 8 },
  { id: "d4", name: "Pháp chế", manager: "Thu Trang", members: 5 },
  { id: "d5", name: "Vận hành", manager: "Đức Anh", members: 21 },
  { id: "d6", name: "Sản phẩm", manager: "Bảo Ngọc", members: 14 },
];

function DeptPage() {
  const [items, setItems] = useState(INIT);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", manager: "" });

  const filtered = items.filter((d) =>
    d.name.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <AppShell
      title="Phòng ban"
      subtitle="Quản lý cấu trúc tổ chức và người quản lý"
      actions={
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4" /> Thêm phòng ban</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Phòng ban mới</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div className="space-y-1"><Label>Tên</Label><Input value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} /></div>
              <div className="space-y-1"><Label>Quản lý</Label><Input value={form.manager} onChange={(e)=>setForm({...form,manager:e.target.value})} /></div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={()=>setOpen(false)}>Huỷ</Button>
              <Button onClick={()=>{
                if(!form.name) return toast.error("Nhập tên phòng ban");
                setItems([...items,{id:`d${Date.now()}`,...form,members:0}]);
                setForm({name:"",manager:""}); setOpen(false); toast.success("Đã tạo phòng ban");
              }}>Lưu</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      }
    >
      <Card className="p-3 bg-card border-border mb-4">
        <Input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Tìm phòng ban..." />
      </Card>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((d) => (
          <Card key={d.id} className="p-4 bg-card border-border">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-brand/15 text-brand flex items-center justify-center">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold">{d.name}</div>
                  <div className="text-xs text-muted-foreground">QL: {d.manager}</div>
                </div>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={()=>toast.info("Sửa (demo)")}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400"
                  onClick={()=>{setItems(items.filter((x)=>x.id!==d.id));toast.success("Đã xóa");}}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="mt-4 text-xs text-muted-foreground">
              <span className="text-foreground font-semibold text-lg">{d.members}</span> thành viên
            </div>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
