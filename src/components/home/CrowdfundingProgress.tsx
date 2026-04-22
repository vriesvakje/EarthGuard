"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export function CrowdfundingProgress() {
  const [target, setTarget] = useState(10000);
  const [current, setCurrent] = useState(0);
  const [projectName, setProjectName] = useState("Tilburg, Project I");

  useEffect(() => {
    async function fetchCrowdfunding() {
      const { data } = await supabase.from("crowdfunding").select("*").limit(1).single();
      if (data) {
        setTarget(data.target);
        setCurrent(data.current);
        setProjectName(data.project_name);
      }
    }
    fetchCrowdfunding();
  }, []);

  const percentage = target > 0 ? (current / target) * 100 : 0;

  return (
    <section className="py-24 bg-forest text-beige overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-beige/10 px-4 py-2 rounded-full text-sm font-medium border border-beige/20">
              <MapPin className="h-4 w-4" />
              <span>{projectName}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight">
              Crowdfunding: <br />
              Ons eerste kavel.
            </h2>
            <p className="text-lg sm:text-xl opacity-90 leading-relaxed max-w-lg">
              Help ons €{target.toLocaleString("nl-NL")} op te halen om het eerste stuk landbouwgrond in Tilburg aan te kopen en om te zetten in een biodivers paradijs.
            </p>
            
            <div className="space-y-4 max-w-lg">
              <div className="flex justify-between items-end">
                <span className="text-3xl font-bold">€{current.toLocaleString("nl-NL")}</span>
                <span className="text-sm opacity-80">Doel: €{target.toLocaleString("nl-NL")}</span>
              </div>
              <Progress value={percentage} className="h-4 bg-beige/20" />
              <div className="flex justify-between text-sm font-medium">
                <span>{percentage.toFixed(1)}% gefinancierd</span>
                <span>Nog €{(target - current).toLocaleString("nl-NL")} te gaan</span>
              </div>
            </div>

            <Link href="/adopteer">
              <Button size="lg" className="bg-beige text-forest hover:bg-beige/90 rounded-full px-12 h-14 text-lg font-bold">
                DRAAG BIJ
              </Button>
            </Link>
          </div>

          <div className="relative">
            <div className="aspect-video bg-white/10 rounded-3xl overflow-hidden relative group">
               {/* Placeholder for project image/video */}
               <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                  <div className="text-center p-8">
                    <p className="text-2xl font-bold mb-2">Het Tilburg Project</p>
                    <p className="opacity-80">Klik om de plannen voor dit perceel te bekijken</p>
                  </div>
               </div>
            </div>
            {/* Steps visual */}
            <div className="grid grid-cols-4 gap-4 mt-8">
              {[
                { label: "Aankoop", active: true },
                { label: "Inrichting", active: false },
                { label: "Beplanting", active: false },
                { label: "Bewoning", active: false },
              ].map((step, i) => (
                <div key={i} className="text-center">
                  <div className={`h-2 rounded-full mb-2 ${step.active ? "bg-beige" : "bg-beige/20"}`} />
                  <span className="text-xs font-medium opacity-70">{step.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
