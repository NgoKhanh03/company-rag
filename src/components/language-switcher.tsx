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
import { LANGUAGES, useI18n } from "@/lib/i18n";

export function LanguageSwitcher() {
  const { lang, setLang, t } = useI18n();
  const active = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="sm"
          aria-label={t("lang.label")}
          className="h-9 gap-2 px-2.5 border-border bg-card hover:bg-accent"
        >
          <Globe className="h-4 w-4 text-muted-foreground" />
          <span className="text-base leading-none">{active.flag}</span>
          <span className="text-xs font-semibold uppercase tracking-wide">
            {active.code}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
          {t("lang.label")}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {LANGUAGES.map((l) => (
          <DropdownMenuItem
            key={l.code}
            onClick={() => setLang(l.code)}
            className="gap-2 cursor-pointer"
          >
            <span className="text-lg leading-none">{l.flag}</span>
            <div className="flex flex-col leading-tight flex-1">
              <span className="text-sm">{l.native}</span>
              <span className="text-[10px] text-muted-foreground">{l.label}</span>
            </div>
            {lang === l.code && <Check className="h-3.5 w-3.5 text-brand" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
