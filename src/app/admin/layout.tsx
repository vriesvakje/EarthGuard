import Link from "next/link";
import {
  LayoutDashboard,
  Calendar,
  BarChart3,
  Target,
  MapPin,
  Mail,
  ShoppingBag,
  MessageSquare,
  Apple,
  Bell,
  ArrowLeft,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Overzicht", icon: LayoutDashboard },
  { href: "/admin/events", label: "Events", icon: Calendar },
  { href: "/admin/impact", label: "Impact Stats", icon: BarChart3 },
  { href: "/admin/crowdfunding", label: "Crowdfunding", icon: Target },
  { href: "/admin/projects", label: "Projecten", icon: MapPin },
  { href: "/admin/newsletter", label: "Nieuwsbrief", icon: Mail },
  { href: "/admin/orders", label: "Bestellingen", icon: ShoppingBag },
  { href: "/admin/stories", label: "Verhalen", icon: MessageSquare },
  { href: "/admin/harvest", label: "Oogst", icon: Apple },
  { href: "/admin/updates", label: "Updates", icon: Bell },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-forest text-beige flex flex-col shrink-0">
        <div className="p-6 border-b border-beige/10">
          <h1 className="text-2xl font-bold">🌿 Admin</h1>
          <p className="text-base opacity-60 mt-1">EarthGuard Dashboard</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium hover:bg-beige/10 transition-colors"
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-beige/10">
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-base font-medium hover:bg-beige/10 transition-colors opacity-70"
          >
            <ArrowLeft className="h-5 w-5" />
            Terug naar site
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
