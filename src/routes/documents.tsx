import { createFileRoute } from "@tanstack/react-router";
import {
  Upload,
  FileText,
  FileSpreadsheet,
  FileCode,
  Search,
  Filter,
  CheckCircle2,
  Loader2,
} from "lucide-react";

import { DocumentActions } from "@/components/document-actions";

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
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/documents")({
  component: DocumentsPage,
});

const iconFor = (t: string) => {
  if (t === "xls") return FileSpreadsheet;
  if (t === "md") return FileCode;
  return FileText;
};

function DocumentsPage() {
  const t = useT();

  const docs = [
    {
      name: "HR-Policy-v3.2.pdf",
      type: "pdf",
      catKey: "cat.hr",
      size: "2.4 MB",
      chunks: 148,
      updated: t("time.hour", { n: 2 }),
      status: "indexed",
    },
    {
      name: "Support-Playbook.md",
      type: "md",
      catKey: "cat.ops",
      size: "312 KB",
      chunks: 42,
      updated: t("time.yesterday"),
      status: "indexed",
    },
    {
      name: "Finance-SOP-2026.docx",
      type: "doc",
      catKey: "cat.finance",
      size: "1.1 MB",
      chunks: 76,
      updated: t("time.days", { n: 2 }),
      status: "indexed",
    },
    {
      name: "InfoSec-Standard.pdf",
      type: "pdf",
      catKey: "cat.security",
      size: "3.8 MB",
      chunks: 214,
      updated: t("time.days", { n: 3 }),
      status: "indexed",
    },
    {
      name: "Q4-Roadmap.xlsx",
      type: "xls",
      catKey: "cat.product",
      size: "820 KB",
      chunks: 0,
      updated: t("time.now"),
      status: "processing",
    },
    {
      name: "Onboarding-Guide.pdf",
      type: "pdf",
      catKey: "cat.hr",
      size: "5.2 MB",
      chunks: 302,
      updated: t("time.week"),
      status: "indexed",
    },
    {
      name: "API-Reference.md",
      type: "md",
      catKey: "cat.tech",
      size: "1.9 MB",
      chunks: 421,
      updated: t("time.week"),
      status: "indexed",
    },
  ];

  return (
    <AppShell
      title={t("docs.title")}
      subtitle={t("docs.sub", {
        docs: docs.length,
        chunks: docs.reduce((n, d) => n + d.chunks, 0),
      })}
      actions={
        <UploadDocumentDialog>
          <Button className="gap-1.5">
            <Upload className="h-4 w-4" /> {t("docs.upload")}
          </Button>
        </UploadDocumentDialog>
      }
    >
      <div className="grid gap-4 md:grid-cols-4 mb-4">
        {[
          { label: t("docs.stat.total"), value: docs.length },
          {
            label: t("docs.stat.indexed"),
            value: docs.filter((d) => d.status === "indexed").length,
          },
          {
            label: t("docs.stat.processing"),
            value: docs.filter((d) => d.status === "processing").length,
          },
          {
            label: t("docs.stat.vectors"),
            value: docs.reduce((n, d) => n + d.chunks, 0).toLocaleString(),
          },
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
              placeholder={t("docs.search")}
              className="pl-9 bg-background border-border"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="mr-1 h-4 w-4" /> {t("docs.filter.cat")}
          </Button>
          <Button variant="outline" size="sm">
            {t("docs.filter.status")}
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead>{t("docs.col.name")}</TableHead>
              <TableHead>{t("docs.col.cat")}</TableHead>
              <TableHead>{t("docs.col.size")}</TableHead>
              <TableHead>{t("docs.col.chunks")}</TableHead>
              <TableHead>{t("docs.col.updated")}</TableHead>
              <TableHead>{t("docs.col.status")}</TableHead>
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
                      {t(d.catKey)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{d.size}</TableCell>
                  <TableCell className="text-sm">{d.chunks || "—"}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{d.updated}</TableCell>
                  <TableCell>
                    {d.status === "indexed" ? (
                      <span className="inline-flex items-center gap-1 text-xs text-success">
                        <CheckCircle2 className="h-3.5 w-3.5" /> {t("docs.status.indexed")}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs text-warning">
                        <Loader2 className="h-3.5 w-3.5 animate-spin" /> {t("docs.status.processing")}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <DocumentActions doc={{ name: d.name, type: d.type, size: d.size, chunks: d.chunks }} />
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
