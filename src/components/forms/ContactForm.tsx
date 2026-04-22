"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Send, CheckCircle2, Loader2, Mail, User, MessageSquare, Tag } from "lucide-react";

const contactTypes = [
  { value: "algemeen", label: "Algemene vraag" },
  { value: "samenwerking", label: "Samenwerking" },
  { value: "vrijwilliger", label: "Vrijwilliger worden" },
  { value: "pers", label: "Pers / Media" },
  { value: "feedback", label: "Feedback" },
];

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("algemeen");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message, type }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Er is iets misgegaan");
      }

      setSuccess(true);
      // Reset form
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setType("algemeen");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Er is iets misgegaan";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="border-none shadow-xl bg-white rounded-[2rem]">
          <CardContent className="p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-forest/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-forest" />
            </div>
            <h3 className="text-2xl font-bold text-forest mb-3">Verzonden! 🎉</h3>
            <p className="text-forest/70 mb-6">
              Bedankt voor je bericht. We nemen zo snel mogelijk contact met je op — meestal binnen 48 uur.
            </p>
            <Button
              onClick={() => setSuccess(false)}
              variant="outline"
              className="rounded-full"
            >
              Verstuur nog een bericht
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-none shadow-xl bg-white rounded-[2rem]">
        <CardContent className="p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Type selector */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-forest flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Wat wil je?
              </label>
              <div className="flex flex-wrap gap-2">
                {contactTypes.map((ct) => (
                  <button
                    key={ct.value}
                    type="button"
                    onClick={() => setType(ct.value)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      type === ct.value
                        ? "bg-forest text-beige"
                        : "bg-forest/5 text-forest hover:bg-forest/10"
                    }`}
                  >
                    {ct.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-forest flex items-center gap-2">
                <User className="h-4 w-4" />
                Naam *
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Je naam"
                required
                className="rounded-xl h-12 bg-forest/5 border-forest/10 focus:border-forest"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-forest flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email *
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="je@email.nl"
                required
                className="rounded-xl h-12 bg-forest/5 border-forest/10 focus:border-forest"
              />
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-forest flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Onderwerp
              </label>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Waar gaat je bericht over?"
                className="rounded-xl h-12 bg-forest/5 border-forest/10 focus:border-forest"
              />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-forest flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Bericht *
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Schrijf je bericht hier..."
                required
                rows={5}
                className="w-full rounded-xl bg-forest/5 border border-forest/10 focus:border-forest p-4 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-forest"
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-600 text-sm font-medium bg-red-50 p-3 rounded-xl">
                {error}
              </p>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-forest text-beige hover:bg-forest/90 rounded-full h-14 text-lg font-bold"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Verzenden...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Verstuur bericht
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
