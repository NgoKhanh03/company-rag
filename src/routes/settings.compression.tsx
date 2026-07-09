import { createFileRoute } from "@tanstack/react-router";
import { SettingsLayout } from "@/components/settings-layout";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/settings/compression")({
  head: () => ({ meta: [{ title: "Context Compression — Novadoc" }] }),
  component: () => {
    const [ratio, setRatio] = useState([0.4]);
    return (
      <SettingsLayout title="Nén ngữ cảnh trước khi gửi tới LLM">
        <Card className="p-5 bg-card border-border space-y-5">
          <div className="flex items-center justify-between rounded-md border border-border px-3 py-2">
            <div className="text-sm">Bật nén ngữ cảnh</div><Switch defaultChecked />
          </div>
          <div className="space-y-2"><Label>Chiến lược</Label>
            <Select defaultValue="map-reduce"><SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="map-reduce">Map-Reduce</SelectItem>
                <SelectItem value="llmlingua">LLMLingua</SelectItem>
                <SelectItem value="summary">Summary Chain</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between"><Label>Tỉ lệ nén mục tiêu</Label><span className="text-sm text-muted-foreground">{Math.round(ratio[0]*100)}%</span></div>
            <Slider value={ratio} onValueChange={setRatio} min={0.1} max={0.9} step={0.05} />
          </div>
          <Button onClick={()=>toast.success("Đã lưu")}>Lưu</Button>
        </Card>
      </SettingsLayout>
    );
  },
});
