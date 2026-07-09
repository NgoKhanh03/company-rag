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
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  component: DashboardPage,
});

function DashboardPage() {
  const t = useT();

  const usageData = [
    { day: "M", queries: 142, ingested: 12 },
    { day: "T", queries: 189, ingested: 18 },
    { day: "W", queries: 231, ingested: 9 },
    { day: "T", queries: 274, ingested: 22 },
    { day: "F", queries: 318, ingested: 31 },
    { day: "S", queries: 96, ingested: 4 },
    { day: "S", queries: 62, ingested: 2 },
  ];

  const topics = [
    { name: t("dash.topic.hr"), value: 42 },
    { name: t("dash.topic.tech"), value: 34 },
    { name: t("dash.topic.legal"), value: 28 },
    { name: t("dash.topic.sec"), value: 21 },
    { name: t("dash.topic.onboarding"), value: 17 },
  ];

  const stats = [
    { label: t("dash.stat.queries"), value: "318", delta: "+12.4%", icon: MessagesSquare },
    { label: t("dash.stat.docs"), value: "2,847", delta: "+31", icon: FileText },
    { label: t("dash.stat.users"), value: "184", delta: "+8", icon: Users },
    { label: t("dash.stat.accuracy"), value: "94.2%", delta: "+1.8%", icon: Zap },
  ];

  const recentChats = [
    {
      user: "Lan Anh",
      q: t("notif.n2.body").replace(/["'—].*$/, "").trim() || "Q1",
      doc: "HR-Policy-v3.2.pdf",
      time: t("time.min", { n: 2 }),
    },
    {
      user: "Quang Huy",
      q: t("dash.topic.tech"),
      doc: "Support-Playbook.md",
      time: t("time.min", { n: 9 }),
    },
    {
      user: "Thu Trang",
      q: t("dash.topic.legal"),
      doc: "Finance-SOP.docx",
      time: t("time.min", { n: 22 }),
    },
    {
      user: "Minh Tú",
      q: t("dash.topic.sec"),
      doc: "InfoSec-Standard.pdf",
      time: t("time.hour", { n: 1 }),
    },
  ];

  return (
    <AppShell
      title={t("dash.title")}
      subtitle={t("dash.sub")}
      actions={
        <div className="flex gap-2">
          <Button variant="outline">{t("dash.export")}</Button>
          <UploadDocumentDialog>
            <Button>
              {t("dash.ingest")}
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
                    {s.delta} {t("dash.delta")}
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
              <CardTitle>{t("dash.chart.title")}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {t("dash.chart.sub")}
              </p>
            </div>
            <Badge variant="outline" className="text-brand border-brand/40">
              {t("dash.realtime")}
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
                  name={t("dash.chart.queries")}
                />
                <Area
                  type="monotone"
                  dataKey="ingested"
                  stroke="var(--chart-2)"
                  fill="url(#gI)"
                  strokeWidth={2}
                  name={t("dash.chart.ingested")}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>{t("dash.topics.title")}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{t("dash.topics.sub")}</p>
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
                  fontSize={11}
                  width={140}
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
            <CardTitle>{t("dash.recent")}</CardTitle>
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
                    {c.user} · {t("dash.recent.source")}: {c.doc}
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
            <CardTitle>{t("dash.health")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {[
              { label: t("dash.health.coverage"), value: 92 },
              { label: t("dash.health.cite"), value: 87 },
              { label: t("dash.health.positive"), value: 74 },
              { label: t("dash.health.latency"), value: 96 },
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
              {t("dash.health.ok")}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
