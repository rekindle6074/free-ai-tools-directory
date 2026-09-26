import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  ParentCategory,
  getCategoriesForParent,
  getParentCategoryStats
} from "../data/parentCategories";
import { CategoryIconBadge } from "./CategoryIconBadge";
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
  Layers
} from "lucide-react";

interface MegaMenuProps {
  parentCategory: ParentCategory;
  onClose: () => void;
}

// Icon mapping for categories
const CATEGORY_ICON_MAP: Record<string, React.ElementType> = {
  "image-generators": ImageIcon,
  "video-generator": VideoIcon,
  "music-audio": MusicIcon,
  "creative-design": Palette,
  "marketing": Megaphone,
  "business-ai": Briefcase,
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

export const MegaMenu: React.FC<MegaMenuProps> = ({ parentCategory, onClose }) => {
  const memberCats = getCategoriesForParent(parentCategory);
  const stats = getParentCategoryStats(parentCategory);
  const [selectedCatId, setSelectedCatId] = useState<string>(memberCats[0]?.id || "");

  const ParentIcon = PARENT_ICON_MAP[parentCategory.id] || Sparkles;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className="glass-mega-panel rounded-[2rem] p-6 text-white relative overflow-hidden flex flex-col justify-between shadow-2xl w-full max-w-5xl mx-auto"
    >
      {/* Background accent glow */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div>
        {/* Header of Menu Panel */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <CategoryIconBadge
              categoryId={parentCategory.id}
              categoryName={parentCategory.name}
              fallbackIcon={ParentIcon}
              size="md"
              className="!w-8 !h-8 rounded-xl shadow-inner border-white/20 shrink-0"
            />
            <div>
              <h3 className="font-display font-bold text-lg text-white tracking-tight flex items-center gap-2">
                {parentCategory.name}
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {stats.totalTools} Tools
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">{parentCategory.description}</p>
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

            <div className="space-y-1 max-h-[360px] overflow-y-auto pr-1">
              {memberCats.map((cat) => {
                const CatIcon = CATEGORY_ICON_MAP[cat.id] || Sparkles;
                const isSelected = selectedCatId === cat.id;

                return (
                  <Link
                    key={cat.id}
                    to={`/categories#${cat.id}`}
                    onClick={onClose}
                    onMouseEnter={() => setSelectedCatId(cat.id)}
                    className={`flex items-start gap-2.5 p-2.5 rounded-xl transition-all group/row border ${
                      isSelected
                        ? "bg-emerald-500/15 border-l-2 border-l-emerald-400 border-emerald-500/30 shadow-sm"
                        : "border-transparent hover:bg-emerald-500/10 hover:border-emerald-500/30"
                    }`}
                  >
                    <CategoryIconBadge
                      categoryId={cat.id}
                      categoryName={cat.name}
                      fallbackIcon={CatIcon}
                      size="sm"
                      isSelected={isSelected}
                      className="mt-0.5 group-hover/row:scale-110"
                    />
                    <div className="flex-1 min-w-0">
                      <div
                        className={`text-xs font-bold transition-colors ${
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
                  </Link>
                );
              })}
            </div>
          </div>

          {/* COL 2: Grouped Subcategories / Topic Sections (7 cols) */}
          <div className="md:col-span-7 bg-white/[0.04] p-3.5 rounded-2xl border border-white/5 space-y-3.5 max-h-[380px] overflow-y-auto">
            {parentCategory.topicSections.map((topic, tIdx) => (
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
                      onClick={onClose}
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
        <span className="text-slate-400 text-[11px]">
          {parentCategory.focus}
        </span>
        <Link
          to={`/categories#${parentCategory.id}`}
          onClick={onClose}
          className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold transition-colors"
        >
          <span>View all {parentCategory.name} ({stats.totalTools} tools)</span>
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"/>
            <path d="m12 5 7 7-7 7"/>
          </svg>
        </Link>
      </div>
    </motion.div>
  );
};
