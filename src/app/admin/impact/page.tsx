"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, Leaf, Trees, Droplets, Squirrel } from "lucide-react";

type ImpactData = {
  id?: number;
  m2: number;
  trees: number;
  co2: number;
  animals: number;
};

const impactFields = [
  { key: "m2" as const, label: "Herstelde m²", icon: Leaf, color: "text-forest" },
  { key: "trees" as const, label: "Aantal Bomen", icon: Trees, color: "text-green-600" },
  { key: "co2" as const, label: "CO2-opslag (ton)", icon: Droplets, color: "text-blue-600" },
  { key: "animals" as const, label: "Aantal Dieren", icon: Squirrel, color: "text-earth" },
];

export default function AdminImpactPage() {
  const [data, setData] = useState<ImpactData>({ m2: 0, trees: 0, co2: 0, animals: 0 });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    async function fetchImpact() {
      // Get the latest row (there should only be one, but use order+limit to be safe)
      const { data: rows } = await supabase.from("impact").select("*").order("id", { ascending: false }).limit(1);
      const impact = rows?.[0];
      if (impact) {
        setData({
          id: impact.id,
          m2: Number(impact.m2) ?? 0,
          trees: impact.trees ?? 0,
          co2: Number(impact.co2) ?? 0,
          animals: impact.animals ?? 0,
        });
      }
      setLoading(false);
    }
    fetchImpact();
  }, []);

  async function handleSave() {
    setSaving(true);
    setSaved(false);

    let error;
    if (data.id) {
      // Update existing row
      ({ error } = await supabase
        .from("impact")
        .update({ m2: data.m2, trees: data.trees, co2: data.co2, animals: data.animals })
        .eq("id", data.id));
    } else {
      // Insert new row (let Supabase generate the id)
      ({ error } = await supabase
        .from("impact")
        .insert({ m2: data.m2, trees: data.trees, co2: data.co2, animals: data.animals }));
    }

    if (!error) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } else {
      alert("Fout bij opslaan: " + error.message);
    }
    setSaving(false);
  }

  if (loading) return <p className="text-gray-500">Laden...</p>;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Impact Stats</h1>
        <p className="text-gray-500 mt-1">
          Pas de impact cijfers aan die op de homepage worden getoond
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Impact Cijfers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {impactFields.map((field) => (
              <div key={field.key} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <field.icon className={`h-6 w-6 ${field.color}`} />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-700">{field.label}</label>
                  <Input
                    type="number"
                    value={data[field.key]}
                    onChange={(e) =>
                      setData({ ...data, [field.key]: parseInt(e.target.value) || 0 })
                    }
                    className="mt-1"
                  />
                </div>
              </div>
            ))}
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
    </div>
  );
}
