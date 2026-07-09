import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { AuthShell } from "@/components/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/auth/login")({
  head: () => ({
    meta: [
      { title: "Đăng nhập — Novadoc" },
      { name: "description", content: "Đăng nhập vào Novadoc RAG Workspace." },
    ],
  }),
  component: LoginPage,
});

const SAMPLES = [
  { email: "admin@novadoc.io", password: "admin123", role: "Admin" },
  { email: "editor@novadoc.io", password: "editor123", role: "Editor" },
  { email: "viewer@novadoc.io", password: "viewer123", role: "Viewer" },
];

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    if (!email || !password) {
      setErr("Vui lòng nhập email và mật khẩu");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(`Chào mừng ${email.split("@")[0]}`);
      navigate({ to: "/" });
    }, 900);
  };

  return (
    <AuthShell
      title="Đăng nhập"
      subtitle="Sử dụng tài khoản công ty để vào không gian RAG"
      footer={
        <>
          Chưa có tài khoản?{" "}
          <Link to="/auth/register" className="text-brand hover:underline">
            Đăng ký
          </Link>
        </>
      }
    >
      <form onSubmit={submit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email công ty</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            autoComplete="email"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Mật khẩu</Label>
            <button
              type="button"
              className="text-xs text-brand hover:underline"
              onClick={() => toast.info("Đã gửi hướng dẫn khôi phục (demo)")}
            >
              Quên mật khẩu?
            </button>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
              aria-label={show ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            >
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <Checkbox
            checked={remember}
            onCheckedChange={(v) => setRemember(!!v)}
          />
          Ghi nhớ đăng nhập
        </label>
        {err && (
          <div className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-400">
            {err}
          </div>
        )}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          Đăng nhập
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground">Tài khoản demo</span>
        <Separator className="flex-1" />
      </div>

      <div className="space-y-2">
        {SAMPLES.map((s) => (
          <button
            key={s.email}
            type="button"
            onClick={() => {
              setEmail(s.email);
              setPassword(s.password);
            }}
            className="w-full flex items-center justify-between rounded-lg border border-border bg-background/50 px-3 py-2 text-left hover:bg-accent/40 transition-colors"
          >
            <div>
              <div className="text-sm font-medium">{s.email}</div>
              <div className="text-xs text-muted-foreground">{s.role}</div>
            </div>
            <span className="text-[11px] text-brand">Điền form</span>
          </button>
        ))}
      </div>
    </AuthShell>
  );
}
