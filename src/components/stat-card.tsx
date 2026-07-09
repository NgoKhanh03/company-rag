import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  tone = "brand",
  className,
}: {
  label: string;
  value: string | number;
  hint?: string;
  icon?: LucideIcon;
  tone?: "brand" | "success" | "warning" | "error" | "info";
  className?: string;
}) {
  const toneMap = {
    brand: "bg-brand/15 text-brand",
    success: "bg-emerald-500/15 text-emerald-400",
    warning: "bg-amber-500/15 text-amber-400",
    error: "bg-red-500/15 text-red-400",
    info: "bg-sky-500/15 text-sky-400",
  };
  return (
    <Card className={cn("p-4 bg-card border-border", className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xs text-muted-foreground">{label}</div>
          <div className="mt-1 text-2xl font-semibold tracking-tight">
            {value}
          </div>
          {hint && (
            <div className="text-xs text-muted-foreground mt-1">{hint}</div>
          )}
        </div>
        {Icon && (
          <div className={cn("h-9 w-9 rounded-lg flex items-center justify-center", toneMap[tone])}>
            <Icon className="h-4 w-4" />
          </div>
        )}
      </div>
    </Card>
  );
}
