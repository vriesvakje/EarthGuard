"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Leaf, LogOut, User } from "lucide-react";
import { createClient } from "@/lib/supabase/browser";
import { useEffect, useState } from "react";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export function Navbar() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
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
    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-beige/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Leaf className="h-6 w-6 text-forest" />
          <span className="text-xl font-bold text-forest tracking-tight">EARTHGUARD</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-forest">
          <Link href="/over-ons" className="hover:opacity-80 transition-opacity">OVER ONS</Link>
          <Link href="/kaart" className="hover:opacity-80 transition-opacity">KAART & PROJECTEN</Link>
          <Link href="/methode" className="hover:opacity-80 transition-opacity">ONZE METHODE</Link>
          <Link href="/community" className="hover:opacity-80 transition-opacity">COMMUNITY</Link>
        </nav>
        <div className="flex items-center space-x-4">
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
                <>
                  <Link href="/login">
                    <Button variant="ghost" className="text-forest hover:bg-forest/10 rounded-full px-6">
                      LOG IN
                    </Button>
                  </Link>
                </>
              )}
            </>
          )}
          <Button className="bg-forest text-beige hover:bg-forest/90 rounded-full px-6">
            KOOP JE m²
          </Button>
        </div>
      </div>
    </header>
  );
}
