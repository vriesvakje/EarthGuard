import { PrototypeBanner } from "@/components/landing/PrototypeBanner";
import { Hero } from "@/components/home/Hero";
import { ImpactTracker } from "@/components/home/ImpactTracker";
import { CrowdfundingProgress } from "@/components/home/CrowdfundingProgress";
import { InteractiveMap } from "@/components/home/InteractiveMap";

export default function PrototypePage() {
  return (
    <>
      <PrototypeBanner />
      <Hero />
      <ImpactTracker />
      <CrowdfundingProgress />
      <InteractiveMap />
    </>
  );
}
