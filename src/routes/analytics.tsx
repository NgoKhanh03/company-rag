import { createFileRoute } from "@tanstack/react-router";
import {
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

import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/analytics")({
  component: AnalyticsPage,
});

const monthly = [
  { m: "T7", queries: 1420, users: 92 },
  { m: "T8", queries: 1810, users: 108 },
  { m: "T9", queries: 2140, users: 129 },
  { m: "T10", queries: 2680, users: 151 },
  { m: "T11", queries: 3120, users: 168 },
  { m: "T12", queries: 3540, users: 184 },
];

const categories = [
  { name: "Nhân sự", value: 34 },
  { name: "Kỹ thuật", value: 28 },
  { name: "Tài chính", value: 18 },
  { name: "Bảo mật", value: 12 },
  { name: "Khác", value: 8 },
];

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

const topDocs = [
  { name: "HR-Policy-v3.2.pdf", hits: 412 },
  { name: "InfoSec-Standard.pdf", hits: 318 },
  { name: "Finance-SOP-2026.docx", hits: 264 },
  { name: "API-Reference.md", hits: 231 },
  { name: "Onboarding-Guide.pdf", hits: 187 },
];

function AnalyticsPage() {
  return (
    <AppShell
      title="Phân tích"
      subtitle="Insight về cách đội ngũ sử dụng thư viện tri thức"
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Tăng trưởng 6 tháng</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthly}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="m" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line
                  type="monotone"
                  dataKey="queries"
                  stroke="var(--brand)"
                  strokeWidth={2}
                  dot={false}
                  name="Câu hỏi"
                />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="var(--chart-2)"
                  strokeWidth={2}
                  dot={false}
                  name="Người dùng"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Phân bổ chủ đề tra cứu</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categories}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                >
                  {categories.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="var(--card)" />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card border-border lg:col-span-2">
          <CardHeader>
            <CardTitle>Tài liệu được truy vấn nhiều nhất</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topDocs} layout="vertical" margin={{ left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                <XAxis type="number" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis
                  type="category"
                  dataKey="name"
                  stroke="var(--muted-foreground)"
                  fontSize={12}
                  width={200}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                  }}
                />
                <Bar dataKey="hits" fill="var(--brand)" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
