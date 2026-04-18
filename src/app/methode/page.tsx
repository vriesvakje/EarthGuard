"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Leaf,
  Microscope,
  ShieldCheck,
  Wifi,
  Link2,
  ArrowRight,
  Recycle,
  Carrot,
  Egg,
} from "lucide-react";
import Link from "next/link";

const layers = [
  {
    name: "Kruinlaag",
    description: "Hoge bomen (bijv. walnoten)",
    color: "bg-green-800",
  },
  {
    name: "Lage boomlaag",
    description: "Fruitbomen (bijv. appels, peren)",
    color: "bg-green-700",
  },
  {
    name: "Struiklaag",
    description: "Bessenstruiken en hazelnoten",
    color: "bg-green-600",
  },
  {
    name: "Kruidlaag",
    description: "Eetbare planten en kruiden",
    color: "bg-green-500",
  },
  {
    name: "Bodembedekkers",
    description: "Natuurlijke bescherming tegen uitdroging",
    color: "bg-green-400",
  },
  {
    name: "Wortellaag",
    description: "Knolgewassen onder de grond",
    color: "bg-amber-700",
  },
  {
    name: "Klimplanten",
    description: "Druiven en bessen die omhoog klimmen",
    color: "bg-green-600",
  },
];

export default function MethodePage() {
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
              <Leaf className="h-4 w-4" />
              <span>Onze Methode</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Samenwerken <br />
              <span className="text-beige/80 italic">met de Natuur.</span>
            </h1>
            <p className="text-xl opacity-90 leading-relaxed max-w-2xl">
              Bij EarthGuard herstellen we de natuur niet door haar met rust te
              laten, maar door er slim mee samen te werken. We gebruiken een
              combinatie van eeuwenoude landbouwtechnieken en moderne technologie
              om ecosystemen razendsnel weer tot leven te wekken.
            </p>
          </motion.div>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-beige/20 blur-3xl" />
          <div className="absolute bottom-20 right-40 w-48 h-48 rounded-full bg-earth/30 blur-2xl" />
        </div>
      </section>

      {/* Section 1: De Bodem als Basis */}
      <section className="py-24 bg-beige">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-forest text-beige text-xl font-bold">
                  1
                </span>
                <h2 className="text-sm font-bold tracking-widest text-earth uppercase">
                  De Basis
                </h2>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-forest mb-8 leading-tight">
                De Bodem als Basis
              </h3>
              <p className="text-lg text-forest/70 leading-relaxed mb-8">
                Alles begint bij de grond. In plaats van kunstmest te gebruiken,
                laten we het werk over aan de experts: wormen, schimmels en
                bacteriën.
              </p>
              <div className="space-y-6">
                <div className="flex gap-4 p-5 rounded-2xl bg-white/60">
                  <div className="p-3 rounded-xl bg-forest/10 text-forest shrink-0">
                    <Microscope className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-forest mb-1">
                      Bodemherstel
                    </h4>
                    <p className="text-forest/70 leading-relaxed">
                      We analyseren de grond en voegen precies de natuurlijke
                      mineralen toe die ontbreken.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 p-5 rounded-2xl bg-white/60">
                  <div className="p-3 rounded-xl bg-forest/10 text-forest shrink-0">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-forest mb-1">
                      Geen Gif
                    </h4>
                    <p className="text-forest/70 leading-relaxed">
                      Wij gebruiken 0% chemicaliën. De natuur is zelf de beste
                      ongediertebestrijder.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square rounded-[3rem] bg-forest/5 flex items-center justify-center overflow-hidden">
                <Image
                  src="/g1.svg"
                  alt="Bodemleven illustratie"
                  width={400}
                  height={400}
                  className="w-4/5 h-4/5 object-contain"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2: De Natuurlijke Ploeg */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <div className="relative rounded-[3rem] overflow-hidden bg-forest/5 aspect-[4/3] flex items-center justify-center">
                <Image
                  src="/koe-kip-en-varken.svg"
                  alt="Onze dieren: Kune Kune varkens en scharrelkippen"
                  width={500}
                  height={400}
                  className="w-4/5 h-4/5 object-contain"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-forest text-beige text-xl font-bold">
                  2
                </span>
                <h2 className="text-sm font-bold tracking-widest text-earth uppercase">
                  Onze Dieren
                </h2>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-forest mb-6 leading-tight">
                De Natuurlijke Ploeg
              </h3>
              <p className="text-lg text-forest/70 leading-relaxed mb-8">
                Wij geloven dat dieren een onmisbare schakel zijn in een gezond
                ecosysteem. Onze dieren zijn geen &lsquo;productievee&rsquo;,
                maar actieve beheerders van het bos.
              </p>
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-beige/50">
                  <div className="flex items-center gap-3 mb-2">
                    <Image
                      src="/koe-kip-en-varken.svg"
                      alt="Kune Kune varken"
                      width={28}
                      height={28}
                      className="shrink-0"
                    />
                    <h4 className="text-lg font-bold text-forest">
                      Kune Kune Varkens
                    </h4>
                  </div>
                  <p className="text-forest/70 leading-relaxed">
                    Deze varkens staan bekend om hun rustige karakter. Ze wroeten
                    de toplaag van de grond voorzichtig om, waardoor zaden kunnen
                    ontkiemen en de bodem wordt belucht.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-beige/50">
                  <div className="flex items-center gap-3 mb-2">
                    <Image
                      src="/koe-kip-en-varken.svg"
                      alt="Geredde kippen"
                      width={28}
                      height={28}
                      className="shrink-0"
                    />
                    <h4 className="text-lg font-bold text-forest">
                      Geredde Legkippen
                    </h4>
                  </div>
                  <p className="text-forest/70 leading-relaxed">
                    Wij kopen kippen op die anders in een legbatterij zouden eindigen. Bij EarthGuard krijgen ze een natuurlijk leven tussen de bomen en struiken. Ze zorgen voor natuurlijke bemesting, houden insecten en teken in balans — en hun eieren verkopen we om nog meer natuur te maken.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-forest/5 border border-forest/10">
                  <h4 className="text-lg font-bold text-forest mb-2">
                    🔄 Cirkel van Leven
                  </h4>
                  <p className="text-forest/70 leading-relaxed">
                    De uitwerpselen van de dieren voeden de planten, en de
                    planten bieden weer beschutting en voedsel voor de dieren. De eieren en groenten die we oogsten verkopen we, en de opbrengst investeren we direct in het herstel van nog meer natuur.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 3: De Zeven Lagen van het Voedselbos */}
      <section className="py-24 bg-beige">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="flex items-center justify-center w-12 h-12 rounded-full bg-forest text-beige text-xl font-bold">
                3
              </span>
              <h2 className="text-sm font-bold tracking-widest text-earth uppercase">
                Het Voedselbos
              </h2>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold text-forest mb-6">
              De Zeven Lagen van het Voedselbos
            </h3>
            <p className="text-lg text-forest/70 leading-relaxed max-w-2xl mx-auto">
              We planten niet zomaar bomen; we bouwen een flatgebouw van voedsel.
              Een gezond voedselbos bestaat uit zeven lagen.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Cross-section visual */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="rounded-[3rem] overflow-hidden bg-forest/5 aspect-[4/3] flex items-center justify-center p-8">
                <Image
                  src="/vijver.svg"
                  alt="Doorsnede voedselbos met grondlagen en vijver"
                  width={600}
                  height={450}
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-center text-sm text-forest/50 mt-4 italic">
                Doorsnede van het voedselbos — van kruinlaag tot wortels
              </p>
            </motion.div>

            {/* Layers list */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-3"
            >
              {layers.map((layer, index) => (
                <motion.div
                  key={layer.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/60 hover:bg-white transition-colors group"
                >
                  <div
                    className={`w-4 h-12 rounded-full ${layer.color} shrink-0 group-hover:scale-110 transition-transform`}
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-forest">{layer.name}</h4>
                    <p className="text-sm text-forest/60">
                      {layer.description}
                    </p>
                  </div>
                  <span className="text-forest/30 text-sm font-mono">
                    {index + 1}/7
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 4: High-Tech Monitoring */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-forest text-beige text-xl font-bold">
                  4
                </span>
                <h2 className="text-sm font-bold tracking-widest text-earth uppercase">
                  Technologie
                </h2>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-forest mb-6 leading-tight">
                High-Tech Monitoring
              </h3>
              <p className="text-lg text-forest/70 leading-relaxed mb-8">
                Hoewel we met onze voeten in de modder staan, houden we alles
                scherp in de gaten met technologie.
              </p>
              <div className="space-y-6">
                <div className="flex gap-4 p-5 rounded-2xl bg-beige/50">
                  <div className="p-3 rounded-xl bg-blue-100 text-blue-600 shrink-0">
                    <Wifi className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-forest mb-1">
                      Sensoren
                    </h4>
                    <p className="text-forest/70 leading-relaxed">
                      We meten de vochtigheid en de gezondheid van de bodem in
                      realtime.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 p-5 rounded-2xl bg-beige/50">
                  <div className="p-3 rounded-xl bg-blue-100 text-blue-600 shrink-0">
                    <Microscope className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-forest mb-1">
                      Impact Tracking
                    </h4>
                    <p className="text-forest/70 leading-relaxed">
                      Elke m² die jij adopteert, wordt gekoppeld aan onze
                      database. Zo zie je via je persoonlijke dashboard precies
                      hoeveel biodiversiteit er op jouw stukje grond bijkomt.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square rounded-[3rem] bg-gradient-to-br from-forest/5 to-blue-50 flex items-center justify-center p-12">
                <div className="text-center space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-6 rounded-2xl bg-white shadow-lg">
                      <p className="text-3xl font-bold text-forest">24/7</p>
                      <p className="text-sm text-forest/60">Monitoring</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white shadow-lg">
                      <p className="text-3xl font-bold text-blue-600">Realtime</p>
                      <p className="text-sm text-forest/60">Data</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white shadow-lg">
                      <p className="text-3xl font-bold text-earth">Per m²</p>
                      <p className="text-sm text-forest/60">Tracking</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white shadow-lg">
                      <p className="text-3xl font-bold text-green-600">100%</p>
                      <p className="text-sm text-forest/60">Transparant</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 5: Overhoekjes Strategie */}
      <section className="py-24 bg-beige">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <div className="aspect-[4/3] rounded-[3rem] bg-forest/5 flex items-center justify-center p-8">
                <div className="w-full h-full relative">
                  {/* Visual representation of connected plots */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="grid grid-cols-3 gap-4 w-4/5">
                      {[
                        { connected: true, row: 1 },
                        { connected: true, row: 1 },
                        { connected: false, row: 1 },
                        { connected: true, row: 2 },
                        { connected: true, row: 2 },
                        { connected: true, row: 2 },
                        { connected: false, row: 3 },
                        { connected: true, row: 3 },
                        { connected: true, row: 3 },
                      ].map((plot, i) => (
                        <div
                          key={i}
                          className={`aspect-square rounded-2xl flex items-center justify-center ${
                            plot.connected
                              ? "bg-forest/20 border-2 border-forest/30"
                              : "bg-forest/5 border-2 border-dashed border-forest/10"
                          }`}
                        >
                          {plot.connected ? (
                            <Leaf className="h-6 w-6 text-forest/40" />
                          ) : (
                            <span className="text-forest/20 text-xs">?</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Connection lines */}
                  <div className="absolute bottom-4 left-0 right-0 text-center">
                    <p className="text-sm text-forest/50 italic">
                      Groene vlakken = aangesloten overhoekjes
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-forest text-beige text-xl font-bold">
                  5
                </span>
                <h2 className="text-sm font-bold tracking-widest text-earth uppercase">
                  Strategie
                </h2>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-forest mb-6 leading-tight">
                Overhoekjes Strategie
              </h3>
              <p className="text-lg text-forest/70 leading-relaxed mb-6">
                Brabant ligt vol met &lsquo;vergeten&rsquo; hoekjes grond. Door
                juist deze kleine percelen aan elkaar te knopen, creëren we
                ecologische verbindingszones. Zo kunnen insecten en vogels zich
                makkelijker verplaatsen door de provincie.
              </p>
              <div className="flex gap-4 p-5 rounded-2xl bg-white/60">
                <div className="p-3 rounded-xl bg-forest/10 text-forest shrink-0">
                  <Link2 className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-forest mb-1">
                    Ecologische Verbindingszones
                  </h4>
                  <p className="text-forest/70 leading-relaxed">
                    Kleine percelen worden verbonden tot een groter netwerk van
                    natuurcorridors door heel Brabant.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 6: Circulaire Economie */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="flex items-center justify-center w-12 h-12 rounded-full bg-forest text-beige text-xl font-bold">
                6
              </span>
              <h2 className="text-sm font-bold tracking-widest text-earth uppercase">
                Zelfvoorzienend
              </h2>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold text-forest mb-6">
              Circulaire Economie
            </h3>
            <p className="text-lg text-forest/70 leading-relaxed max-w-2xl mx-auto">
              Ons voedselbos is geen museumstuk — het is een werkend systeem dat voedsel produceert, dieren redt en de opbrengst investeert in nog meer natuur.
            </p>
          </motion.div>

          {/* Circular flow visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto mb-16"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1: Groenten */}
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <Carrot className="h-10 w-10 text-green-600" />
                </div>
                <h4 className="text-xl font-bold text-forest mb-2">Groenten & Fruit</h4>
                <p className="text-forest/70 leading-relaxed">
                  Uit de zeven lagen van ons voedselbos oogsten we verse, chemievrije groenten, fruit en kruiden.
                </p>
              </div>

              {/* Step 2: Eieren */}
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
                  <Egg className="h-10 w-10 text-amber-600" />
                </div>
                <h4 className="text-xl font-bold text-forest mb-2">Eieren van Geredde Kippen</h4>
                <p className="text-forest/70 leading-relaxed">
                  Onze kippen zijn gered van de legbatterij. Ze leven vrij in het bos en legen eieren die we verkopen.
                </p>
              </div>

              {/* Step 3: Investering */}
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-forest/10 flex items-center justify-center mx-auto mb-4">
                  <Recycle className="h-10 w-10 text-forest" />
                </div>
                <h4 className="text-xl font-bold text-forest mb-2">Meer Natuur Maken</h4>
                <p className="text-forest/70 leading-relaxed">
                  De opbrengst van groenten en eieren gaat rechtstreeks naar het herstel van nieuwe stukjes natuur.
                </p>
              </div>
            </div>

            {/* Circular arrow indicator */}
            <div className="flex items-center justify-center mt-8">
              <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-forest/5 border border-forest/10">
                <Recycle className="h-5 w-5 text-forest" />
                <span className="text-forest font-medium text-sm">Elke euro verdient terug voor de natuur</span>
              </div>
            </div>
          </motion.div>

          {/* Extra info cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-8 rounded-3xl bg-beige/50"
            >
              <div className="flex items-center gap-3 mb-4">
                <Egg className="h-6 w-6 text-amber-600" />
                <h4 className="text-lg font-bold text-forest">Van Legbatterij naar Vrijheid</h4>
              </div>
              <p className="text-forest/70 leading-relaxed">
                Wij kopen kippen op die anders hun hele leven in een legbatterij zouden doorbrengen. Bij EarthGuard krijgen ze een natuurlijk leven: scharrelen tussen de bomen, stofbaden in de aarde en slapen op stokken in de open lucht. Hun eieren zijn niet alleen lekker — ze financieren ook het herstel van nieuwe natuurgebieden.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-8 rounded-3xl bg-beige/50"
            >
              <div className="flex items-center gap-3 mb-4">
                <Carrot className="h-6 w-6 text-green-600" />
                <h4 className="text-lg font-bold text-forest">Natuurlijk Voedsel, Natuurlijk Gebruik</h4>
              </div>
              <p className="text-forest/70 leading-relaxed">
                Het voedselbos produceert groenten, fruit en kruiden die we lokaal verkopen. Het lijkt misschien op landbouw, maar het is pure natuur: geen pesticiden, geen monocultuur, wel een bloeiend ecosysteem. De opbrengst? Die gaat terug de grond in — letterlijk — om nog meer biodiversiteit te creëren.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Belofte Section */}
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
            <h2 className="text-sm font-bold tracking-widest text-beige/60 uppercase mb-6">
              Onze Belofte
            </h2>
            <blockquote className="text-3xl md:text-4xl font-bold leading-relaxed mb-8 italic">
              &ldquo;Wij creëren geen parken om naar te kijken, maar levende
              systemen die zichzelf onderhouden en de wereld een stukje groener
              maken.&rdquo;
            </blockquote>
            <div className="w-16 h-1 bg-beige/30 mx-auto rounded-full mb-10" />
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
