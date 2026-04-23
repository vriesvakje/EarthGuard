import { VisionHero } from "@/components/landing/VisionHero";
import { VisionStory } from "@/components/landing/VisionStory";
import { VisionRoadmap } from "@/components/landing/VisionRoadmap";
import { VisionCTA } from "@/components/landing/VisionCTA";

export default function Home() {
  return (
    <>
      <VisionHero />
      <VisionStory />
      <VisionRoadmap />
      <VisionCTA />
    </>
  );
}
