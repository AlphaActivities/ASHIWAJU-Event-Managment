import { GlobalVideoBackground } from './components/ui/GlobalVideoBackground';
import Navbar from './components/Navbar';
import HeroSection from './components/sections/HeroSection';
import UnderstandingSection from './components/sections/UnderstandingSection';
import AboutSection from './components/sections/AboutSection';
import ServicesSection from './components/sections/ServicesSection';
import TestimonialsSection from './components/sections/TestimonialsSection';
import WorksSection from './components/sections/WorksSection';
import FearSection from './components/sections/FearSection';
import ClaritySessionSection from './components/sections/ClaritySessionSection';
import FormSection from './components/sections/FormSection';
import FAQSection from './components/sections/FAQSection';
import GuideSection from './components/sections/GuideSection';
import FooterSection from './components/sections/FooterSection';
import FloatingCallButton from './components/ui/FloatingCallButton';
import MobileCTABar from './components/ui/MobileCTABar';
import ScrollToTop from './components/ui/ScrollToTop';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  const isAdminRoute = window.location.pathname === '/admin';

  if (isAdminRoute) {
    return <AdminDashboard />;
  }

  return (
    <>
      <GlobalVideoBackground />
      <Navbar />
      <HeroSection />
      <UnderstandingSection />
      <AboutSection />
      <ClaritySessionSection />
      <TestimonialsSection />
      <WorksSection />
      <FearSection />
      <FormSection />
      <FAQSection />
      <GuideSection />
      <FooterSection />
      <FloatingCallButton />
      <MobileCTABar />
      <ScrollToTop />
    </>
  );
}
