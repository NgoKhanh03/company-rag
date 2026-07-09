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
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-brand/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-brand/10 blur-3xl" />
      </div>
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
