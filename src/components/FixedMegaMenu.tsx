import React, { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  parentCategories,
  ParentCategory,
  getCategoriesForParent,
  getParentCategoryStats
} from "../data/parentCategories";
import {
  Clapperboard,
  TrendingUp,
  FileText,
  Code2,
  HeartPulse,
  LayoutGrid,
  Image as ImageIcon,
  Video as VideoIcon,
  Music as MusicIcon,
  Palette,
  Megaphone,
  Briefcase,
  Search,
  Share2,
  BarChart3,
  Scale,
  Bot,
  GraduationCap,
  Terminal,
  ScanLine,
  Home,
  Heart,
  Compass,
  ArrowRight,
  Sparkles,
  Layers,
  CheckCircle2,
  ChevronRight
} from "lucide-react";

// Icon mapping for categories
const CATEGORY_ICON_MAP: Record<string, React.ElementType> = {
  "image-generators": ImageIcon,
  "video-generator": VideoIcon,
  "music-audio": MusicIcon,
  "creative-design": Palette,
  "marketing": Megaphone,
  "business-management": Briefcase,
  "business-research": Search,
  "social-growth-hub": Share2,
  "neural-analytics-hub": BarChart3,
  "law-finance": Scale,
  "office-productivity": Layers,
  "ai-chatbots": Bot,
  "education-translation": GraduationCap,
  "developer-tools": Terminal,
  "image-analysis": ScanLine,
  "interior-architectural": Home,
  "ai-lifestyle-directory": Compass,
  "smart-medical-directory": Heart,
  "other": Sparkles
};

const PARENT_ICON_MAP: Record<string, React.ElementType> = {
  "ai-media-studio": Clapperboard,
  "business-growth": TrendingUp,
  "productivity-communication": FileText,
  "tech-development": Code2,
  "lifestyle-specialized": HeartPulse,
  "general": LayoutGrid
};

export const FixedMegaMenu: FC = () => {
  const [activeParentId, setActiveParentId] = useState<string>("ai-media-studio");
  const [viewMode, setViewMode] = useState<"tabs" | "grid">("tabs");

  // Listen for hash changes from navbar or external links
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (parentCategories.some((p) => p.id === hash)) {
        setActiveParentId(hash);
        const el = document.getElementById("mega-menu-hub");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const activeParent =
    parentCategories.find((p) => p.id === activeParentId) || parentCategories[0];
  const memberCats = getCategoriesForParent(activeParent);
  const stats = getParentCategoryStats(activeParent);
  const [selectedCatId, setSelectedCatId] = useState<string>(memberCats[0]?.id || "");

  // Update selected member category when active parent category changes
  useEffect(() => {
    if (memberCats.length > 0) {
      setSelectedCatId(memberCats[0].id);
    }
  }, [activeParentId]);

  const ParentIcon = PARENT_ICON_MAP[activeParent.id] || Sparkles;

  return (
    <section
      id="mega-menu-hub"
      className="w-full max-w-7xl mx-auto mt-12 sm:mt-16 relative z-20 scroll-mt-28"
    >
      {/* Section Header: Eyebrow + Title + View Mode Switcher */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-4 px-2">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Super-Categories &bull; 242 Sub-Categories</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
            Browse by Category <span className="text-emerald-400">Hub</span>
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Explore the complete AI ecosystem directly on the homepage without cumbersome dropdown menus.
          </p>
        </div>

        {/* View Switcher: Tabs vs Grid */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md self-start md:self-auto">
          <button
            type="button"
            onClick={() => setViewMode("tabs")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === "tabs"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Active Hub View
          </button>
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === "grid"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            All 6 Hubs
          </button>
        </div>
      </div>

      {/* PARENT HUBS NAVIGATION TABS (Horizontal Scroll on Mobile, Flex on Desktop) */}
      <div className="mb-6 overflow-x-auto no-scrollbar pb-2 -mx-2 px-2">
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-max">
          {parentCategories.map((parent) => {
            const isActive = activeParentId === parent.id;
            const Icon = PARENT_ICON_MAP[parent.id] || Sparkles;
            const parentStats = getParentCategoryStats(parent);

            return (
              <button
                key={parent.id}
                type="button"
                onClick={() => {
                  setActiveParentId(parent.id);
                  if (viewMode === "grid") {
                    const el = document.getElementById(`hub-card-${parent.id}`);
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap border ${
                  isActive
                    ? "bg-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-600/30 scale-100"
                    : "bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border-white/10 hover:border-white/20"
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-emerald-400"}`} />
                <span>{parent.shortName}</span>
                <span
                  className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                  }`}
                >
                  {parentStats.totalTools}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* MODE 1: TABBED VIEW (Single prominent Dark Glass Mega-Menu Panel) */}
      {viewMode === "tabs" && (
        <motion.div
          key={activeParent.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="glass-mega-panel rounded-[2rem] p-5 sm:p-7 md:p-8 text-white relative overflow-hidden flex flex-col justify-between shadow-2xl w-full border border-white/15"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            {/* Header of Mega-Menu */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-5 border-b border-white/10 gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 shadow-inner">
                  <ParentIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-white tracking-tight flex items-center gap-2.5">
                    {activeParent.name}
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {stats.totalTools} Tools
                    </span>
                    <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 text-slate-400 border border-white/10">
                      {memberCats.length} Categories
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">{activeParent.description}</p>
                </div>
              </div>

              <Link
                to={`/categories#${activeParent.id}`}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <span>Full Directory Overview</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Two-Column Internal Layout (Responsive: Stack on mobile, 2-col on md/lg) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
              
              {/* COL 1: Member Categories (5 cols) */}
              <div className="md:col-span-5 space-y-2">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1 flex items-center justify-between">
                  <span>Categories ({memberCats.length})</span>
                  <span className="text-[9px] text-slate-500 font-normal">Click or hover to explore</span>
                </div>

                <div className="space-y-1.5 max-h-[380px] overflow-y-auto pr-1">
                  {memberCats.map((cat) => {
                    const CatIcon = CATEGORY_ICON_MAP[cat.id] || Sparkles;
                    const isSelected = selectedCatId === cat.id;
                    const totalCatTools = cat.subCategories.reduce((sum, s) => sum + s.count, 0);

                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCatId(cat.id)}
                        onMouseEnter={() => setSelectedCatId(cat.id)}
                        className={`w-full text-left flex items-start gap-3 p-3 rounded-2xl transition-all group/row border cursor-pointer ${
                          isSelected
                            ? "bg-emerald-500/20 border-l-4 border-l-emerald-400 border-emerald-500/40 shadow-sm"
                            : "border-transparent hover:bg-emerald-500/10 hover:border-emerald-500/30"
                        }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-transform group-hover/row:scale-110 ${
                            isSelected
                              ? "bg-emerald-400 text-slate-950 font-bold"
                              : "bg-emerald-500/15 text-emerald-400"
                          }`}
                        >
                          <CatIcon className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div
                            className={`text-xs sm:text-sm font-bold transition-colors truncate ${
                              isSelected ? "text-emerald-300" : "text-white group-hover/row:text-emerald-300"
                            }`}
                          >
                            {cat.name}
                          </div>
                          <div
                            className={`text-[11px] truncate mt-0.5 ${
                              isSelected ? "text-emerald-100/75" : "text-slate-400"
                            }`}
                          >
                            {cat.subCategories.length} subcategories &bull; {totalCatTools} tools
                          </div>
                        </div>
                        <ChevronRight
                          className={`w-4 h-4 shrink-0 transition-transform ${
                            isSelected ? "text-emerald-400 translate-x-0.5" : "text-slate-600 opacity-0 group-hover/row:opacity-100"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* COL 2: Topic Sections & Direct Subcategory Pills (7 cols) */}
              <div className="md:col-span-7 bg-white/[0.04] p-4 sm:p-5 rounded-3xl border border-white/5 space-y-4 max-h-[400px] overflow-y-auto">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center justify-between pb-1 border-b border-white/5">
                  <span>Subcategories &bull; 1-Click Direct Access</span>
                  <span className="text-emerald-400 text-[10px] font-bold">100% Free</span>
                </div>

                {activeParent.topicSections.map((topic, tIdx) => (
                  <div key={tIdx} className="space-y-2">
                    <div className="text-[11px] font-black uppercase tracking-[0.18em] text-emerald-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>{topic.title}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {topic.items.map((item, iIdx) => (
                        <Link
                          key={iIdx}
                          to={`/category/${item.path}`}
                          className="text-xs font-medium text-slate-300 bg-white/5 hover:bg-emerald-500/20 hover:text-emerald-300 border border-emerald-500/20 hover:border-emerald-400/50 px-3 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap active:scale-95 shadow-2xs"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Bottom Bar with Direct Links */}
          <div className="pt-4 mt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <span className="text-slate-400 text-xs">
              {activeParent.focus}
            </span>
            <Link
              to={`/categories#${activeParent.id}`}
              className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold transition-colors"
            >
              <span>View all {activeParent.name} tools ({stats.totalTools} tools)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      )}

      {/* MODE 2: ALL 6 HUBS GRID VIEW (Responsive Bento) */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {parentCategories.map((parent) => {
            const Icon = PARENT_ICON_MAP[parent.id] || Sparkles;
            const parentStats = getParentCategoryStats(parent);
            const parentMemberCats = getCategoriesForParent(parent);

            return (
              <div
                key={parent.id}
                id={`hub-card-${parent.id}`}
                className="glass-mega-panel rounded-[2rem] p-5 sm:p-6 text-white relative overflow-hidden flex flex-col justify-between shadow-xl border border-white/10"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/10">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-base sm:text-lg text-white flex items-center gap-2">
                          {parent.name}
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            {parentStats.totalTools}
                          </span>
                        </h3>
                        <p className="text-[11px] text-slate-400">{parent.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Subcategories preview pills */}
                  <div className="space-y-3">
                    {parent.topicSections.map((topic, tIdx) => (
                      <div key={tIdx}>
                        <div className="text-[10px] font-black uppercase tracking-wider text-emerald-400 mb-1.5 flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-emerald-400" />
                          <span>{topic.title}</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {topic.items.slice(0, 5).map((item, iIdx) => (
                            <Link
                              key={iIdx}
                              to={`/category/${item.path}`}
                              className="text-[11px] font-medium text-slate-300 bg-white/5 hover:bg-emerald-500/20 hover:text-emerald-300 border border-emerald-500/20 px-2.5 py-1 rounded-full transition-colors cursor-pointer"
                            >
                              {item.name}
                            </Link>
                          ))}
                          {topic.items.length > 5 && (
                            <Link
                              to={`/categories#${parent.id}`}
                              className="text-[11px] font-bold text-emerald-400 hover:text-emerald-300 px-2 py-1"
                            >
                              +{topic.items.length - 5} more &rarr;
                            </Link>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom link */}
                <div className="pt-4 mt-5 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px] truncate max-w-[200px]">
                    {parentMemberCats.length} Categories
                  </span>
                  <Link
                    to={`/categories#${parent.id}`}
                    className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold transition-colors"
                  >
                    <span>Explore {parent.shortName}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
export default FixedMegaMenu;
