import { Leaf, Globe, MessageCircle, Send } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-forest text-beige py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Leaf className="h-6 w-6" />
              <span className="text-xl font-bold tracking-tight">EARTHGUARD</span>
            </div>
            <p className="text-body opacity-80">
              Samen herstellen we de biodiversiteit in Brabant, één vierkante meter tegelijk.
            </p>
            <div className="flex space-x-4">
              <Globe className="h-5 w-5 cursor-pointer hover:opacity-70" />
              <MessageCircle className="h-5 w-5 cursor-pointer hover:opacity-70" />
              <Send className="h-5 w-5 cursor-pointer hover:opacity-70" />
            </div>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">INFORMATIE</h3>
            <ul className="space-y-2 text-body opacity-80">
              <li><Link href="/over-ons">Over ons</Link></li>
              <li><Link href="/prototype">Prototype</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">CONTACT</h3>
            <ul className="space-y-2 text-body opacity-80">
              <li>Tilburg, Noord-Brabant</li>
              <li>info@earthguard.nl</li>
              <li>+31 (0)13 123 4567</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">LEGAL</h3>
            <ul className="space-y-2 text-body opacity-80">
              <li>Privacybeleid</li>
              <li>Algemene Voorwaarden</li>
              <li>Cookiebeleid</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-beige/20 text-center text-label opacity-60">
          © 2026 EarthGuard B.V. Alle rechten voorbehouden.
        </div>
      </div>
    </footer>
  );
}
