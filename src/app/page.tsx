import dynamic from "next/dynamic";
import LoadingScreenWrapper from "@/components/LoadingScreenWrapper";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarqueeBar from "@/components/MarqueeBar";
import CursorTrail from "@/components/CursorTrail";

// Below-fold sections — lazy loaded so initial bundle is smaller
const CinematicSequenceWrapper = dynamic(() => import("@/components/CinematicSequenceWrapper"));
const AboutSection              = dynamic(() => import("@/components/AboutSection"));
const IngredientsSection        = dynamic(() => import("@/components/IngredientsSection"));
const FlavourSection            = dynamic(() => import("@/components/FlavourSection"));
const WhySection                = dynamic(() => import("@/components/WhySection"));
const SocialSection             = dynamic(() => import("@/components/SocialSection"));
const ContactSection            = dynamic(() => import("@/components/ContactSection"));
const Footer                    = dynamic(() => import("@/components/Footer"));

export default function Home() {
  return (
    <>
      <LoadingScreenWrapper />
      <CursorTrail />
      <Navbar />
      <main>
        <HeroSection />
        <MarqueeBar />
        <CinematicSequenceWrapper />
        <AboutSection />
        <IngredientsSection />
        <FlavourSection />
        <WhySection />
        <SocialSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
