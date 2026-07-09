import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Play, Pause, Trash2, Filter } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import {
  Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle,
} from "@/components/ui/sheet";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/monitoring/events")({
  head: () => ({ meta: [{ title: "Event Log — Novadoc" }] }),
  component: EventLogPage,
});

type Evt = {
  id: string; type: "auth" | "chat" | "doc" | "system" | "error";
  user: string; ws: string; msg: string; time: string;
};

const TYPES: Evt["type"][] = ["auth","chat","doc","system","error"];
const USERS = ["tuan@acme.io","lananh@acme.io","huy@acme.io","system"];
const WS = ["Acme HQ","HR","Engineering","Legal"];

const rand = <T,>(a: T[]) => a[Math.floor(Math.random()*a.length)];
const mkEvent = (): Evt => ({
  id: Math.random().toString(36).slice(2),
  type: rand(TYPES),
  user: rand(USERS),
  ws: rand(WS),
  msg: rand([
    "Đăng nhập thành công",
    "Chat mới: 'Chính sách nghỉ phép'",
    "Tải lên tài liệu HR-Policy.pdf",
    "Reindex hoàn tất",
    "Cảnh báo: token budget 82%",
    "API timeout trên embedding service",
  ]),
  time: new Date().toLocaleTimeString(),
});

function EventLogPage() {
  const [events, setEvents] = useState<Evt[]>(() => Array.from({length:15}, mkEvent));
  const [live, setLive] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [detail, setDetail] = useState<Evt | null>(null);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (live) {
      timer.current = window.setInterval(() => {
        setEvents((p) => [mkEvent(), ...p].slice(0, 200));
      }, 1500);
    }
    return () => { if (timer.current) window.clearInterval(timer.current); };
  }, [live]);

  const visible = events.filter((e) => filter === "all" || e.type === filter);
  const tones: Record<Evt["type"],"info"|"success"|"warning"|"error"|"muted"> = {
    auth: "info", chat: "success", doc: "muted", system: "warning", error: "error",
  };

  return (
    <AppShell
      title="Event Log"
      subtitle="Theo dõi sự kiện thời gian thực trong workspace"
      actions={
        <div className="flex gap-2">
          <Button variant={live?"default":"outline"} onClick={()=>setLive(true)}><Play className="h-4 w-4" /> Live</Button>
          <Button variant={!live?"default":"outline"} onClick={()=>setLive(false)}><Pause className="h-4 w-4" /> Pause</Button>
          <Button variant="outline" onClick={()=>setEvents([])}><Trash2 className="h-4 w-4" /> Clear</Button>
        </div>
      }
    >
      <Card className="p-3 bg-card border-border mb-3 flex items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả loại sự kiện</SelectItem>
            {TYPES.map((t)=>(<SelectItem key={t} value={t}>{t}</SelectItem>))}
          </SelectContent>
        </Select>
        <div className="ml-auto text-xs text-muted-foreground">
          {visible.length} sự kiện · {live ? "Đang stream" : "Đã tạm dừng"}
        </div>
      </Card>

      <Card className="bg-card border-border overflow-hidden">
        <div className="max-h-[560px] overflow-y-auto divide-y divide-border">
          {visible.map((e) => (
            <button key={e.id} onClick={()=>setDetail(e)} className="w-full text-left px-4 py-3 hover:bg-accent/30 flex items-center gap-3">
              <StatusBadge tone={tones[e.type]}>{e.type}</StatusBadge>
              <div className="flex-1 min-w-0">
                <div className="text-sm truncate">{e.msg}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{e.user} · {e.ws}</div>
              </div>
              <div className="text-xs text-muted-foreground">{e.time}</div>
            </button>
          ))}
        </div>
      </Card>

      <Sheet open={!!detail} onOpenChange={(o)=>!o && setDetail(null)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Chi tiết sự kiện</SheetTitle>
            <SheetDescription>{detail?.time}</SheetDescription>
          </SheetHeader>
          {detail && (
            <div className="mt-4 space-y-3 text-sm">
              <Row k="ID" v={detail.id} mono />
              <Row k="Loại" v={detail.type} />
              <Row k="User" v={detail.user} />
              <Row k="Workspace" v={detail.ws} />
              <Row k="Nội dung" v={detail.msg} />
              <div className="rounded-md bg-muted p-3 font-mono text-xs overflow-auto">
{JSON.stringify(detail, null, 2)}
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </AppShell>
  );
}

function Row({ k, v, mono }: { k: string; v: string; mono?: boolean }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      <div className="text-muted-foreground">{k}</div>
      <div className={`col-span-2 ${mono ? "font-mono text-xs" : ""}`}>{v}</div>
    </div>
  );
}
