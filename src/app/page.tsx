import LoadingScreenWrapper from "@/components/LoadingScreenWrapper";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarqueeBar from "@/components/MarqueeBar";
import CinematicSequenceWrapper from "@/components/CinematicSequenceWrapper";
import AboutSection from "@/components/AboutSection";
import IngredientsSection from "@/components/IngredientsSection";
import FlavourSection from "@/components/FlavourSection";
import WhySection from "@/components/WhySection";
import SocialSection from "@/components/SocialSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import CursorTrail from "@/components/CursorTrail";

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
