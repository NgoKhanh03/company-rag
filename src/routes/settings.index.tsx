import { createFileRoute } from "@tanstack/react-router";
import { SettingsLayout } from "@/components/settings-layout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/settings/")({
  head: () => ({ meta: [{ title: "Cài đặt — Novadoc" }] }),
  component: () => (
    <SettingsLayout title="Thông tin tổ chức & tuỳ chọn chung">
      <Card className="p-5 bg-card border-border space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2"><Label>Tên tổ chức</Label><Input defaultValue="Acme Corp" /></div>
          <div className="space-y-2"><Label>Tenant ID</Label><Input defaultValue="acme-prod" disabled /></div>
          <div className="space-y-2"><Label>Múi giờ mặc định</Label><Input defaultValue="Asia/Ho_Chi_Minh" /></div>
          <div className="space-y-2"><Label>Ngôn ngữ mặc định</Label><Input defaultValue="Tiếng Việt" /></div>
        </div>
        {[
          ["Gửi email thông báo hằng ngày", true],
          ["Cho phép user tự đăng ký", false],
          ["Cưỡng chế 2FA cho Admin", true],
        ].map(([l,v]) => (
          <div key={l as string} className="flex items-center justify-between rounded-md border border-border px-3 py-2">
            <div className="text-sm">{l as string}</div>
            <Switch defaultChecked={v as boolean} />
          </div>
        ))}
        <Button onClick={()=>toast.success("Đã lưu cấu hình")}>Lưu</Button>
      </Card>
    </SettingsLayout>
  ),
});
