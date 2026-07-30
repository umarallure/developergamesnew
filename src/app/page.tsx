import { Footer } from "@/components/layout/footer";
import { Navigation } from "@/components/layout/navigation";
import { RevealManager } from "@/components/motion/reveal-manager";
import { ApplicationSection } from "@/components/sections/application-section";
import { ChallengesSection } from "@/components/sections/challenges-section";
import { EvaluationSection } from "@/components/sections/evaluation-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ManifestoSection } from "@/components/sections/manifesto-section";
import { ProcessSection } from "@/components/sections/process-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { TrackMarquee } from "@/components/sections/track-marquee";
import { TracksSection } from "@/components/sections/tracks-section";
import { SkillCoreStory } from "@/components/skill-core/skill-core-story";

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="home">
        <SkillCoreStory>
          <HeroSection />
          <TrackMarquee />
          <ManifestoSection />
          <TracksSection />
          <ProcessSection />
        </SkillCoreStory>
        <ChallengesSection />
        <ProjectsSection />
        <EvaluationSection />
        <ApplicationSection />
      </main>
      <Footer />
      <RevealManager />
    </>
  );
}
