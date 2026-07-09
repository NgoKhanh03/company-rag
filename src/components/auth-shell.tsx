import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-background text-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,hsl(var(--brand)/0.15),transparent_60%),radial-gradient(circle_at_80%_90%,hsl(var(--brand)/0.1),transparent_55%)] pointer-events-none" />
      <div className="relative min-h-screen flex flex-col">
        <header className="flex items-center gap-2 px-6 py-5">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-brand text-brand-foreground flex items-center justify-center">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-semibold">Novadoc</div>
              <div className="text-[11px] text-muted-foreground -mt-0.5">
                RAG Workspace
              </div>
            </div>
          </Link>
        </header>
        <main className="flex-1 flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-md">
            <div className="rounded-2xl border border-border bg-card/70 backdrop-blur p-8 shadow-2xl">
              <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
              {subtitle && (
                <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
              )}
              <div className="mt-6">{children}</div>
            </div>
            {footer && (
              <div className="mt-6 text-center text-sm text-muted-foreground">
                {footer}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
