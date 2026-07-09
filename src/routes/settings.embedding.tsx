import { createFileRoute } from "@tanstack/react-router";
import { SettingsLayout } from "@/components/settings-layout";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/settings/embedding")({
  head: () => ({ meta: [{ title: "Embedding — Novadoc" }] }),
  component: () => (
    <SettingsLayout title="Cấu hình Embedding & Vector Store">
      <Card className="p-5 bg-card border-border space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2"><Label>Provider</Label>
            <Select defaultValue="openai"><SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="openai">OpenAI</SelectItem>
                <SelectItem value="cohere">Cohere</SelectItem>
                <SelectItem value="voyage">Voyage AI</SelectItem>
                <SelectItem value="bge">BGE (local)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2"><Label>Model</Label>
            <Select defaultValue="text-embedding-3-large">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="text-embedding-3-small">text-embedding-3-small</SelectItem>
                <SelectItem value="text-embedding-3-large">text-embedding-3-large</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2"><Label>Vector Dimension</Label><Input type="number" defaultValue={3072} /></div>
          <div className="space-y-2"><Label>Batch size</Label><Input type="number" defaultValue={64} /></div>
          <div className="space-y-2"><Label>Vector store</Label>
            <Select defaultValue="qdrant"><SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="qdrant">Qdrant</SelectItem>
                <SelectItem value="pgvector">pgvector</SelectItem>
                <SelectItem value="pinecone">Pinecone</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2"><Label>Endpoint</Label><Input defaultValue="https://qdrant.internal:6333" /></div>
        </div>
        <Button onClick={()=>toast.success("Đã lưu cấu hình Embedding")}>Lưu</Button>
      </Card>
    </SettingsLayout>
  ),
});
