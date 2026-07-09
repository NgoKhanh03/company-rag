import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef, useState, useEffect } from "react";
import {
  Send,
  Sparkles,
  FileText,
  Plus,
  ExternalLink,
  BookOpen,
  MessageSquare,
} from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export const Route = createFileRoute("/chat")({
  component: ChatPage,
});

type Source = {
  title: string;
  page: string;
  snippet: string;
  score: number;
};

type Message = {
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
};

const seedMessages: Message[] = [
  {
    role: "user",
    content: "Chính sách nghỉ phép năm 2026 có thay đổi gì so với năm ngoái?",
  },
  {
    role: "assistant",
    content:
      "Theo tài liệu HR-Policy-v3.2 (hiệu lực 01/01/2026), có 3 thay đổi chính:\n\n1. **Ngày phép tăng từ 12 → 15 ngày/năm** cho nhân viên chính thức trên 1 năm.\n2. **Bổ sung 2 ngày phép “sức khỏe tinh thần”** không cần chứng từ y tế.\n3. Nhân viên có thể **chuyển tối đa 5 ngày phép chưa dùng** sang quý 1 năm sau (trước đây là 3 ngày).\n\nBạn có muốn tôi trích dẫn nguyên văn điều khoản không?",
    sources: [
      {
        title: "HR-Policy-v3.2.pdf",
        page: "Trang 14–15",
        snippet:
          "Điều 8.2 — Từ ngày 01/01/2026, số ngày phép năm được điều chỉnh từ 12 lên 15 ngày...",
        score: 0.94,
      },
      {
        title: "HR-Changelog-2026.md",
        page: "Mục 3",
        snippet:
          "Bổ sung 2 ngày “mental health leave” không yêu cầu giấy khám bệnh, áp dụng...",
        score: 0.88,
      },
      {
        title: "HR-FAQ.docx",
        page: "Câu 12",
        snippet:
          "Nhân viên có thể chuyển tối đa 5 ngày phép chưa sử dụng sang quý 1 của năm kế tiếp...",
        score: 0.81,
      },
    ],
  },
];

const suggestions = [
  "Quy trình duyệt chi trên 50 triệu?",
  "SLA hỗ trợ khách hàng doanh nghiệp?",
  "Yêu cầu bảo mật cho tài liệu mật cấp 2?",
  "Onboarding kỹ sư mới trong 30 ngày đầu?",
];

const conversations = [
  { title: "Chính sách nghỉ phép 2026", time: "Hôm nay", active: true },
  { title: "SLA khách hàng Enterprise", time: "Hôm qua" },
  { title: "Quy trình duyệt chi tài chính", time: "3 ngày trước" },
  { title: "Bảo mật tài liệu cấp 2", time: "Tuần trước" },
  { title: "Onboarding kỹ sư mới", time: "Tuần trước" },
];

function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(seedMessages);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  const activeSources = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].sources?.length) return messages[i].sources!;
    }
    return [];
  }, [messages]);

  function send(text?: string) {
    const content = (text ?? input).trim();
    if (!content) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", content }]);
    setThinking(true);
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "Đây là câu trả lời demo dựa trên tài liệu nội bộ. Trong bản triển khai thật, hệ thống RAG sẽ truy vấn thư viện, xếp hạng đoạn văn liên quan nhất và tổng hợp câu trả lời kèm trích dẫn nguồn.",
          sources: [
            {
              title: "Company-Handbook.pdf",
              page: "Trang 22",
              snippet:
                "Đoạn văn được truy xuất tự động theo mức độ tương đồng vector với câu hỏi...",
              score: 0.89,
            },
            {
              title: "Internal-SOP.docx",
              page: "Mục 4.1",
              snippet:
                "Quy trình chuẩn mô tả các bước xử lý, người chịu trách nhiệm và thời hạn...",
              score: 0.82,
            },
          ],
        },
      ]);
      setThinking(false);
    }, 900);
  }

  return (
    <AppShell
      title="Chat tài liệu"
      subtitle="Hỏi bất cứ điều gì về thư viện tri thức của công ty"
      actions={
        <Button variant="outline">
          <Plus className="mr-1 h-4 w-4" /> Cuộc trò chuyện mới
        </Button>
      }
    >
      <div className="grid gap-4 lg:grid-cols-[240px_1fr_320px] h-[calc(100vh-14rem)]">
        {/* Threads */}
        <Card className="bg-card border-border p-2 hidden lg:flex flex-col">
          <div className="px-2 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Lịch sử
          </div>
          <ScrollArea className="flex-1">
            <div className="space-y-1">
              {conversations.map((c, i) => (
                <button
                  key={i}
                  className={`w-full text-left px-2 py-2 rounded-md text-sm transition-colors ${
                    c.active
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-accent/50 text-muted-foreground"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <MessageSquare className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{c.title}</span>
                  </div>
                  <div className="text-[11px] text-muted-foreground/70 mt-0.5 pl-5">
                    {c.time}
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Chat */}
        <Card className="bg-card border-border flex flex-col overflow-hidden">
          <ScrollArea className="flex-1 px-6 py-4">
            <div className="space-y-6 max-w-3xl mx-auto">
              {messages.map((m, i) => (
                <MessageBubble key={i} message={m} />
              ))}
              {thinking && (
                <div className="flex gap-3">
                  <div className="h-8 w-8 rounded-lg bg-brand/15 text-brand flex items-center justify-center shrink-0">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div className="flex items-center gap-1.5 pt-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-pulse" />
                    <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-pulse [animation-delay:150ms]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-pulse [animation-delay:300ms]" />
                    <span className="ml-2 text-xs text-muted-foreground">
                      Đang tìm trong thư viện...
                    </span>
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>
          </ScrollArea>

          <div className="border-t border-border p-4">
            <div className="max-w-3xl mx-auto">
              {messages.length <= 2 && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="text-xs px-3 py-1.5 rounded-full border border-border bg-secondary/50 hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
              <div className="relative">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send();
                    }
                  }}
                  placeholder="Hỏi về tài liệu, quy trình, chính sách..."
                  className="min-h-[68px] resize-none bg-background border-border pr-14"
                />
                <Button
                  size="icon"
                  onClick={() => send()}
                  disabled={!input.trim() || thinking}
                  className="absolute right-2 bottom-2 h-9 w-9"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-2 text-[11px] text-muted-foreground text-center">
                Trợ lý chỉ trả lời dựa trên tài liệu được index trong không gian
                làm việc của bạn.
              </div>
            </div>
          </div>
        </Card>

        {/* Sources */}
        <Card className="bg-card border-border flex-col hidden lg:flex overflow-hidden">
          <div className="px-4 py-3 border-b border-border flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-brand" />
            <span className="text-sm font-medium">Nguồn trích dẫn</span>
            <Badge variant="outline" className="ml-auto text-[10px]">
              {activeSources.length}
            </Badge>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-3 space-y-2">
              {activeSources.map((s, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg border border-border bg-background/40 hover:bg-background transition-colors"
                >
                  <div className="flex items-start gap-2">
                    <FileText className="h-4 w-4 text-brand mt-0.5 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium truncate">{s.title}</div>
                      <div className="text-[11px] text-muted-foreground">
                        {s.page} · độ khớp {Math.round(s.score * 100)}%
                      </div>
                    </div>
                    <button className="text-muted-foreground hover:text-foreground">
                      <ExternalLink className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground line-clamp-3 border-l-2 border-brand/40 pl-2">
                    {s.snippet}
                  </p>
                </div>
              ))}
              {activeSources.length === 0 && (
                <div className="text-xs text-muted-foreground text-center py-8">
                  Chưa có nguồn nào được trích dẫn.
                </div>
              )}
            </div>
          </ScrollArea>
        </Card>
      </div>
    </AppShell>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      <div
        className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${
          isUser
            ? "bg-secondary text-foreground"
            : "bg-brand/15 text-brand"
        }`}
      >
        {isUser ? "MT" : <Sparkles className="h-4 w-4" />}
      </div>
      <div className={`min-w-0 max-w-[85%] ${isUser ? "text-right" : ""}`}>
        <div
          className={`inline-block text-left rounded-2xl px-4 py-3 text-sm whitespace-pre-wrap leading-relaxed ${
            isUser
              ? "bg-brand text-brand-foreground rounded-tr-sm"
              : "bg-secondary/60 text-foreground rounded-tl-sm"
          }`}
        >
          {message.content}
        </div>
        {message.sources && message.sources.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {message.sources.map((s, i) => (
              <Badge
                key={i}
                variant="outline"
                className="text-[10px] font-normal border-border text-muted-foreground"
              >
                <FileText className="h-3 w-3 mr-1" />
                {s.title}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
