"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight } from "lucide-react";

type Update = {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  sort_order: number;
  active: boolean;
};

const emptyUpdate = { title: "", description: "", icon: "Trees", color: "bg-green-100 text-green-600", sort_order: 0, active: true };
const iconOptions = ["Trees", "Squirrel", "ArrowUpRight", "Droplets", "Leaf", "Sun", "Heart", "Star"];
const colorOptions = [
  "bg-green-100 text-green-600",
  "bg-orange-100 text-orange-600",
  "bg-blue-100 text-blue-600",
  "bg-purple-100 text-purple-600",
  "bg-amber-100 text-amber-600",
  "bg-red-100 text-red-600",
];

export default function AdminUpdatesPage() {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Update | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(emptyUpdate);

  const supabase = createClient();

  async function fetchUpdates() {
    const { data } = await supabase.from("updates").select("*").order("sort_order", { ascending: true });
    if (data) setUpdates(data as Update[]);
    setLoading(false);
  }

  useEffect(() => { fetchUpdates(); }, []);

  async function handleSave() {
    if (editing) {
      await supabase.from("updates").update(form).eq("id", editing.id);
    } else {
      await supabase.from("updates").insert(form);
    }
    setEditing(null); setCreating(false); setForm(emptyUpdate); fetchUpdates();
  }

  async function handleDelete(id: string) {
    if (!confirm("Weet je zeker dat je deze update wilt verwijderen?")) return;
    await supabase.from("updates").delete().eq("id", id); fetchUpdates();
  }

  async function handleToggle(id: string, active: boolean) {
    await supabase.from("updates").update({ active: !active }).eq("id", id); fetchUpdates();
  }

  function startEdit(update: Update) {
    setEditing(update); setCreating(false);
    setForm({ title: update.title, description: update.description, icon: update.icon, color: update.color, sort_order: update.sort_order, active: update.active });
  }

  function startCreate() { setCreating(true); setEditing(null); setForm(emptyUpdate); }
  function cancelForm() { setEditing(null); setCreating(false); setForm(emptyUpdate); }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Updates</h1>
          <p className="text-gray-500 mt-1">Beheer updates die op het user dashboard verschijnen</p>
        </div>
        <Button onClick={startCreate} className="bg-forest text-beige hover:bg-forest/90">
          <Plus className="h-4 w-4 mr-2" /> Nieuwe Update
        </Button>
      </div>

      {(creating || editing) && (
        <Card className="mb-8 border-2 border-forest/20">
          <CardHeader><CardTitle>{editing ? "Update bewerken" : "Nieuwe update"}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-base font-medium text-gray-700">Titel *</label>
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Nieuwe boom geplant!" />
              </div>
              <div>
                <label className="text-base font-medium text-gray-700">Icoon</label>
                <select value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className="w-full h-10 rounded-md border border-gray-200 px-3 text-base">
                  {iconOptions.map((i) => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
              <div>
                <label className="text-base font-medium text-gray-700">Kleur</label>
                <select value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} className="w-full h-10 rounded-md border border-gray-200 px-3 text-base">
                  {colorOptions.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-base font-medium text-gray-700">Sorteervolgorde</label>
                <Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} />
              </div>
            </div>
            <div>
              <label className="text-base font-medium text-gray-700">Beschrijving *</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full rounded-md border border-gray-200 px-3 py-2 text-base resize-none focus:outline-none focus:ring-2 focus:ring-forest" />
            </div>
            <div className="flex gap-3">
              <Button onClick={handleSave} className="bg-forest text-beige hover:bg-forest/90">{editing ? "Opslaan" : "Aanmaken"}</Button>
              <Button onClick={cancelForm} variant="outline">Annuleren</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {loading ? <p className="text-gray-500">Laden...</p> : (
        <div className="space-y-3">
          {updates.map((update) => (
            <Card key={update.id} className={!update.active ? "opacity-50" : ""}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className={`p-2 rounded-lg ${update.color}`}>
                    <span className="text-xs font-bold">{update.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{update.title}</h3>
                      {!update.active && <span className="text-sm text-gray-400">(Inactief)</span>}
                    </div>
                    <p className="text-base text-gray-500">{update.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button onClick={() => handleToggle(update.id, update.active)} className="p-2 hover:bg-gray-100 rounded-lg">
                    {update.active ? <ToggleRight className="h-5 w-5 text-green-600" /> : <ToggleLeft className="h-5 w-5 text-gray-400" />}
                  </button>
                  <button onClick={() => startEdit(update)} className="p-2 hover:bg-gray-100 rounded-lg">
                    <Pencil className="h-4 w-4 text-gray-600" />
                  </button>
                  <button onClick={() => handleDelete(update.id)} className="p-2 hover:bg-red-50 rounded-lg">
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
