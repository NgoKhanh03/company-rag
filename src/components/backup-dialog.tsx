import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export function BackupDialog({
  open, onOpenChange,
}: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [name, setName] = useState("backup-" + new Date().toISOString().slice(0,10));
  const [compression, setCompression] = useState(true);
  const [dest, setDest] = useState("local");
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    if (progress >= 100) {
      setRunning(false);
      toast.success("Backup hoàn tất");
      setTimeout(() => onOpenChange(false), 400);
      return;
    }
    const t = setTimeout(() => setProgress((p) => Math.min(100, p + Math.random()*18)), 350);
    return () => clearTimeout(t);
  }, [progress, running, onOpenChange]);

  const start = () => { setProgress(0); setRunning(true); };

  return (
    <Dialog open={open} onOpenChange={(v) => !running && onOpenChange(v)}>
      <DialogContent>
        <DialogHeader><DialogTitle>Tạo bản sao lưu</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2"><Label>Tên backup</Label><Input value={name} onChange={(e)=>setName(e.target.value)} /></div>
          <div className="space-y-2"><Label>Nơi lưu</Label>
            <Select value={dest} onValueChange={setDest}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="local">Local disk</SelectItem>
                <SelectItem value="s3">S3 Storage</SelectItem>
                <SelectItem value="both">Local + S3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between rounded-md border border-border px-3 py-2">
            <div className="text-sm">Bật nén (gzip)</div>
            <Switch checked={compression} onCheckedChange={setCompression} />
          </div>
          {running || progress > 0 ? (
            <div className="space-y-2">
              <div className="flex justify-between text-sm"><span>Tiến độ</span><span>{Math.round(progress)}%</span></div>
              <Progress value={progress} />
            </div>
          ) : null}
        </div>
        <DialogFooter>
          <Button variant="outline" disabled={running} onClick={()=>onOpenChange(false)}>Đóng</Button>
          <Button onClick={start} disabled={running}>
            {running && <Loader2 className="h-4 w-4 animate-spin" />}
            {running ? "Đang chạy..." : "Bắt đầu backup"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
