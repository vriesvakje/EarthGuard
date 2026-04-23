"use client";

import { useState, useEffect } from "react";
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
import { Leaf, Lock, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [exchangingCode, setExchangingCode] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const supabase = createClient();

  // Exchange the code from the URL for a session
  useEffect(() => {
    if (code) {
      supabase.auth
        .exchangeCodeForSession(code)
        .then(({ error }) => {
          if (error) {
            setError(
              "De reset-link is ongeldig of verlopen. Vraag een nieuwe aan via 'Wachtwoord vergeten'."
            );
          }
        })
        .finally(() => {
          setExchangingCode(false);
        });
    } else {
      // No code in URL — user might have navigated here directly
      // Check if they already have an active session (e.g. from a previous code exchange)
      supabase.auth.getUser().then(({ data: { user } }) => {
        if (!user) {
          setError(
            "Geen geldige sessie. Vraag een nieuwe reset-link aan via 'Wachtwoord vergeten'."
          );
        }
        setExchangingCode(false);
      });
    }
  }, [code, supabase.auth]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError("Wachtwoord moet minimaal 6 tekens lang zijn.");
      return;
    }

    if (password !== confirmPassword) {
      setError("De wachtwoorden komen niet overeen.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setSuccess(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Er is iets misgegaan";
      if (msg.includes("same password")) {
        setError(
          "Je nieuwe wachtwoord mag niet hetzelfde zijn als je oude wachtwoord."
        );
      } else if (msg.includes("session") || msg.includes("expired")) {
        setError(
          "De reset-link is verlopen. Vraag een nieuwe aan via 'Wachtwoord vergeten'."
        );
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  // Show loading state while exchanging code
  if (exchangingCode) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 mb-4"
            >
              <Leaf className="h-8 w-8 text-forest" />
              <span className="text-2xl font-bold text-forest tracking-tight">
                EARTHGUARD
              </span>
            </Link>
          </div>

          <Card className="border-forest/10 shadow-lg">
            <CardContent className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-forest" />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Show error state if code exchange failed and there's no session
  if (error && !success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 mb-4"
            >
              <Leaf className="h-8 w-8 text-forest" />
              <span className="text-2xl font-bold text-forest tracking-tight">
                EARTHGUARD
              </span>
            </Link>
          </div>

          <Card className="border-forest/10 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-forest">
                Link verlopen
              </CardTitle>
              <CardDescription>{error}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/forgot-password">
                <Button className="w-full h-12 bg-forest text-beige hover:bg-forest/90 rounded-full font-semibold">
                  Nieuwe reset-link aanvragen
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

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
              {success ? "Wachtwoord gewijzigd" : "Nieuw wachtwoord"}
            </CardTitle>
            <CardDescription>
              {success
                ? "Je wachtwoord is succesvol gewijzigd. Je kunt nu inloggen met je nieuwe wachtwoord."
                : "Kies een nieuw wachtwoord voor je account."}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {success ? (
              <div className="space-y-4">
                <div className="bg-forest/10 text-forest text-sm p-4 rounded-xl text-center">
                  <CheckCircle2 className="h-8 w-8 mx-auto mb-2" />
                  <p className="font-semibold">Wachtwoord bijgewerkt!</p>
                </div>
                <Button
                  className="w-full h-12 bg-forest text-beige hover:bg-forest/90 rounded-full font-semibold"
                  onClick={() => {
                    router.push("/login");
                    router.refresh();
                  }}
                >
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Ga naar inloggen
                </Button>
              </div>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-forest">
                    Nieuw wachtwoord
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-forest/40" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Minimaal 6 tekens"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                      className="pl-10 border-forest/20 focus:border-forest rounded-full h-12"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-forest">
                    Bevestig wachtwoord
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-forest/40" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Herhaal je wachtwoord"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      minLength={6}
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
                  Wachtwoord wijzigen
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
