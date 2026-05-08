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
import ScrollProgressBar from "@/components/ScrollProgressBar";
import CursorGlow from "@/components/CursorGlow";
import PageEnter from "@/components/PageEnter";
import WaveDivider from "@/components/WaveDivider";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <ScrollProgressBar />
      <CursorGlow />
      <PageEnter>
        <Navbar />
        <main>
          <HeroSection />
          <MarqueeBar />
          <WaveDivider fromColor="#FAF7F2" toColor="#F0EBE0" />
          <AboutSection />
          <WaveDivider fromColor="#FAF7F2" toColor="#F0EBE0" flip />
          <IngredientsSection />
          <WaveDivider fromColor="#F0EBE0" toColor="#FFFBEA" />
          <FlavourSection />
          <WaveDivider fromColor="#FAF7F2" toColor="#FAF7F2" flip />
          <WhySection />
          <WaveDivider fromColor="#FAF7F2" toColor="#F0EBE0" />
          <SocialSection />
          <WaveDivider fromColor="#FAF7F2" toColor="#F5EFE4" flip />
          <ContactSection />
        </main>
        <Footer />
      </PageEnter>
    </>
  );
}
