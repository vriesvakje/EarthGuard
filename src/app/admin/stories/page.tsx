"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight } from "lucide-react";

type Story = {
  id: string;
  name: string;
  quote: string;
  role: string;
  initials: string;
  sort_order: number;
  active: boolean;
};

const emptyStory = { name: "", quote: "", role: "", initials: "", sort_order: 0, active: true };

export default function AdminStoriesPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Story | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(emptyStory);

  const supabase = createClient();

  async function fetchStories() {
    const { data } = await supabase.from("stories").select("*").order("sort_order", { ascending: true });
    if (data) setStories(data as Story[]);
    setLoading(false);
  }

  useEffect(() => { fetchStories(); }, []);

  async function handleSave() {
    if (editing) {
      await supabase.from("stories").update(form).eq("id", editing.id);
    } else {
      await supabase.from("stories").insert(form);
    }
    setEditing(null); setCreating(false); setForm(emptyStory); fetchStories();
  }

  async function handleDelete(id: string) {
    if (!confirm("Weet je zeker dat je dit verhaal wilt verwijderen?")) return;
    await supabase.from("stories").delete().eq("id", id); fetchStories();
  }

  async function handleToggle(id: string, active: boolean) {
    await supabase.from("stories").update({ active: !active }).eq("id", id); fetchStories();
  }

  function startEdit(story: Story) {
    setEditing(story); setCreating(false);
    setForm({ name: story.name, quote: story.quote, role: story.role, initials: story.initials, sort_order: story.sort_order, active: story.active });
  }

  function startCreate() { setCreating(true); setEditing(null); setForm(emptyStory); }
  function cancelForm() { setEditing(null); setCreating(false); setForm(emptyStory); }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Verhalen</h1>
          <p className="text-gray-500 mt-1">Beheer testimonials op de community pagina</p>
        </div>
        <Button onClick={startCreate} className="bg-forest text-beige hover:bg-forest/90">
          <Plus className="h-4 w-4 mr-2" /> Nieuw Verhaal
        </Button>
      </div>

      {(creating || editing) && (
        <Card className="mb-8 border-2 border-forest/20">
          <CardHeader><CardTitle>{editing ? "Verhaal bewerken" : "Nieuw verhaal"}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-base font-medium text-gray-700">Naam *</label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="De Eerste Guard" />
              </div>
              <div>
                <label className="text-base font-medium text-gray-700">Rol *</label>
                <Input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="Vroege adopter" />
              </div>
              <div>
                <label className="text-base font-medium text-gray-700">Initialen *</label>
                <Input value={form.initials} onChange={(e) => setForm({ ...form, initials: e.target.value })} placeholder="EG" maxLength={3} />
              </div>
            </div>
            <div>
              <label className="text-base font-medium text-gray-700">Quote *</label>
              <textarea value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} rows={3} className="w-full rounded-md border border-gray-200 px-3 py-2 text-base resize-none focus:outline-none focus:ring-2 focus:ring-forest" placeholder="Wat wil deze Guard vertellen?" />
            </div>
            <div>
              <label className="text-base font-medium text-gray-700">Sorteervolgorde</label>
              <Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} />
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
          {stories.map((story) => (
            <Card key={story.id} className={!story.active ? "opacity-50" : ""}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center text-sm font-bold text-forest">
                      {story.initials}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{story.name}</h3>
                      <p className="text-xs text-gray-500">{story.role}</p>
                    </div>
                    {!story.active && <span className="text-sm text-gray-400 ml-2">(Inactief)</span>}
                  </div>
                  <p className="text-base text-gray-600 line-clamp-2 mt-1 italic">&ldquo;{story.quote}&rdquo;</p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button onClick={() => handleToggle(story.id, story.active)} className="p-2 hover:bg-gray-100 rounded-lg">
                    {story.active ? <ToggleRight className="h-5 w-5 text-green-600" /> : <ToggleLeft className="h-5 w-5 text-gray-400" />}
                  </button>
                  <button onClick={() => startEdit(story)} className="p-2 hover:bg-gray-100 rounded-lg">
                    <Pencil className="h-4 w-4 text-gray-600" />
                  </button>
                  <button onClick={() => handleDelete(story.id)} className="p-2 hover:bg-red-50 rounded-lg">
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
