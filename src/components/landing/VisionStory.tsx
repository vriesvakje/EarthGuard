"use client";

import { motion } from "framer-motion";
import { Leaf, TreePine, Droplets, Bird } from "lucide-react";

const pillars = [
  {
    icon: TreePine,
    title: "Agroforestry",
    description:
      "Bomen en gewassen samen op één stuk grond. Dit combinatiemodel herstelt de bodem, slaat CO2 op en creëert leefgebied voor dieren.",
  },
  {
    icon: Bird,
    title: "Biodiversiteit",
    description:
      "Van vergeten overhoekjes naar bruisende ecosystemen. Varkens en kippen helpen bij het bodemherstel, vogels keren terug naar het landschap.",
  },
  {
    icon: Droplets,
    title: "Bodemherstel",
    description:
      "Stikstofverzadigde landbouwgrond omzetten in gezonde, levende aarde. De basis van elk ecosysteem begint onder de grond.",
  },
  {
    icon: Leaf,
    title: "Lokale impact",
    description:
      "We beginnen in Noord-Brabant. Lokaal, meetbaar en transparant. Elk vierkante meter telt.",
  },
];

export function VisionStory() {
  return (
    <section className="py-24 bg-beige">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-bold tracking-widest text-earth uppercase mb-4">
              Onze Visie
            </h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-forest mb-6">
              De natuur kan zichzelf herstellen. <br />
              <span className="text-earth">Wij geven het de ruimte.</span>
            </h3>
            <p className="text-lg sm:text-xl opacity-80 leading-relaxed">
              In Brabant liggen stukken landbouwgrond die niet meer productief zijn.
              Verzadigd door stikstof, verstoken van leven. Earth Guard zet deze
              gronden om in agroforestry — waar bomen, gewassen en dieren samen een
              nieuw ecosysteem opbouwen.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white/60 rounded-2xl p-8 text-center hover:bg-white/80 transition-colors"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-forest/10 text-forest mb-6">
                <pillar.icon className="h-7 w-7" />
              </div>
              <h4 className="text-xl font-bold text-forest mb-3">{pillar.title}</h4>
              <p className="text-body opacity-75 leading-relaxed">{pillar.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 max-w-2xl mx-auto text-center"
        >
          <div className="bg-earth/10 border border-earth/20 rounded-2xl p-8">
            <p className="text-lg font-medium text-forest mb-2">
              We zijn nog niet operationeel
            </p>
            <p className="text-body opacity-80">
              Earth Guard bevindt zich in de opstartfase. We werken aan het
              verwerven van onze eerste kavel en het opzetten van het
              monitorsysteem. Wil je ons helpen? Word medestander.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
