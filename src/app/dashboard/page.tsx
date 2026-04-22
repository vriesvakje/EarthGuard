"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trees, Map as MapIcon, Calendar, ArrowUpRight, Squirrel, Droplets, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/browser";

type Order = {
  id: string;
  meters: number;
  extra_donation: string | null;
  amount_total: number;
  created_at: string;
  payment_status: string;
};

const staticUpdates = [
  {
    id: 1,
    title: "Nieuwe boom geplant!",
    description: "Er is vandaag een nieuwe walnootboom geplant op jouw stukje grond.",
    date: "Vandaag, 10:30",
    icon: Trees,
    color: "bg-green-100 text-green-600"
  },
  {
    id: 2,
    title: "Vogelnestkastje geplaatst",
    description: "Een pimpelmees heeft zijn intrek genomen in een nieuw nestkastje nabij jouw m².",
    date: "Gisteren",
    icon: Squirrel,
    color: "bg-orange-100 text-orange-600"
  },
  {
    id: 3,
    title: "Bodemherstel update",
    description: "De stikstofwaarden in de bodem zijn met 15% gedaald sinds de start.",
    date: "3 dagen geleden",
    icon: ArrowUpRight,
    color: "bg-blue-100 text-blue-600"
  }
];

export default function DashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalMeters, setTotalMeters] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    async function fetchOrders() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (data && data.length > 0) {
        setOrders(data);
        const meters = data.reduce((sum: number, o: Order) => sum + o.meters, 0);
        const spent = data.reduce((sum: number, o: Order) => sum + o.amount_total, 0);
        setTotalMeters(meters);
        setTotalSpent(spent);
      }
    }
    fetchOrders();
  }, []);

  // Calculate level based on total meters
  const level = totalMeters === 0 ? 1 : totalMeters < 10 ? 2 : totalMeters < 25 ? 3 : totalMeters < 50 ? 4 : 5;
  const levelNames: Record<number, string> = {
    1: "Beginner",
    2: "Zaaijer",
    3: "Boswachter in spé",
    4: "Boswachter",
    5: "Natuurbeschermer",
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-3xl font-bold text-forest">Welkom terug, Natuurbeschermer!</h1>
          <p className="opacity-60">Hier is een overzicht van jouw persoonlijke impact.</p>
        </div>
        <div className="flex gap-4">
          <Badge className="bg-forest/10 text-forest hover:bg-forest/10 border-none px-4 py-2 rounded-full font-bold">
            Level {level}: {levelNames[level]}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Stats & Map */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "Mijn m²", value: totalMeters > 0 ? String(totalMeters) : "0", icon: MapIcon },
              { label: "Bomen geplant", value: totalMeters > 0 ? String(Math.floor(totalMeters / 3)) : "0", icon: Trees },
              { label: "Totaal bijgedragen", value: totalSpent > 0 ? `€${(totalSpent / 100).toFixed(0)}` : "€0", icon: ArrowUpRight },
            ].map((stat, i) => (
              <Card key={i} className="border-none shadow-lg bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-beige text-forest">
                      <stat.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase opacity-40">{stat.label}</p>
                      <p className="text-2xl font-bold text-forest">{stat.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order History */}
          <Card className="border-none shadow-xl bg-white overflow-hidden rounded-[2rem]">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-forest" />
                Mijn Bestellingen
              </CardTitle>
              <Link href="/adopteer">
                <Button variant="ghost" size="sm" className="text-forest font-bold">
                  ADOPTEER MEER <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {orders.length === 0 ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-beige flex items-center justify-center mx-auto">
                    <Trees className="h-8 w-8 text-forest/40" />
                  </div>
                  <p className="opacity-60">Je hebt nog geen m² geadopteerd.</p>
                  <Link href="/adopteer">
                    <Button className="bg-forest text-beige rounded-2xl font-bold">
                      Adopteer je eerste m²
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 rounded-xl bg-beige/50 hover:bg-beige transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-forest/10 text-forest">
                          {order.extra_donation === "vijver" ? (
                            <Droplets className="h-5 w-5" />
                          ) : order.extra_donation === "dieren" ? (
                            <Squirrel className="h-5 w-5" />
                          ) : (
                            <Trees className="h-5 w-5" />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-forest">{order.meters}m² Biodivers Agroforestry</p>
                          <p className="text-xs opacity-50">
                            {new Date(order.created_at).toLocaleDateString("nl-NL", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                            {order.extra_donation && order.extra_donation !== "none" && (
                              <span> · Extra: {order.extra_donation === "vijver" ? "De Vijver" : "De Dieren"}</span>
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-forest">€{(order.amount_total / 100).toFixed(2)}</p>
                        <p className="text-xs text-green-600 font-bold">✓ Betaald</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Map Card */}
          <Card className="border-none shadow-xl bg-white overflow-hidden rounded-[2rem]">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl">Mijn Digitale Kaart</CardTitle>
              <Link href="/kaart">
                <Button variant="ghost" size="sm" className="text-forest font-bold">
                  OPEN KAART <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              <div className="aspect-video relative bg-beige">
                {/* Visual representation of adopted grid */}
                <div className="absolute inset-0 grid grid-cols-12 grid-rows-8 opacity-20">
                  {Array.from({ length: 96 }).map((_, i) => (
                    <div key={i} className="border-[0.5px] border-forest/30"></div>
                  ))}
                </div>
                {/* Highlighted adopted area */}
                {totalMeters > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-[40%] left-[30%] w-[15%] h-[20%] bg-forest/40 rounded-lg border-2 border-forest flex items-center justify-center"
                  >
                    <span className="text-[10px] font-black text-forest">MIJN m²</span>
                  </motion.div>
                )}
                <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-lg border border-white text-[10px] font-bold">
                  PROJECT TILBURG I - PERCEEL 42
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Timeline */}
        <div className="space-y-8">
          <Card className="border-none shadow-xl bg-white rounded-[2rem] h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-forest" />
                Impact Tijdlijn
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {staticUpdates.map((update, i) => (
                <div key={update.id} className="relative flex gap-4">
                  {i !== staticUpdates.length - 1 && (
                    <div className="absolute left-6 top-10 bottom-[-32px] w-[2px] bg-beige" />
                  )}
                  <div className={`z-10 w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${update.color}`}>
                    <update.icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1 pt-1">
                    <p className="text-xs font-bold opacity-40 uppercase">{update.date}</p>
                    <h4 className="font-bold text-forest leading-tight">{update.title}</h4>
                    <p className="text-sm opacity-70 leading-relaxed">{update.description}</p>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full rounded-xl border-forest/10 text-forest font-bold mt-4">
                BEKIJK ALLE UPDATES
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
