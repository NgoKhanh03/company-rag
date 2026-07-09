import { useState } from "react";
import { AlertTriangle, Upload } from "lucide-react";

import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

export function RestoreDialog({
  open, onOpenChange,
}: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [confirm, setConfirm] = useState(false);
  const [selected, setSelected] = useState("");

  const submit = () => {
    if (!confirm) return toast.error("Bạn cần xác nhận cảnh báo");
    toast.success("Đã bắt đầu quá trình khôi phục");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader><DialogTitle>Khôi phục dữ liệu</DialogTitle></DialogHeader>
        <div className="rounded-md border border-amber-500/30 bg-amber-500/10 p-3 flex gap-2 text-sm">
          <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-amber-200">
            Thao tác này sẽ <b>ghi đè</b> dữ liệu hiện tại. Đảm bảo bạn đã sao lưu trước khi tiếp tục.
          </div>
        </div>

        <Tabs defaultValue="existing">
          <TabsList>
            <TabsTrigger value="existing">Từ backup có sẵn</TabsTrigger>
            <TabsTrigger value="upload">Tải file lên</TabsTrigger>
          </TabsList>
          <TabsContent value="existing" className="pt-3">
            <Select value={selected} onValueChange={setSelected}>
              <SelectTrigger><SelectValue placeholder="Chọn bản backup" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="b1">backup-2026-07-08 · 1.2GB</SelectItem>
                <SelectItem value="b2">backup-2026-07-01 · 1.1GB</SelectItem>
                <SelectItem value="b3">backup-2026-06-24 · 980MB</SelectItem>
              </SelectContent>
            </Select>
          </TabsContent>
          <TabsContent value="upload" className="pt-3">
            <label className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border py-8 cursor-pointer hover:bg-accent/30">
              <Upload className="h-6 w-6 text-muted-foreground" />
              <div className="text-sm">Kéo thả file .tar.gz hoặc bấm để chọn</div>
              <Input type="file" className="hidden" />
            </label>
          </TabsContent>
        </Tabs>

        <label className="flex items-start gap-2 text-sm">
          <Checkbox checked={confirm} onCheckedChange={(v)=>setConfirm(!!v)} className="mt-0.5" />
          <span>Tôi hiểu dữ liệu hiện tại sẽ bị ghi đè và không thể hoàn tác.</span>
        </label>

        <DialogFooter>
          <Button variant="outline" onClick={()=>onOpenChange(false)}>Huỷ</Button>
          <Button onClick={submit} className="bg-amber-500 hover:bg-amber-500/90 text-black">Khôi phục</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
