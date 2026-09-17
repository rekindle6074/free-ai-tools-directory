import { FC, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { 
  ChevronLeft, 
  ExternalLink, 
  Heart, 
  Share2, 
  ShieldCheck, 
  Sparkles, 
  Star, 
  Zap,
  CheckCircle2,
  Tag
} from "lucide-react";
import { findToolById } from "../lib/toolDirectory";
import { toolsByTag, Tool } from "../data/tools";
import { SEO } from "../components/SEO";
import ToolCard from "../components/ToolCard";
import { useFavorites } from "../context/FavoritesContext";
import { getToolSeoTitle, getToolSeoDescription, createSoftwareApplicationSchema } from "../lib/seoHelpers";
import { GridBackground } from "../components/ui/grid-background";
import { getCategoryLogo } from "../data/categoryLogos";

export const ToolDetailPage: FC = () => {
  const { toolId } = useParams<{ toolId: string }>();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  
  const { 
    isFavorite: checkIsFavorite, 
    toggleFavorite, 
    getNote, 
    saveNote,
    user 
  } = useFavorites();

  const tool = findToolById(toolId || "");
  const isFavorite = checkIsFavorite(tool.id);
  const note = getNote(tool.id);
  const [tempNote, setTempNote] = useState(note);
  const [isEditingNote, setIsEditingNote] = useState(false);

  // Find related tools from the same category
  const allToolsInCategory: Tool[] = [];
  Object.values(toolsByTag).forEach((list) => {
    list.forEach((t) => {
      if (t.category === tool.category && t.id !== tool.id) {
        if (!allToolsInCategory.some(existing => existing.id === t.id)) {
          allToolsInCategory.push(t);
        }
      }
    });
  });
  const relatedTools = allToolsInCategory.slice(0, 3);

  // Dynamic SEO metadata
  const title = getToolSeoTitle(tool.name, tool.category);
  const description = getToolSeoDescription(tool.name, tool.description, tool.category);
  const canonical = `/tool/${tool.id}`;
  const ogImage = tool.iconUrl || "https://free-ai-tools-directory.vercel.app/og-image.jpg";

  const jsonLd = createSoftwareApplicationSchema({
    name: tool.name,
    description: tool.description,
    url: tool.link || `https://free-ai-tools-directory.vercel.app/tool/${tool.id}`,
    applicationCategory: tool.category,
    operatingSystem: "Web",
    price: "0",
    ratingValue: tool.score || 9.5,
    ratingCount: "150"
  });

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: window.location.href,
        });
      } catch (err) {
        // Ignored if user dismissed
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <SEO
        title={title}
        description={description}
        canonical={canonical}
        ogImage={ogImage}
        ogType="article"
        jsonLd={jsonLd}
        keywords={`free ai ${tool.name.toLowerCase()}, ${tool.name} review, free ${tool.category.toLowerCase()} ai, best free ai tools`}
      />

      <GridBackground className="pt-32 sm:pt-36 pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-3 mb-8 text-xs font-semibold text-slate-500">
            <Link to="/" className="hover:text-emerald-600 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/browse" className="hover:text-emerald-600 transition-colors">Directory</Link>
            <span>/</span>
            <Link to="/categories" className="hover:text-emerald-600 transition-colors flex items-center gap-1.5">
              {getCategoryLogo(tool.category) && (
                <img src={getCategoryLogo(tool.category)!} alt="" className="w-3.5 h-3.5 rounded-xs object-cover" />
              )}
              <span>{tool.category}</span>
            </Link>
            <span>/</span>
            <span className="text-emerald-600 font-bold">{tool.name}</span>
          </div>

          <div className="mb-6">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-emerald-600 bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-200/80 shadow-xs transition-all"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
          </div>

          {/* Main Tool Sheet Hero */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-10 shadow-sm mb-10"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-8 border-b border-slate-100">
              <div className="flex items-start gap-5">
                <div className="w-20 h-20 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center p-3 shrink-0 shadow-xs">
                  {tool.iconUrl ? (
                    <img 
                      src={tool.iconUrl} 
                      alt={`${tool.name} - ${tool.category} AI tool logo`} 
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <Zap className="w-10 h-10 text-emerald-600" />
                  )}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                      {tool.name}
                    </h1>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Free Tool
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold text-slate-700 bg-slate-100 border border-slate-200 shadow-2xs">
                      {getCategoryLogo(tool.category) ? (
                        <img
                          src={getCategoryLogo(tool.category)!}
                          alt={`${tool.category} logo`}
                          className="w-4 h-4 rounded-sm object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <Tag className="w-3.5 h-3.5 text-slate-400" />
                      )}
                      {tool.category}
                    </span>
                  </div>

                  <p className="text-slate-600 text-base leading-relaxed max-w-2xl">
                    {tool.description}
                  </p>
                </div>
              </div>

              {/* Rating & Actions */}
              <div className="flex md:flex-col items-center md:items-end justify-between gap-3 shrink-0">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 font-black text-sm rounded-xl border border-emerald-100">
                  <Star className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                  <span>{tool.stars ? `★ ${tool.stars}` : `SCORE: ${tool.score}`}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleFavorite(tool.id, note)}
                    className={`p-2.5 rounded-xl border transition-all ${
                      isFavorite
                        ? "bg-rose-50 text-rose-600 border-rose-200"
                        : "bg-white text-slate-500 border-slate-200 hover:text-rose-600 hover:border-rose-100"
                    }`}
                    title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                  >
                    <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
                  </button>

                  <button
                    onClick={handleShare}
                    className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-500 hover:text-emerald-600 hover:border-emerald-200 transition-all"
                    title="Share this tool"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  {copied && (
                    <span className="text-xs font-bold text-emerald-600 animate-fade-in">Copied!</span>
                  )}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified 100% Free AI Alternative &bull; No credit card required</span>
              </div>

              <a
                href={tool.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit official website for ${tool.name}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-slate-900 text-white font-bold text-sm rounded-xl hover:bg-emerald-600 transition-all shadow-md shadow-slate-900/10 hover:shadow-emerald-500/20"
              >
                <span>Visit {tool.name} Official Website</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Notes Card */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" /> Personal Notes
              </h2>
              {note && !isEditingNote && (
                <button
                  onClick={() => setIsEditingNote(true)}
                  className="text-xs font-bold text-emerald-600 hover:underline"
                >
                  Edit Note
                </button>
              )}
            </div>

            {isEditingNote || !note ? (
              <div className="space-y-3">
                <textarea
                  value={tempNote}
                  onChange={(e) => setTempNote(e.target.value)}
                  placeholder="Add your personal notes or reminders about this tool..."
                  className="w-full text-sm p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 min-h-[90px] resize-none font-sans"
                />
                <div className="flex justify-end gap-2">
                  {note && (
                    <button
                      onClick={() => {
                        setTempNote(note);
                        setIsEditingNote(false);
                      }}
                      className="text-xs font-bold text-slate-500 hover:text-slate-800 px-3 py-1.5"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    onClick={async () => {
                      await saveNote(tool.id, tempNote);
                      setIsEditingNote(false);
                    }}
                    className="bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-emerald-600 transition-all"
                  >
                    Save Note
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-slate-700 text-sm whitespace-pre-wrap bg-slate-50 p-4 rounded-2xl border border-slate-100">
                {note}
              </p>
            )}
          </div>

          {/* Related Tools */}
          {relatedTools.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900">
                  More Free AI Tools in {tool.category}
                </h2>
                <Link
                  to="/browse"
                  aria-label={`Browse all ${tool.category} free AI tools`}
                  className="text-xs font-bold text-emerald-600 hover:underline"
                >
                  Browse all {tool.category} tools &rarr;
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedTools.map((t) => (
                  <ToolCard key={t.id} tool={t} />
                ))}
              </div>
            </div>
          )}

        </div>
      </GridBackground>
    </>
  );
};

export default ToolDetailPage;
