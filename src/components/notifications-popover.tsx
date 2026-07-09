import { useState } from "react";
import {
  Bell,
  CheckCheck,
  FileText,
  MessagesSquare,
  ShieldAlert,
  UserPlus,
} from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

type Notification = {
  id: string;
  icon: typeof Bell;
  title: string;
  body: string;
  time: string;
  unread: boolean;
  tone: "brand" | "warning" | "success" | "muted";
};

const initial: Notification[] = [
  {
    id: "1",
    icon: FileText,
    title: "Tài liệu mới đã index xong",
    body: "HR-Policy-v3.2.pdf đã sẵn sàng cho truy vấn RAG.",
    time: "2 phút trước",
    unread: true,
    tone: "brand",
  },
  {
    id: "2",
    icon: MessagesSquare,
    title: "Lan Anh đã chia sẻ hội thoại",
    body: '"Chính sách nghỉ phép 2026" — 3 câu hỏi mới.',
    time: "15 phút trước",
    unread: true,
    tone: "muted",
  },
  {
    id: "3",
    icon: ShieldAlert,
    title: "Cảnh báo bảo mật",
    body: "Phát hiện đăng nhập từ thiết bị mới tại Hà Nội.",
    time: "1 giờ trước",
    unread: true,
    tone: "warning",
  },
  {
    id: "4",
    icon: UserPlus,
    title: "Thành viên mới trong workspace",
    body: "Nguyễn Thu Trang đã được thêm bởi Quản trị viên.",
    time: "Hôm qua",
    unread: false,
    tone: "success",
  },
];

const toneClass: Record<Notification["tone"], string> = {
  brand: "bg-brand/15 text-brand",
  warning: "bg-warning/15 text-warning",
  success: "bg-success/15 text-success",
  muted: "bg-secondary text-foreground",
};

export function NotificationsPopover() {
  const [items, setItems] = useState(initial);
  const unread = items.filter((i) => i.unread).length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {unread > 0 && (
            <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-brand text-brand-foreground text-[10px] font-semibold flex items-center justify-center">
              {unread}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-96 p-0">
        <div className="px-4 py-3 flex items-center justify-between border-b border-border">
          <div>
            <div className="text-sm font-semibold">Thông báo</div>
            <div className="text-xs text-muted-foreground">
              Bạn có {unread} thông báo chưa đọc
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs gap-1"
            onClick={() =>
              setItems((prev) => prev.map((p) => ({ ...p, unread: false })))
            }
          >
            <CheckCheck className="h-3.5 w-3.5" />
            Đánh dấu đã đọc
          </Button>
        </div>
        <ScrollArea className="max-h-96">
          <div className="divide-y divide-border">
            {items.map((n) => {
              const Icon = n.icon;
              return (
                <button
                  key={n.id}
                  onClick={() =>
                    setItems((prev) =>
                      prev.map((p) => (p.id === n.id ? { ...p, unread: false } : p)),
                    )
                  }
                  className="w-full text-left px-4 py-3 flex gap-3 hover:bg-accent/40 transition-colors"
                >
                  <div
                    className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 ${toneClass[n.tone]}`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium truncate">{n.title}</div>
                      {n.unread && (
                        <span className="h-2 w-2 rounded-full bg-brand shrink-0" />
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                      {n.body}
                    </div>
                    <div className="text-[11px] text-muted-foreground/70 mt-1">
                      {n.time}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </ScrollArea>
        <div className="px-4 py-2 border-t border-border">
          <Button variant="ghost" size="sm" className="w-full text-xs">
            Xem tất cả thông báo
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function NotificationsBadgeCount() {
  return <Badge variant="outline">demo</Badge>;
}
