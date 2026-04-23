"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Leaf, Mail, ArrowRight, Loader2, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const supabase = createClient();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      setSuccess(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Er is iets misgegaan";
      if (msg.includes("rate limit")) {
        setError("Te veel pogingen. Probeer het later opnieuw.");
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-4">
            <Leaf className="h-8 w-8 text-forest" />
            <span className="text-2xl font-bold text-forest tracking-tight">
              EARTHGUARD
            </span>
          </Link>
        </div>

        <Card className="border-forest/10 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-forest">
              Wachtwoord vergeten
            </CardTitle>
            <CardDescription>
              Vul je e-mailadres in en we sturen je een link om je wachtwoord
              opnieuw in te stellen.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {success ? (
              <div className="space-y-4">
                <div className="bg-forest/10 text-forest text-sm p-4 rounded-xl text-center">
                  <p className="font-semibold mb-1">📧 E-mail verzonden!</p>
                  <p>
                    Check je inbox (en spam-map) voor een e-mail met de link om
                    je wachtwoord opnieuw in te stellen.
                  </p>
                </div>
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="w-full h-12 border-forest/20 hover:bg-forest/5 rounded-full text-forest"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Terug naar inloggen
                  </Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-forest">
                    E-mailadres
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-forest/40" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="jouw@email.nl"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10 border-forest/20 focus:border-forest rounded-full h-12"
                      disabled={loading}
                    />
                  </div>
                </div>

                {error && (
                  <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-xl">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full h-12 bg-forest text-beige hover:bg-forest/90 rounded-full font-semibold"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <ArrowRight className="mr-2 h-4 w-4" />
                  )}
                  Verstuur reset-link
                </Button>

                <div className="text-center">
                  <Link
                    href="/login"
                    className="text-sm text-forest/60 hover:text-forest transition-colors inline-flex items-center gap-1"
                  >
                    <ArrowLeft className="h-3 w-3" />
                    Terug naar inloggen
                  </Link>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
