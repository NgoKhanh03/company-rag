import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Database, RotateCcw, Cloud, Building2, Activity, Save, HardDrive, ArrowRight,
} from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { BackupDialog } from "@/components/backup-dialog";
import { RestoreDialog } from "@/components/restore-dialog";

export const Route = createFileRoute("/backup")({
  head: () => ({ meta: [{ title: "Backup & Restore — Novadoc" }] }),
  component: BackupDashboard,
});

function BackupDashboard() {
  const [backupOpen, setBackupOpen] = useState(false);
  const [restoreOpen, setRestoreOpen] = useState(false);

  const cards = [
    { title: "Backup System", desc: "Tạo bản sao lưu toàn bộ hệ thống ngay bây giờ", icon: Save, onClick: () => setBackupOpen(true), badge: "success" as const, badgeText: "Sẵn sàng" },
    { title: "Restore", desc: "Khôi phục dữ liệu từ backup có sẵn hoặc file tải lên", icon: RotateCcw, onClick: () => setRestoreOpen(true), badge: "warning" as const, badgeText: "Cẩn trọng" },
    { title: "S3 Storage", desc: "Cấu hình lưu trữ trên object storage tương thích S3", icon: Cloud, to: "/backup/s3", badge: "info" as const, badgeText: "Cấu hình" },
    { title: "Tenant Backup", desc: "Sao lưu riêng lẻ theo từng tenant", icon: Building2, to: "/backup/tenants", badge: "muted" as const, badgeText: "5 tenant" },
    { title: "System Check", desc: "Kiểm tra pg_dump, dung lượng và trạng thái sao lưu", icon: Activity, to: "/backup/system-check", badge: "success" as const, badgeText: "OK" },
    { title: "Backup History", desc: "Danh sách các bản sao lưu đã tạo", icon: HardDrive, to: "/backup/history", badge: "info" as const, badgeText: "24 bản" },
  ];

  return (
    <AppShell title="Backup & Restore" subtitle="Sao lưu, khôi phục và cấu hình lưu trữ">
      <div className="grid gap-3 md:grid-cols-4 mb-6">
        <StatCard label="Bản sao lưu" value={24} icon={Database} tone="info" />
        <StatCard label="Bản mới nhất" value="2 giờ trước" icon={Save} tone="success" />
        <StatCard label="Dung lượng S3" value="8.4 / 20 TB" icon={Cloud} />
        <StatCard label="Tenant" value={5} icon={Building2} />
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => {
          const Icon = c.icon;
          const inner = (
            <Card className="p-5 bg-card border-border hover:border-brand/60 transition-colors h-full">
              <div className="flex items-start justify-between">
                <div className="h-11 w-11 rounded-xl bg-brand/15 text-brand flex items-center justify-center">
                  <Icon className="h-5 w-5" />
                </div>
                <StatusBadge tone={c.badge}>{c.badgeText}</StatusBadge>
              </div>
              <div className="mt-4 font-semibold">{c.title}</div>
              <div className="text-sm text-muted-foreground mt-1">{c.desc}</div>
              <div className="mt-4 text-sm text-brand flex items-center gap-1">
                {c.to ? "Mở" : "Chạy"} <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </Card>
          );
          return c.to ? (
            <Link key={c.title} to={c.to as "/backup/history"}>{inner}</Link>
          ) : (
            <button key={c.title} type="button" onClick={c.onClick} className="text-left">
              {inner}
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex gap-2">
        <Button onClick={()=>setBackupOpen(true)}><Save className="h-4 w-4" /> Backup ngay</Button>
        <Button variant="outline" onClick={()=>setRestoreOpen(true)}><RotateCcw className="h-4 w-4" /> Khôi phục</Button>
      </div>

      <BackupDialog open={backupOpen} onOpenChange={setBackupOpen} />
      <RestoreDialog open={restoreOpen} onOpenChange={setRestoreOpen} />
    </AppShell>
  );
}
