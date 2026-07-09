import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Bot, Trash2 } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusBadge } from "@/components/status-badge";
import { toast } from "sonner";

export const Route = createFileRoute("/workspaces/$workspaceId")({
  head: () => ({ meta: [{ title: "Workspace detail — Novadoc" }] }),
  component: WsDetail,
});

function WsDetail() {
  const { workspaceId } = Route.useParams();
  return (
    <AppShell
      title={`Workspace: ${workspaceId}`}
      subtitle="Cấu hình chi tiết workspace"
      actions={<Button asChild variant="outline"><Link to="/workspaces"><ArrowLeft className="h-4 w-4" /> Danh sách</Link></Button>}
    >
      <Card className="p-5 bg-card border-border">
        <Tabs defaultValue="general">
          <TabsList>
            <TabsTrigger value="general">Chung</TabsTrigger>
            <TabsTrigger value="members">Thành viên</TabsTrigger>
            <TabsTrigger value="agents">Agents</TabsTrigger>
            <TabsTrigger value="settings">Cài đặt</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="pt-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Tên workspace</Label><Input defaultValue={workspaceId} /></div>
              <div className="space-y-2"><Label>Phòng ban</Label><Input defaultValue="Engineering" /></div>
              <div className="space-y-2 col-span-2"><Label>Mô tả</Label><Input defaultValue="Không gian RAG cho phòng kỹ thuật" /></div>
            </div>
            <Button onClick={()=>toast.success("Đã lưu")}>Lưu thay đổi</Button>
          </TabsContent>

          <TabsContent value="members" className="pt-4 space-y-2">
            {["Minh Tuấn","Lan Anh","Quang Huy","Thu Trang"].map((n) => (
              <div key={n} className="flex items-center justify-between rounded-md border border-border px-3 py-2">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-brand/20 text-brand flex items-center justify-center text-xs font-semibold">
                    {n.split(" ").slice(-1)[0][0]}
                  </div>
                  <div className="text-sm">{n}</div>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge tone="info">Editor</StatusBadge>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400" onClick={()=>toast.success("Đã gỡ")}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="agents" className="pt-4 grid gap-3 md:grid-cols-2">
            {["HR Assistant","Doc Search","Legal Reviewer","Onboarding Bot"].map((a) => (
              <Card key={a} className="p-4 bg-background/50 border-border">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-brand/15 text-brand flex items-center justify-center">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">{a}</div>
                    <div className="text-xs text-muted-foreground">GPT-4o · 12k truy vấn</div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="settings" className="pt-4 space-y-3">
            {[
              ["Cho phép chia sẻ hội thoại", true],
              ["Bật audit log", true],
              ["Chỉ nhân viên nội bộ", true],
              ["Tự động archive sau 90 ngày", false],
            ].map(([label, val]) => (
              <div key={label as string} className="flex items-center justify-between rounded-md border border-border px-3 py-2">
                <div className="text-sm">{label as string}</div>
                <Switch defaultChecked={val as boolean} />
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </Card>
    </AppShell>
  );
}
