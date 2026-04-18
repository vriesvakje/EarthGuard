"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import {
  Leaf,
  MapPin,
  Trees,
  Droplets,
  Squirrel,
  ArrowRight,
  Clock,
  CheckCircle2,
  Circle,
  Egg,
  Carrot,
  Apple,
} from "lucide-react";
import Link from "next/link";

const projects = [
  {
    id: 1,
    name: "Brabant I — Tilburg",
    location: "Berkel-Enschot, Tilburg",
    type: "forest",
    icon: Trees,
    status: "Opstart",
    progress: 0,
    target: 10000,
    current: 0,
    description:
      "Ons allereerste project. Een braakliggend perceel dat wordt omgezet in een volledig voedselbos met zeven lagen, Kune Kune varkens en geredde scharrelkippen.",
    features: ["Voedselbos 7 lagen", "Kune Kune varkens", "Geredde kippen", "Vijver"],
    color: "bg-green-100 text-green-600",
    borderColor: "border-green-200",
  },
  {
    id: 2,
    name: "Brabant II — Biesbosch",
    location: "Biesbosch, Noord-Brabant",
    type: "pond",
    icon: Droplets,
    status: "Gepland",
    progress: 0,
    target: 15000,
    current: 0,
    description:
      "Een vochtig gebied perfect voor een vijver-ecosysteem. Hier creëren we een waterrijk paradijs voor amfibieën, libellen en watervogels.",
    features: ["Vijver ecosysteem", "Amfibieën", "Waterzuivering", "Moeraszone"],
    color: "bg-blue-100 text-blue-600",
    borderColor: "border-blue-200",
  },
  {
    id: 3,
    name: "Brabant III — Peel",
    location: "De Peel, Noord-Brabant",
    type: "animals",
    icon: Squirrel,
    status: "Gepland",
    progress: 0,
    target: 12000,
    current: 0,
    description:
      "Op de zandgronden van de Peel bouwen we een dierenrijk voedselbos. Speciale focus op bodemherstel en het creëren van habitats voor inheemse diersoorten.",
    features: ["Bodemherstel", "Inheemse diersoorten", "Zandgrond adaptie", "Heideborder"],
    color: "bg-amber-100 text-amber-700",
    borderColor: "border-amber-200",
  },
];

const projectTimeline = [
  {
    phase: "Aankoop grond",
    description: "Perceel verwerven en toegankelijk maken",
    status: "current" as const,
  },
  {
    phase: "Bodemherstel",
    description: "Grond analyseren, mineralen toevoegen, wormen uitzetten",
    status: "upcoming" as const,
  },
  {
    phase: "Dieren introduceren",
    description: "Kune Kune varkens en geredde kippen laten wennen",
    status: "upcoming" as const,
  },
  {
    phase: "Planten zaaien",
    description: "Alle 7 lagen van het voedselbos aanleggen",
    status: "upcoming" as const,
  },
  {
    phase: "Vijver aanleggen",
    description: "Waterpartij voor amfibieën en waterzuivering",
    status: "upcoming" as const,
  },
  {
    phase: "Oogsten & onderhouden",
    description: "Circulaire economie: oogst verkopen, investeren in nieuwe natuur",
    status: "upcoming" as const,
  },
];

const produceItems = [
  {
    icon: Egg,
    name: "Scharreleieren",
    description: "Van geredde kippen, verkocht voor natuurherstel",
    color: "bg-amber-100 text-amber-700",
  },
  {
    icon: Carrot,
    name: "Seizoensgroenten",
    description: "Chemievrij, uit de kruidlaag van het bos",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: Apple,
    name: "Fruit & Noten",
    description: "Appels, peren, walnoten en bessen",
    color: "bg-red-100 text-red-600",
  },
];

export default function KaartPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-forest text-beige overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center space-x-2 bg-beige/10 px-4 py-2 rounded-full text-sm font-medium border border-beige/20 mb-8">
              <MapPin className="h-4 w-4" />
              <span>Kaart & Projecten</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Verken het <br />
              <span className="text-beige/80 italic">Brabantse landschap.</span>
            </h1>
            <p className="text-xl opacity-90 leading-relaxed max-w-2xl">
              Bekijk onze projectlocaties op de kaart, volg de voortgang van elk perceel en ontdek hoe we stukje bij stukje de Brabantse biodiversiteit herstellen.
            </p>
          </motion.div>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-beige/20 blur-3xl" />
          <div className="absolute bottom-20 right-40 w-48 h-48 rounded-full bg-earth/30 blur-2xl" />
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24 bg-beige">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-sm font-bold tracking-widest text-earth uppercase mb-4">
              Locaties
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-forest mb-4">
              Onze Projectlocaties
            </h3>
            <p className="text-lg text-forest/70 max-w-xl mx-auto">
              Drie projecten in Noord-Brabant. Van Tilburg tot de Biesbosch — elk met een eigen ecosysteem en doel.
            </p>
          </motion.div>

          {/* Map placeholder / visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[16/10] bg-emerald-100 rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl mb-8"
          >
            {/* Stylized map visual */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50">
              {/* Grid lines for map feel */}
              <div className="absolute inset-0 opacity-10">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={`h-${i}`} className="absolute w-full h-[1px] bg-forest/20" style={{ top: `${(i + 1) * 5}%` }} />
                ))}
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={`v-${i}`} className="absolute h-full w-[1px] bg-forest/20" style={{ left: `${(i + 1) * 5}%` }} />
                ))}
              </div>

              {/* Project markers */}
              <div className="absolute top-[30%] left-[40%] flex flex-col items-center group cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-forest text-beige flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform z-10">
                  <Trees className="h-6 w-6" />
                </div>
                <div className="mt-2 px-3 py-1 bg-white/90 rounded-full text-xs font-bold text-forest shadow-sm">
                  Brabant I
                </div>
              </div>

              <div className="absolute top-[50%] left-[25%] flex flex-col items-center group cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform z-10">
                  <Droplets className="h-6 w-6" />
                </div>
                <div className="mt-2 px-3 py-1 bg-white/90 rounded-full text-xs font-bold text-forest shadow-sm">
                  Brabant II
                </div>
              </div>

              <div className="absolute top-[20%] left-[60%] flex flex-col items-center group cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform z-10">
                  <Squirrel className="h-6 w-6" />
                </div>
                <div className="mt-2 px-3 py-1 bg-white/90 rounded-full text-xs font-bold text-forest shadow-sm">
                  Brabant III
                </div>
              </div>

              {/* Connection lines between projects */}
              <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
                <line x1="42%" y1="33%" x2="27%" y2="53%" stroke="#2d5016" strokeWidth="2" strokeDasharray="8,8" opacity="0.3" />
                <line x1="42%" y1="33%" x2="62%" y2="23%" stroke="#2d5016" strokeWidth="2" strokeDasharray="8,8" opacity="0.3" />
              </svg>

              {/* Map legend */}
              <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white z-10">
                <p className="text-xs font-bold text-forest uppercase mb-2">Legenda</p>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-forest" />
                    <span className="text-xs text-forest/70">Voedselbos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    <span className="text-xs text-forest/70">Vijver ecosysteem</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <span className="text-xs text-forest/70">Dieren & bodemherstel</span>
                  </div>
                </div>
              </div>

              {/* Region label */}
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-white z-10">
                <p className="text-xs font-bold text-forest uppercase">Noord-Brabant</p>
              </div>
            </div>
          </motion.div>

          <p className="text-center text-sm text-forest/50 italic">
            Boven: overzicht van de drie EarthGuard projectlocaties in Noord-Brabant
          </p>
        </div>
      </section>

      {/* Project Cards */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-sm font-bold tracking-widest text-earth uppercase mb-4">
              Projecten
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-forest mb-4">
              Onze Drie Projecten
            </h3>
            <p className="text-lg text-forest/70 max-w-xl mx-auto">
              Elk project heeft een eigen ecosysteem, doel en manier van natuurherstel.
            </p>
          </motion.div>

          <div className="space-y-12">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`border-none shadow-xl overflow-hidden rounded-[2rem] ${project.borderColor}`}>
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Project visual */}
                    <div className={`${project.type === 'forest' ? 'bg-green-50' : project.type === 'pond' ? 'bg-blue-50' : 'bg-amber-50'} p-12 flex items-center justify-center`}>
                      <div className="text-center space-y-6">
                        <div className={`p-6 rounded-3xl ${project.color} inline-block`}>
                          <project.icon className="h-16 w-16" />
                        </div>
                        <div>
                          <Badge className={`${project.color} border-none text-sm font-bold mb-2`}>
                            {project.status}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm font-bold">
                            <span className="text-forest/70">Voortgang</span>
                            <span className="text-forest">{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} className="h-3" />
                          <div className="flex justify-between text-xs text-forest/50">
                            <span>€{project.current.toLocaleString('nl-NL')} opgehaald</span>
                            <span>Doel: €{project.target.toLocaleString('nl-NL')}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Project details */}
                    <CardContent className="p-10">
                      <div className="flex items-center gap-2 text-sm text-forest/50 mb-2">
                        <MapPin className="h-3 w-3" />
                        <span>{project.location}</span>
                      </div>
                      <h4 className="text-2xl font-bold text-forest mb-3">{project.name}</h4>
                      <p className="text-forest/70 leading-relaxed mb-6">{project.description}</p>

                      <div className="space-y-3 mb-8">
                        {project.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${project.type === 'forest' ? 'bg-green-500' : project.type === 'pond' ? 'bg-blue-500' : 'bg-amber-500'}`} />
                            <span className="text-sm text-forest/70">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <Link href="/adopteer">
                        <Button className="bg-forest text-beige hover:bg-forest/90 rounded-full h-12 px-8">
                          ADOPTEER m² IN DIT PROJECT
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Timeline */}
      <section className="py-24 bg-beige">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-sm font-bold tracking-widest text-earth uppercase mb-4">
                Tijdlijn
              </h2>
              <h3 className="text-4xl md:text-5xl font-bold text-forest mb-6 leading-tight">
                Van Braakland naar Bloeiend Bos
              </h3>
              <p className="text-lg text-forest/70 leading-relaxed mb-8">
                Elk project doorloopt zes fasen. Van de aankoop van de grond tot een zelfvoorzienend ecosysteem dat voedsel produceert en de opbrengst investeert in nieuwe natuur.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-1"
            >
              {projectTimeline.map((step, index) => (
                <motion.div
                  key={step.phase}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.08 }}
                  className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/60 transition-colors group"
                >
                  <div className="shrink-0 mt-1">
                    {step.status === "current" ? (
                      <div className="w-8 h-8 rounded-full bg-forest text-beige flex items-center justify-center">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                    ) : step.status === "upcoming" ? (
                      <div className="w-8 h-8 rounded-full border-2 border-forest/20 flex items-center justify-center">
                        <Circle className="h-4 w-4 text-forest/20" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-forest/10 text-forest flex items-center justify-center">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className={`font-bold ${step.status === "current" ? "text-forest" : "text-forest/50"}`}>
                      {step.phase}
                    </h4>
                    <p className={`text-sm ${step.status === "current" ? "text-forest/70" : "text-forest/40"}`}>
                      {step.description}
                    </p>
                  </div>
                  {step.status === "current" && (
                    <Badge className="bg-forest/10 text-forest border-none ml-auto shrink-0">
                      <Clock className="h-3 w-3 mr-1" />
                      Nu
                    </Badge>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* What Each Project Produces */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-sm font-bold tracking-widest text-earth uppercase mb-4">
              Circulaire Economie
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-forest mb-4">
              Wat Elk Project Produceert
            </h3>
            <p className="text-lg text-forest/70 max-w-xl mx-auto">
              Onze projecten zijn geen parken — ze produceren lokaal voedsel. De opbrengst gaat terug naar natuurherstel.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {produceItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="p-8 rounded-3xl bg-beige/50 hover:bg-beige transition-colors group text-center"
              >
                <div className={`p-4 rounded-2xl ${item.color} inline-block mb-6 group-hover:scale-110 transition-transform`}>
                  <item.icon className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-bold text-forest mb-3">{item.name}</h4>
                <p className="text-forest/70 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-forest/5 border border-forest/10">
              <Leaf className="h-4 w-4 text-forest" />
              <span className="text-forest font-medium text-sm">100% van de opbrengst investeren we in nieuwe natuur</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-forest text-beige">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Leaf className="h-10 w-10 mx-auto mb-8 opacity-40" />
            <h3 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Kies jouw stukje Brabant.
            </h3>
            <p className="text-xl opacity-80 mb-10 max-w-xl mx-auto">
              Elk project heeft ruimte voor Guards. Adopteer je m² en zie hoe jouw stukje natuur tot leven komt.
            </p>
            <Link href="/adopteer">
              <Button
                size="lg"
                className="bg-beige text-forest hover:bg-beige/90 rounded-full text-lg px-10 h-14"
              >
                KOOP JE m²
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
