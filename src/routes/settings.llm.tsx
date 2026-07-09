import { createFileRoute } from "@tanstack/react-router";
import { SettingsLayout } from "@/components/settings-layout";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/settings/llm")({
  head: () => ({ meta: [{ title: "LLM Settings — Novadoc" }] }),
  component: LLMPage,
});

function LLMPage() {
  const [temp, setTemp] = useState([0.3]);
  const [tokens, setTokens] = useState([4096]);
  return (
    <SettingsLayout title="Cấu hình Large Language Model mặc định">
      <Card className="p-5 bg-card border-border space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Provider</Label>
            <Select defaultValue="openai">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="openai">OpenAI</SelectItem>
                <SelectItem value="anthropic">Anthropic</SelectItem>
                <SelectItem value="google">Google Gemini</SelectItem>
                <SelectItem value="ollama">Ollama (self-hosted)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Model</Label>
            <Select defaultValue="gpt-4o">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-4o">gpt-4o</SelectItem>
                <SelectItem value="gpt-4o-mini">gpt-4o-mini</SelectItem>
                <SelectItem value="o3-mini">o3-mini</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Runtime</Label>
            <Select defaultValue="cloud">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="cloud">Cloud API</SelectItem>
                <SelectItem value="onprem">On-Premise</SelectItem>
                <SelectItem value="edge">Edge (Workers)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>API Base URL</Label>
            <Input defaultValue="https://api.openai.com/v1" />
          </div>
          <div className="space-y-2 col-span-2">
            <div className="flex justify-between"><Label>Temperature</Label><span className="text-sm text-muted-foreground">{temp[0].toFixed(2)}</span></div>
            <Slider value={temp} onValueChange={setTemp} min={0} max={2} step={0.05} />
          </div>
          <div className="space-y-2 col-span-2">
            <div className="flex justify-between"><Label>Max tokens</Label><span className="text-sm text-muted-foreground">{tokens[0]}</span></div>
            <Slider value={tokens} onValueChange={setTokens} min={512} max={32000} step={256} />
          </div>
        </div>
        <Button onClick={()=>toast.success("Đã lưu cấu hình LLM")}>Lưu</Button>
      </Card>
    </SettingsLayout>
  );
}
