import { GlobalVideoBackground } from './components/ui/GlobalVideoBackground';
import Navbar from './components/Navbar';
import HeroSection from './components/sections/HeroSection';
import UnderstandingSection from './components/sections/UnderstandingSection';
import AboutSection from './components/sections/AboutSection';
import ServicesSection from './components/sections/ServicesSection';
import TestimonialsSection from './components/sections/TestimonialsSection';
import WorksSection from './components/sections/WorksSection';
import FearSection from './components/sections/FearSection';
import FormSection from './components/sections/FormSection';
import FAQSection from './components/sections/FAQSection';
import GuideSection from './components/sections/GuideSection';
import FooterSection from './components/sections/FooterSection';
import FloatingCallButton from './components/ui/FloatingCallButton';

export default function App() {
  return (
    <>
      <GlobalVideoBackground />
      <Navbar />
      <HeroSection />
      <UnderstandingSection />
      <AboutSection />
      <ServicesSection />
      <TestimonialsSection />
      <WorksSection />
      <FearSection />
      <FormSection />
      <FAQSection />
      <GuideSection />
      <FooterSection />
      <FloatingCallButton />
    </>
  );
}
