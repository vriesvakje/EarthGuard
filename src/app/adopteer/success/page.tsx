"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, Trees, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [orderInfo, setOrderInfo] = useState<{
    meters: number;
    total: string;
  } | null>(null);

  useEffect(() => {
    if (sessionId) {
      // Fetch session details from our API to show order summary
      fetch(`/api/session?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.meters) {
            setOrderInfo({
              meters: data.meters,
              total: data.total,
            });
          }
        })
        .catch(() => {
          // Session lookup failed, show generic success
        });
    }
  }, [sessionId]);

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
          className="w-24 h-24 rounded-full bg-forest text-beige flex items-center justify-center mx-auto mb-8"
        >
          <CheckCircle2 className="w-14 h-14" />
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-black text-forest mb-4">
          Bedankt!
        </h1>
        <p className="text-lg opacity-70 mb-8">
          Je bijdrage wordt omgezet in echte natuur. Elke m² telt!
        </p>

        {orderInfo && (
          <Card className="border-none shadow-xl bg-white mb-8 rounded-[2rem]">
            <CardContent className="p-8 space-y-4">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Trees className="h-8 w-8 text-forest" />
                <span className="text-2xl font-black text-forest">
                  {orderInfo.meters}m²
                </span>
              </div>
              <div className="h-[1px] bg-forest/10" />
              <div className="flex justify-between text-body">
                <span className="opacity-60">Totaal betaald</span>
                <span className="font-bold">{orderInfo.total}</span>
              </div>
              <p className="text-label opacity-40">
                Order ID: {sessionId?.slice(-8)}
              </p>
            </CardContent>
          </Card>
        )}

        {!orderInfo && sessionId && (
          <Card className="border-none shadow-xl bg-white mb-8 rounded-[2rem]">
            <CardContent className="p-8">
              <p className="text-body opacity-60">
                Je betaling is ontvangen. Je ontvangt een bevestiging per e-mail.
              </p>
            </CardContent>
          </Card>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/dashboard">
            <Button className="bg-forest text-beige rounded-2xl h-12 px-8 text-lg font-bold">
              Naar Dashboard <ArrowRight className="ml-2 h-5 w-5" />
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

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-forest border-t-transparent rounded-full" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
