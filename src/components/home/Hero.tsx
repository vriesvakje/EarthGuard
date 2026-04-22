"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden text-white">
      {/* Background Image */}
      <Image
        src="/achtergrond.png"
        alt="Achtergrond"
        fill
        className="object-cover -z-20"
        sizes="100vw"
        priority
      />
      {/* Gradient overlay: dark left to light right on desktop, dark bottom on mobile for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/30 md:from-black/90 md:via-black/60 md:to-black/5 md:bg-gradient-to-r -z-10 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight">
            Breng biodiversiteit <br />
            <span className="text-beige/80 italic">terug in Brabant.</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl max-w-lg opacity-90 leading-relaxed">
            Adopteer je eigen stukje Agroforestry in Brabant en help de natuur herstellen.
            Van vergeten overhoekjes tot bloeiende ecosystemen met varkens en kippen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/adopteer">
              <Button size="lg" className="bg-beige text-forest hover:bg-beige/90 rounded-full text-lg px-10 h-14">
                KOOP JE m²
              </Button>
            </Link>
            <Link href="/verhaal">
              <Button size="lg" variant="outline" className="border-beige text-beige bg-transparent hover:bg-beige hover:text-forest rounded-full text-lg px-10 h-14 transition-colors">
                LEES ONS VERHAAL
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
          {/* Decorative element */}
          <div className="absolute -bottom-6 -left-6 bg-earth text-beige p-8 rounded-2xl shadow-xl max-w-[200px]">
            <p className="text-4xl font-bold mb-1">0%</p>
            <p className="text-sm font-medium opacity-90">van doel bereikt voor Brabant I</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
