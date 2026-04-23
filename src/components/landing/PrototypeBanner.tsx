"use client";

import { FlaskConical, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export function PrototypeBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-earth text-beige py-3 px-4 relative">
      <div className="container mx-auto flex items-center justify-center gap-3 text-sm sm:text-base">
        <FlaskConical className="h-4 w-4 shrink-0" />
        <p className="text-center">
          <span className="font-semibold">Experimenteel Prototype</span> — Dit
          dashboard gebruikt gesimuleerde data en is niet verbonden met
          live-ecosystemen.{" "}
          <Link href="/" className="underline hover:opacity-80">
            Terug naar visiepagina
          </Link>
        </p>
        <button
          onClick={() => setDismissed(true)}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:opacity-70 transition-opacity"
          aria-label="Sluit banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
