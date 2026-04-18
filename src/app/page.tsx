import { Hero } from "@/components/home/Hero";
import { ImpactTracker } from "@/components/home/ImpactTracker";
import { CrowdfundingProgress } from "@/components/home/CrowdfundingProgress";
import { InteractiveMap } from "@/components/home/InteractiveMap";

export default function Home() {
  return (
    <>
      <Hero />
      <ImpactTracker />
      <CrowdfundingProgress />
      <InteractiveMap />
    </>
  );
}
