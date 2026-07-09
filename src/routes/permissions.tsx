import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronRight } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

export const Route = createFileRoute("/permissions")({
  head: () => ({ meta: [{ title: "Phân quyền — Novadoc" }] }),
  component: PermsPage,
});

const ROLES = ["Super Admin", "Admin", "Editor", "Viewer", "Auditor"];
const GROUPS = [
  { name: "Tài liệu", perms: ["docs.view","docs.upload","docs.delete","docs.reindex"] },
  { name: "Chat RAG", perms: ["chat.use","chat.share","chat.export"] },
  { name: "Người dùng", perms: ["user.view","user.create","user.edit","user.delete"] },
  { name: "Workspace", perms: ["ws.view","ws.create","ws.settings"] },
  { name: "Hệ thống", perms: ["sys.settings","sys.backup","sys.monitoring"] },
];

function PermsPage() {
  const initial = () => {
    const m: Record<string, Record<string, boolean>> = {};
    GROUPS.forEach((g) => g.perms.forEach((p) => {
      m[p] = {};
      ROLES.forEach((r) => {
        m[p][r] = r === "Super Admin" || (r === "Admin" && !p.startsWith("sys.")) || (r === "Editor" && (p.startsWith("docs.") || p.startsWith("chat."))) || (r === "Viewer" && (p === "docs.view" || p === "chat.use"));
      });
    }));
    return m;
  };
  const [matrix, setMatrix] = useState(initial);
  const toggle = (p: string, r: string) =>
    setMatrix((m) => ({ ...m, [p]: { ...m[p], [r]: !m[p][r] } }));

  return (
    <AppShell
      title="Phân quyền"
      subtitle="Ma trận quyền theo vai trò · dạng cây theo nhóm chức năng"
      actions={<Button onClick={()=>toast.success("Đã lưu ma trận quyền")}>Lưu thay đổi</Button>}
    >
      <Tabs defaultValue="matrix">
        <TabsList>
          <TabsTrigger value="matrix">Ma trận</TabsTrigger>
          <TabsTrigger value="tree">Cây quyền</TabsTrigger>
        </TabsList>

        <TabsContent value="matrix" className="pt-4">
          <Card className="bg-card border-border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-64">Quyền</TableHead>
                  {ROLES.map((r) => <TableHead key={r} className="text-center">{r}</TableHead>)}
                </TableRow>
              </TableHeader>
              <TableBody>
                {GROUPS.map((g) => (
                  <>
                    <TableRow key={g.name} className="bg-muted/30">
                      <TableCell colSpan={ROLES.length+1} className="font-semibold text-xs uppercase tracking-wide text-muted-foreground">
                        {g.name}
                      </TableCell>
                    </TableRow>
                    {g.perms.map((p) => (
                      <TableRow key={p}>
                        <TableCell className="font-mono text-xs">{p}</TableCell>
                        {ROLES.map((r) => (
                          <TableCell key={r} className="text-center">
                            <Checkbox checked={matrix[p]?.[r]} onCheckedChange={()=>toggle(p,r)} />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="tree" className="pt-4">
          <Card className="p-4 bg-card border-border space-y-2">
            {GROUPS.map((g) => (
              <Collapsible key={g.name} defaultOpen>
                <CollapsibleTrigger className="flex items-center gap-2 w-full text-left py-2 hover:bg-accent/30 rounded px-2 group">
                  <ChevronRight className="h-4 w-4 transition-transform group-data-[state=open]:rotate-90" />
                  <span className="font-medium">{g.name}</span>
                  <span className="text-xs text-muted-foreground">({g.perms.length})</span>
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-8 space-y-1 py-1">
                  {g.perms.map((p) => (
                    <label key={p} className="flex items-center gap-2 text-sm py-1">
                      <Checkbox defaultChecked />
                      <span className="font-mono text-xs">{p}</span>
                    </label>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ))}
          </Card>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}
