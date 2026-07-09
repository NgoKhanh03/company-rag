import { useState } from "react";
import { Check, ChevronsUpDown, Building2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export const WORKSPACES = [
  { id: "acme", name: "Acme Corp", dept: "HQ" },
  { id: "hr", name: "Nhân sự", dept: "HR" },
  { id: "eng", name: "Kỹ thuật", dept: "Engineering" },
  { id: "legal", name: "Pháp chế", dept: "Legal" },
  { id: "ops", name: "Vận hành", dept: "Operations" },
];

export function WorkspaceSwitcher() {
  const [current, setCurrent] = useState(WORKSPACES[0]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="h-9 gap-2 border-border bg-card"
        >
          <Building2 className="h-4 w-4 text-brand" />
          <span className="text-sm font-medium truncate max-w-[160px]">
            {current.name}
          </span>
          <ChevronsUpDown className="h-3.5 w-3.5 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64">
        <DropdownMenuLabel>Chuyển workspace</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {WORKSPACES.map((w) => (
          <DropdownMenuItem
            key={w.id}
            onSelect={() => setCurrent(w)}
            className="gap-2"
          >
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{w.name}</div>
              <div className="text-xs text-muted-foreground">{w.dept}</div>
            </div>
            {current.id === w.id && <Check className="h-4 w-4 text-brand" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
