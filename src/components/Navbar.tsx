import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Heart, Sparkles, LayoutGrid, X, Menu } from "lucide-react";
import AuthButton from "./AuthButton";
import { auth } from "../firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { useFavorites } from "../context/FavoritesContext";
import { parentCategories, getCategoriesForParent } from "../data/parentCategories";
import { CategoryIconBadge } from "./CategoryIconBadge";

interface NavbarProps {
  openSubmitForm: () => void;
}

export function Navbar({ openSubmitForm: _openSubmitForm }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedParent, setMobileExpandedParent] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const navContainerRef = useRef<HTMLDivElement>(null);

  const { favoriteIds } = useFavorites();

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, location.hash]);

  // Firebase auth state
  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleParentClick = (parentId: string) => {
    if (location.pathname === "/") {
      window.location.hash = parentId;
      const el = document.getElementById("mega-menu-hub");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(`/#${parentId}`);
    }
  };

  return (
    <div
      ref={navContainerRef}
      className="fixed top-2 sm:top-4 left-1/2 transform -translate-x-1/2 z-[100] w-[calc(100%-1.5rem)] max-w-[1440px]"
    >
      {/* Top Info Bar: Brand Context Tag */}
      <div className="hidden lg:flex items-center justify-between pb-3 px-3 text-xs font-medium text-slate-500">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 font-semibold text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Privacy-First • Open Access • No Tracking
          </span>
          <span className="hidden sm:inline-block text-slate-400">|</span>
          <span className="hidden sm:inline-block text-slate-500 font-normal">Super-Categories Navigation System (242 Subcategories Grouped)</span>
        </div>
        <div className="flex items-center gap-4 text-slate-400 text-[11px]">
          <span className="font-mono bg-white/70 px-2 py-0.5 rounded border border-slate-200">1440px Desktop View</span>
          <span className="hidden md:inline">FreeAI Tools v2.6 Architecture</span>
        </div>
      </div>

      {/* FLOATING GLASS NAVBAR (Header Container) */}
      <header className="relative z-50">
        <nav className="glass-nav rounded-2xl md:rounded-full px-5 sm:px-8 py-3.5 transition-all duration-300 flex items-center justify-between gap-4">
          
          {/* LEFT: 3D RIBBON SHIELD LOGO & WORDMARK */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none shrink-0"
            aria-label="FreeAI Tools Home"
            onClick={() => setMobileMenuOpen(false)}
          >
            {/* 3D "S"-Ribbon Emerald Shield Logo */}
            <div className="relative w-10 h-10 rounded-full bg-[#ECECEC] p-1 shadow-md shadow-emerald-950/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 border border-white">
              <svg className="w-7 h-7" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="gradBottom" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#114327" />
                    <stop offset="50%" stopColor="#19653a" />
                    <stop offset="100%" stopColor="#2ba462" />
                  </linearGradient>
                  <linearGradient id="gradMiddle" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#081e11" />
                    <stop offset="15%" stopColor="#0e3a21" />
                    <stop offset="60%" stopColor="#175d35" />
                    <stop offset="100%" stopColor="#2ba462" />
                  </linearGradient>
                  <linearGradient id="gradTop" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#1a6d3f" />
                    <stop offset="50%" stopColor="#1e7a46" />
                    <stop offset="100%" stopColor="#2ba462" />
                  </linearGradient>
                  <filter id="ribbonShadow" x="-10%" y="-10%" width="130%" height="130%">
                    <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#000000" floodOpacity="0.18" />
                  </filter>
                </defs>
                <g filter="url(#ribbonShadow)">
                  <path
                    d="M370 145 C370 95, 310 65, 256 65 C180 65, 140 115, 140 180 C140 250, 220 270, 275 295 C345 325, 372 360, 372 415 C372 475, 315 495, 256 495 C190 495, 140 450, 140 395"
                    stroke="url(#gradBottom)"
                    strokeWidth="82"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M350 155 C350 115, 305 85, 256 85 C195 85, 160 125, 160 175 C160 235, 230 255, 280 280 C335 305, 355 340, 355 390"
                    stroke="url(#gradMiddle)"
                    strokeWidth="72"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M360 148 C360 105, 312 78, 256 78 C205 78, 172 112, 172 165 C172 215, 240 240, 290 268 C340 295, 360 330, 360 380 C360 435, 310 468, 256 468 C200 468, 155 425, 155 380"
                    stroke="url(#gradTop)"
                    strokeWidth="56"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.95"
                  />
                </g>
              </svg>
            </div>

            {/* Wordmark */}
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl md:text-[22px] tracking-tight text-slate-900 leading-none">
                FreeAI <span className="text-emerald-600">Tools</span>
              </span>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-0.5">
                Directory
              </span>
            </div>
          </Link>

          {/* CENTER: SIX PARENT CATEGORIES NAVIGATION (Direct scroll to fixed hub on homepage) */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {parentCategories.map((parent) => (
              <button
                key={parent.id}
                type="button"
                onClick={() => handleParentClick(parent.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 xl:px-3.5 xl:py-2 rounded-full text-xs xl:text-sm font-bold text-slate-700 hover:text-emerald-700 hover:bg-emerald-500/10 border border-transparent hover:border-emerald-500/20 transition-all cursor-pointer whitespace-nowrap active:scale-95"
              >
                <CategoryIconBadge
                  categoryId={parent.id}
                  categoryName={parent.name}
                  size="xs"
                  className="!w-4 !h-4 rounded-sm border-0 shrink-0"
                />
                <span>{parent.shortName}</span>
              </button>
            ))}
          </div>

          {/* RIGHT: FAVORITES BADGE, AUTH & EXPLORE CTA */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Favorites pill badge */}
            <Link
              to="/favorites"
              aria-label={`View your saved favorite tools (${favoriteIds.length} tools)`}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/70 hover:bg-emerald-50 border border-slate-200/80 hover:border-emerald-200 text-slate-700 hover:text-emerald-700 transition-all shadow-sm"
              title="Your saved tools"
            >
              <svg className="w-4 h-4 text-rose-500 fill-rose-500/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
              <span className="text-[11px] font-black tracking-wide text-slate-800">
                {favoriteIds.length}
              </span>
            </Link>

            {/* Auth button */}
            <div className="hidden sm:block">
              <AuthButton />
            </div>

            {/* Primary Emerald Action Button */}
            <Link
              to="/browse"
              className="glow-btn-primary hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition-all transform hover:-translate-y-0.5"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="7" height="7" x="3" y="3" rx="1.5" />
                <rect width="7" height="7" x="14" y="3" rx="1.5" />
                <rect width="7" height="7" x="14" y="14" rx="1.5" />
                <rect width="7" height="7" x="3" y="14" rx="1.5" />
              </svg>
              <span>Explore All Tools</span>
              <svg className="w-3.5 h-3.5 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-xl bg-white/80 border border-slate-200 text-slate-700 hover:text-emerald-600 focus:outline-none"
              aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </nav>
      </header>

      {/* MOBILE EXPANDED MENU DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="xl:hidden mt-2 p-4 rounded-3xl bg-slate-900/95 backdrop-blur-2xl border border-white/10 text-white shadow-2xl max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
                6 Super-Categories
              </span>
              <Link
                to="/categories"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="View all categories"
                className="text-xs text-slate-400 hover:text-emerald-300 font-bold"
              >
                View All Categories &rarr;
              </Link>
            </div>

            {/* Parent Categories Accordion */}
            <div className="space-y-2">
              {parentCategories.map((parent) => {
                const isExpanded = mobileExpandedParent === parent.id;
                const memberCats = getCategoriesForParent(parent);

                return (
                  <div
                    key={parent.id}
                    className="rounded-2xl bg-white/5 border border-white/5 overflow-hidden"
                  >
                    <button
                      onClick={() =>
                        setMobileExpandedParent(isExpanded ? null : parent.id)
                      }
                      className="w-full flex items-center justify-between p-3.5 text-left"
                    >
                      <div className="flex items-center gap-2.5">
                        <CategoryIconBadge
                          categoryId={parent.id}
                          categoryName={parent.name}
                          size="xs"
                          className="!w-5 !h-5 rounded-md border-0 shrink-0"
                        />
                        <span className="text-sm font-bold text-white">
                          {parent.name}
                        </span>
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                          {memberCats.length}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform ${
                          isExpanded ? "rotate-180 text-emerald-400" : ""
                        }`}
                      />
                    </button>

                    {isExpanded && (
                      <div className="p-3 pt-0 border-t border-white/5 space-y-3">
                        {/* Member categories */}
                        <div className="space-y-1">
                          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block px-1">
                            Categories
                          </span>
                          {memberCats.map((cat) => (
                            <Link
                              key={cat.id}
                              to={`/categories#${cat.id}`}
                              onClick={() => setMobileMenuOpen(false)}
                              className="flex items-center gap-2 p-2 rounded-xl text-xs font-semibold text-slate-200 hover:bg-emerald-500/20 hover:text-emerald-300 transition-colors"
                            >
                              <CategoryIconBadge
                                categoryId={cat.id}
                                categoryName={cat.name}
                                size="xs"
                                className="!w-5 !h-5"
                              />
                              <span className="truncate">{cat.name} ({cat.subCategories.length})</span>
                            </Link>
                          ))}
                        </div>

                        {/* Quick topic items */}
                        <div className="space-y-1.5 pt-2 border-t border-white/5">
                          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 block px-1">
                            Popular Subcategories
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {parent.topicSections.flatMap((t) => t.items).slice(0, 8).map((item, idx) => (
                              <Link
                                key={idx}
                                to={`/category/${item.path}`}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-[11px] px-2 py-1 rounded-full bg-white/5 text-slate-300 border border-white/10 hover:border-emerald-400 hover:text-emerald-300"
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* General Navigation Links */}
            <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-2 text-xs font-bold">
              <Link
                to="/browse"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-center text-slate-200"
              >
                Browse All Tools
              </Link>
              <Link
                to="/weekly-picks"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-center text-slate-200"
              >
                Weekly Picks
              </Link>
              <Link
                to="/insights"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-center text-slate-200"
              >
                AI Insights
              </Link>
              <Link
                to="/favorites"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-center text-emerald-300"
              >
                Favorites ({favoriteIds.length})
              </Link>
            </div>

            <div className="mt-3 pt-3 border-t border-white/10 flex justify-center sm:hidden">
              <AuthButton />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
