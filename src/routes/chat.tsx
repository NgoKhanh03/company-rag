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
import { useT } from "@/lib/i18n";

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

function ChatPage() {
  const t = useT();

  const suggestions = [
    t("dash.topic.legal"),
    t("dash.topic.sec"),
    t("dash.topic.onboarding"),
    t("dash.topic.tech"),
  ];

  const conversations = [
    { title: t("dash.topic.hr"), time: t("time.min", { n: 10 }), active: true },
    { title: t("dash.topic.tech"), time: t("time.yesterday") },
    { title: t("dash.topic.legal"), time: t("time.days", { n: 3 }) },
    { title: t("dash.topic.sec"), time: t("time.week") },
    { title: t("dash.topic.onboarding"), time: t("time.week") },
  ];

  const initial = useMemo<Message[]>(
    () => [
      {
        role: "user",
        content: t("dash.topic.hr") + "?",
      },
      {
        role: "assistant",
        content: t("dash.chart.sub"),
        sources: [
          {
            title: "HR-Policy-v3.2.pdf",
            page: `${t("chat.page")} 14–15`,
            snippet:
              "Điều 8.2 — Section 8.2 — 第8.2条 — Excerpt of the indexed passage retrieved by the vector search…",
            score: 0.94,
          },
          {
            title: "HR-FAQ.docx",
            page: `${t("chat.page")} 12`,
            snippet:
              "Frequently asked question referencing the same policy update…",
            score: 0.81,
          },
        ],
      },
    ],
    [t],
  );

  const [messages, setMessages] = useState<Message[]>(initial);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  // Reseed the demo transcript whenever the language changes so users see localized bubbles.
  useEffect(() => {
    setMessages(initial);
  }, [initial]);

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
          content: t("chat.disclaimer"),
          sources: [
            {
              title: "Company-Handbook.pdf",
              page: `${t("chat.page")} 22`,
              snippet: "…",
              score: 0.89,
            },
            {
              title: "Internal-SOP.docx",
              page: `${t("chat.page")} 4.1`,
              snippet: "…",
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
      title={t("chat.title")}
      subtitle={t("chat.sub")}
      actions={
        <Button variant="outline">
          <Plus className="mr-1 h-4 w-4" /> {t("chat.new")}
        </Button>
      }
    >
      <div className="grid gap-4 lg:grid-cols-[240px_1fr_320px] h-[calc(100vh-14rem)]">
        <Card className="bg-card border-border p-2 hidden lg:flex flex-col">
          <div className="px-2 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {t("chat.history")}
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
                  <div className="text-[11px] text-muted-foreground/70 mt-0.5 ps-5">
                    {c.time}
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </Card>

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
                    <span className="ms-2 text-xs text-muted-foreground">
                      {t("chat.thinking")}
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
                  placeholder={t("chat.input")}
                  className="min-h-[68px] resize-none bg-background border-border pe-14"
                />
                <Button
                  size="icon"
                  onClick={() => send()}
                  disabled={!input.trim() || thinking}
                  className="absolute end-2 bottom-2 h-9 w-9"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-2 text-[11px] text-muted-foreground text-center">
                {t("chat.disclaimer")}
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-card border-border flex-col hidden lg:flex overflow-hidden">
          <div className="px-4 py-3 border-b border-border flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-brand" />
            <span className="text-sm font-medium">{t("chat.sources")}</span>
            <Badge variant="outline" className="ms-auto text-[10px]">
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
                        {s.page} · {t("chat.match")} {Math.round(s.score * 100)}%
                      </div>
                    </div>
                    <button className="text-muted-foreground hover:text-foreground">
                      <ExternalLink className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground line-clamp-3 border-s-2 border-brand/40 ps-2">
                    {s.snippet}
                  </p>
                </div>
              ))}
              {activeSources.length === 0 && (
                <div className="text-xs text-muted-foreground text-center py-8">
                  {t("chat.no_source")}
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
          isUser ? "bg-secondary text-foreground" : "bg-brand/15 text-brand"
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
                <FileText className="h-3 w-3 me-1" />
                {s.title}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
