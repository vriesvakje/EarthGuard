"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { FlaskConical, ArrowRight } from "lucide-react";

export function VisionHero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden text-white">
      {/* Background Image */}
      <Image
        src="/achtergrond.png"
        alt="Achtergrond"
        fill
        className="object-cover -z-20"
        sizes="100vw"
        priority
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/30 md:from-black/90 md:via-black/60 md:to-black/5 md:bg-gradient-to-r -z-10 pointer-events-none" />

      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Early-stage badge */}
          <div className="inline-flex items-center gap-2 bg-earth/90 text-beige px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm">
            <FlaskConical className="h-4 w-4" />
            IN ONTWIKKELING — EARLY STAGE
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight">
            Breng biodiversiteit <br />
            <span className="text-beige/80 italic">terug in Brabant.</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl max-w-lg opacity-90 leading-relaxed">
            Earth Guard is een opkomend project dat landbouwgrond transformeert
            naar bloeiende agroforestry-ecosystemen. We zijn nu in de opstartfase
            — en zoeken medestanders.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="#steun-ons">
              <Button size="lg" className="bg-beige text-forest hover:bg-beige/90 rounded-full text-lg px-10 h-14">
                STEUN ONS
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <Link href="/prototype">
              <Button size="lg" variant="outline" className="border-beige text-beige bg-transparent hover:bg-beige hover:text-forest rounded-full text-lg px-10 h-14 transition-colors">
                <FlaskConical className="h-5 w-5 mr-2" />
                BEKIJK PROTOTYPE
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-4 border-beige/20">
            <Image
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000&auto=format&fit=crop"
              alt="Agroforestry"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
          {/* Decorative element — honest about current state */}
          <div className="absolute -bottom-6 -left-6 bg-earth text-beige p-8 rounded-2xl shadow-xl max-w-[220px]">
            <p className="text-3xl font-bold mb-1">Fase 1</p>
            <p className="text-body font-medium opacity-90">Concept & fondsenwerving voor eerste kavel</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
