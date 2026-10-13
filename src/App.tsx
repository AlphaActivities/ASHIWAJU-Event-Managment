import Navbar from './components/Navbar';
import HeroSection from './components/sections/HeroSection';
import UnderstandingSection from './components/sections/UnderstandingSection';
import AboutSection from './components/sections/AboutSection';
import TestimonialsSection from './components/sections/TestimonialsSection';
import WorksSection from './components/sections/WorksSection';
import FearSection from './components/sections/FearSection';
import ClarityExpectationsSection from './components/sections/ClarityExpectationsSection';
import OfferSection from './components/sections/OfferSection';
import ClaritySessionSection from './components/sections/ClaritySessionSection';
import FormSection from './components/sections/FormSection';
import FAQSection from './components/sections/FAQSection';
import GuideSection from './components/sections/GuideSection';
import FooterSection from './components/sections/FooterSection';
import FloatingCallButton from './components/ui/FloatingCallButton';
import MobileCTABar from './components/ui/MobileCTABar';
import ScrollToTop from './components/ui/ScrollToTop';
import AdminDashboard from './pages/AdminDashboard';
import ResetPassword from './pages/ResetPassword';

export default function App() {
  const pathname = window.location.pathname;
  const isAdminRoute = pathname === '/admin';
  const isResetRoute = pathname === '/reset-password';

  if (isAdminRoute) {
    return <AdminDashboard />;
  }

  if (isResetRoute) {
    return <ResetPassword />;
  }

  return (
    <>
      <Navbar />
      <HeroSection />
      <UnderstandingSection />
      <OfferSection />
      <TestimonialsSection />
      <WorksSection />
      <AboutSection />
      <ClarityExpectationsSection />
      <FearSection />
      <FormSection />
      <FAQSection />
      {/* <GuideSection /> */}
      <FooterSection />
      <FloatingCallButton />
      <MobileCTABar />
      <ScrollToTop />
    </>
  );
}
