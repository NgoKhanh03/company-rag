import { createFileRoute } from "@tanstack/react-router";
import {
  Upload,
  FileText,
  FileSpreadsheet,
  FileCode,
  Search,
  Filter,
  MoreHorizontal,
  CheckCircle2,
  Loader2,
} from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { UploadDocumentDialog } from "@/components/upload-document-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/documents")({
  component: DocumentsPage,
});

const docs = [
  {
    name: "HR-Policy-v3.2.pdf",
    type: "pdf",
    category: "Nhân sự",
    size: "2.4 MB",
    chunks: 148,
    updated: "2 giờ trước",
    status: "indexed",
  },
  {
    name: "Support-Playbook.md",
    type: "md",
    category: "Vận hành",
    size: "312 KB",
    chunks: 42,
    updated: "Hôm qua",
    status: "indexed",
  },
  {
    name: "Finance-SOP-2026.docx",
    type: "doc",
    category: "Tài chính",
    size: "1.1 MB",
    chunks: 76,
    updated: "2 ngày trước",
    status: "indexed",
  },
  {
    name: "InfoSec-Standard.pdf",
    type: "pdf",
    category: "Bảo mật",
    size: "3.8 MB",
    chunks: 214,
    updated: "3 ngày trước",
    status: "indexed",
  },
  {
    name: "Q4-Roadmap.xlsx",
    type: "xls",
    category: "Sản phẩm",
    size: "820 KB",
    chunks: 0,
    updated: "vừa xong",
    status: "processing",
  },
  {
    name: "Onboarding-Guide.pdf",
    type: "pdf",
    category: "Nhân sự",
    size: "5.2 MB",
    chunks: 302,
    updated: "1 tuần trước",
    status: "indexed",
  },
  {
    name: "API-Reference.md",
    type: "md",
    category: "Kỹ thuật",
    size: "1.9 MB",
    chunks: 421,
    updated: "1 tuần trước",
    status: "indexed",
  },
];

const iconFor = (t: string) => {
  if (t === "xls") return FileSpreadsheet;
  if (t === "md") return FileCode;
  return FileText;
};

function DocumentsPage() {
  return (
    <AppShell
      title="Thư viện tài liệu"
      subtitle={`${docs.length} tài liệu · ${docs.reduce((n, d) => n + d.chunks, 0)} đoạn được index cho RAG`}
      actions={
        <Button className="gap-1.5">
          <Upload className="h-4 w-4" /> Tải tài liệu lên
        </Button>
      }
    >
      <div className="grid gap-4 md:grid-cols-4 mb-4">
        {[
          { label: "Tổng tài liệu", value: docs.length },
          { label: "Đã index", value: docs.filter((d) => d.status === "indexed").length },
          { label: "Đang xử lý", value: docs.filter((d) => d.status === "processing").length },
          { label: "Đoạn vector", value: docs.reduce((n, d) => n + d.chunks, 0).toLocaleString() },
        ].map((s) => (
          <Card key={s.label} className="bg-card border-border">
            <CardContent className="pt-5">
              <div className="text-xs text-muted-foreground">{s.label}</div>
              <div className="mt-1 text-2xl font-semibold">{s.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-card border-border">
        <div className="p-4 flex flex-wrap items-center gap-2 border-b border-border">
          <div className="relative flex-1 min-w-[220px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm theo tên hoặc nội dung..."
              className="pl-9 bg-background border-border"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="mr-1 h-4 w-4" /> Danh mục
          </Button>
          <Button variant="outline" size="sm">
            Trạng thái
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead>Tên tài liệu</TableHead>
              <TableHead>Danh mục</TableHead>
              <TableHead>Kích thước</TableHead>
              <TableHead>Đoạn (chunks)</TableHead>
              <TableHead>Cập nhật</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {docs.map((d) => {
              const Icon = iconFor(d.type);
              return (
                <TableRow key={d.name} className="border-border">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center">
                        <Icon className="h-4 w-4 text-brand" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{d.name}</div>
                        <div className="text-xs text-muted-foreground uppercase">
                          {d.type}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-border">
                      {d.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{d.size}</TableCell>
                  <TableCell className="text-sm">{d.chunks || "—"}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{d.updated}</TableCell>
                  <TableCell>
                    {d.status === "indexed" ? (
                      <span className="inline-flex items-center gap-1 text-xs text-success">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Đã index
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs text-warning">
                        <Loader2 className="h-3.5 w-3.5 animate-spin" /> Đang xử lý
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </AppShell>
  );
}
