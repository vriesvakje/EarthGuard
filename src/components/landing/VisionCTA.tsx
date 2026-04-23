"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, ArrowRight, FlaskConical, Heart } from "lucide-react";
import Link from "next/link";

export function VisionCTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder — no Supabase call. Just show confirmation.
    setSubmitted(true);
  };

  return (
    <section id="steun-ons" className="py-24 bg-beige">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/60 rounded-3xl p-8 sm:p-12 lg:p-16 text-center"
          >
            <div className="inline-flex items-center gap-2 bg-earth/10 text-earth px-4 py-2 rounded-full text-sm font-semibold mb-8">
              <Heart className="h-4 w-4" />
              WORD MEDSTANDER
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-forest mb-6">
              Help ons de eerste kavel te realiseren
            </h2>
            <p className="text-lg sm:text-xl opacity-80 leading-relaxed max-w-2xl mx-auto mb-10">
              Earth Guard heeft medestanders nodig. Schrijf je in voor onze
              nieuwsbrief en wees de eerste die hoort over onze vorderingen,
              crowdfunding-start en mogelijkheden om bij te dragen.
            </p>

            {/* Newsletter form — placeholder, no Supabase */}
            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-8"
              >
                <div className="flex-1 relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-forest/40" />
                  <Input
                    type="email"
                    placeholder="jouw@email.nl"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-12 h-14 rounded-full border-forest/20 bg-white text-forest text-lg"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="bg-forest text-beige hover:bg-forest/90 rounded-full px-8 h-14 text-lg font-semibold"
                >
                  INSCHRIJVEN
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </form>
            ) : (
              <div className="bg-forest/10 rounded-2xl p-6 max-w-lg mx-auto mb-8">
                <p className="text-lg font-semibold text-forest">
                  Bedankt voor je interesse!
                </p>
                <p className="text-body opacity-80 mt-1">
                  We houden je op de hoogte van onze vorderingen.
                </p>
              </div>
            )}

            <p className="text-body opacity-50 mb-10">
              We respecteren je privacy. Geen spam, alleen updates die er toe doen.
            </p>

            {/* Secondary CTA — link to prototype */}
            <div className="border-t border-forest/10 pt-10">
              <p className="text-body opacity-70 mb-4">
                Benieuwd naar waar we aan werken?
              </p>
              <Link href="/prototype">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-forest text-forest hover:bg-forest hover:text-beige rounded-full px-8 h-12 transition-colors"
                >
                  <FlaskConical className="h-5 w-5 mr-2" />
                  BEKIJK HET PROTOTYPE
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
