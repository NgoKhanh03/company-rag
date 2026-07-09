import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, Cloud } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/backup/s3")({
  head: () => ({ meta: [{ title: "S3 Storage — Novadoc" }] }),
  component: S3Page,
});

function S3Page() {
  const [testing, setTesting] = useState(false);
  return (
    <AppShell title="S3 Storage" subtitle="Cấu hình object storage tương thích S3">
      <Card className="p-5 bg-card border-border max-w-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-lg bg-brand/15 text-brand flex items-center justify-center">
            <Cloud className="h-5 w-5" />
          </div>
          <div>
            <div className="font-semibold">Kết nối S3</div>
            <div className="text-xs text-muted-foreground">Áp dụng cho toàn hệ thống</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2"><Label>Endpoint</Label><Input defaultValue="https://s3.ap-southeast-1.amazonaws.com" /></div>
          <div className="space-y-2"><Label>Region</Label><Input defaultValue="ap-southeast-1" /></div>
          <div className="space-y-2"><Label>Bucket</Label><Input defaultValue="novadoc-backups" /></div>
          <div className="space-y-2"><Label>Path prefix</Label><Input defaultValue="/prod/" /></div>
          <div className="space-y-2"><Label>Access Key ID</Label><Input defaultValue="AKIA••••••••7XQ" /></div>
          <div className="space-y-2"><Label>Secret Access Key</Label><Input type="password" defaultValue="••••••••••••••••" /></div>
        </div>

        <div className="mt-5 flex gap-2">
          <Button onClick={()=>toast.success("Đã lưu cấu hình S3")}>Lưu</Button>
          <Button variant="outline" disabled={testing} onClick={()=>{
            setTesting(true);
            setTimeout(()=>{setTesting(false); toast.success("Kết nối thành công · 214ms");}, 1100);
          }}>
            {testing && <Loader2 className="h-4 w-4 animate-spin" />}
            Test connection
          </Button>
        </div>
      </Card>
    </AppShell>
  );
}
