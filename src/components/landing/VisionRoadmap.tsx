"use client";

import { motion } from "framer-motion";
import { FlaskConical, Landmark, TreePine, TrendingUp } from "lucide-react";

const phases = [
  {
    icon: FlaskConical,
    phase: "Fase 1",
    title: "Concept & Onderzoek",
    description:
      "Visie ontwikkeld, locaties verkend, methode uitgewerkt. We zoeken nu medestanders en fondsen voor de eerste aankoop.",
    status: "current" as const,
  },
  {
    icon: Landmark,
    phase: "Fase 2",
    title: "Eerste Kavel Aankopen",
    description:
      "De eerste stuk landbouwgrond in Tilburg aankopen en inrichten. Start met bodemherstel en eerste beplanting.",
    status: "upcoming" as const,
  },
  {
    icon: TreePine,
    phase: "Fase 3",
    title: "Implementatie & Monitoring",
    description:
      "Agroforestry aanleggen, dieren introduceren, sensoren plaatsen. Live data beschikbaar via het dashboard.",
    status: "upcoming" as const,
  },
  {
    icon: TrendingUp,
    phase: "Fase 4",
    title: "Opschalen",
    description:
      "Meer kavels, meer impact. Het model bewijzen en repliceren in heel Brabant en daarbuiten.",
    status: "upcoming" as const,
  },
];

export function VisionRoadmap() {
  return (
    <section className="py-24 bg-forest text-beige">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-bold tracking-widest text-beige/60 uppercase mb-4">
              Roadmap
            </h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Van concept naar impact
            </h3>
            <p className="text-lg opacity-80 leading-relaxed">
              Een eerlijk overzicht van waar we staan en waar we naartoe werken.
              We beloven alleen wat we kunnen waarmaken.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className={`relative rounded-2xl p-8 ${
                phase.status === "current"
                  ? "bg-beige text-forest ring-2 ring-beige/50"
                  : "bg-beige/10 text-beige border border-beige/10"
              }`}
            >
              {/* Phase indicator */}
              <div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold mb-4 ${
                  phase.status === "current"
                    ? "bg-earth text-beige"
                    : "bg-beige/10 text-beige/60"
                }`}
              >
                {phase.status === "current" && (
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-beige opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-beige" />
                  </span>
                )}
                {phase.phase}
              </div>

              <div
                className={`mb-4 ${
                  phase.status === "current" ? "text-forest" : "text-beige/60"
                }`}
              >
                <phase.icon className="h-8 w-8" />
              </div>

              <h4 className="text-xl font-bold mb-3">{phase.title}</h4>
              <p
                className={`text-body leading-relaxed ${
                  phase.status === "current" ? "opacity-80" : "opacity-60"
                }`}
              >
                {phase.description}
              </p>

              {/* Connector line (hidden on last item and mobile) */}
              {index < phases.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-beige/20" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
