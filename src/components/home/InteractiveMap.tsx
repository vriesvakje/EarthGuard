"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Info, Trees, Squirrel, Droplets } from "lucide-react";
import Link from "next/link";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import { supabase } from "@/lib/supabase";

type Plot = {
  id: number;
  name: string;
  status: string;
  progress: number;
  lat: number;
  lng: number;
  type: 'forest' | 'pond' | 'animals';
};

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 51.5855,
  lng: 5.1155,
};

const mapOptions = {
  styles: [
    { "elementType": "geometry", "stylers": [{ "color": "#ebe3cd" }] },
    { "elementType": "labels.text.fill", "stylers": [{ "color": "#523735" }] },
    { "elementType": "labels.text.stroke", "stylers": [{ "color": "#f5f1e6" }] },
    { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#c9b2a6" }] },
    { "featureType": "landscape.natural", "elementType": "geometry", "stylers": [{ "color": "#dfd2ae" }] },
    { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#dfd2ae" }] },
    { "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [{ "color": "#a5b076" }] },
    { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#f5f1e6" }] },
    { "featureType": "water", "elementType": "geometry.fill", "stylers": [{ "color": "#b9d3c2" }] }
  ],
  disableDefaultUI: true,
  zoomControl: true,
};

export function InteractiveMap() {
  const [plots, setPlots] = useState<Plot[]>([]);
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);

  const hasApiKey = !!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  useEffect(() => {
    async function fetchPlots() {
      const { data, error } = await supabase
        .from('plots')
        .select('*');
      
      if (data && !error) {
        // Zorg dat we altijd getallen hebben voor lat/lng
        const formattedPlots = data.map(p => ({
          ...p,
          lat: parseFloat(p.lat) || 51.5855,
          lng: parseFloat(p.lng) || 5.1155
        }));
        setPlots(formattedPlots);
      }
    }
    fetchPlots();
  }, []);

  return (
    <section className="py-24 bg-beige border-t border-forest/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-forest mb-4">Verken onze locaties</h2>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            Klik op de markers in de regio Tilburg om de voortgang van het herstel te zien en jouw m² te kiezen.
          </p>
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2 relative aspect-[16/10] bg-emerald-100 rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl">
            {hasApiKey && isLoaded ? (
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={14}
                options={mapOptions}
              >
                {plots.map((plot) => (
                  <MarkerF
                    key={plot.id}
                    position={{ lat: plot.lat, lng: plot.lng }}
                    onClick={() => setSelectedPlot(plot)}
                    icon={{
                      url: plot.type === 'forest' ? 'https://cdn-icons-png.flaticon.com/32/628/628283.png' :
                           plot.type === 'pond' ? 'https://cdn-icons-png.flaticon.com/32/3105/3105807.png' :
                           'https://cdn-icons-png.flaticon.com/32/3069/3069172.png',
                      scaledSize: new google.maps.Size(40, 40),
                    }}
                  />
                ))}
              </GoogleMap>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50">
                <div className="text-center p-8 space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-forest/10">
                    <MapPin className="h-8 w-8 text-forest" />
                  </div>
                  <p className="text-xl font-bold text-forest">Tilburg, Project I</p>
                  <p className="text-body text-forest/60">Bekijk onze projectlocaties op de <Link href="/kaart" className="underline hover:opacity-80">kaart pagina</Link></p>
                </div>
              </div>
            )}
            
            {/* Map UI Elements */}
            <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white flex items-center gap-4 z-10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-forest"></div>
                <span className="text-label font-bold uppercase">Tilburg Project I</span>
              </div>
              <div className="h-4 w-[1px] bg-forest/20"></div>
              <span className="text-label font-medium">5.0667° E, 51.5555° N</span>
            </div>
          </div>

          <div className="h-full">
            <AnimatePresence mode="wait">
              {selectedPlot ? (
                <motion.div
                  key={selectedPlot.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Card className="border-none shadow-2xl bg-white overflow-hidden rounded-[2rem]">
                    <div className="h-48 bg-forest/10 relative overflow-hidden">
                       <div className="absolute inset-0 bg-forest/20 flex items-center justify-center">
                          {selectedPlot.type === 'forest' && <Trees className="h-16 w-16 text-forest/40" />}
                          {selectedPlot.type === 'pond' && <Droplets className="h-16 w-16 text-forest/40" />}
                          {selectedPlot.type === 'animals' && <Squirrel className="h-16 w-16 text-forest/40" />}
                       </div>
                       <Badge className="absolute top-4 right-4 bg-white text-forest hover:bg-white border-none shadow-sm">
                         {selectedPlot.status}
                       </Badge>
                    </div>
                    <CardContent className="p-8 space-y-6">
                      <div>
                        <h3 className="text-2xl font-bold text-forest mb-1">{selectedPlot.name}</h3>
                        <p className="text-body opacity-60 flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> Berkel-Enschot, Tilburg
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-body font-bold">
                          <span>Voortgang herstel</span>
                          <span>{selectedPlot.progress}%</span>
                        </div>
                        <div className="h-2 w-full bg-beige rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${selectedPlot.progress}%` }}
                            className="h-full bg-forest"
                          />
                        </div>
                      </div>

                      <p className="text-body leading-relaxed opacity-80">
                        Dit perceel wordt omgezet in een gemengde Agroforestry met focus op inheemse soorten en bodemherstel.
                      </p>

                      <div className="pt-4 space-y-3">
                        <Button className="w-full bg-forest text-beige rounded-xl h-12 font-bold">
                          ADOPTEER m²
                        </Button>
                        <Button variant="outline" className="w-full border-forest/10 text-forest rounded-xl h-12 font-bold">
                          DETAILS BEKIJKEN
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <Card className="border-none shadow-xl bg-white/50 border border-white rounded-[2rem] h-full flex flex-col items-center justify-center p-12 text-center space-y-4">
                  <div className="p-6 rounded-full bg-forest/5">
                    <Info className="h-12 w-12 text-forest/20" />
                  </div>
                  <h3 className="text-xl font-bold text-forest/40">Selecteer een kavel</h3>
                  <p className="text-body text-forest/40">
                    Klik op een icoon op de kaart om details en de voortgang van het herstel te bekijken.
                  </p>
                </Card>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
