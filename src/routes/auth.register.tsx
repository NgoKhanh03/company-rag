import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { AuthShell } from "@/components/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/auth/register")({
  head: () => ({ meta: [{ title: "Đăng ký — Novadoc" }] }),
  component: RegisterPage,
});

const DEPTS = ["HR", "Engineering", "Finance", "Legal", "Operations", "Product"];

function RegisterPage() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    dept: "",
    pw: "",
    pw2: "",
    agree: false,
  });
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    if (!form.name || !form.email || !form.dept || !form.pw) {
      setErr("Vui lòng điền đầy đủ thông tin");
      return;
    }
    if (form.pw !== form.pw2) {
      setErr("Mật khẩu xác nhận không khớp");
      return;
    }
    if (!form.agree) {
      setErr("Bạn cần đồng ý điều khoản sử dụng");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Đã tạo tài khoản. Vui lòng đăng nhập.");
      nav({ to: "/auth/login" });
    }, 900);
  };

  return (
    <AuthShell
      title="Tạo tài khoản"
      subtitle="Tham gia workspace RAG của công ty bạn"
      footer={
        <>
          Đã có tài khoản?{" "}
          <Link to="/auth/login" className="text-brand hover:underline">
            Đăng nhập
          </Link>
        </>
      }
    >
      <form onSubmit={submit} className="space-y-4">
        <div className="space-y-2">
          <Label>Họ và tên</Label>
          <Input
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Nguyễn Văn A"
          />
        </div>
        <div className="space-y-2">
          <Label>Email công ty</Label>
          <Input
            type="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="you@company.com"
          />
        </div>
        <div className="space-y-2">
          <Label>Phòng ban</Label>
          <Select value={form.dept} onValueChange={(v) => set("dept", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn phòng ban" />
            </SelectTrigger>
            <SelectContent>
              {DEPTS.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label>Mật khẩu</Label>
            <Input
              type="password"
              value={form.pw}
              onChange={(e) => set("pw", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Xác nhận</Label>
            <Input
              type="password"
              value={form.pw2}
              onChange={(e) => set("pw2", e.target.value)}
            />
          </div>
        </div>
        <label className="flex items-start gap-2 text-sm">
          <Checkbox
            checked={form.agree}
            onCheckedChange={(v) => set("agree", !!v)}
            className="mt-0.5"
          />
          <span>
            Tôi đồng ý với{" "}
            <a className="text-brand hover:underline" href="#">
              Điều khoản sử dụng
            </a>{" "}
            và{" "}
            <a className="text-brand hover:underline" href="#">
              Chính sách bảo mật
            </a>
          </span>
        </label>
        {err && (
          <div className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-400">
            {err}
          </div>
        )}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          Tạo tài khoản
        </Button>
      </form>
    </AuthShell>
  );
}
