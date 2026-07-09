import { createFileRoute } from "@tanstack/react-router";
import { SettingsLayout } from "@/components/settings-layout";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/settings/trimming")({
  head: () => ({ meta: [{ title: "Context Trimming — Novadoc" }] }),
  component: () => (
    <SettingsLayout title="Cắt bớt ngữ cảnh khi vượt giới hạn token">
      <Card className="p-5 bg-card border-border space-y-5">
        <div className="flex items-center justify-between rounded-md border border-border px-3 py-2">
          <div className="text-sm">Bật cắt ngữ cảnh</div><Switch defaultChecked />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2"><Label>Chiến lược</Label>
            <Select defaultValue="tail"><SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="tail">Giữ đoạn cuối</SelectItem>
                <SelectItem value="head">Giữ đoạn đầu</SelectItem>
                <SelectItem value="middle">Bỏ giữa</SelectItem>
                <SelectItem value="score">Theo điểm relevance</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2"><Label>Ngưỡng token tối đa</Label><Input type="number" defaultValue={16000} /></div>
          <div className="space-y-2"><Label>Buffer response</Label><Input type="number" defaultValue={2000} /></div>
          <div className="space-y-2"><Label>Ưu tiên system prompt</Label>
            <Select defaultValue="always"><SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="always">Luôn giữ</SelectItem>
                <SelectItem value="trim">Cắt nếu cần</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button onClick={()=>toast.success("Đã lưu")}>Lưu</Button>
      </Card>
    </SettingsLayout>
  ),
});
