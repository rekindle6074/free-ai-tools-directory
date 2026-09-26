import React, { FC, useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Clapperboard,
  TrendingUp,
  FileText,
  Code2,
  HeartPulse,
  LayoutGrid,
  Sparkles,
  Layers,
  ArrowRight,
  CheckCircle2,
  Search
} from "lucide-react";
import { SEO } from "../components/SEO";
import { STATIC_PAGE_SEO, createItemListSchema } from "../lib/seoHelpers";
import { GridBackground } from "../components/ui/grid-background";
import { CategoryIconBadge } from "../components/CategoryIconBadge";
import {
  parentCategories,
  getCategoriesForParent,
  getParentCategoryStats,
  ParentCategory
} from "../data/parentCategories";
import { categories } from "../data/tools";

const PARENT_ICON_MAP: Record<string, React.ElementType> = {
  "ai-media-studio": Clapperboard,
  "business-growth": TrendingUp,
  "productivity-communication": FileText,
  "tech-development": Code2,
  "lifestyle-specialized": HeartPulse,
  "general": LayoutGrid
};

// Interactive Modern Mega Panel Card for Showcase
interface MegaPanelCardProps {
  parent: ParentCategory;
}

const MegaPanelCard: FC<MegaPanelCardProps> = ({ parent }) => {
  const memberCats = getCategoriesForParent(parent);
  const stats = getParentCategoryStats(parent);
  const [selectedCatId, setSelectedCatId] = useState<string>(memberCats[0]?.id || "");
  const ParentIcon = PARENT_ICON_MAP[parent.id] || Sparkles;

  return (
    <div className="glass-mega-panel rounded-[2rem] p-6 text-white relative overflow-hidden flex flex-col justify-between group shadow-xl">
      {/* Background ambient glow */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div>
        {/* Header of Menu Panel */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <CategoryIconBadge
              categoryId={parent.id}
              categoryName={parent.name}
              fallbackIcon={ParentIcon}
              size="md"
              className="border-white/20 shadow-xs shrink-0"
            />
            <div>
              <h3 className="font-display font-bold text-lg text-white tracking-tight flex items-center gap-2">
                {parent.name}
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {stats.totalTools} Tools
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">{parent.description}</p>
            </div>
          </div>
        </div>

        {/* Two-Column Internal Mega Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* COL 1: Category Rows (5 cols) */}
          <div className="md:col-span-5 space-y-1.5">
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-2 mb-1">
              Categories ({memberCats.length})
            </div>

            <div className="space-y-1 max-h-[340px] overflow-y-auto pr-1">
              {memberCats.map((cat) => {
                const isSelected = selectedCatId === cat.id;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setSelectedCatId(cat.id);
                      const el = document.getElementById(cat.id);
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    onMouseEnter={() => setSelectedCatId(cat.id)}
                    className={`w-full text-left flex items-start gap-2.5 p-2.5 rounded-xl transition-all group/row border cursor-pointer ${
                      isSelected
                        ? "bg-emerald-500/15 border-l-2 border-l-emerald-400 border-emerald-500/30 shadow-sm"
                        : "border-transparent hover:bg-emerald-500/10 hover:border-emerald-500/30"
                    }`}
                  >
                    <CategoryIconBadge
                      categoryId={cat.id}
                      categoryName={cat.name}
                      fallbackIcon={Sparkles}
                      size="sm"
                      isSelected={isSelected}
                      className="mt-0.5 group-hover/row:scale-110 !w-6 !h-6"
                    />
                    <div className="flex-1 min-w-0">
                      <div
                        className={`text-xs font-bold truncate transition-colors ${
                          isSelected ? "text-emerald-300" : "text-white group-hover/row:text-emerald-300"
                        }`}
                      >
                        {cat.name}
                      </div>
                      <div
                        className={`text-[10px] truncate ${
                          isSelected ? "text-emerald-100/70" : "text-slate-400"
                        }`}
                      >
                        {cat.subCategories.length} subcategories &bull; {cat.subCategories.reduce((sum, s) => sum + s.count, 0)} tools
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* COL 2: Grouped Subcategories / Topic Sections (7 cols) */}
          <div className="md:col-span-7 bg-white/[0.04] p-3.5 rounded-2xl border border-white/5 space-y-3.5 max-h-[340px] overflow-y-auto">
            {parent.topicSections.map((topic, tIdx) => (
              <div key={tIdx}>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 mb-1.5 flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-emerald-400" />
                  {topic.title}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {topic.items.map((item, iIdx) => (
                    <Link
                      key={iIdx}
                      to={`/category/${item.path}`}
                      className="text-[11px] font-medium text-slate-300 bg-white/5 hover:bg-emerald-500/20 hover:text-emerald-300 border border-emerald-500/20 px-2.5 py-1 rounded-full transition-colors cursor-pointer whitespace-nowrap active:scale-95"
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

      {/* Bottom Action Link */}
      <div className="pt-4 mt-5 border-t border-white/10 flex items-center justify-between text-xs">
        <span className="text-slate-400 text-[11px] truncate max-w-[200px]">
          {parent.focus}
        </span>
        <a
          href={`#${parent.id}`}
          className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold transition-colors cursor-pointer"
        >
          <span>View all {parent.name} ({stats.totalTools} tools)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};

const CategoriesPage: FC = () => {
  const [selectedParentId, setSelectedParentId] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredParents =
    selectedParentId === "all"
      ? parentCategories
      : parentCategories.filter((p) => p.id === selectedParentId);

  const totalSubcategories = categories.reduce((sum, c) => sum + c.subCategories.length, 0);

  const getDisplayTitle = (name: string) => {
    let base = name;
    if (base.startsWith("Free AI ")) base = base.substring(8);
    else if (base.startsWith("Free ")) base = base.substring(5);
    else if (base.startsWith("AI ")) base = base.substring(3);
    return `Free AI ${base}`;
  };

  const categoriesItemListSchema = createItemListSchema(
    "Free AI Software Categories",
    `Explore ${categories.length} major AI categories and ${totalSubcategories} specialized subcategories for free artificial intelligence tools.`,
    parentCategories.map(pc => ({
      name: pc.name,
      url: `https://free-ai-tools-directory.vercel.app/categories#${pc.id}`,
      description: pc.description
    }))
  );

  return (
    <>
      <SEO
        title={STATIC_PAGE_SEO.categories.title}
        description={STATIC_PAGE_SEO.categories.description}
        canonical="/categories"
        ogType="website"
        keywords="ai categories, super categories, free ai tools directory, ai media studio, ai business, ai productivity"
        jsonLd={categoriesItemListSchema}
      />

      <GridBackground className="pt-32 sm:pt-36 pb-24">
        <div className="px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
          
          {/* Hero Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 text-xs font-bold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Super-Categories Architecture &bull; {parentCategories.length} Hubs</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-slate-900 mb-6 tracking-[-0.04em] leading-[0.95]">
              Discovery <span className="text-emerald-600">Hub</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto mb-8 font-medium">
              {totalSubcategories} subcategories precisely grouped into {parentCategories.length} mother categories for smooth, intuitive, and cognitive-load-free navigation.
            </p>

            {/* Parent Category Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 max-w-5xl mx-auto">
              <button
                onClick={() => setSelectedParentId("all")}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all border cursor-pointer ${
                  selectedParentId === "all"
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-500/25"
                    : "bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 border-slate-200 shadow-xs"
                }`}
              >
                All {parentCategories.length} Hubs
              </button>

              {parentCategories.map((parent) => {
                const Icon = PARENT_ICON_MAP[parent.id] || Sparkles;
                const isSelected = selectedParentId === parent.id;
                return (
                  <button
                    key={parent.id}
                    onClick={() => setSelectedParentId(parent.id)}
                    className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all border cursor-pointer ${
                      isSelected
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-500/25"
                        : "bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 border-slate-200 shadow-xs"
                    }`}
                  >
                    <CategoryIconBadge
                      categoryId={parent.id}
                      categoryName={parent.name}
                      fallbackIcon={Icon}
                      size="xs"
                      className="!w-4 !h-4 rounded-sm border-0 shrink-0"
                    />
                    <span>{parent.shortName}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* ========================================================================= */}
          {/* MEGA-MENU SHOWCASE: HIGH-FIDELITY MODERN MULTI-PANEL GRID */}
          {/* ========================================================================= */}
          <section className="mb-20">
            {/* Section Annotation / Visual indicator */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 px-2 gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                  Interactive Mega-Menu Showcase &bull; Modern Navigation Panels
                </h2>
              </div>
              <div className="text-xs text-slate-500 font-medium flex items-center gap-2">
                <span>Dark Glass Aesthetic</span>
                <code className="text-emerald-700 font-mono text-[11px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  bg-slate-900/40 backdrop-blur-md
                </code>
              </div>
            </div>

            {/* Grid of the Modern Mega Panels */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {filteredParents.slice(0, selectedParentId === "all" ? 6 : 3).map((parent) => (
                <MegaPanelCard key={parent.id} parent={parent} />
              ))}
            </div>
          </section>

          {/* ===================================================================== */}
          {/* SUMMARY FOOTER BANNER / ARCHITECTURAL BENEFITS */}
          {/* ===================================================================== */}
          <div className="mb-24 p-6 sm:p-8 rounded-3xl bg-white/80 border border-slate-200/80 backdrop-blur-xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 shrink-0">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display font-bold text-base sm:text-lg text-slate-900">
                  {parentCategories.length} Super-Categories Architecture &bull; FreeAI Tools
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5 max-w-2xl">
                  Ergonomic consolidation of {totalSubcategories} granular subcategories into {parentCategories.length} clearly structured parent categories with contextual mega-menu navigation.
                </p>
              </div>
            </div>

            {/* Metric Badges */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="text-center px-4 py-2 rounded-2xl bg-slate-100/80 border border-slate-200">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                  Subcategories
                </div>
                <div className="font-display font-bold text-emerald-600 text-lg">
                  {totalSubcategories}
                </div>
              </div>
              <div className="text-center px-4 py-2 rounded-2xl bg-slate-100/80 border border-slate-200">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                  Super Categories
                </div>
                <div className="font-display font-bold text-slate-900 text-lg">
                  {parentCategories.length}
                </div>
              </div>
              <div className="text-center px-4 py-2 rounded-2xl bg-emerald-50 border border-emerald-200">
                <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider text-[10px]">
                  Access
                </div>
                <div className="font-display font-bold text-emerald-600 text-lg">
                  100% Free
                </div>
              </div>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* DEEP DIRECTORY EXPLORER: ALL MEMBER CATEGORIES & SUBCATEGORIES */}
          {/* ===================================================================== */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900">
                Detailed Directory by Hub
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Explore all {totalSubcategories} subcategories with direct instant search filtering.
              </p>
            </div>

            {/* Live Filter/Search */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter a subcategory..."
                className="w-full pl-10 pr-4 py-2 rounded-full text-xs bg-white border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="space-y-16">
            {filteredParents.map((parent: ParentCategory, pIdx: number) => {
              const memberCats = getCategoriesForParent(parent);
              const stats = getParentCategoryStats(parent);
              const ParentIcon = PARENT_ICON_MAP[parent.id] || Sparkles;

              return (
                <motion.section
                  key={parent.id}
                  id={parent.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: pIdx * 0.08, duration: 0.6 }}
                  className="rounded-[2.5rem] bg-white/70 backdrop-blur-xl border border-slate-200/80 p-6 sm:p-10 lg:p-12 shadow-sm hover:shadow-xl transition-all duration-500 scroll-mt-28"
                >
                  {/* Mother Category Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-slate-100 gap-4">
                    <div className="flex items-center gap-4">
                      <CategoryIconBadge
                        categoryId={parent.id}
                        categoryName={parent.name}
                        fallbackIcon={ParentIcon}
                        size="xl"
                        className="!w-14 !h-14 rounded-2xl shadow-sm border-emerald-500/20 shrink-0"
                      />
                      <div>
                        <div className="flex flex-wrap items-center gap-2.5 mb-1">
                          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">
                            {parent.name}
                          </h2>
                          <span className="text-xs font-black uppercase tracking-wider px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {stats.totalTools}+ Tools
                          </span>
                          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-0.5 rounded-full border border-slate-200">
                            {memberCats.length} Categories
                          </span>
                        </div>
                        <p className="text-sm text-slate-500 font-medium">
                          {parent.focus}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                      <span>{stats.totalSubcategories} subcategories</span>
                    </div>
                  </div>

                  {/* Member Categories & Their Subcategories */}
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                      {memberCats.map((category) => {
                        const matchingSubs = category.subCategories.filter((sub) =>
                          searchQuery.trim() === ""
                            ? true
                            : sub.name.toLowerCase().includes(searchQuery.toLowerCase())
                        );

                        if (searchQuery.trim() !== "" && matchingSubs.length === 0) {
                          return null;
                        }

                        return (
                          <div
                            key={category.id}
                            id={category.id}
                            className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-100 shadow-sm scroll-mt-32"
                          >
                            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                              <div className="flex items-center gap-3.5">
                                <CategoryIconBadge
                                  categoryId={category.id}
                                  categoryName={category.name}
                                  fallbackIcon={Sparkles}
                                  size="lg"
                                  className="shadow-sm border-emerald-500/30"
                                />
                                <div>
                                  <h4 className="text-lg sm:text-xl font-display font-bold text-slate-900">
                                    {category.name}
                                  </h4>
                                  <span className="text-xs text-slate-400 font-medium">
                                    {matchingSubs.length} subcategories
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                              {matchingSubs.map((sub, sIdx) => {
                                const displayTitle = getDisplayTitle(sub.name);
                                return (
                                  <Link
                                    key={sIdx}
                                    to={`/category/${sub.path}`}
                                    className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50/70 hover:bg-emerald-50/50 border border-slate-100 hover:border-emerald-300 transition-all group/sub shadow-2xs hover:shadow-sm"
                                  >
                                    <div className="flex flex-col pr-2 min-w-0">
                                      <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover/sub:text-emerald-700 transition-colors truncate">
                                        {displayTitle}
                                      </span>
                                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                        {sub.count} Tools
                                      </span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover/sub:text-emerald-600 transition-transform group-hover/sub:translate-x-1 shrink-0" />
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.section>
              );
            })}
          </div>

        </div>
      </GridBackground>
    </>
  );
};

export default CategoriesPage;
