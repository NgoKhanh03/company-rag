import { useState } from "react";
import {
  MoreHorizontal,
  Eye,
  Pencil,
  Replace,
  RefreshCw,
  Download,
  Trash2,
  History,
  FileText,
  Upload,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";

export type DocumentItem = {
  name: string;
  type: string;
  size: string;
  chunks: number;
  version?: string;
};

type Version = {
  version: string;
  updated: string;
  author: string;
  note: string;
};

const DEMO_VERSIONS: Version[] = [
  { version: "v3.2", updated: "2 giờ trước", author: "Minh Tran", note: "Cập nhật chương 8 – chính sách nghỉ phép" },
  { version: "v3.1", updated: "3 tuần trước", author: "Lan Pham", note: "Sửa lỗi chính tả, thêm phụ lục A" },
  { version: "v3.0", updated: "2 tháng trước", author: "Admin", note: "Phát hành phiên bản chính thức" },
  { version: "v2.4", updated: "5 tháng trước", author: "Admin", note: "Bản nháp cuối" },
];

export function DocumentActions({ doc }: { doc: DocumentItem }) {
  const [view, setView] = useState(false);
  const [edit, setEdit] = useState(false);
  const [replace, setReplace] = useState(false);
  const [del, setDel] = useState(false);
  const [reindex, setReindex] = useState(false);
  const [progress, setProgress] = useState(0);

  const runReindex = () => {
    setReindex(true);
    setProgress(0);
    const iv = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(iv);
          setTimeout(() => {
            setReindex(false);
            toast.success(`Đã re-index "${doc.name}" (${doc.chunks} chunks)`);
          }, 400);
          return 100;
        }
        return p + 10;
      });
    }, 120);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuLabel className="text-[11px] uppercase tracking-wide text-muted-foreground font-normal">
            Tài liệu
          </DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setView(true)}>
            <Eye className="h-4 w-4" /> Xem tài liệu
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setEdit(true)}>
            <Pencil className="h-4 w-4" /> Chỉnh sửa metadata
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setReplace(true)}>
            <Replace className="h-4 w-4" /> Thay thế file
          </DropdownMenuItem>
          <DropdownMenuItem onClick={runReindex}>
            <RefreshCw className="h-4 w-4" /> Re-index
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => toast.success("Đang tải xuống…")}>
            <Download className="h-4 w-4" /> Tải xuống
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-red-400 focus:text-red-400"
            onClick={() => setDel(true)}
          >
            <Trash2 className="h-4 w-4" /> Xoá tài liệu
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* View */}
      <Dialog open={view} onOpenChange={setView}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-lg bg-secondary flex items-center justify-center">
                <FileText className="h-5 w-5 text-brand" />
              </div>
              <div>
                <DialogTitle className="text-left">{doc.name}</DialogTitle>
                <DialogDescription className="text-left">
                  {doc.size} · {doc.chunks} chunks · phiên bản {doc.version ?? "v3.2"}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <div className="grid gap-4 md:grid-cols-[1fr_240px]">
            <div className="rounded-lg border border-border bg-background/60 p-4 h-80 overflow-hidden">
              <div className="text-xs text-muted-foreground mb-2 flex items-center gap-2">
                <Badge variant="outline" className="text-[10px]">Preview</Badge>
                Trang 1 / 24
              </div>
              <div className="text-sm leading-relaxed text-muted-foreground space-y-2">
                <p className="font-medium text-foreground">Chương 1 — Giới thiệu</p>
                <p>
                  Tài liệu này mô tả các chính sách nội bộ áp dụng cho toàn bộ nhân viên của công ty. Nội dung đã được số hoá và index vào không gian RAG để hỗ trợ tra cứu bằng ngôn ngữ tự nhiên.
                </p>
                <p>
                  Mỗi đoạn văn được cắt thành các chunk 512 token với overlap 64 token, embed bằng model text-embedding-3-large và lưu trong Qdrant.
                </p>
                <p className="font-medium text-foreground pt-2">1.1. Phạm vi áp dụng</p>
                <p>Áp dụng cho tất cả các phòng ban, chi nhánh trong nước và quốc tế…</p>
              </div>
            </div>
            <div>
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 flex items-center gap-1.5">
                <History className="h-3.5 w-3.5" /> Lịch sử phiên bản
              </div>
              <ScrollArea className="h-72 pr-2">
                <div className="space-y-2">
                  {DEMO_VERSIONS.map((v, i) => (
                    <div
                      key={v.version}
                      className={`rounded-lg border p-2.5 text-xs ${
                        i === 0
                          ? "border-brand/50 bg-brand/5"
                          : "border-border bg-background/40"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm">{v.version}</span>
                        {i === 0 && (
                          <Badge className="text-[10px] h-4 bg-brand/20 text-brand border-transparent">
                            Hiện tại
                          </Badge>
                        )}
                      </div>
                      <div className="text-muted-foreground mt-1">{v.updated} · {v.author}</div>
                      <div className="mt-1 line-clamp-2">{v.note}</div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit metadata */}
      <Dialog open={edit} onOpenChange={setEdit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa metadata</DialogTitle>
            <DialogDescription>
              Thay đổi được ghi nhận và tăng số phiên bản.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label>Tên tài liệu</Label>
              <Input defaultValue={doc.name} />
            </div>
            <div className="space-y-1.5">
              <Label>Ghi chú thay đổi</Label>
              <Textarea placeholder="Mô tả ngắn cho phiên bản mới…" rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEdit(false)}>Huỷ</Button>
            <Button
              onClick={() => {
                setEdit(false);
                toast.success(`Đã lưu — tạo phiên bản v3.3 cho "${doc.name}"`);
              }}
            >
              <CheckCircle2 className="h-4 w-4" /> Lưu & tăng phiên bản
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Replace file */}
      <Dialog open={replace} onOpenChange={setReplace}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thay thế file</DialogTitle>
            <DialogDescription>
              Upload file mới sẽ tạo phiên bản mới và trigger re-index tự động.
            </DialogDescription>
          </DialogHeader>
          <label className="border-2 border-dashed border-border rounded-lg p-8 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-accent/30 transition">
            <Upload className="h-8 w-8 text-muted-foreground" />
            <div className="text-sm">Kéo thả hoặc click để chọn file</div>
            <div className="text-xs text-muted-foreground">PDF, DOCX, MD, XLSX — tối đa 50MB</div>
            <input type="file" className="hidden" />
          </label>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReplace(false)}>Huỷ</Button>
            <Button
              onClick={() => {
                setReplace(false);
                toast.success(`Đã thay thế "${doc.name}" — tạo phiên bản v3.3, đang re-index…`);
              }}
            >
              Thay thế & re-index
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete */}
      <AlertDialog open={del} onOpenChange={setDel}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xoá tài liệu?</AlertDialogTitle>
            <AlertDialogDescription>
              "{doc.name}" và {doc.chunks} vector chunks sẽ bị xoá vĩnh viễn khỏi vector store. Thao tác này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Huỷ</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-500/90"
              onClick={() => toast.success(`Đã xoá "${doc.name}"`)}
            >
              Xoá
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reindex progress */}
      <Dialog open={reindex} onOpenChange={setReindex}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Re-index tài liệu</DialogTitle>
            <DialogDescription>Đang chunk & embed lại {doc.chunks} đoạn…</DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Progress value={progress} />
            <div className="text-xs text-muted-foreground text-right">{progress}%</div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
