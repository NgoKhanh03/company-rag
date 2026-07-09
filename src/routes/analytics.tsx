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
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/analytics")({
  component: AnalyticsPage,
});

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

function AnalyticsPage() {
  const t = useT();

  const monthly = [
    { m: "M1", queries: 1420, users: 92 },
    { m: "M2", queries: 1810, users: 108 },
    { m: "M3", queries: 2140, users: 129 },
    { m: "M4", queries: 2680, users: 151 },
    { m: "M5", queries: 3120, users: 168 },
    { m: "M6", queries: 3540, users: 184 },
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

  return (
    <AppShell title={t("an.title")} subtitle={t("an.sub")}>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>{t("an.growth")}</CardTitle>
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
                  name={t("an.queries")}
                />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="var(--chart-2)"
                  strokeWidth={2}
                  dot={false}
                  name={t("an.users")}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>{t("an.dist")}</CardTitle>
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
            <CardTitle>{t("an.top")}</CardTitle>
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
