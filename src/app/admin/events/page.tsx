"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight } from "lucide-react";

type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  month: string;
  location: string;
  tag: string;
  sort_order: number;
  active: boolean;
  created_at: string;
};

const emptyEvent = {
  title: "",
  description: "",
  date: "Binnenkort",
  month: "2025",
  location: "Tilburg, Project I",
  tag: "Planten",
  sort_order: 0,
  active: true,
};

const tagOptions = ["Planten", "Dieren", "Feest", "Rondleiding", "Workshop", "Anders"];

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Event | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(emptyEvent);

  const supabase = createClient();

  async function fetchEvents() {
    const { data } = await supabase
      .from("events")
      .select("*")
      .order("sort_order", { ascending: true });
    if (data) setEvents(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  async function handleSave() {
    if (editing) {
      await supabase.from("events").update(form).eq("id", editing.id);
    } else {
      await supabase.from("events").insert(form);
    }
    setEditing(null);
    setCreating(false);
    setForm(emptyEvent);
    fetchEvents();
  }

  async function handleDelete(id: string) {
    if (!confirm("Weet je zeker dat je dit event wilt verwijderen?")) return;
    await supabase.from("events").delete().eq("id", id);
    fetchEvents();
  }

  async function handleToggle(id: string, active: boolean) {
    await supabase.from("events").update({ active: !active }).eq("id", id);
    fetchEvents();
  }

  function startEdit(event: Event) {
    setEditing(event);
    setCreating(false);
    setForm({
      title: event.title,
      description: event.description,
      date: event.date,
      month: event.month,
      location: event.location,
      tag: event.tag,
      sort_order: event.sort_order,
      active: event.active,
    });
  }

  function startCreate() {
    setCreating(true);
    setEditing(null);
    setForm(emptyEvent);
  }

  function cancelForm() {
    setEditing(null);
    setCreating(false);
    setForm(emptyEvent);
  }

  const tagColors: Record<string, string> = {
    Planten: "bg-green-100 text-green-700",
    Dieren: "bg-orange-100 text-orange-700",
    Feest: "bg-purple-100 text-purple-700",
    Rondleiding: "bg-blue-100 text-blue-700",
    Workshop: "bg-amber-100 text-amber-700",
    Anders: "bg-gray-100 text-gray-700",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Events</h1>
          <p className="text-gray-500 mt-1">Beheer evenementen op de community pagina</p>
        </div>
        <Button onClick={startCreate} className="bg-forest text-beige hover:bg-forest/90">
          <Plus className="h-4 w-4 mr-2" />
          Nieuw Event
        </Button>
      </div>

      {/* Create/Edit Form */}
      {(creating || editing) && (
        <Card className="mb-8 border-2 border-forest/20">
          <CardHeader>
            <CardTitle>{editing ? "Event bewerken" : "Nieuw event aanmaken"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-base font-medium text-gray-700">Titel *</label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Bijv. Eerste Plantdag"
                />
              </div>
              <div>
                <label className="text-base font-medium text-gray-700">Locatie *</label>
                <Input
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  placeholder="Bijv. Tilburg, Project I"
                />
              </div>
              <div>
                <label className="text-base font-medium text-gray-700">Datum weergave *</label>
                <Input
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  placeholder="Bijv. Binnenkort, Elke zaterdag, 15 juni 2025"
                />
              </div>
              <div>
                <label className="text-base font-medium text-gray-700">Maand/Jaar</label>
                <Input
                  value={form.month}
                  onChange={(e) => setForm({ ...form, month: e.target.value })}
                  placeholder="2025"
                />
              </div>
              <div>
                <label className="text-base font-medium text-gray-700">Tag</label>
                <select
                  value={form.tag}
                  onChange={(e) => setForm({ ...form, tag: e.target.value })}
                  className="w-full h-10 rounded-md border border-gray-200 px-3 text-base"
                >
                  {tagOptions.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-base font-medium text-gray-700">Sorteervolgorde</label>
                <Input
                  type="number"
                  value={form.sort_order}
                  onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>
            <div>
              <label className="text-base font-medium text-gray-700">Beschrijving *</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Beschrijf het event..."
                rows={3}
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-base resize-none focus:outline-none focus:ring-2 focus:ring-forest"
              />
            </div>
            <div className="flex gap-3">
              <Button onClick={handleSave} className="bg-forest text-beige hover:bg-forest/90">
                {editing ? "Opslaan" : "Aanmaken"}
              </Button>
              <Button onClick={cancelForm} variant="outline">
                Annuleren
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Events List */}
      {loading ? (
        <p className="text-gray-500">Laden...</p>
      ) : events.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center text-gray-500">
            Nog geen events. Klik op "Nieuw Event" om er een aan te maken.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {events.map((event) => (
            <Card key={event.id} className={!event.active ? "opacity-50" : ""}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-gray-900">{event.title}</h3>
                    <Badge className={tagColors[event.tag] || "bg-gray-100 text-gray-700"}>
                      {event.tag}
                    </Badge>
                    {!event.active && (
                      <Badge variant="outline" className="text-gray-400">Inactief</Badge>
                    )}
                  </div>
                  <p className="text-base text-gray-500 line-clamp-1">{event.description}</p>
                  <p className="text-sm text-gray-400 mt-1">
                    {event.date} · {event.location} · Volgorde: {event.sort_order}
                  </p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => handleToggle(event.id, event.active)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title={event.active ? "Deactiveren" : "Activeren"}
                  >
                    {event.active ? (
                      <ToggleRight className="h-5 w-5 text-green-600" />
                    ) : (
                      <ToggleLeft className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                  <button
                    onClick={() => startEdit(event)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Pencil className="h-4 w-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                  >
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
