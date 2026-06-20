import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { LanguageProvider } from "./contexts/LanguageContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";

const Home = lazy(() => import("./pages/Home"));
const Services = lazy(() => import("./pages/Services"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Industries = lazy(() => import("./pages/Industries"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const CaseStudyDetail = lazy(() => import("./pages/CaseStudyDetail"));
const Insights = lazy(() => import("./pages/Insights"));
const InsightPost = lazy(() => import("./pages/InsightPost"));
const Markets = lazy(() => import("./pages/Markets"));
const MarketDetail = lazy(() => import("./pages/MarketDetail"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const Admin = lazy(() => import("./pages/Admin"));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#050505]">
    <div className="h-8 w-8 rounded-full border-2 border-cyan-400/30 border-t-cyan-400 animate-spin" />
  </div>
);

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname === "/admin" || location.pathname.endsWith("/admin");

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <CustomCursor />
      {!isAdmin && <Navbar />}
      <main>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Routes without language prefix */}
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/insights/:slug" element={<InsightPost />} />
            <Route path="/markets" element={<Markets />} />
            <Route path="/markets/:slug" element={<MarketDetail />} />
            <Route path="/book-a-call" element={<Navigate to="/contact" replace />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/admin" element={<Admin />} />
            
            {/* Routes with language prefix */}
            <Route path="/:lang/" element={<Home />} />
            <Route path="/:lang/services" element={<Services />} />
            <Route path="/:lang/services/:slug" element={<ServiceDetail />} />
            <Route path="/:lang/about" element={<About />} />
            <Route path="/:lang/contact" element={<Contact />} />
            <Route path="/:lang/faq" element={<FAQ />} />
            <Route path="/:lang/industries" element={<Industries />} />
            <Route path="/:lang/case-studies" element={<CaseStudies />} />
            <Route path="/:lang/case-studies/:slug" element={<CaseStudyDetail />} />
            <Route path="/:lang/insights" element={<Insights />} />
            <Route path="/:lang/insights/:slug" element={<InsightPost />} />
            <Route path="/:lang/markets" element={<Markets />} />
            <Route path="/:lang/markets/:slug" element={<MarketDetail />} />
            <Route path="/:lang/book-a-call" element={<Navigate to="/contact" replace />} />
            <Route path="/:lang/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/:lang/terms-of-service" element={<TermsOfService />} />
            <Route path="/:lang/admin" element={<Admin />} />
            
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </main>
      {!isAdmin && <Footer />}
      <Toaster position="bottom-right" theme="dark" />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL?.replace(/\/$/, "") || ""}>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
