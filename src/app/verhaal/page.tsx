"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trees, Heart, Sprout, ArrowRight, Quote, Sun, Droplets } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function VerhaalPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 md:py-32 bg-forest text-beige overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-beige/20 blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 rounded-full bg-beige/10 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div {...fadeIn} className="max-w-3xl">
            <span className="text-sm uppercase tracking-widest font-bold opacity-60 mb-4 block">Ons Verhaal</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 leading-tight">
              Van een idee tot<br />een beweging
            </h1>
            <p className="text-lg md:text-xl opacity-80 leading-relaxed max-w-2xl">
              EarthGuard begon met een simpele vraag: wat als we landbouwgrond niet alleen gebruiken om voedsel te verbouwen, maar ook om natuur terug te geven?
            </p>
          </motion.div>
        </div>
      </section>

      {/* Chapter 1: Het Begin */}
      <section className="py-24 bg-beige">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeIn}>
              <span className="text-sm uppercase tracking-widest font-bold text-forest/40 mb-4 block">Hoofdstuk 1</span>
              <h2 className="text-3xl md:text-4xl font-black text-forest mb-6">Het begin</h2>
              <div className="space-y-4 text-forest/80 leading-relaxed">
                <p>
                  Alles begon in Brabant, op een stuk landbouwgrond dat al jaren werd gebruikt voor intensieve landbouw. De bodem was uitgeput, de biodiversiteit verdwenen, en het land was niet meer dan een productiemachine.
                </p>
                <p>
                  We zagen wat er mis was — en we zagen wat er mogelijk was. Wat als we deze grond niet alleen zouden herstellen, maar er een volledig ecosysteem van zouden maken? Een plek waar voedsel groeit én natuur floreert?
                </p>
                <p>
                  Dat was het moment waarop EarthGuard geboren werd. Niet als bedrijf, maar als een roeping. Een missie om de aarde terug te geven wat haar toebehoort.
                </p>
              </div>
            </motion.div>
            <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
              <div className="relative rounded-[3rem] overflow-hidden aspect-[4/3] bg-forest/5">
                <Image
                  src="/achtergrond.png"
                  alt="EarthGuard begin"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Chapter 2: De Ontdekking */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeIn} className="order-2 lg:order-1">
              <div className="relative rounded-[3rem] overflow-hidden aspect-[4/3] bg-forest/5 p-8">
                <Image
                  src="/g1.svg"
                  alt="Bodemgezondheid"
                  fill
                  className="object-contain p-8"
                />
              </div>
            </motion.div>
            <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="order-1 lg:order-2">
              <span className="text-sm uppercase tracking-widest font-bold text-forest/40 mb-4 block">Hoofdstuk 2</span>
              <h2 className="text-3xl md:text-4xl font-black text-forest mb-6">De ontdekking</h2>
              <div className="space-y-4 text-forest/80 leading-relaxed">
                <p>
                  We doken in de wetenschap van bodemgezondheid en ontdekten iets opwindends: gezonde bodem is de sleutel tot alles. Een bodem die leeft — vol schimmels, bacteriën en organisch materiaal — kan veel meer CO2 opslaan, water vasthouden, en voedsel produceren dan een uitgeputte bodem.
                </p>
                <p>
                  We leerden over de zeven lagen van Agroforestry: van de wortellaag tot de bladerkruin, elke laag heeft een functie. Samen vormen ze een zelfdragend ecosysteem dat steeds sterker wordt.
                </p>
                <p>
                  En we ontdekten de kracht van de circulaire economie: groenten verbouwen, kippen redden van de legbatterij, eieren verkopen, en de opbrengst investeren in meer natuur. Een keten van goedheid die zichzelf versterkt.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Chapter 3: De Eerste Stappen */}
      <section className="py-24 bg-beige">
        <div className="container mx-auto px-4">
          <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm uppercase tracking-widest font-bold text-forest/40 mb-4 block">Hoofdstuk 3</span>
            <h2 className="text-3xl md:text-4xl font-black text-forest mb-6">De eerste stappen</h2>
            <p className="text-forest/80 leading-relaxed">
              Van theorie naar praktijk. We begonnen met Brabant I — ons eerste project in Tilburg. Elke vierkante meter die werd geadopteerd, werd omgezet in echte Agroforestry.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Sprout,
                title: "Zaaien",
                description: "We begonnen met de bodem. Compost, mulch, en bodemverbeteraars brachten het leven terug in de aarde.",
                color: "bg-green-100 text-green-600",
              },
              {
                icon: Droplets,
                title: "Water vangen",
                description: "Vijvers en swales vingen regenwater op. Het water bleef in de grond in plaats van weg te stromen.",
                color: "bg-blue-100 text-blue-600",
              },
              {
                icon: Sun,
                title: "Laten groeien",
                description: "Bomen, struiken en kruiden werden geplant. Laag na laag ontstond er een Agroforestry.",
                color: "bg-amber-100 text-amber-600",
              },
            ].map((step, index) => (
              <motion.div key={index} {...fadeIn} transition={{ delay: index * 0.15 }}>
                <Card className="border-none shadow-xl bg-white h-full rounded-[2rem]">
                  <CardContent className="p-8 space-y-4">
                    <div className={`w-14 h-14 rounded-2xl ${step.color} flex items-center justify-center`}>
                      <step.icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-xl font-bold text-forest">{step.title}</h3>
                    <p className="text-forest/70 leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Chapter 4: De Kippen */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeIn}>
              <span className="text-sm uppercase tracking-widest font-bold text-forest/40 mb-4 block">Hoofdstuk 4</span>
              <h2 className="text-3xl md:text-4xl font-black text-forest mb-6">De kippen die ons verhaal veranderden</h2>
              <div className="space-y-4 text-forest/80 leading-relaxed">
                <p>
                  Op een dag bezochten we een legbatterij. Kippen die nooit de zon hadden gezien, nooit in het gras hadden gekrabd, nooit stof hadden gebaad. Het brak ons hart.
                </p>
                <p>
                  We namen een aantal van deze kippen mee naar ons project. En wat er gebeurde was magisch: de kippen maakten zich schoon in het stof, pikten insecten uit de grond, en legden eieren alsof ze nooit anders hadden gedaan.
                </p>
                <p>
                  Die eieren verkopen we nu. De opbrengst gaat rechtstreeks naar het herstellen van meer natuur. Zo ontstond onze circulaire economie: groenten, eieren, en natuur — een keten die zichzelf versterkt.
                </p>
              </div>
            </motion.div>
            <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
              <div className="relative rounded-[3rem] overflow-hidden aspect-[4/3] bg-forest/5">
                <Image
                  src="/koe-kip-en-varken.svg"
                  alt="Geredde kippen"
                  fill
                  className="object-contain p-8"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-24 bg-forest text-beige">
        <div className="container mx-auto px-4">
          <motion.div {...fadeIn} className="max-w-3xl mx-auto text-center">
            <Quote className="h-12 w-12 mx-auto mb-8 opacity-30" />
            <blockquote className="text-3xl md:text-4xl font-bold leading-relaxed mb-8 italic">
              &ldquo;We zijn niet hier om de wereld te redden. We zijn hier om te laten zien dat het anders kan.&rdquo;
            </blockquote>
            <p className="text-beige/60 font-bold">— Het EarthGuard Team</p>
          </motion.div>
        </div>
      </section>

      {/* Chapter 5: De Community */}
      <section className="py-24 bg-beige">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeIn} className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { number: "18+", label: "Maanden actief" },
                  { number: "3", label: "Projecten gestart" },
                  { number: "100+", label: "M² hersteld" },
                  { number: "∞", label: "Droom voor de toekomst" },
                ].map((stat, i) => (
                  <Card key={i} className="border-none shadow-lg bg-white rounded-2xl">
                    <CardContent className="p-6 text-center">
                      <p className="text-3xl font-black text-forest">{stat.number}</p>
                      <p className="text-xs font-bold uppercase opacity-40 mt-1">{stat.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
            <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="order-1 lg:order-2">
              <span className="text-sm uppercase tracking-widest font-bold text-forest/40 mb-4 block">Hoofdstuk 5</span>
              <h2 className="text-3xl md:text-4xl font-black text-forest mb-6">De community die het mogelijk maakt</h2>
              <div className="space-y-4 text-forest/80 leading-relaxed">
                <p>
                  EarthGuard is geen eenmanszaak. Het is een beweging. Mensen die m² adopteren, vrijwilligers die helpen planten, en donateurs die geloven in een betere toekomst.
                </p>
                <p>
                  Elke vierkante meter die wordt geadopteerd, is een stap naar herstel. Elke euro die wordt bijgedragen, wordt omgezet in echte natuur. En elke hand die helpt, maakt het verschil.
                </p>
                <p>
                  Samen bouwen we aan een wereld waar landbouw en natuur niet tegenover elkaar staan, maar samenwerken. Waar voedsel verbouwen betekent: de aarde gezonder achterlaten dan je haar aantrof.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Chapter 6: De Toekomst */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm uppercase tracking-widest font-bold text-forest/40 mb-4 block">Hoofdstuk 6</span>
            <h2 className="text-3xl md:text-4xl font-black text-forest mb-6">De toekomst</h2>
            <p className="text-forest/80 leading-relaxed">
              Dit is pas het begin. We dromen van Agroforestry door heel Brabant — en daarna heel Nederland. Van elke boer die overstapt naar regeneratieve landbouw. Van een wereld waar natuur geen uitzondering is, maar de norm.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: Trees,
                title: "Meer projecten",
                description: "Brabant II, III en verder. Elk nieuw project herstelt meer natuur en bouwt meer Agroforestry.",
              },
              {
                icon: Heart,
                title: "Meer community",
                description: "Meer mensen die meedoen, meehelpen, en meedelen. EarthGuard groeit met elke guard die zich aansluit.",
              },
            ].map((item, index) => (
              <motion.div key={index} {...fadeIn} transition={{ delay: index * 0.15 }}>
                <Card className="border-none shadow-xl bg-forest text-beige rounded-[2rem] h-full">
                  <CardContent className="p-8 space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-beige/20 flex items-center justify-center">
                      <item.icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <p className="opacity-80 leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-beige">
        <div className="container mx-auto px-4">
          <motion.div {...fadeIn} className="text-center max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-black text-forest">Word deel van het verhaal</h2>
            <p className="text-forest/70 leading-relaxed">
              Elk verhaal heeft hoofdpersoon nodig. Dat ben jij. Adopteer je eerste m² en schrijf mee aan de toekomst van onze aarde.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/adopteer">
                <Button className="bg-forest text-beige rounded-2xl h-14 px-8 text-lg font-bold shadow-lg hover:shadow-xl transition-all">
                  Adopteer je m² <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/community">
                <Button variant="outline" className="rounded-2xl h-14 px-8 text-lg font-bold border-forest text-forest">
                  Sluit je aan bij de community
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
