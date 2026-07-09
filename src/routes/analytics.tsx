import { createFileRoute } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Users,
  UserCheck,
  Bot,
  MessagesSquare,
  HelpCircle,
  FileText,
  Zap,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  DollarSign,
  AlertTriangle,
  Activity,
  Download,
  Search as SearchIcon,
  Star,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/stat-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/analytics")({
  head: () => ({ meta: [{ title: "Analytics — Novadoc" }] }),
  component: AnalyticsPage,
});

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

const tip = {
  contentStyle: {
    background: "var(--popover)",
    border: "1px solid var(--border)",
    borderRadius: 8,
    fontSize: 12,
  },
};

function AnalyticsPage() {
  const t = useT();
  const [range, setRange] = useState("30d");

  const monthly = [
    { m: "T1", queries: 1420, users: 92 },
    { m: "T2", queries: 1810, users: 108 },
    { m: "T3", queries: 2140, users: 129 },
    { m: "T4", queries: 2680, users: 151 },
    { m: "T5", queries: 3120, users: 168 },
    { m: "T6", queries: 3540, users: 184 },
  ];
  const categories = [
    { name: t("an.cat.hr"), value: 34 },
    { name: t("an.cat.tech"), value: 28 },
    { name: t("an.cat.finance"), value: 18 },
    { name: t("an.cat.sec"), value: 12 },
    { name: t("an.cat.other"), value: 8 },
  ];
  const topDocs = [
    { name: "HR-Policy-v3.2.pdf", hits: 412 },
    { name: "InfoSec-Standard.pdf", hits: 318 },
    { name: "Finance-SOP-2026.docx", hits: 264 },
    { name: "API-Reference.md", hits: 231 },
    { name: "Onboarding-Guide.pdf", hits: 187 },
  ];
  const tokenSeries = Array.from({ length: 14 }, (_, i) => ({
    d: `${i + 1}`,
    prompt: 40000 + Math.round(Math.sin(i / 2) * 8000 + i * 1200),
    completion: 22000 + Math.round(Math.cos(i / 2) * 5000 + i * 800),
  }));
  const dau = Array.from({ length: 14 }, (_, i) => ({
    d: `${i + 1}`,
    dau: 60 + Math.round(Math.sin(i / 2) * 15 + i),
    wau: 180 + Math.round(Math.sin(i / 3) * 20 + i * 1.5),
    mau: 420 + i * 3,
  }));
  const models = [
    { name: "GPT-4o", value: 46 },
    { name: "Claude 3.5", value: 24 },
    { name: "Gemini 1.5", value: 18 },
    { name: "DeepSeek", value: 12 },
  ];
  const agents = [
    { name: "HR Assistant", sessions: 1240, latency: 820, success: 96, rating: 4.8 },
    { name: "IT Helpdesk", sessions: 980, latency: 640, success: 94, rating: 4.6 },
    { name: "Finance Bot", sessions: 612, latency: 910, success: 91, rating: 4.4 },
    { name: "Legal Q&A", sessions: 420, latency: 1120, success: 88, rating: 4.2 },
    { name: "Onboarding", sessions: 380, latency: 540, success: 97, rating: 4.9 },
  ];
  const noResult = [
    { q: "ISO 27002 mapping", n: 42 },
    { q: "Leave Policy 2027", n: 31 },
    { q: "Salary Band Q4", n: 28 },
    { q: "SOC2 evidence list", n: 22 },
    { q: "Chính sách WFH mới", n: 19 },
  ];
  const departments = [
    { d: "HR", q: 3210 },
    { d: "Engineering", q: 2840 },
    { d: "Finance", q: 1920 },
    { d: "Support", q: 1610 },
    { d: "Legal", q: 720 },
  ];

  const kpis = [
    { label: "Users", value: "248", hint: "↑ 6% vs kỳ trước", icon: Users, tone: "brand" as const },
    { label: "Active Today", value: "81", hint: "DAU", icon: UserCheck, tone: "success" as const },
    { label: "Agents", value: "12", hint: "5 workspace", icon: Bot, tone: "info" as const },
    { label: "Conversations", value: "3,412", hint: "↑ 12%", icon: MessagesSquare, tone: "brand" as const },
    { label: "Questions", value: "92,411", hint: "↑ 18%", icon: HelpCircle, tone: "info" as const },
    { label: "Documents", value: "3,542", hint: "1.2TB", icon: FileText, tone: "warning" as const },
    { label: "Tokens", value: "18.4M", hint: "↓ 11%", icon: Zap, tone: "warning" as const },
    { label: "Success Rate", value: "96%", hint: "trả lời có nguồn", icon: CheckCircle2, tone: "success" as const },
  ];

  return (
    <AppShell
      title={t("an.title")}
      subtitle={t("an.sub")}
      actions={
        <div className="flex gap-2">
          <Select value={range} onValueChange={setRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hôm nay</SelectItem>
              <SelectItem value="7d">7 ngày</SelectItem>
              <SelectItem value="30d">30 ngày</SelectItem>
              <SelectItem value="6m">6 tháng</SelectItem>
              <SelectItem value="1y">1 năm</SelectItem>
            </SelectContent>
          </Select>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Download className="h-4 w-4" /> Xuất báo cáo
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => toast.success("Đang xuất PDF…")}>PDF</DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.success("Đang xuất Excel…")}>Excel</DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.success("Đang xuất CSV…")}>CSV</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      }
    >
      {/* KPI Overview */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-4">
        {kpis.map((k) => (
          <StatCard key={k.label} {...k} />
        ))}
      </div>

      {/* Trend comparison */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-4">
        {[
          { label: "Questions", delta: "+18%", up: true },
          { label: "Active Users", delta: "+6%", up: true },
          { label: "Token Usage", delta: "-11%", up: false },
          { label: "AI Cost", delta: "+4%", up: true },
        ].map((x) => (
          <Card key={x.label} className="p-4 bg-card border-border flex items-center justify-between">
            <div>
              <div className="text-xs text-muted-foreground">{x.label} · so với kỳ trước</div>
              <div className={`mt-1 text-lg font-semibold ${x.up ? "text-emerald-400" : "text-red-400"}`}>{x.delta}</div>
            </div>
            {x.up ? <TrendingUp className="h-5 w-5 text-emerald-400" /> : <TrendingDown className="h-5 w-5 text-red-400" />}
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Question growth */}
        <Card className="bg-card border-border">
          <CardHeader><CardTitle>{t("an.growth")}</CardTitle></CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthly}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="m" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip {...tip} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="queries" stroke="var(--brand)" strokeWidth={2} dot={false} name={t("an.queries")} />
                <Line type="monotone" dataKey="users" stroke="var(--chart-2)" strokeWidth={2} dot={false} name={t("an.users")} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Topic distribution */}
        <Card className="bg-card border-border">
          <CardHeader><CardTitle>{t("an.dist")}</CardTitle></CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categories} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} paddingAngle={3}>
                  {categories.map((_, i) => (<Cell key={i} fill={COLORS[i % COLORS.length]} stroke="var(--card)" />))}
                </Pie>
                <Tooltip {...tip} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Token usage */}
        <Card className="bg-card border-border">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Token Usage (14 ngày)</CardTitle>
            <Badge variant="outline" className="text-[11px]">Prompt + Completion</Badge>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={tokenSeries}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="d" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip {...tip} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Area type="monotone" dataKey="prompt" stackId="1" stroke="var(--brand)" fill="var(--brand)" fillOpacity={0.35} name="Prompt" />
                <Area type="monotone" dataKey="completion" stackId="1" stroke="var(--chart-2)" fill="var(--chart-2)" fillOpacity={0.35} name="Completion" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* AI Cost + Model usage */}
        <Card className="bg-card border-border">
          <CardHeader><CardTitle>AI Cost & Model Usage</CardTitle></CardHeader>
          <CardContent>
            <div className="grid gap-3 grid-cols-3 mb-4">
              <div className="rounded-lg border border-border p-3">
                <div className="text-xs text-muted-foreground flex items-center gap-1"><DollarSign className="h-3 w-3" />Today</div>
                <div className="text-lg font-semibold">$4.27</div>
              </div>
              <div className="rounded-lg border border-border p-3">
                <div className="text-xs text-muted-foreground">7 ngày</div>
                <div className="text-lg font-semibold">$28.90</div>
              </div>
              <div className="rounded-lg border border-border p-3">
                <div className="text-xs text-muted-foreground">Tháng này</div>
                <div className="text-lg font-semibold">$126.40</div>
              </div>
            </div>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={models} dataKey="value" nameKey="name" innerRadius={40} outerRadius={70} paddingAngle={2}>
                    {models.map((_, i) => (<Cell key={i} fill={COLORS[i % COLORS.length]} stroke="var(--card)" />))}
                  </Pie>
                  <Tooltip {...tip} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Active users DAU/WAU/MAU */}
        <Card className="bg-card border-border">
          <CardHeader><CardTitle>Active Users (DAU / WAU / MAU)</CardTitle></CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dau}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="d" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip {...tip} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="dau" stroke="var(--brand)" strokeWidth={2} dot={false} name="DAU" />
                <Line type="monotone" dataKey="wau" stroke="var(--chart-2)" strokeWidth={2} dot={false} name="WAU" />
                <Line type="monotone" dataKey="mau" stroke="var(--chart-3)" strokeWidth={2} dot={false} name="MAU" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top agents */}
        <Card className="bg-card border-border">
          <CardHeader><CardTitle>Top Agents</CardTitle></CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead>Agent</TableHead>
                  <TableHead className="text-right">Sessions</TableHead>
                  <TableHead className="text-right">Latency</TableHead>
                  <TableHead className="text-right">Success</TableHead>
                  <TableHead className="text-right">Rating</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agents.map((a) => (
                  <TableRow key={a.name} className="border-border">
                    <TableCell className="font-medium">{a.name}</TableCell>
                    <TableCell className="text-right">{a.sessions.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-muted-foreground">{a.latency}ms</TableCell>
                    <TableCell className="text-right">
                      <span className={a.success >= 95 ? "text-emerald-400" : a.success >= 90 ? "text-amber-400" : "text-red-400"}>
                        {a.success}%
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="inline-flex items-center gap-1 text-amber-400"><Star className="h-3 w-3 fill-current" />{a.rating}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Top docs */}
        <Card className="bg-card border-border">
          <CardHeader><CardTitle>{t("an.top")}</CardTitle></CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topDocs} layout="vertical" margin={{ left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                <XAxis type="number" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis type="category" dataKey="name" stroke="var(--muted-foreground)" fontSize={12} width={200} />
                <Tooltip {...tip} />
                <Bar dataKey="hits" fill="var(--brand)" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Search analytics */}
        <Card className="bg-card border-border">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Search Analytics</CardTitle>
            <Badge variant="outline" className="text-[11px]"><SearchIcon className="h-3 w-3 me-1" />avg 412ms</Badge>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-muted-foreground">Search Success Rate</span>
                <span className="font-semibold text-emerald-400">96%</span>
              </div>
              <Progress value={96} />
            </div>
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Top câu hỏi không có kết quả</div>
            <div className="space-y-2">
              {noResult.map((n) => (
                <div key={n.q} className="flex items-center justify-between rounded-md border border-border bg-background/40 px-3 py-2">
                  <span className="text-sm truncate">{n.q}</span>
                  <Badge variant="outline" className="text-[10px]">{n.n} lần</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Department usage */}
        <Card className="bg-card border-border">
          <CardHeader><CardTitle>Department Usage</CardTitle></CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departments}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="d" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip {...tip} />
                <Bar dataKey="q" fill="var(--chart-2)" radius={[6, 6, 0, 0]} name="Questions" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Insights / Alerts */}
        <Card className="bg-card border-border">
          <CardHeader className="flex-row items-center gap-2">
            <Activity className="h-4 w-4 text-brand" />
            <CardTitle>Insights & Cảnh báo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { tone: "warning", text: "Search failed tăng 24% trong 7 ngày qua — cân nhắc bổ sung tài liệu về Salary Band." },
              { tone: "info", text: "Finance Workspace chỉ có 18 phiên/tuần — thấp hơn trung bình 61%." },
              { tone: "error", text: "Agent Legal Q&A latency > 1s — kiểm tra prompt hoặc context length." },
              { tone: "success", text: "Onboarding Agent đạt rating 4.9 ⭐ — nhân rộng prompt template." },
            ].map((a, i) => (
              <div
                key={i}
                className={`flex items-start gap-2 rounded-lg border p-3 text-sm ${
                  a.tone === "warning"
                    ? "border-amber-500/30 bg-amber-500/5"
                    : a.tone === "error"
                    ? "border-red-500/30 bg-red-500/5"
                    : a.tone === "success"
                    ? "border-emerald-500/30 bg-emerald-500/5"
                    : "border-sky-500/30 bg-sky-500/5"
                }`}
              >
                <AlertTriangle
                  className={`h-4 w-4 mt-0.5 shrink-0 ${
                    a.tone === "warning"
                      ? "text-amber-400"
                      : a.tone === "error"
                      ? "text-red-400"
                      : a.tone === "success"
                      ? "text-emerald-400"
                      : "text-sky-400"
                  }`}
                />
                <span>{a.text}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
