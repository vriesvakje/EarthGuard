"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import {
  Leaf,
  Users,
  HandHeart,
  ShoppingBasket,
  Calendar,
  Quote,
  Trophy,
  Mail,
  Camera,
  MessageCircle,
  MapPin,
  ArrowRight,
  Egg,
  Carrot,
  Apple,
  Clock,
  Star,
  Heart,
  Trees,
  Droplets,
  Squirrel,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import ContactForm from "@/components/forms/ContactForm";
import { supabase } from "@/lib/supabase";

// Icon lookup for dynamic data from Supabase
type LucideIcon = typeof Users;
const iconMap: Record<string, LucideIcon> = {
  Users, Leaf, Calendar, Heart, HandHeart, ShoppingBasket,
  Egg, Carrot, Apple, Trees, Droplets, Squirrel, Star, Trophy, Mail, MapPin,
};

const communityStats = [
  { label: "Actieve Guards", value: "0", icon: Users, color: "text-forest" },
  { label: "m² Geadopteerd", value: "0", icon: Leaf, color: "text-green-600" },
  { label: "Vrijwilligersdagen", value: "0", icon: Calendar, color: "text-blue-600" },
  { label: "Kippen Gered", value: "0", icon: Heart, color: "text-earth" },
];

const waysToJoin = [
  {
    icon: Leaf,
    title: "Adopteer m²",
    description:
      "Koop je eigen stukje natuur in Brabant. Vanaf €1 per m² ben je eigenaar van een levend stukje Agroforestry. Je ziet via je dashboard precies wat er op jouw grond groeit en leeft.",
    cta: "KOOP JE m²",
    href: "/adopteer",
    color: "bg-forest/10 text-forest",
  },
  {
    icon: HandHeart,
    title: "Kom Helpen",
    description:
      "Draag je handen uit de mouwen op onze vrijwilligersdagen. Plant bomen, help met de oogst, verzorg de dieren of bouw mee aan nieuwe infrastructuur. Iedereen kan meedoen!",
    cta: "BEKIJK AGENDA",
    href: "#activiteiten",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: ShoppingBasket,
    title: "Koop Lokaal",
    description:
      "Bestel eieren van onze geredde kippen, verse groenten en fruit uit de Agroforestry. Lokaal, chemievrij en 100% in dienst van de natuur. Elke euro gaat terug naar nieuw natuurherstel.",
    cta: "BEKIJK DE OOGST",
    href: "#oogst",
    color: "bg-amber-100 text-amber-700",
  },
];

const events = [
  {
    date: "Binnenkort",
    month: "2025",
    title: "Eerste Plantdag Brabant I",
    description:
      "Help ons de eerste bomen te planten op ons perceel in Tilburg. Geen ervaring nodig — we leggen alles uit.",
    location: "Tilburg, Project I",
    tag: "Planten",
  },
  {
    date: "Binnenkort",
    month: "2025",
    title: "Kippen Welkomstdag",
    description:
      "Onze eerste geredde kippen komen aan! Help mee hun nieuwe thuis in te richten en maak kennis met de bewoners.",
    location: "Tilburg, Project I",
    tag: "Dieren",
  },
  {
    date: "Binnenkort",
    month: "2025",
    title: "Oogst Festival",
    description:
      "Viervoudig het seizoen met de community. Proef de eerste oogst, ontmoet medeguards en geniet van live muziek in het bos.",
    location: "Tilburg, Project I",
    tag: "Feest",
  },
  {
    date: "Elke zaterdag",
    month: "2025",
    title: "Open Dag — Kom Kijken",
    description:
      "Elke zaterdag kun je langskomen om te zien hoe de Agroforestry zich ontwikkelt. Rondleiding om 11:00 en 14:00.",
    location: "Tilburg, Project I",
    tag: "Rondleiding",
  },
];

const stories = [
  {
    name: "De Eerste Guard",
    quote:
      "Ik adopteerde 10 m² omdat ik geloof dat verandering lokaal begint. Nu zie ik via mijn dashboard dat er al twee nieuwe vogelsoorten op mijn stukje grond zitten.",
    role: "Vroege adopter",
    initials: "EG",
  },
  {
    name: "De Vrijwilliger",
    quote:
      "Elke zaterdag sta ik met mijn handen in de aarde. Het is mijn therapie. En de kippen kennen me al — ze komen naar me toe gerend als ik aankom.",
    role: "Actieve vrijwilliger",
    initials: "DV",
  },
  {
    name: "De Buurvrouw",
    quote:
      "Ik woon naast het perceel. Vroeger was het een braak stuk grond. Nu hoor ik 's ochtends de vogels en zie ik de varkens scharrelen. Het heeft de hele buurt veranderd.",
    role: "Brabantse buurvrouw",
    initials: "DB",
  },
];

const harvestItems = [
  {
    icon: Egg,
    name: "Eieren van Geredde Kippen",
    description: "Onze kippen leven vrij in het bos. Scharreleieren met een verhaal — elke doos financiert nieuw natuurherstel.",
    available: "Jaarlijks",
    color: "bg-amber-100 text-amber-700",
  },
  {
    icon: Carrot,
    name: "Seizoensgroenten",
    description: "Chemievrije groenten uit de kruidlaag en bodembedekkers van onze Agroforestry. Wat het bos geeft, delen we.",
    available: "Lente t/m Herfst",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: Apple,
    name: "Fruit & Noten",
    description: "Appels, peren, walnoten en bessen uit de boom- en struiklaag. Lokaal, vers en vol smaak.",
    available: "Zomer t/m Winter",
    color: "bg-red-100 text-red-600",
  },
];

const leaderboard = [
  {
    category: "Meeste m²",
    icon: Leaf,
    entries: [
      { name: "Jij kunt hier staan!", value: "— m²" },
      { name: "Word de eerste Guard", value: "— m²" },
      { name: "Start je collectie", value: "— m²" },
    ],
  },
  {
    category: "Meest Actief",
    icon: Trophy,
    entries: [
      { name: "Kom helpen op het land", value: "— uren" },
      { name: "Schrijf je in voor een dag", value: "— uren" },
      { name: "Elke zaterdag open", value: "— uren" },
    ],
  },
  {
    category: "Langste Guard",
    icon: Star,
    entries: [
      { name: "We net begonnen!", value: "— dagen" },
      { name: "Word nu lid", value: "— dagen" },
      { name: "Vanaf het begin meedoen", value: "— dagen" },
    ],
  },
];

export default function CommunityPage() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const [subscribeError, setSubscribeError] = useState<string | null>(null);

  // Dynamic data from Supabase
  const [dynamicStats, setDynamicStats] = useState(communityStats);
  const [dynamicEvents, setDynamicEvents] = useState(events);
  const [dynamicStories, setDynamicStories] = useState(stories);
  const [dynamicHarvest, setDynamicHarvest] = useState(harvestItems);

  useEffect(() => {
    async function fetchDynamicData() {
      // Fetch community stats
      const { data: statsData } = await supabase
        .from("community_stats")
        .select("*")
        .order("sort_order", { ascending: true });
      if (statsData && statsData.length > 0) {
        setDynamicStats(
          statsData.map((s: { label: string; value: string; icon: string; color: string }) => ({
            label: s.label,
            value: s.value,
            icon: iconMap[s.icon] || Users,
            color: s.color,
          }))
        );
      }

      // Fetch events
      const { data: eventsData } = await supabase
        .from("events")
        .select("*")
        .eq("active", true)
        .order("sort_order", { ascending: true });
      if (eventsData && eventsData.length > 0) {
        setDynamicEvents(
          eventsData.map((e: { date: string; month: string; title: string; description: string; location: string; tag: string }) => ({
            date: e.date,
            month: e.month,
            title: e.title,
            description: e.description,
            location: e.location,
            tag: e.tag,
          }))
        );
      }

      // Fetch stories
      const { data: storiesData } = await supabase
        .from("stories")
        .select("*")
        .eq("active", true)
        .order("sort_order", { ascending: true });
      if (storiesData && storiesData.length > 0) {
        setDynamicStories(
          storiesData.map((s: { name: string; quote: string; role: string; initials: string }) => ({
            name: s.name,
            quote: s.quote,
            role: s.role,
            initials: s.initials,
          }))
        );
      }

      // Fetch harvest items
      const { data: harvestData } = await supabase
        .from("harvest_items")
        .select("*")
        .eq("active", true)
        .order("sort_order", { ascending: true });
      if (harvestData && harvestData.length > 0) {
        setDynamicHarvest(
          harvestData.map((h: { name: string; description: string; available: string; icon: string; color: string }) => ({
            icon: iconMap[h.icon] || Egg,
            name: h.name,
            description: h.description,
            available: h.available,
            color: h.color,
          }))
        );
      }
    }
    fetchDynamicData();
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubscribing(true);
    setSubscribeError(null);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Er is iets misgegaan");
      }

      setSubscribed(true);
      setEmail("");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Er is iets misgegaan";
      setSubscribeError(msg);
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <main className="min-h-screen">
      {/* Section 1: Hero */}
      <section className="relative py-24 bg-forest text-beige overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center space-x-2 bg-beige/10 px-4 py-2 rounded-full text-sm font-medium border border-beige/20 mb-8">
              <Users className="h-4 w-4" />
              <span>Community</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Samen Sterker. <br />
              <span className="text-beige/80 italic">Samen een beweging.</span>
            </h1>
            <p className="text-xl opacity-90 leading-relaxed max-w-2xl mb-10">
              Eén Guard is een begin. Samen zijn we een beweging. Sluit je aan bij Brabanders die de handen uit de mouwen steken, de natuur een handje helpen en samen genieten van wat de grond ons geeft.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/adopteer">
                <Button size="lg" className="bg-beige text-forest hover:bg-beige/90 rounded-full text-lg px-10 h-14">
                  WORD EEN GUARD
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="#activiteiten">
                <Button size="lg" variant="outline" className="border-beige text-beige bg-transparent hover:bg-beige hover:text-forest rounded-full text-lg px-10 h-14 transition-colors">
                  KOM HELPEN
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-beige/20 blur-3xl" />
          <div className="absolute bottom-20 right-40 w-48 h-48 rounded-full bg-earth/30 blur-2xl" />
        </div>
      </section>

      {/* Section 2: Guards in Cijfers */}
      <section className="py-24 bg-beige">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-sm font-bold tracking-widest text-earth uppercase mb-4">
              Community Impact
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-forest mb-4">
              Guards in Cijfers
            </h3>
            <p className="text-lg text-forest/70 max-w-xl mx-auto">
              Onze community groeit. Elke Guard, elke m² en elke vrijwilligersdag maakt het verschil.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {dynamicStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-none shadow-xl bg-white/50 backdrop-blur-sm hover:bg-white transition-colors text-center">
                  <CardContent className="p-8">
                    <div className="p-3 rounded-2xl bg-beige inline-block mb-4">
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <p className="text-4xl font-bold text-forest mb-1">{stat.value}</p>
                    <p className="text-sm font-medium text-forest/60">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Kom in Actie */}
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
              Mee Doen
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-forest mb-4">
              Kom in Actie
            </h3>
            <p className="text-lg text-forest/70 max-w-xl mx-auto">
              Er zijn veel manieren om deel te worden van de EarthGuard beweging. Welke past bij jou?
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {waysToJoin.map((item, index) => (
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
                <h4 className="text-2xl font-bold text-forest mb-3">{item.title}</h4>
                <p className="text-forest/70 leading-relaxed mb-6">{item.description}</p>
                <Link href={item.href}>
                  <Button className="bg-forest text-beige hover:bg-forest/90 rounded-full px-8 h-12">
                    {item.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Activiteitenkalender */}
      <section id="activiteiten" className="py-24 bg-beige">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-sm font-bold tracking-widest text-earth uppercase mb-4">
              Agenda
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-forest mb-4">
              Activiteitenkalender
            </h3>
            <p className="text-lg text-forest/70 max-w-xl mx-auto">
              Kom langs, help mee of vier met ons. Hier vind je alle aankomende activiteiten.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {dynamicEvents.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-none shadow-lg bg-white/70 hover:bg-white transition-colors overflow-hidden group">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-forest/10 flex flex-col items-center justify-center">
                          <Calendar className="h-6 w-6 text-forest mb-1" />
                          <span className="text-[10px] font-bold text-forest uppercase">Binnenkort</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-bold tracking-wider uppercase px-2 py-1 rounded-full bg-forest/10 text-forest">
                            {event.tag}
                          </span>
                        </div>
                        <h4 className="text-lg font-bold text-forest mb-1">{event.title}</h4>
                        <p className="text-sm text-forest/60 leading-relaxed mb-3">{event.description}</p>
                        <div className="flex items-center gap-1 text-sm text-forest/50">
                          <MapPin className="h-3 w-3" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Verhalen uit het Bos */}
      <section className="py-24 bg-forest text-beige">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-sm font-bold tracking-widest text-beige/60 uppercase mb-4">
              Verhalen
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-4">
              Verhalen uit het Bos
            </h3>
            <p className="text-lg opacity-70 max-w-xl mx-auto">
              Elke Guard heeft een verhaal. Dit zijn de mensen die de Brabantse natuur weer tot leven brengen.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {dynamicStories.map((story, index) => (
              <motion.div
                key={story.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="p-8 rounded-3xl bg-beige/10 border border-beige/10 hover:bg-beige/15 transition-colors"
              >
                <Quote className="h-8 w-8 mb-4 opacity-30" />
                <p className="text-beige/90 leading-relaxed mb-6 italic">
                  &ldquo;{story.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-beige/20 flex items-center justify-center text-sm font-bold">
                    {story.initials}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{story.name}</p>
                    <p className="text-xs opacity-60">{story.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: De Oogst */}
      <section id="oogst" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-sm font-bold tracking-widest text-earth uppercase mb-4">
              Lokaal & Circulair
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-forest mb-4">
              De Oogst
            </h3>
            <p className="text-lg text-forest/70 max-w-xl mx-auto">
              Wat de Agroforestry produceert, delen we met de community. Lokaal, vers en 100% in dienst van de natuur.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {dynamicHarvest.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="p-8 rounded-3xl bg-beige/50 hover:bg-beige transition-colors group text-center"
              >
                <div className={`p-4 rounded-2xl ${item.color} inline-block mb-6 group-hover:scale-110 transition-transform`}>
                  <item.icon className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-bold text-forest mb-3">{item.name}</h4>
                <p className="text-forest/70 leading-relaxed mb-4">{item.description}</p>
                <div className="flex items-center justify-center gap-1 text-sm text-forest/50">
                  <Clock className="h-3 w-3" />
                  <span>{item.available}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <p className="text-forest/50 text-sm italic mb-4">
              De opbrengst van alle producten gaat rechtstreeks naar het herstel van nieuwe natuurgebieden.
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-forest/5 border border-forest/10">
              <Leaf className="h-4 w-4 text-forest" />
              <span className="text-forest font-medium text-sm">Elke euro verdient terug voor de natuur</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 7: Leaderboard */}
      <section className="py-24 bg-beige">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-sm font-bold tracking-widest text-earth uppercase mb-4">
              Leaderboard
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-forest mb-4">
              Community Borden
            </h3>
            <p className="text-lg text-forest/70 max-w-xl mx-auto">
              Wie loopt voorop? Word de eerste Guard en schrijf je naam in de geschiedenis van Brabants natuurherstel.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {leaderboard.map((board, index) => (
              <motion.div
                key={board.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <Card className="border-none shadow-lg bg-white/70 overflow-hidden">
                  <div className="p-6 bg-forest/5 text-center">
                    <board.icon className="h-8 w-8 text-forest mx-auto mb-2" />
                    <h4 className="text-lg font-bold text-forest">{board.category}</h4>
                  </div>
                  <CardContent className="p-0">
                    {board.entries.map((entry, i) => (
                      <div
                        key={i}
                        className={`flex items-center justify-between px-6 py-4 ${
                          i < board.entries.length - 1 ? "border-b border-forest/5" : ""
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            i === 0 ? "bg-forest text-beige" : "bg-forest/10 text-forest"
                          }`}>
                            {i + 1}
                          </span>
                          <span className="text-sm font-medium text-forest">{entry.name}</span>
                        </div>
                        <span className="text-sm text-forest/50 font-mono">{entry.value}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8: Nieuwsbrief */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="p-12 rounded-[3rem] bg-forest text-beige">
              <Mail className="h-10 w-10 mx-auto mb-6 opacity-40" />
              <h2 className="text-sm font-bold tracking-widest text-beige/60 uppercase mb-4">
                Nieuwsbrief
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Blijf op de hoogte
              </h3>
              <p className="text-lg opacity-80 mb-8 max-w-lg mx-auto">
                Ontvang updates over wat er groeit, bloeit en leeft in de Brabantse Agroforestry. Maximaal 1x per maand — geen spam, alleen natuur.
              </p>
              {subscribed ? (
                <div className="p-4 rounded-2xl bg-beige/10 border border-beige/20">
                  <p className="font-medium">✨ Bedankt! Je bent nu ingeschreven voor de EarthGuard nieuwsbrief.</p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <Input
                    type="email"
                    placeholder="jouw@email.nl"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={subscribing}
                    className="bg-beige/10 border-beige/20 text-beige placeholder:text-beige/40 rounded-full h-12 px-6 focus:border-beige"
                  />
                  <Button
                    type="submit"
                    disabled={subscribing}
                    className="bg-beige text-forest hover:bg-beige/90 rounded-full h-12 px-8 shrink-0"
                  >
                    {subscribing ? "..." : "AANMELDEN"}
                  </Button>
                </form>
              )}
              {subscribeError && (
                <p className="mt-3 text-sm text-red-300">{subscribeError}</p>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 9: Socials & Contact */}
      <section className="py-24 bg-beige">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-sm font-bold tracking-widest text-earth uppercase mb-4">
              Volg & Contact
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-forest mb-4">
              Socials & Contact
            </h3>
            <p className="text-lg text-forest/70 max-w-xl mx-auto">
              Volg ons voor dagelijkse updates, kom langs op zaterdag of stuur een berichtje.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
            <motion.a
              href="https://instagram.com/earthguard"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
              className="p-8 rounded-3xl bg-white/70 hover:bg-white transition-colors group text-center cursor-pointer"
            >
              <div className="p-4 rounded-2xl bg-pink-100 text-pink-600 inline-block mb-4 group-hover:scale-110 transition-transform">
                <Camera className="h-8 w-8" />
              </div>
              <h4 className="text-xl font-bold text-forest mb-2">Instagram</h4>
              <p className="text-forest/60">@earthguard</p>
              <p className="text-sm text-forest/50 mt-2">Dagelijkse updates uit de Agroforestry</p>
            </motion.a>

            <motion.a
              href="https://facebook.com/earthguard"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-3xl bg-white/70 hover:bg-white transition-colors group text-center cursor-pointer"
            >
              <div className="p-4 rounded-2xl bg-blue-100 text-blue-600 inline-block mb-4 group-hover:scale-110 transition-transform">
                <MessageCircle className="h-8 w-8" />
              </div>
              <h4 className="text-xl font-bold text-forest mb-2">WhatsApp Groep</h4>
              <p className="text-forest/60">EarthGuard Community</p>
              <p className="text-sm text-forest/50 mt-2">Direct contact met medeguards</p>
            </motion.a>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 rounded-3xl bg-white/70 hover:bg-white transition-colors group text-center"
            >
              <div className="p-4 rounded-2xl bg-forest/10 text-forest inline-block mb-4 group-hover:scale-110 transition-transform">
                <MapPin className="h-8 w-8" />
              </div>
              <h4 className="text-xl font-bold text-forest mb-2">Kom Langs</h4>
              <p className="text-forest/60">Elke zaterdag open</p>
              <p className="text-sm text-forest/50 mt-2">Tilburg, Project I — 11:00 & 14:00</p>
            </motion.div>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto mb-16">
            <ContactForm />
          </div>

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-xl font-semibold text-forest mb-6">
              Help je mee de Brabantse biodiversiteit te herstellen?
            </p>
            <Link href="/adopteer">
              <Button size="lg" className="bg-forest text-beige hover:bg-forest/90 rounded-full text-lg px-10 h-14">
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
