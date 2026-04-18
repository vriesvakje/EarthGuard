"use client";

import { motion } from "framer-motion";
import { XCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-lg w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-24 h-24 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-8"
        >
          <XCircle className="w-14 h-14" />
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-black text-forest mb-4">
          Betaling geannuleerd
        </h1>
        <p className="text-lg opacity-70 mb-8">
          Je betaling is niet voltooid. Geen zorgen — er is niets afgeschreven.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/adopteer">
            <Button className="bg-forest text-beige rounded-2xl h-12 px-8 text-lg font-bold">
              <ArrowLeft className="mr-2 h-5 w-5" /> Probeer opnieuw
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="rounded-2xl h-12 px-8 text-lg font-bold border-forest text-forest">
              Terug naar Home
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
