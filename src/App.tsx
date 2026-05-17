import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Suspense } from "react";
import { AnimatePresence, motion } from "motion/react";
import HomePage from "./pages/HomePage";
import CategoriesPage from "./pages/CategoriesPage";
import SubCategoryPage from "./pages/SubCategoryPage";
import SearchPage from "./pages/SearchPage";
import InsightsPage from "./pages/InsightsPage";
import BrowseAppsPage from "./pages/BrowseAppsPage";
import WeeklyPicksPage from "./pages/WeeklyPicksPage";
import FavoritesPage from "./pages/FavoritesPage";
import LegalPage from "./pages/LegalPage";

import BackToTop from "./components/BackToTop";
import ErrorBoundary from "./components/ErrorBoundary";

declare global {
  interface Window {
    Tally: any;
  }
}

import { Navbar } from "./components/Navbar";
import { BgradientAnim } from "./components/BgradientAnim";
import Footer from "./components/Footer";

function AnimatedRoutes({ openSubmitForm }: { openSubmitForm: () => void }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/browse" element={<BrowseAppsPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/category/:subPath" element={<SubCategoryPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/weekly-picks" element={<WeeklyPicksPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/legal" element={<LegalPage />} />
          <Route path="/avatar-generator" element={<SubCategoryPage forcedPath="free-ai-avatar-generator" />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const openSubmitForm = () => {
    try {
      if (window.Tally) {
        window.Tally.openPopup('ODALzg', {
          layout: 'modal',
          width: 700,
        });
      } else {
        window.open('https://tally.so/forms/ODALzg', '_blank');
      }
    } catch (e) {
      console.error("Tally error:", e);
      window.open('https://tally.so/forms/ODALzg', '_blank');
    }
  };

  return (
    <Router>
      <div className="min-h-screen font-sans relative overflow-x-hidden selection:bg-emerald-100 selection:text-emerald-900">
        {/* Animated Background */}
        <div className="fixed inset-0 -z-10 bg-[#f8fafc]">
          <BgradientAnim animationDuration={20} className="opacity-80" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(248,250,252,0.4)_100%)]" />
        </div>

        <ErrorBoundary>
          {/* Navigation */}
          <Navbar openSubmitForm={openSubmitForm} />

          <div className="pt-32 min-h-screen flex flex-col">
            <Suspense fallback={
              <div className="flex-1 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-slate-500 font-medium animate-pulse">Loading FreeAI Tools...</p>
                </div>
              </div>
            }>
              <AnimatedRoutes openSubmitForm={openSubmitForm} />
            </Suspense>
          </div>

          <BackToTop />

          <Footer openSubmitForm={openSubmitForm} />
        </ErrorBoundary>
      </div>
    </Router>
  );
}
