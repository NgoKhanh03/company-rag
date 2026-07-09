import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Mail, Building2, Shield, Activity } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { StatusBadge } from "@/components/status-badge";
import { toast } from "sonner";

export const Route = createFileRoute("/users/$userId")({
  head: () => ({ meta: [{ title: "Hồ sơ người dùng — Novadoc" }] }),
  component: UserProfilePage,
});

function UserProfilePage() {
  const { userId } = Route.useParams();

  return (
    <AppShell
      title="Hồ sơ người dùng"
      subtitle={`ID: ${userId}`}
      actions={
        <Button asChild variant="outline">
          <Link to="/users"><ArrowLeft className="h-4 w-4" /> Quay lại</Link>
        </Button>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <Card className="p-5 bg-card border-border h-fit">
          <div className="flex flex-col items-center text-center">
            <div className="h-20 w-20 rounded-full bg-brand/20 text-brand flex items-center justify-center text-2xl font-semibold">
              MT
            </div>
            <div className="mt-3 font-semibold">Minh Tuấn</div>
            <div className="text-xs text-muted-foreground">tuan@acme.io</div>
            <StatusBadge tone="success" className="mt-3">Đang hoạt động</StatusBadge>
          </div>
          <div className="mt-5 space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" /> tuan@acme.io
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Building2 className="h-4 w-4" /> Engineering
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Shield className="h-4 w-4" /> Admin
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Activity className="h-4 w-4" /> Đăng nhập lần cuối: 5 phút trước
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-card border-border">
          <Tabs defaultValue="general">
            <TabsList>
              <TabsTrigger value="general">Chung</TabsTrigger>
              <TabsTrigger value="security">Bảo mật</TabsTrigger>
              <TabsTrigger value="perm">Phân quyền</TabsTrigger>
              <TabsTrigger value="activity">Hoạt động</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="pt-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Họ và tên</Label><Input defaultValue="Minh Tuấn" /></div>
                <div className="space-y-2"><Label>Email</Label><Input defaultValue="tuan@acme.io" /></div>
                <div className="space-y-2"><Label>Số điện thoại</Label><Input defaultValue="+84 90 123 4567" /></div>
                <div className="space-y-2"><Label>Phòng ban</Label><Input defaultValue="Engineering" /></div>
              </div>
              <Button onClick={() => toast.success("Đã lưu thay đổi")}>Lưu thay đổi</Button>
            </TabsContent>

            <TabsContent value="security" className="pt-4 space-y-4">
              <div className="rounded-lg border border-border p-4 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">Xác thực 2 lớp (2FA)</div>
                  <div className="text-xs text-muted-foreground">Bảo vệ tài khoản bằng ứng dụng OTP</div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="rounded-lg border border-border p-4 space-y-3">
                <div className="text-sm font-medium">Đổi mật khẩu</div>
                <Input type="password" placeholder="Mật khẩu hiện tại" />
                <Input type="password" placeholder="Mật khẩu mới" />
                <Input type="password" placeholder="Xác nhận mật khẩu mới" />
                <Button size="sm" onClick={() => toast.success("Đã cập nhật mật khẩu")}>Cập nhật</Button>
              </div>
            </TabsContent>

            <TabsContent value="perm" className="pt-4 space-y-2">
              {["Xem tài liệu","Tải lên tài liệu","Chat với RAG","Quản lý người dùng","Quản lý workspace","Cấu hình hệ thống","Sao lưu & khôi phục"].map((p) => (
                <label key={p} className="flex items-center gap-2 text-sm rounded-md border border-border px-3 py-2">
                  <Checkbox defaultChecked={!p.includes("hệ thống")} />
                  {p}
                </label>
              ))}
            </TabsContent>

            <TabsContent value="activity" className="pt-4 space-y-2">
              {[
                { t: "5 phút trước", a: "Đăng nhập từ Chrome / Hà Nội" },
                { t: "1 giờ trước", a: "Chat: 'Chính sách nghỉ phép 2026'" },
                { t: "3 giờ trước", a: "Tải lên tài liệu HR-Policy-v3.2.pdf" },
                { t: "Hôm qua", a: "Thay đổi vai trò cho ngoc@acme.io" },
              ].map((e, i) => (
                <div key={i} className="flex gap-3 rounded-md border border-border px-3 py-2 text-sm">
                  <div className="text-muted-foreground w-28 shrink-0">{e.t}</div>
                  <div>{e.a}</div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </AppShell>
  );
}
