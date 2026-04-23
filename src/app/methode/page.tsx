"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Leaf,
  Sun,
  ThermometerSun,
  Droplets,
  ArrowRight,
  Sprout,
  Heart,
} from "lucide-react";
import Link from "next/link";

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
              <span>De Bodem</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Waarom een groene akker <br />
              <span className="text-beige/80 italic">de bron van leven is</span>
            </h1>
            <p className="text-xl opacity-90 leading-relaxed max-w-2xl">
              Kijk eens naar de velden om je heen in Brabant. Vaak zie je
              maandenlang niets anders dan kale, bruine grond. Het ziet er
              misschien &ldquo;netjes&rdquo; uit, maar voor de natuur is een
              kale akker een woestijn.
            </p>
          </motion.div>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-beige/20 blur-3xl" />
          <div className="absolute bottom-20 right-40 w-48 h-48 rounded-full bg-earth/30 blur-2xl" />
        </div>
      </section>

      {/* Vóór en Na - Before/After Section */}
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
              Het verschil
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-forest mb-6">
              Vóór & Na
            </h3>
            <p className="text-lg text-forest/70 leading-relaxed max-w-2xl mx-auto">
              Het contrast tussen een uitgeputte akker en een hersteld stuk
              natuur zegt alles.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Before */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative group"
            >
              <div className="rounded-[2rem] overflow-hidden aspect-[4/3] relative">
                <Image
                  src="/drooge-akker.png"
                  alt="Kale, droge akker - uitgeput door gif"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span className="inline-flex items-center gap-2 bg-red-900/80 text-white px-4 py-2 rounded-full text-sm font-bold backdrop-blur-sm">
                    <span className="w-2 h-2 rounded-full bg-red-400" />
                    VÓÓR
                  </span>
                  <p className="text-white font-bold text-xl mt-3">
                    Uitgeput door gif
                  </p>
                  <p className="text-white/80 text-body mt-1">
                    Kale, gebarsten grond zonder leven
                  </p>
                </div>
              </div>
            </motion.div>

            {/* After */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative group"
            >
              <div className="rounded-[2rem] overflow-hidden aspect-[4/3] relative">
                <Image
                  src="/groene-akker.png"
                  alt="Groene akker met klaver, grassen en bloemen - hersteld door natuur"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span className="inline-flex items-center gap-2 bg-green-900/80 text-white px-4 py-2 rounded-full text-sm font-bold backdrop-blur-sm">
                    <span className="w-2 h-2 rounded-full bg-green-400" />
                    NA
                  </span>
                  <p className="text-white font-bold text-xl mt-3">
                    Hersteld door natuur
                  </p>
                  <p className="text-white/80 text-body mt-1">
                    Weelderige akker met klaver, grassen en bloemen
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section: De verborgen prijs van een "schone" akker */}
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
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-700 text-xl font-bold">
                  !
                </span>
                <h2 className="text-sm font-bold tracking-widest text-earth uppercase">
                  Het probleem
                </h2>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-forest mb-8 leading-tight">
                De verborgen prijs van een &ldquo;schone&rdquo; akker
              </h3>
              <p className="text-lg text-forest/70 leading-relaxed mb-8">
                Wanneer een akker grijs en kaal is, komt dat vaak doordat de
                bodem is bewerkt met zware bestrijdingsmiddelen en kunstmest.
                Dit gif doodt niet alleen het onkruid, maar ook de
                microscopische architecten van onze wereld: de schimmels,
                bacteriën en wormen die de grond gezond houden.
              </p>
              <div className="space-y-4">
                <div className="flex gap-4 p-5 rounded-2xl bg-white/60">
                  <div className="p-3 rounded-xl bg-red-100 text-red-600 shrink-0">
                    <Sprout className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-forest mb-1">
                      Geen water vasthouden
                    </h4>
                    <p className="text-body text-forest/70 leading-relaxed">
                      Zonder bodemleven kan de grond geen water vasthouden. Bij
                      zware regen spoelt de bovenlaag weg.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 p-5 rounded-2xl bg-white/60">
                  <div className="p-3 rounded-xl bg-red-100 text-red-600 shrink-0">
                    <Leaf className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-forest mb-1">
                      Geen koolstof opslag
                    </h4>
                    <p className="text-forest/70 leading-relaxed">
                      Een dode bodem slaat geen CO₂ op. Integendeel: hij stoot
                      het uit.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 p-5 rounded-2xl bg-white/60">
                  <div className="p-3 rounded-xl bg-red-100 text-red-600 shrink-0">
                    <Heart className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-forest mb-1">
                      Vatbaar voor erosie
                    </h4>
                    <p className="text-forest/70 leading-relaxed">
                      Een kale bodem is een bodem die langzaam sterft. Wind en
                      water nemen de vruchtbare laag mee.
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
              <div className="rounded-[3rem] overflow-hidden aspect-[4/3] relative">
                <Image
                  src="/drooge-akker.png"
                  alt="Kale, gebarsten akker - een bodem die sterft"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/40 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="text-white font-bold text-2xl mb-2">
                    Een kale bodem is een bodem die sterft
                  </p>
                  <p className="text-white/80 text-body">
                    Zonder schimmels, bacteriën en wormen verliest de grond zijn
                    levenskracht
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section: Waarom we terug moeten naar "Altijd Groen" */}
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
                <Sprout className="h-6 w-6" />
              </span>
              <h2 className="text-sm font-bold tracking-widest text-earth uppercase">
                De oplossing
              </h2>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold text-forest mb-6">
              Waarom we terug moeten naar &ldquo;Altijd Groen&rdquo;
            </h3>
            <p className="text-lg text-forest/70 leading-relaxed max-w-2xl mx-auto">
              In de natuur bestaat een kale bodem eigenlijk niet. De natuur
              probeert elk gaatje direct op te vullen met groen. En dat is
              cruciaal:
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Zonnepaneel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-8 rounded-3xl bg-beige/50 hover:bg-beige/80 transition-colors group"
            >
              <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Sun className="h-8 w-8 text-amber-600" />
              </div>
              <h4 className="text-xl font-bold text-forest mb-3">
                De bodem als zonnepaneel
              </h4>
              <p className="text-forest/70 leading-relaxed">
                Levende planten vangen zonlicht op en zetten dit om in suikers.
                Die suikers &ldquo;voeren&rdquo; ze aan het bodemleven via hun
                wortels. Een kale akker krijgt geen energie en verhongert
                letterlijk.
              </p>
            </motion.div>

            {/* Hitte bescherming */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-8 rounded-3xl bg-beige/50 hover:bg-beige/80 transition-colors group"
            >
              <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ThermometerSun className="h-8 w-8 text-red-500" />
              </div>
              <h4 className="text-xl font-bold text-forest mb-3">
                Bescherming tegen hitte
              </h4>
              <p className="text-forest/70 leading-relaxed">
                Een groene laag planten werkt als een natuurlijke airco. Op een
                hete zomerdag kan een kale bodem wel 60°C worden (waardoor al
                het leven sterft), terwijl een begroeide bodem koel blijft.
              </p>
            </motion.div>

            {/* Waterbeheer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-8 rounded-3xl bg-beige/50 hover:bg-beige/80 transition-colors group"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Droplets className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold text-forest mb-3">
                Waterbeheer
              </h4>
              <p className="text-forest/70 leading-relaxed">
                Een gezonde, begroeide bodem werkt als een spons. In plaats van
                dat de Brabantse akkers wegspoelen bij een regenbui, wordt het
                water vastgehouden voor droge tijden.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section: Onze missie - Van grijs naar levend groen */}
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
              <div className="rounded-[3rem] overflow-hidden aspect-[4/3] relative">
                <Image
                  src="/groene-akker.png"
                  alt="Herstelde groene akker vol leven"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/40 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="text-white font-bold text-2xl mb-2">
                    Levend ecosysteem
                  </p>
                  <p className="text-white/80 text-body">
                    CO₂-opslag en biodiversiteit hand in hand
                  </p>
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
                  <Sprout className="h-6 w-6" />
                </span>
                <h2 className="text-sm font-bold tracking-widest text-earth uppercase">
                  Onze missie
                </h2>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-forest mb-8 leading-tight">
                Van grijs naar levend groen
              </h3>
              <p className="text-lg text-forest/70 leading-relaxed mb-8">
                Bij EarthGuard geloven we dat een gezonde toekomst begint onder
                onze voeten. Wij beschermen stukken grond zodat ze niet langer
                worden uitgeput met gif, maar de kans krijgen om weer het hele
                jaar door groen te zijn.
              </p>
              <div className="p-6 rounded-2xl bg-forest/5 border border-forest/10 mb-6">
                <p className="text-forest leading-relaxed">
                  Door een vierkante meter te adopteren, help jij mee om de
                  &ldquo;naakte&rdquo; akkers weer te bedekken met leven. Zo
                  maken we van de Brabantse grond geen dode export-machine, maar
                  een levend ecosysteem dat CO₂ opslaat en de biodiversiteit
                  terugbrengt.
                </p>
              </div>
              <Link href="/adopteer">
                <Button
                  size="lg"
                  className="bg-forest text-beige hover:bg-forest/90 rounded-full text-lg px-8 h-14"
                >
                  ADOPTEER JE m²
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
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
              De huid van de aarde
            </h2>
            <blockquote className="text-3xl md:text-4xl font-bold leading-relaxed mb-8 italic">
              &ldquo;De bodem is niet alleen maar &lsquo;grond&rsquo;. Het is
              de huid van de aarde. Laten we die huid weer gezond maken.&rdquo;
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
