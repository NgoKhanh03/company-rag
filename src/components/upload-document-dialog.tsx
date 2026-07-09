import { useRef, useState, type ReactNode } from "react";
import {
  UploadCloud,
  FileText,
  X,
  CheckCircle2,
  Loader2,
  FolderOpen,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useT } from "@/lib/i18n";

type PickedFile = {
  id: string;
  name: string;
  size: number;
  status: "queued" | "uploading" | "done";
  progress: number;
};

const fmtSize = (b: number) => {
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / (1024 * 1024)).toFixed(1)} MB`;
};

export function UploadDocumentDialog({
  children,
}: {
  children?: ReactNode;
}) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<PickedFile[]>([]);
  const [category, setCategory] = useState("hr");
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const next: PickedFile[] = Array.from(list).map((f) => ({
      id: `${f.name}-${Date.now()}-${Math.random()}`,
      name: f.name,
      size: f.size,
      status: "queued",
      progress: 0,
    }));
    setFiles((prev) => [...prev, ...next]);
  };

  const removeFile = (id: string) =>
    setFiles((prev) => prev.filter((f) => f.id !== id));

  const startUpload = () => {
    setFiles((prev) =>
      prev.map((f) => ({ ...f, status: "uploading" as const, progress: 0 })),
    );
    files.forEach((file) => {
      let p = 0;
      const timer = setInterval(() => {
        p += 8 + Math.random() * 14;
        setFiles((prev) =>
          prev.map((f) =>
            f.id === file.id
              ? {
                  ...f,
                  progress: Math.min(100, p),
                  status: p >= 100 ? ("done" as const) : ("uploading" as const),
                }
              : f,
          ),
        );
        if (p >= 100) clearInterval(timer);
      }, 220);
    });
  };

  const reset = () => {
    setFiles([]);
    setDragging(false);
  };

  const anyDone = files.some((f) => f.status === "done");
  const uploading = files.some((f) => f.status === "uploading");

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) reset();
      }}
    >
      <DialogTrigger asChild>{children ?? <Button>Upload</Button>}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UploadCloud className="h-5 w-5 text-brand" />
            {t("upload.title")}
          </DialogTitle>
          <DialogDescription>{t("upload.desc")}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs">{t("upload.category")}</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hr">{t("cat.hr")}</SelectItem>
                  <SelectItem value="tech">{t("cat.tech")}</SelectItem>
                  <SelectItem value="finance">{t("cat.finance")}</SelectItem>
                  <SelectItem value="security">{t("cat.security")}</SelectItem>
                  <SelectItem value="ops">{t("cat.ops")}</SelectItem>
                  <SelectItem value="other">{t("cat.other")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">{t("upload.access")}</Label>
              <Select defaultValue="team">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="private">{t("access.private")}</SelectItem>
                  <SelectItem value="team">{t("access.team")}</SelectItem>
                  <SelectItem value="workspace">{t("access.workspace")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs">{t("upload.tags")}</Label>
            <Input placeholder={t("upload.tags_ph")} />
          </div>

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              addFiles(e.dataTransfer.files);
            }}
            className={`rounded-lg border-2 border-dashed p-6 text-center transition-colors ${
              dragging
                ? "border-brand bg-brand/5"
                : "border-border bg-background/40 hover:border-brand/50"
            }`}
          >
            <input
              ref={inputRef}
              type="file"
              multiple
              className="hidden"
              onChange={(e) => addFiles(e.target.files)}
            />
            <div className="mx-auto h-10 w-10 rounded-full bg-brand/15 text-brand flex items-center justify-center mb-3">
              <UploadCloud className="h-5 w-5" />
            </div>
            <div className="text-sm font-medium">{t("upload.drag")}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {t("upload.or_pick")}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="mt-3 gap-1.5"
              onClick={() => inputRef.current?.click()}
            >
              <FolderOpen className="h-3.5 w-3.5" />
              {t("upload.browse")}
            </Button>
          </div>

          {files.length > 0 && (
            <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
              {files.map((f) => (
                <div
                  key={f.id}
                  className="flex items-center gap-3 p-2.5 rounded-lg border border-border bg-background/40"
                >
                  <div className="h-9 w-9 rounded-md bg-secondary flex items-center justify-center shrink-0">
                    {f.status === "done" ? (
                      <CheckCircle2 className="h-4 w-4 text-success" />
                    ) : f.status === "uploading" ? (
                      <Loader2 className="h-4 w-4 text-brand animate-spin" />
                    ) : (
                      <FileText className="h-4 w-4 text-brand" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium truncate">{f.name}</div>
                      <div className="text-[11px] text-muted-foreground shrink-0">
                        {fmtSize(f.size)}
                      </div>
                    </div>
                    {f.status !== "queued" && (
                      <Progress value={f.progress} className="h-1 mt-1.5" />
                    )}
                  </div>
                  {f.status === "queued" && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => removeFile(f.id)}
                    >
                      <X className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button variant="ghost" onClick={() => setOpen(false)}>
            {t("upload.cancel")}
          </Button>
          {anyDone && !uploading ? (
            <Button
              onClick={() => {
                setOpen(false);
                reset();
              }}
            >
              {t("upload.done")}
            </Button>
          ) : (
            <Button
              disabled={files.length === 0 || uploading}
              onClick={startUpload}
              className="gap-1.5"
            >
              <UploadCloud className="h-4 w-4" />
              {t("upload.submit", { n: files.length })}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
