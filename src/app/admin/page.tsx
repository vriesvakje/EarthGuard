import { createAdminClient } from "@/lib/supabase/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ShoppingBag,
  Mail,
  Leaf,
  Target,
  Users,
  Calendar,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminOverview() {
  const supabase = createAdminClient();

  // Fetch all stats in parallel
  const [ordersRes, subscribersRes, crowdfundingRes, eventsRes, impactRes] =
    await Promise.all([
      supabase.from("orders").select("amount_total, meters"),
      supabase.from("newsletter_subscribers").select("id"),
      supabase.from("crowdfunding").select("*").limit(1).single(),
      supabase.from("events").select("id").eq("active", true),
      supabase.from("impact").select("*").order("id", { ascending: false }).limit(1),
    ]);

  const orders = ordersRes.data ?? [];
  const subscribers = subscribersRes.data ?? [];
  const crowdfunding = crowdfundingRes.data;
  const activeEvents = eventsRes.data ?? [];
  const impact = impactRes.data?.[0];

  const totalRevenue = orders.reduce((sum, o) => sum + o.amount_total, 0);
  const totalMeters = orders.reduce((sum, o) => sum + o.meters, 0);
  const totalOrders = orders.length;

  const stats = [
    {
      title: "Totale Omzet",
      value: `€${(totalRevenue / 100).toLocaleString("nl-NL")}`,
      icon: TrendingUp,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "Bestellingen",
      value: totalOrders.toString(),
      icon: ShoppingBag,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "m² Geadopteerd",
      value: totalMeters.toLocaleString("nl-NL"),
      icon: Leaf,
      color: "text-forest",
      bg: "bg-green-50",
    },
    {
      title: "Nieuwsbrief",
      value: subscribers.length.toString(),
      icon: Mail,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      title: "Crowdfunding",
      value: crowdfunding
        ? `€${crowdfunding.current.toLocaleString("nl-NL")} / €${crowdfunding.target.toLocaleString("nl-NL")}`
        : "—",
      icon: Target,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      title: "Actieve Events",
      value: activeEvents.length.toString(),
      icon: Calendar,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
  ];

  const impactStats = impact
    ? [
        { label: "Herstelde m²", value: impact.m2 ?? 0 },
        { label: "Bomen", value: impact.trees ?? 0 },
        { label: "CO2-opslag (t)", value: impact.co2 ?? 0 },
        { label: "Dieren", value: impact.animals ?? 0 },
      ]
    : [];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Overzicht van je EarthGuard platform
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Impact Stats */}
      {impactStats.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-forest" />
              Impact Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {impactStats.map((s) => (
                <div key={s.label} className="text-center p-4 bg-gray-50 rounded-xl">
                  <p className="text-2xl font-bold text-forest">
                    {s.value.toLocaleString("nl-NL")}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link
                href="/admin/impact"
                className="text-sm text-forest font-medium hover:underline"
              >
                Impact stats bewerken →
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { href: "/admin/events", label: "Events beheren", icon: Calendar, desc: "Maak en beheer evenementen" },
          { href: "/admin/crowdfunding", label: "Crowdfunding bijwerken", icon: Target, desc: "Update voortgang en doel" },
          { href: "/admin/projects", label: "Projecten beheren", icon: Users, desc: "Beheer projecten en status" },
          { href: "/admin/newsletter", label: "Nieuwsbrief abonnees", icon: Mail, desc: "Bekijk ingeschreven emails" },
          { href: "/admin/orders", label: "Bestellingen bekijken", icon: ShoppingBag, desc: "Alle transacties" },
          { href: "/admin/updates", label: "Updates plaatsen", icon: TrendingUp, desc: "Nieuws voor het dashboard" },
        ].map((link) => (
          <Link key={link.href} href={link.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-forest/10 rounded-lg">
                    <link.icon className="h-5 w-5 text-forest" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{link.label}</p>
                    <p className="text-sm text-gray-500">{link.desc}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
