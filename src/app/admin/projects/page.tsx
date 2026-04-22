"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight } from "lucide-react";

type Project = {
  id: string;
  name: string;
  location: string;
  type: string;
  status: string;
  progress: number;
  target: number;
  current: number;
  description: string;
  features: string[];
  sort_order: number;
  active: boolean;
};

const emptyProject = {
  name: "",
  location: "",
  type: "forest",
  status: "Gepland",
  progress: 0,
  target: 10000,
  current: 0,
  description: "",
  features: [] as string[],
  sort_order: 0,
  active: true,
};

const typeOptions = ["forest", "pond", "meadow", "urban"];
const statusOptions = ["Opstart", "Gepland", "Actief", "Voltooid"];

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Project | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(emptyProject);
  const [featuresInput, setFeaturesInput] = useState("");

  const supabase = createClient();

  async function fetchProjects() {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true });
    if (data) setProjects(data as Project[]);
    setLoading(false);
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  async function handleSave() {
    const payload = { ...form, features: featuresInput.split(",").map((f) => f.trim()).filter(Boolean) };
    if (editing) {
      await supabase.from("projects").update(payload).eq("id", editing.id);
    } else {
      await supabase.from("projects").insert(payload);
    }
    setEditing(null);
    setCreating(false);
    setForm(emptyProject);
    setFeaturesInput("");
    fetchProjects();
  }

  async function handleDelete(id: string) {
    if (!confirm("Weet je zeker dat je dit project wilt verwijderen?")) return;
    await supabase.from("projects").delete().eq("id", id);
    fetchProjects();
  }

  async function handleToggle(id: string, active: boolean) {
    await supabase.from("projects").update({ active: !active }).eq("id", id);
    fetchProjects();
  }

  function startEdit(project: Project) {
    setEditing(project);
    setCreating(false);
    setForm({
      name: project.name,
      location: project.location,
      type: project.type,
      status: project.status,
      progress: project.progress,
      target: project.target,
      current: project.current,
      description: project.description,
      features: project.features || [],
      sort_order: project.sort_order,
      active: project.active,
    });
    setFeaturesInput((project.features || []).join(", "));
  }

  function startCreate() {
    setCreating(true);
    setEditing(null);
    setForm(emptyProject);
    setFeaturesInput("");
  }

  function cancelForm() {
    setEditing(null);
    setCreating(false);
    setForm(emptyProject);
    setFeaturesInput("");
  }

  const statusColors: Record<string, string> = {
    Opstart: "bg-yellow-100 text-yellow-700",
    Gepland: "bg-blue-100 text-blue-700",
    Actief: "bg-green-100 text-green-700",
    Voltooid: "bg-purple-100 text-purple-700",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projecten</h1>
          <p className="text-gray-500 mt-1">Beheer projecten op de kaart pagina</p>
        </div>
        <Button onClick={startCreate} className="bg-forest text-beige hover:bg-forest/90">
          <Plus className="h-4 w-4 mr-2" />
          Nieuw Project
        </Button>
      </div>

      {(creating || editing) && (
        <Card className="mb-8 border-2 border-forest/20">
          <CardHeader>
            <CardTitle>{editing ? "Project bewerken" : "Nieuw project aanmaken"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Naam *</label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Brabant I — Tilburg" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Locatie *</label>
                <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Berkel-Enschot, Tilburg" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Type</label>
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full h-10 rounded-md border border-gray-200 px-3 text-sm">
                  {typeOptions.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Status</label>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full h-10 rounded-md border border-gray-200 px-3 text-sm">
                  {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Doel (m²)</label>
                <Input type="number" value={form.target} onChange={(e) => setForm({ ...form, target: parseInt(e.target.value) || 0 })} />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Huidig (m²)</label>
                <Input type="number" value={form.current} onChange={(e) => setForm({ ...form, current: parseInt(e.target.value) || 0 })} />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Voortgang (%)</label>
                <Input type="number" min={0} max={100} value={form.progress} onChange={(e) => setForm({ ...form, progress: parseInt(e.target.value) || 0 })} />
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
            <div>
              <label className="text-sm font-medium text-gray-700">Features (kommagescheiden)</label>
              <Input value={featuresInput} onChange={(e) => setFeaturesInput(e.target.value)} placeholder="Agroforestry 7 lagen, Kune Kune varkens, Vijver" />
            </div>
            <div className="flex gap-3">
              <Button onClick={handleSave} className="bg-forest text-beige hover:bg-forest/90">{editing ? "Opslaan" : "Aanmaken"}</Button>
              <Button onClick={cancelForm} variant="outline">Annuleren</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <p className="text-gray-500">Laden...</p>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <Card key={project.id} className={!project.active ? "opacity-50" : ""}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-gray-900">{project.name}</h3>
                    <Badge className={statusColors[project.status] || "bg-gray-100 text-gray-700"}>{project.status}</Badge>
                    {!project.active && <Badge variant="outline" className="text-gray-400">Inactief</Badge>}
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-1">{project.description}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {project.location} · {project.current}/{project.target} m² · {project.progress}% · Volgorde: {project.sort_order}
                  </p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button onClick={() => handleToggle(project.id, project.active)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    {project.active ? <ToggleRight className="h-5 w-5 text-green-600" /> : <ToggleLeft className="h-5 w-5 text-gray-400" />}
                  </button>
                  <button onClick={() => startEdit(project)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Pencil className="h-4 w-4 text-gray-600" />
                  </button>
                  <button onClick={() => handleDelete(project.id)} className="p-2 hover:bg-red-50 rounded-lg transition-colors">
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
