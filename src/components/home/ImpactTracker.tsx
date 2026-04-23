"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

const initialStats = [
  {
    id: "m2",
    label: "Herstelde m²",
    value: "0",
    unit: "m²",
    icon: "/herstelde-m2.svg",
    color: "text-forest"
  },
  {
    id: "trees",
    label: "Aantal Bomen",
    value: "0",
    unit: "",
    icon: "/aantal-bomen.svg",
    color: "text-green-600"
  },
  {
    id: "co2",
    label: "CO2-opslag",
    value: "0",
    unit: "t",
    icon: "/co2-opslag.svg",
    color: "text-blue-600"
  },
  {
    id: "animals",
    label: "Aantal Dieren",
    value: "0",
    unit: "",
    icon: "/aantaldieren.svg",
    color: "text-earth"
  }
];

export function ImpactTracker() {
  const [stats, setStats] = useState(initialStats);

  useEffect(() => {
    async function fetchImpact() {
      try {
        const { data: rows, error } = await supabase
          .from('impact')
          .select('*')
          .order('id', { ascending: false })
          .limit(1);
        
        const data = rows?.[0];
        if (data && !error) {
          setStats(prev => prev.map(s => ({
            ...s,
            value: Number(data[s.id])?.toLocaleString('nl-NL') || s.value
          })));
        } else if (error) {
          console.error("Supabase Error:", error);
        }
      } catch (err) {
        console.error("Error fetching impact stats:", err);
      }
    }

    fetchImpact();
  }, []);

  return (
    <section className="py-24 bg-beige">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-sm font-bold tracking-widest text-earth uppercase mb-4">Onze Impact</h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-forest">
              Samen maken we het verschil voor de natuur.
            </h3>
          </div>
          <div className="max-w-sm space-y-4">
            <p className="text-lg opacity-80">
              Live data van onze lopende projecten in Noord-Brabant. Van herstelde overhoekjes tot bruisende vijvers.
            </p>
            <p className="text-sm italic opacity-60">
              Inclusief ons actieve dierenbeheer met varkens en kippen die helpen bij het bodemherstel.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-none shadow-xl bg-white/50 backdrop-blur-sm hover:bg-white transition-colors overflow-hidden group">
                <CardContent className="p-8">
                  <div className={`p-3 rounded-2xl bg-beige inline-block mb-6 group-hover:scale-110 transition-transform`}>
                    <Image src={stat.icon} alt={stat.label} width={24} height={24} className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-forest">{stat.value}</span>
                      <span className="text-lg font-semibold text-forest/60">{stat.unit}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
