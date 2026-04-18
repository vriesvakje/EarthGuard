"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Leaf, LogOut, User, Menu, X } from "lucide-react";
import { createClient } from "@/lib/supabase/browser";
import { useEffect, useState } from "react";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export function Navbar() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setMenuOpen(false);
    router.push("/");
    router.refresh();
  };

  const navLinks = [
    { href: "/over-ons", label: "OVER ONS" },
    { href: "/kaart", label: "KAART & PROJECTEN" },
    { href: "/methode", label: "ONZE METHODE" },
    { href: "/community", label: "COMMUNITY" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-beige/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 shrink-0">
          <Leaf className="h-6 w-6 text-forest" />
          <span className="text-xl font-bold text-forest tracking-tight">EARTHGUARD</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-forest">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:opacity-80 transition-opacity">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop right side */}
        <div className="hidden md:flex items-center space-x-4">
          {!loading && (
            <>
              {user ? (
                <>
                  <Link href="/dashboard">
                    <Button variant="ghost" className="text-forest hover:bg-forest/10 rounded-full px-6">
                      <User className="h-4 w-4 mr-2" />
                      DASHBOARD
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    className="text-forest hover:bg-forest/10 rounded-full px-3"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <Link href="/login">
                  <Button variant="ghost" className="text-forest hover:bg-forest/10 rounded-full px-6">
                    LOG IN
                  </Button>
                </Link>
              )}
            </>
          )}
          <Link href="/adopteer">
            <Button className="bg-forest text-beige hover:bg-forest/90 rounded-full px-6">
              KOOP JE m²
            </Button>
          </Link>
        </div>

        {/* Mobile: hamburger + CTA */}
        <div className="flex md:hidden items-center space-x-3">
          <Link href="/adopteer">
            <Button className="bg-forest text-beige hover:bg-forest/90 rounded-full px-4 text-sm h-9">
              KOOP m²
            </Button>
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-forest hover:bg-forest/10 rounded-xl transition-colors"
            aria-label="Menu openen"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="md:hidden border-t bg-beige/95 backdrop-blur-md">
          <nav className="container mx-auto px-4 py-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-3 text-forest font-medium rounded-xl hover:bg-forest/10 transition-colors"
              >
                {link.label}
              </Link>
            ))}

            <div className="border-t border-forest/10 my-4" />

            {!loading && (
              <>
                {user ? (
                  <div className="space-y-1">
                    <Link
                      href="/dashboard"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 text-forest font-medium rounded-xl hover:bg-forest/10 transition-colors"
                    >
                      <User className="h-4 w-4" />
                      DASHBOARD
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-3 text-forest font-medium rounded-xl hover:bg-forest/10 transition-colors w-full text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      UITLOGGEN
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-3 text-forest font-medium rounded-xl hover:bg-forest/10 transition-colors"
                  >
                    LOG IN
                  </Link>
                )}
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
