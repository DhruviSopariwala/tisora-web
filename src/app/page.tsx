import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarqueeBar from "@/components/MarqueeBar";
import AboutSection from "@/components/AboutSection";
import IngredientsSection from "@/components/IngredientsSection";
import FlavourSection from "@/components/FlavourSection";
import WhySection from "@/components/WhySection";
import SocialSection from "@/components/SocialSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Navbar />
      <main>
        <HeroSection />
        <MarqueeBar />
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
