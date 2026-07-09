import { createFileRoute } from "@tanstack/react-router";
import { SettingsLayout } from "@/components/settings-layout";
import { Card } from "@/components/ui/card";
import { Bot, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AGENTS = [
  { id: "general", name: "General Assistant", desc: "Trợ lý đa mục đích, phù hợp mọi câu hỏi" },
  { id: "hr", name: "HR Assistant", desc: "Chuyên trả lời về chính sách nhân sự" },
  { id: "eng", name: "Engineering SOP", desc: "Tra cứu quy trình kỹ thuật, runbook" },
  { id: "legal", name: "Legal Reviewer", desc: "Đọc và tóm tắt hợp đồng, điều khoản" },
];

export const Route = createFileRoute("/settings/agent")({
  head: () => ({ meta: [{ title: "Default Agent — Novadoc" }] }),
  component: () => {
    const [sel, setSel] = useState("general");
    return (
      <SettingsLayout title="Chọn Agent mặc định của hệ thống">
        <div className="grid gap-3 md:grid-cols-2">
          {AGENTS.map((a) => (
            <button key={a.id} type="button" onClick={()=>setSel(a.id)}
              className={`text-left rounded-xl border p-4 transition-colors ${sel===a.id?"border-brand bg-brand/10":"border-border bg-card hover:border-brand/40"}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-brand/15 text-brand flex items-center justify-center">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold">{a.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{a.desc}</div>
                  </div>
                </div>
                {sel===a.id && <Check className="h-5 w-5 text-brand" />}
              </div>
            </button>
          ))}
        </div>
        <div className="mt-4"><Button onClick={()=>toast.success(`Agent mặc định: ${AGENTS.find(a=>a.id===sel)?.name}`)}>Áp dụng</Button></div>
      </SettingsLayout>
    );
  },
});
