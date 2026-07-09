import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Search, MoreHorizontal, Users2, Shield, UserCheck, UserX } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { StatusBadge } from "@/components/status-badge";
import { StatCard } from "@/components/stat-card";
import { EmptyState } from "@/components/empty-state";
import { toast } from "sonner";

export const Route = createFileRoute("/users/")({
  head: () => ({ meta: [{ title: "Quản lý người dùng — Novadoc" }] }),
  component: UsersPage,
});

const MOCK = [
  { id: "u1", name: "Minh Tuấn", email: "tuan@acme.io", dept: "Engineering", role: "Admin", status: "active", last: "5 phút trước" },
  { id: "u2", name: "Lan Anh", email: "lananh@acme.io", dept: "HR", role: "Editor", status: "active", last: "1 giờ trước" },
  { id: "u3", name: "Quang Huy", email: "huy@acme.io", dept: "Finance", role: "Viewer", status: "active", last: "Hôm qua" },
  { id: "u4", name: "Thu Trang", email: "trang@acme.io", dept: "Legal", role: "Editor", status: "disabled", last: "3 ngày trước" },
  { id: "u5", name: "Đức Anh", email: "duc@acme.io", dept: "Operations", role: "Viewer", status: "active", last: "2 ngày trước" },
  { id: "u6", name: "Bảo Ngọc", email: "ngoc@acme.io", dept: "Product", role: "Admin", status: "active", last: "vừa xong" },
];

function UsersPage() {
  const [q, setQ] = useState("");
  const [role, setRole] = useState("all");
  const [users, setUsers] = useState(MOCK);

  const filtered = users.filter(
    (u) =>
      (role === "all" || u.role === role) &&
      (u.name.toLowerCase().includes(q.toLowerCase()) ||
        u.email.toLowerCase().includes(q.toLowerCase())),
  );

  const toggle = (id: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: u.status === "active" ? "disabled" : "active" } : u,
      ),
    );
    toast.success("Đã cập nhật trạng thái người dùng");
  };

  const active = users.filter((u) => u.status === "active").length;

  return (
    <AppShell
      title="Người dùng"
      subtitle="Quản lý tài khoản, vai trò và trạng thái truy cập"
      actions={
        <Button onClick={() => toast.info("Mở form thêm người dùng (demo)")}>
          <Plus className="h-4 w-4" /> Thêm người dùng
        </Button>
      }
    >
      <div className="grid gap-3 md:grid-cols-4 mb-6">
        <StatCard label="Tổng người dùng" value={users.length} icon={Users2} />
        <StatCard label="Đang hoạt động" value={active} icon={UserCheck} tone="success" />
        <StatCard label="Đã vô hiệu" value={users.length - active} icon={UserX} tone="warning" />
        <StatCard label="Quản trị viên" value={users.filter((u) => u.role === "Admin").length} icon={Shield} tone="info" />
      </div>

      <Card className="bg-card border-border overflow-hidden">
        <div className="p-3 flex flex-wrap items-center gap-2 border-b border-border">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Tìm theo tên hoặc email..."
              className="pl-9"
            />
          </div>
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả vai trò</SelectItem>
              <SelectItem value="Admin">Admin</SelectItem>
              <SelectItem value="Editor">Editor</SelectItem>
              <SelectItem value="Viewer">Viewer</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {filtered.length === 0 ? (
          <EmptyState icon={Users2} title="Không tìm thấy người dùng" description="Thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm." />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Người dùng</TableHead>
                <TableHead>Phòng ban</TableHead>
                <TableHead>Vai trò</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Hoạt động gần nhất</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>
                    <Link to="/users/$userId" params={{ userId: u.id }} className="flex items-center gap-3 hover:text-brand">
                      <div className="h-9 w-9 rounded-full bg-brand/20 text-brand flex items-center justify-center text-xs font-semibold">
                        {u.name.split(" ").map((s) => s[0]).slice(-2).join("")}
                      </div>
                      <div>
                        <div className="font-medium">{u.name}</div>
                        <div className="text-xs text-muted-foreground">{u.email}</div>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell>{u.dept}</TableCell>
                  <TableCell>
                    <StatusBadge tone={u.role === "Admin" ? "info" : u.role === "Editor" ? "success" : "muted"}>
                      {u.role}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>
                    <Switch checked={u.status === "active"} onCheckedChange={() => toggle(u.id)} />
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">{u.last}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to="/users/$userId" params={{ userId: u.id }}>Xem hồ sơ</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toast.info("Đã mở form sửa (demo)")}>Chỉnh sửa</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-400"
                          onClick={() => {
                            setUsers((p) => p.filter((x) => x.id !== u.id));
                            toast.success("Đã xóa người dùng");
                          }}
                        >
                          Xóa
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </AppShell>
  );
}
