"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, Target } from "lucide-react";
import { Progress } from "@/components/ui/progress";

type CrowdfundingData = {
  id: string;
  project_name: string;
  target: number;
  current: number;
};

export default function AdminCrowdfundingPage() {
  const [data, setData] = useState<CrowdfundingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({ project_name: "", target: 10000, current: 0 });

  const supabase = createClient();

  useEffect(() => {
    async function fetchCrowdfunding() {
      const { data: cf } = await supabase.from("crowdfunding").select("*").limit(1).single();
      if (cf) {
        setData(cf);
        setForm({ project_name: cf.project_name, target: cf.target, current: cf.current });
      }
      setLoading(false);
    }
    fetchCrowdfunding();
  }, []);

  async function handleSave() {
    setSaving(true);
    setSaved(false);

    if (data) {
      await supabase
        .from("crowdfunding")
        .update({ ...form, updated_at: new Date().toISOString() })
        .eq("id", data.id);
    } else {
      await supabase.from("crowdfunding").insert(form);
    }

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    setSaving(false);
  }

  if (loading) return <p className="text-gray-500">Laden...</p>;

  const percentage = form.target > 0 ? (form.current / form.target) * 100 : 0;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Crowdfunding</h1>
        <p className="text-gray-500 mt-1">
          Update de crowdfunding voortgang op de homepage
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Instellingen</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Projectnaam</label>
              <Input
                value={form.project_name}
                onChange={(e) => setForm({ ...form, project_name: e.target.value })}
                placeholder="Bijv. Tilburg, Project I"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Doelbedrag (€)</label>
              <Input
                type="number"
                value={form.target}
                onChange={(e) => setForm({ ...form, target: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Huidig bedrag (€)</label>
              <Input
                type="number"
                value={form.current}
                onChange={(e) => setForm({ ...form, current: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className="flex items-center gap-4">
              <Button
                onClick={handleSave}
                disabled={saving}
                className="bg-forest text-beige hover:bg-forest/90"
              >
                <Save className="h-4 w-4 mr-2" />
                {saving ? "Opslaan..." : "Opslaan"}
              </Button>
              {saved && (
                <span className="text-sm text-green-600 font-medium">✓ Opgeslagen!</span>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card className="bg-forest text-beige">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Preview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="inline-flex items-center space-x-2 bg-beige/10 px-4 py-2 rounded-full text-sm font-medium border border-beige/20">
              <span>{form.project_name || "Project"}</span>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-3xl font-bold">€{form.current.toLocaleString("nl-NL")}</span>
                <span className="text-sm opacity-80">Doel: €{form.target.toLocaleString("nl-NL")}</span>
              </div>
              <Progress value={percentage} className="h-4 bg-beige/20" />
              <div className="flex justify-between text-sm font-medium">
                <span>{percentage.toFixed(1)}% gefinancierd</span>
                <span>Nog €{(form.target - form.current).toLocaleString("nl-NL")} te gaan</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
