import { lazy, Suspense } from 'react';
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
import FooterSection from './components/sections/FooterSection';
import FloatingCallButton from './components/ui/FloatingCallButton';
import MobileCTABar from './components/ui/MobileCTABar';
import ScrollToTop from './components/ui/ScrollToTop';

const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));

function AdminConfigError() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Admin Configuration Required</h1>
        <p className="text-gray-600">
          The admin dashboard requires dedicated environment configuration that is not
          available in this preview environment. The production admin dashboard remains
          fully operational.
        </p>
      </div>
    </div>
  );
}

function AdminRoute() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50 flex items-center justify-center">
          <div className="text-gray-500">Loading admin dashboard...</div>
        </div>
      }
    >
      <AdminDashboard />
    </Suspense>
  );
}

function ResetRoute() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50 flex items-center justify-center">
          <div className="text-gray-500">Loading...</div>
        </div>
      }
    >
      <ResetPassword />
    </Suspense>
  );
}

export default function App() {
  const pathname = window.location.pathname;
  const isAdminRoute = pathname === '/admin';
  const isResetRoute = pathname === '/reset-password';

  if (isAdminRoute) {
    return <AdminRoute />;
  }

  if (isResetRoute) {
    return <ResetRoute />;
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
