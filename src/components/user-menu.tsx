import { Link, useNavigate } from "@tanstack/react-router";
import { User, Settings, LogOut, KeyRound, LifeBuoy, UserPlus } from "lucide-react";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UserMenu() {
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="ms-2 h-8 w-8 rounded-full bg-brand/20 text-brand flex items-center justify-center text-xs font-semibold hover:ring-2 hover:ring-brand/40 transition"
          aria-label="Tài khoản"
        >
          MT
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="h-10 w-10 rounded-full bg-brand/20 text-brand flex items-center justify-center text-sm font-semibold">
            MT
          </div>
          <div className="min-w-0">
            <div className="text-sm font-medium truncate">Minh Tran</div>
            <div className="text-xs text-muted-foreground truncate">
              minh.tran@novadoc.io
            </div>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-[11px] uppercase tracking-wide text-muted-foreground font-normal">
          Tài khoản
        </DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link to="/users/$userId" params={{ userId: "me" }}>
            <User className="h-4 w-4" /> Hồ sơ của tôi
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/settings">
            <Settings className="h-4 w-4" /> Cài đặt
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => toast.info("Mở form đổi mật khẩu (demo)")}>
          <KeyRound className="h-4 w-4" /> Đổi mật khẩu
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => toast.info("Trung tâm hỗ trợ (demo)")}>
          <LifeBuoy className="h-4 w-4" /> Trung tâm hỗ trợ
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/auth/register">
            <UserPlus className="h-4 w-4" /> Mời thành viên
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-400 focus:text-red-400"
          onClick={() => {
            toast.success("Đã đăng xuất");
            navigate({ to: "/auth/login" });
          }}
        >
          <LogOut className="h-4 w-4" /> Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
