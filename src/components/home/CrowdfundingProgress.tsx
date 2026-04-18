"use client";

import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

export function CrowdfundingProgress() {
  const target = 10000;
  const current = 0;
  const percentage = (current / target) * 100;

  return (
    <section className="py-24 bg-forest text-beige overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-beige/10 px-4 py-2 rounded-full text-sm font-medium border border-beige/20">
              <MapPin className="h-4 w-4" />
              <span>Tilburg, Project I</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight">
              Crowdfunding: <br />
              Ons eerste kavel.
            </h2>
            <p className="text-lg sm:text-xl opacity-90 leading-relaxed max-w-lg">
              Help ons €10.000 op te halen om het eerste stuk landbouwgrond in Tilburg aan te kopen en om te zetten in een biodivers paradijs.
            </p>
            
            <div className="space-y-4 max-w-lg">
              <div className="flex justify-between items-end">
                <span className="text-3xl font-bold">€0</span>
                <span className="text-sm opacity-80">Doel: €10.000</span>
              </div>
              <Progress value={percentage} className="h-4 bg-beige/20" />
              <div className="flex justify-between text-sm font-medium">
                <span>{percentage}% gefinancierd</span>
                <span>Nog €10.000 te gaan</span>
              </div>
            </div>

            <Button size="lg" className="bg-beige text-forest hover:bg-beige/90 rounded-full px-12 h-14 text-lg font-bold">
              DRAAG BIJ
            </Button>
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
                { label: "Planten", active: false },
                { label: "Vijver", active: false },
                { label: "Dieren", active: false }
              ].map((step, i) => (
                <div key={i} className="text-center space-y-2">
                  <div className={`h-2 rounded-full ${step.active ? 'bg-beige' : 'bg-beige/20'}`} />
                  <p className={`text-[10px] uppercase tracking-widest font-bold ${step.active ? 'opacity-100' : 'opacity-40'}`}>
                    {step.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
