"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Trees, Squirrel, Droplets, CreditCard, CheckCircle2, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/browser";

export default function AdoptPage() {
  const [meters, setMeters] = useState(10);
  const [extraDonation, setExtraDonation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pricePerMeter = 12.50;
  const total = (meters * pricePerMeter) + (extraDonation === 'vijver' ? 25 : extraDonation === 'dieren' ? 15 : 0);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      // Check if user is logged in
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        // Redirect to login with return URL
        window.location.href = `/login?redirect=/adopteer`;
        return;
      }

      // Create Stripe Checkout Session
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          meters,
          extraDonation,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Er is iets misgegaan");
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Er is iets misgegaan";
      setError(msg);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-forest mb-4">Adopteer je meters</h1>
        <p className="text-lg opacity-80">Elke meter die je adopteert, wordt direct omgezet in biodivers Agroforestry.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          {/* Step 1: Unit Selector */}
          <section className="space-y-6">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-full bg-forest text-beige flex items-center justify-center font-bold">1</div>
              <h2 className="text-2xl font-bold">Hoeveel m² wil je adopteren?</h2>
            </div>
            
            <Card className="border-none shadow-xl bg-white p-8">
              <CardContent className="space-y-12 p-0">
                <div className="text-center space-y-4">
                  <span className="text-7xl font-black text-forest">{meters}</span>
                  <span className="text-2xl font-bold text-forest/40 ml-2">m²</span>
                </div>
                
                <Slider 
                  value={[meters]} 
                  onValueChange={(val) => setMeters(Array.isArray(val) ? val[0] : val)} 
                  max={100} 
                  min={1} 
                  step={1}
                  className="py-4"
                />
                
                <div className="grid grid-cols-4 gap-4">
                  {[5, 10, 25, 50].map((num) => (
                    <Button 
                      key={num}
                      variant={meters === num ? "default" : "outline"}
                      onClick={() => setMeters(num)}
                      className="rounded-xl h-12"
                    >
                      {num}m²
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Step 2: Extras */}
          <section className="space-y-6">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-full bg-forest text-beige flex items-center justify-center font-bold">2</div>
              <h2 className="text-2xl font-bold">Extra impact maken? (Optioneel)</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card 
                className={`cursor-pointer transition-all border-2 ${extraDonation === 'vijver' ? 'border-forest bg-forest/5' : 'border-transparent hover:border-forest/20'}`}
                onClick={() => setExtraDonation(extraDonation === 'vijver' ? null : 'vijver')}
              >
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
                    <Droplets className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">De Vijver</h3>
                    <p className="text-body opacity-60 mb-4">Draag bij aan de aanleg van waterpartijen.</p>
                    <span className="font-bold text-forest">+ €25,00</span>
                  </div>
                  {extraDonation === 'vijver' && <CheckCircle2 className="h-6 w-6 text-forest" />}
                </CardContent>
              </Card>

              <Card 
                className={`cursor-pointer transition-all border-2 ${extraDonation === 'dieren' ? 'border-forest bg-forest/5' : 'border-transparent hover:border-forest/20'}`}
                onClick={() => setExtraDonation(extraDonation === 'dieren' ? null : 'dieren')}
              >
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-orange-50 text-orange-600">
                    <Squirrel className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">De Dieren</h3>
                    <p className="text-body opacity-60 mb-4">Hulpmiddelen voor dierenbeheer en nestkastjes.</p>
                    <span className="font-bold text-forest">+ €15,00</span>
                  </div>
                  {extraDonation === 'dieren' && <CheckCircle2 className="h-6 w-6 text-forest" />}
                </CardContent>
              </Card>
            </div>
          </section>
        </div>

        {/* Sidebar Summary */}
        <div className="space-y-6">
          <Card className="sticky top-24 border-none shadow-2xl bg-white overflow-hidden rounded-[2rem]">
            <CardHeader className="bg-forest text-beige p-8">
              <CardTitle>Jouw Impact</CardTitle>
              <CardDescription className="text-beige/60">Overzicht van je bijdrage</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between text-body">
                  <span className="opacity-60">{meters}m² Landbouwgrond</span>
                  <span className="font-bold">€{(meters * pricePerMeter).toFixed(2)}</span>
                </div>
                {extraDonation && (
                  <div className="flex justify-between text-body">
                    <span className="opacity-60">Extra: {extraDonation === 'vijver' ? 'De Vijver' : 'De Dieren'}</span>
                    <span className="font-bold">€{extraDonation === 'vijver' ? '25.00' : '15.00'}</span>
                  </div>
                )}
                <div className="h-[1px] bg-forest/10" />
                <div className="flex justify-between items-end">
                  <span className="text-lg font-bold">Totaal</span>
                  <span className="text-3xl font-black text-forest">€{total.toFixed(2)}</span>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 text-label p-4 rounded-xl">
                  {error}
                </div>
              )}

              <div className="space-y-4 pt-4">
                <p className="text-label uppercase tracking-widest font-bold opacity-40 text-center">Betaal veilig via</p>
                <div className="flex justify-center gap-4 opacity-40 grayscale">
                  <CreditCard className="h-8 w-8" />
                  <div className="w-12 h-8 bg-current rounded-md" />
                  <div className="w-12 h-8 bg-current rounded-md" />
                </div>
                <Button 
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full h-14 bg-forest text-beige rounded-2xl text-lg font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Bezig...
                    </>
                  ) : (
                    "AFREKENEN"
                  )}
                </Button>
                <p className="text-label text-center opacity-40 px-4">
                  Door af te rekenen ga je akkoord met onze algemene voorwaarden.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
