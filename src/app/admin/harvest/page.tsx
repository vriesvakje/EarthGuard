"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight } from "lucide-react";

type HarvestItem = {
  id: string;
  name: string;
  description: string;
  available: string;
  icon: string;
  color: string;
  sort_order: number;
  active: boolean;
};

const emptyItem = { name: "", description: "", available: "", icon: "Egg", color: "bg-amber-100 text-amber-700", sort_order: 0, active: true };
const iconOptions = ["Egg", "Carrot", "Apple", "Leaf", "Flower", "Wheat"];
const colorOptions = [
  "bg-amber-100 text-amber-700",
  "bg-green-100 text-green-600",
  "bg-red-100 text-red-600",
  "bg-blue-100 text-blue-600",
  "bg-purple-100 text-purple-600",
  "bg-orange-100 text-orange-600",
];

export default function AdminHarvestPage() {
  const [items, setItems] = useState<HarvestItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<HarvestItem | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(emptyItem);

  const supabase = createClient();

  async function fetchItems() {
    const { data } = await supabase.from("harvest_items").select("*").order("sort_order", { ascending: true });
    if (data) setItems(data as HarvestItem[]);
    setLoading(false);
  }

  useEffect(() => { fetchItems(); }, []);

  async function handleSave() {
    if (editing) {
      await supabase.from("harvest_items").update(form).eq("id", editing.id);
    } else {
      await supabase.from("harvest_items").insert(form);
    }
    setEditing(null); setCreating(false); setForm(emptyItem); fetchItems();
  }

  async function handleDelete(id: string) {
    if (!confirm("Weet je zeker dat je dit item wilt verwijderen?")) return;
    await supabase.from("harvest_items").delete().eq("id", id); fetchItems();
  }

  async function handleToggle(id: string, active: boolean) {
    await supabase.from("harvest_items").update({ active: !active }).eq("id", id); fetchItems();
  }

  function startEdit(item: HarvestItem) {
    setEditing(item); setCreating(false);
    setForm({ name: item.name, description: item.description, available: item.available, icon: item.icon, color: item.color, sort_order: item.sort_order, active: item.active });
  }

  function startCreate() { setCreating(true); setEditing(null); setForm(emptyItem); }
  function cancelForm() { setEditing(null); setCreating(false); setForm(emptyItem); }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Oogst</h1>
          <p className="text-gray-500 mt-1">Beheer oogst items op de community pagina</p>
        </div>
        <Button onClick={startCreate} className="bg-forest text-beige hover:bg-forest/90">
          <Plus className="h-4 w-4 mr-2" /> Nieuw Item
        </Button>
      </div>

      {(creating || editing) && (
        <Card className="mb-8 border-2 border-forest/20">
          <CardHeader><CardTitle>{editing ? "Item bewerken" : "Nieuw oogst item"}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Naam *</label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Eieren van Geredde Kippen" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Beschikbaarheid *</label>
                <Input value={form.available} onChange={(e) => setForm({ ...form, available: e.target.value })} placeholder="Jaarlijks, Lente t/m Herfst" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Icoon</label>
                <select value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className="w-full h-10 rounded-md border border-gray-200 px-3 text-sm">
                  {iconOptions.map((i) => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Kleur</label>
                <select value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} className="w-full h-10 rounded-md border border-gray-200 px-3 text-sm">
                  {colorOptions.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Sorteervolgorde</label>
                <Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Beschrijving *</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-forest" />
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
          {items.map((item) => (
            <Card key={item.id} className={!item.active ? "opacity-50" : ""}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.color}`}>{item.icon}</span>
                    {!item.active && <span className="text-xs text-gray-400">(Inactief)</span>}
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-1">{item.description}</p>
                  <p className="text-xs text-gray-400 mt-1">Beschikbaar: {item.available} · Volgorde: {item.sort_order}</p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button onClick={() => handleToggle(item.id, item.active)} className="p-2 hover:bg-gray-100 rounded-lg">
                    {item.active ? <ToggleRight className="h-5 w-5 text-green-600" /> : <ToggleLeft className="h-5 w-5 text-gray-400" />}
                  </button>
                  <button onClick={() => startEdit(item)} className="p-2 hover:bg-gray-100 rounded-lg">
                    <Pencil className="h-4 w-4 text-gray-600" />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="p-2 hover:bg-red-50 rounded-lg">
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
