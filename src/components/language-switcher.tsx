import { useState } from "react";
import { Check, Globe } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const languages = [
  { code: "vi", label: "Tiếng Việt", flag: "🇻🇳", native: "Tiếng Việt" },
  { code: "en", label: "English", flag: "🇬🇧", native: "English" },
  { code: "ja", label: "Japanese", flag: "🇯🇵", native: "日本語" },
  { code: "ko", label: "Korean", flag: "🇰🇷", native: "한국어" },
  { code: "zh", label: "Chinese", flag: "🇨🇳", native: "中文" },
  { code: "ru", label: "Russian", flag: "🇷🇺", native: "Русский" },
  { code: "uk", label: "Ukrainian", flag: "🇺🇦", native: "Українська" },
  { code: "id", label: "Indonesian", flag: "🇮🇩", native: "Bahasa Indonesia" },
  { code: "ar", label: "Arabic", flag: "🇸🇦", native: "العربية" },
];

export function LanguageSwitcher() {
  const [current, setCurrent] = useState("vi");
  const active = languages.find((l) => l.code === current) ?? languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1.5 px-2">
          <span className="text-base leading-none">{active.flag}</span>
          <span className="hidden md:inline text-xs font-medium uppercase">
            {active.code}
          </span>
          <Globe className="h-3.5 w-3.5 text-muted-foreground md:hidden" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
          Ngôn ngữ giao diện
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {languages.map((l) => (
          <DropdownMenuItem
            key={l.code}
            onClick={() => setCurrent(l.code)}
            className="gap-2 cursor-pointer"
          >
            <span className="text-lg leading-none">{l.flag}</span>
            <div className="flex flex-col leading-tight flex-1">
              <span className="text-sm">{l.native}</span>
              <span className="text-[10px] text-muted-foreground">{l.label}</span>
            </div>
            {current === l.code && <Check className="h-3.5 w-3.5 text-brand" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
