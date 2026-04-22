"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Leaf, MapPin, Eye, Heart, Sprout, Bug, Sun, Recycle, Egg, Carrot } from "lucide-react";
import Link from "next/link";

export default function OverOnsPage() {
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
              <span>Over EarthGuard</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Wij herstellen <br />
              <span className="text-beige/80 italic">de balans in Brabant.</span>
            </h1>
          </motion.div>
        </div>
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-beige/20 blur-3xl" />
          <div className="absolute bottom-20 right-40 w-48 h-48 rounded-full bg-earth/30 blur-2xl" />
        </div>
      </section>

      {/* Missie Section */}
      <section className="py-24 bg-beige">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-sm font-bold tracking-widest text-earth uppercase mb-4">Onze Missie</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-forest mb-8 leading-tight">
                De missie van EarthGuard
              </h3>
              <div className="space-y-6 text-lg text-forest/80 leading-relaxed">
                <p>
                  Bij EarthGuard geloven we dat natuurherstel niet ingewikkeld hoeft te zijn. Terwijl de wereld praat over verre klimaatdoelen, steken wij de handen in de eigen provinciale klei. Onze missie is simpel: <strong className="text-forest">Biodiversiteit terugbrengen in heel Brabant, vierkante meter voor vierkante meter.</strong>
                </p>
                <p>
                  Wij transformeren vergeten &ldquo;overhoekjes&rdquo; en braakliggende percelen tussen de Brabantse steden en dorpen tot bloeiende Agroforestry. Plekken waar de bodem weer leeft, waar onze Kune Kune varkens de grond omwroeten en waar de natuur de ruimte krijgt om haar eigen balans te vinden. De groenten en eieren die het bos produceert verkopen we lokaal — en elke euro gaat terug naar het herstel van nog meer natuur.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square rounded-[3rem] bg-forest/10 flex items-center justify-center overflow-hidden">
                <div className="text-center p-12 space-y-6">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-forest/10">
                    <Sprout className="h-12 w-12 text-forest" />
                  </div>
                  <p className="text-2xl font-bold text-forest">Vierkante meter</p>
                  <p className="text-2xl font-bold text-forest">voor vierkante meter</p>
                  <p className="text-forest/60">Natuurherstel begint klein</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Waarom Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mb-16"
          >
            <h2 className="text-sm font-bold tracking-widest text-earth uppercase mb-4">Waarom</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-forest mb-6">
              Waarom we doen wat we doen
            </h3>
            <p className="text-lg text-forest/70 leading-relaxed">
              Onze provincie is prachtig, maar de natuur staat onder druk door versnippering. Met EarthGuard bouwen we een brug tussen moderne technologie en de authentieke Brabantse passie voor het land.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: MapPin,
                title: "Provinciale Impact",
                description: "Van de Peel tot de Biesbosch en alles daartussenin. We herstellen stukjes grond direct in jouw achtertuin.",
                color: "bg-forest/10 text-forest"
              },
              {
                icon: Eye,
                title: "Transparantie door Tech",
                description: "Dankzij onze Impact Tracker zie je precies wat jouw bijdrage doet voor de Brabantse natuur. Hoeveel m² is hersteld? Hoeveel CO2 slaan we op? Hoeveel dieren hebben een nieuw thuis?",
                color: "bg-blue-100 text-blue-600"
              },
              {
                icon: Heart,
                title: "Brabantse Gastvrijheid",
                description: "Wij geloven niet in hekken om de natuur. Wij bouwen aan een community die samen zaait, oogst en geniet van wat de grond ons geeft.",
                color: "bg-earth/10 text-earth"
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="p-8 rounded-3xl bg-beige/50 hover:bg-beige transition-colors group"
              >
                <div className={`p-4 rounded-2xl ${item.color} inline-block mb-6 group-hover:scale-110 transition-transform`}>
                  <item.icon className="h-6 w-6" />
                </div>
                <h4 className="text-xl font-bold text-forest mb-3">{item.title}</h4>
                <p className="text-forest/70 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Methode Section */}
      <section className="py-24 bg-beige">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-sm font-bold tracking-widest text-earth uppercase mb-4">De Bodem</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-forest mb-6 leading-tight">
                Natuurherstel met een hart
              </h3>
              <p className="text-lg text-forest/70 leading-relaxed mb-8">
                Agroforestry is meer dan een verzameling bomen. Het is een ecosysteem dat zichzelf in stand houdt en voedsel levert voor mens en dier. Door te investeren in EarthGuard, investeer je in:
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {[
                {
                  icon: Sprout,
                  title: "Bodemgezondheid",
                  description: "Onze wormen en schimmels zijn de hardste werkers in Brabantse dienst."
                },
                {
                  icon: Bug,
                  title: "Biodiversiteit",
                  description: "Van zeldzame insecten tot onze eigen scharrelende kippen — gered van de legbatterij en nu vrij in het bos."
                },
                {
                  icon: Recycle,
                  title: "Circulaire Economie",
                  description: "Groenten, eieren en fruit uit het bos verkopen we. De opbrengst investeren we direct in het maken van nog meer natuur."
                },
                {
                  icon: Sun,
                  title: "Toekomst",
                  description: "Een groen en veerkrachtig Brabant voor de volgende generatie — zelfvoorzienend en zelfherstellend."
                }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex gap-6 p-6 rounded-2xl bg-white/60 hover:bg-white transition-colors group"
                >
                  <div className="p-3 rounded-xl bg-forest/10 text-forest shrink-0 group-hover:scale-110 transition-transform">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-forest mb-1">{item.title}</h4>
                    <p className="text-forest/70 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
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
            <blockquote className="text-3xl md:text-4xl font-bold leading-relaxed mb-8 italic">
              &ldquo;Natuurherstel begint bij het besef dat we geen bezoekers zijn van de natuur, maar er onderdeel van uitmaken.&rdquo;
            </blockquote>
            <div className="w-16 h-1 bg-beige/30 mx-auto rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-beige">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-sm font-bold tracking-widest text-earth uppercase mb-4">Word ook een Guard</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-forest mb-6 leading-tight">
              Word ook een Guard
            </h3>
            <p className="text-lg text-forest/70 leading-relaxed mb-4">
              EarthGuard is een beweging van en voor Brabanders. Of je nu 1 m² adopteert of een heel perceel helpt inrichten: jij bent de bewaker van onze lokale wildernis.
            </p>
            <p className="text-xl font-semibold text-forest mb-10">
              Help je mee de Brabantse biodiversiteit te herstellen?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/adopteer">
                <Button size="lg" className="bg-forest text-beige hover:bg-forest/90 rounded-full text-lg px-10 h-14">
                  KOOP JE m²
                </Button>
              </Link>
              <Link href="/">
                <Button size="lg" variant="outline" className="border-forest text-forest bg-transparent hover:bg-forest hover:text-beige rounded-full text-lg px-10 h-14 transition-colors">
                  BEKIJK DE KAART
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
