import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  FileText,
  MessagesSquare,
  Users,
  Zap,
  CheckCircle2,
  Clock,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { AppShell } from "@/components/app-shell";
import { UploadDocumentDialog } from "@/components/upload-document-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/")({
  component: DashboardPage,
});

const usageData = [
  { day: "T2", queries: 142, ingested: 12 },
  { day: "T3", queries: 189, ingested: 18 },
  { day: "T4", queries: 231, ingested: 9 },
  { day: "T5", queries: 274, ingested: 22 },
  { day: "T6", queries: 318, ingested: 31 },
  { day: "T7", queries: 96, ingested: 4 },
  { day: "CN", queries: 62, ingested: 2 },
];

const topics = [
  { name: "Chính sách nhân sự", value: 42 },
  { name: "Quy trình kỹ thuật", value: 34 },
  { name: "Hợp đồng & pháp lý", value: 28 },
  { name: "Bảo mật & tuân thủ", value: 21 },
  { name: "Onboarding", value: 17 },
];

const stats = [
  {
    label: "Câu hỏi hôm nay",
    value: "318",
    delta: "+12,4%",
    icon: MessagesSquare,
  },
  { label: "Tài liệu đã index", value: "2.847", delta: "+31", icon: FileText },
  { label: "Người dùng hoạt động", value: "184", delta: "+8", icon: Users },
  { label: "Độ chính xác RAG", value: "94,2%", delta: "+1,8%", icon: Zap },
];

const recentChats = [
  {
    user: "Lan Anh",
    q: "Chính sách nghỉ phép 2026 có gì thay đổi?",
    doc: "HR-Policy-v3.2.pdf",
    time: "2 phút trước",
  },
  {
    user: "Quang Huy",
    q: "SLA hỗ trợ khách hàng doanh nghiệp là bao nhiêu?",
    doc: "Support-Playbook.md",
    time: "9 phút trước",
  },
  {
    user: "Thu Trang",
    q: "Quy trình duyệt chi trên 50 triệu?",
    doc: "Finance-SOP.docx",
    time: "22 phút trước",
  },
  {
    user: "Minh Tú",
    q: "Yêu cầu bảo mật cho tài liệu mật cấp 2?",
    doc: "InfoSec-Standard.pdf",
    time: "1 giờ trước",
  },
];

function DashboardPage() {
  return (
    <AppShell
      title="Tổng quan"
      subtitle="Hoạt động của trợ lý RAG trong 7 ngày qua"
      actions={
        <div className="flex gap-2">
          <Button variant="outline">Xuất báo cáo</Button>
          <UploadDocumentDialog>
            <Button>
              Nạp tài liệu mới
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Button>
          </UploadDocumentDialog>
        </div>
      }
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm text-muted-foreground">{s.label}</div>
                  <div className="mt-2 text-3xl font-semibold tracking-tight">
                    {s.value}
                  </div>
                  <div className="mt-1 text-xs text-success flex items-center gap-1">
                    <ArrowUpRight className="h-3 w-3" />
                    {s.delta} so với tuần trước
                  </div>
                </div>
                <div className="h-10 w-10 rounded-lg bg-brand/15 text-brand flex items-center justify-center">
                  <s.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Câu hỏi & tài liệu nạp mới</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Xu hướng 7 ngày · dữ liệu demo
              </p>
            </div>
            <Badge variant="outline" className="text-brand border-brand/40">
              Realtime
            </Badge>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={usageData}>
                <defs>
                  <linearGradient id="gQ" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--brand)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="var(--brand)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gI" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-2)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    color: "var(--foreground)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="queries"
                  stroke="var(--brand)"
                  fill="url(#gQ)"
                  strokeWidth={2}
                  name="Câu hỏi"
                />
                <Area
                  type="monotone"
                  dataKey="ingested"
                  stroke="var(--chart-2)"
                  fill="url(#gI)"
                  strokeWidth={2}
                  name="Tài liệu mới"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Chủ đề được hỏi nhiều</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Tuần này</p>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topics} layout="vertical" margin={{ left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                <XAxis type="number" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis
                  type="category"
                  dataKey="name"
                  stroke="var(--muted-foreground)"
                  fontSize={12}
                  width={130}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                  }}
                />
                <Bar dataKey="value" fill="var(--brand)" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader>
            <CardTitle>Truy vấn gần đây</CardTitle>
          </CardHeader>
          <CardContent className="divide-y divide-border">
            {recentChats.map((c, i) => (
              <div key={i} className="py-3 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-secondary text-foreground flex items-center justify-center text-xs font-medium">
                  {c.user
                    .split(" ")
                    .map((s) => s[0])
                    .join("")}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium truncate">{c.q}</div>
                  <div className="text-xs text-muted-foreground truncate">
                    {c.user} · nguồn: {c.doc}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground flex items-center gap-1 shrink-0">
                  <Clock className="h-3 w-3" />
                  {c.time}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Sức khỏe RAG</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {[
              { label: "Độ phủ tài liệu", value: 92 },
              { label: "Chất lượng trích dẫn", value: 87 },
              { label: "Phản hồi tích cực", value: 74 },
              { label: "Trễ trung bình (< 2s)", value: 96 },
            ].map((m) => (
              <div key={m.label}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="text-muted-foreground">{m.label}</span>
                  <span className="font-medium">{m.value}%</span>
                </div>
                <Progress value={m.value} className="h-1.5" />
              </div>
            ))}
            <div className="pt-2 flex items-center gap-2 text-sm text-success">
              <CheckCircle2 className="h-4 w-4" />
              Toàn bộ hệ thống hoạt động ổn định
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
