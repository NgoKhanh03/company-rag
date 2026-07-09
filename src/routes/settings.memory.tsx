import { createFileRoute } from "@tanstack/react-router";
import { SettingsLayout } from "@/components/settings-layout";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/settings/memory")({
  head: () => ({ meta: [{ title: "Memory — Novadoc" }] }),
  component: () => {
    const [topk, setTopk] = useState([6]);
    const [thr, setThr] = useState([0.72]);
    return (
      <SettingsLayout title="Semantic Search & Memory">
        <Card className="p-5 bg-card border-border space-y-5">
          <div className="flex items-center justify-between rounded-md border border-border px-3 py-2">
            <div className="text-sm">Bật semantic memory dài hạn</div><Switch defaultChecked />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between"><Label>Top-K chunk</Label><span className="text-sm text-muted-foreground">{topk[0]}</span></div>
            <Slider value={topk} onValueChange={setTopk} min={1} max={20} step={1} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between"><Label>Ngưỡng similarity</Label><span className="text-sm text-muted-foreground">{thr[0].toFixed(2)}</span></div>
            <Slider value={thr} onValueChange={setThr} min={0} max={1} step={0.01} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Chu kỳ quên (ngày)</Label><Input type="number" defaultValue={30} /></div>
            <div className="space-y-2"><Label>Memory namespace</Label><Input defaultValue="user:{{userId}}" /></div>
          </div>
          <Button onClick={()=>toast.success("Đã lưu cấu hình memory")}>Lưu</Button>
        </Card>
      </SettingsLayout>
    );
  },
});
