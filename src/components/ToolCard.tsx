import { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  Zap, 
  ExternalLink, 
  Heart, 
  MessageSquare, 
  Save, 
  X,
  Video,
  Code2,
  Image as ImageIcon,
  Globe,
  Music,
  Database,
  Mic2,
  ScanText,
  Eye,
  Sparkles,
  User,
  FileText,
  Scissors,
  Scan,
  Scale,
  Banknote,
  TrendingUp,
  Home,
  Bot,
  Calculator,
  Gavel,
  Megaphone,
  Target,
  Search,
  FolderHeart,
  FolderPlus,
  Plus
} from "lucide-react";
import { Tool } from "../data/tools";
import { useFavorites } from "../context/FavoritesContext";
import { FOLDER_COLORS, getFolderColor } from "../lib/folderColors";

import { Button } from "./ui/Button";
import { ExploreToolIcon, SaveIcon } from "./ui/Icons";

const IconMap: Record<string, any> = {
  Video,
  Code2,
  Image: ImageIcon,
  Globe,
  Music,
  Database,
  Mic2,
  ScanText,
  Eye,
  Sparkles,
  User,
  FileText,
  Scissors,
  Scan,
  Scale,
  Banknote,
  TrendingUp,
  Home,
  Bot,
  Calculator,
  Gavel,
  Megaphone,
  Target,
  Search,
  Zap
};

interface ToolCardProps {
  tool: Tool;
  initiallyFavorite?: boolean;
}

const ToolCard: FC<ToolCardProps> = ({ tool, initiallyFavorite = false }) => {
  const { 
    user, 
    isFavorite: checkIsFavorite, 
    getNote, 
    toggleFavorite, 
    saveNote, 
    folders, 
    createFolder, 
    toggleToolInFolder, 
    openAuthModal 
  } = useFavorites();

  const isFavorite = checkIsFavorite(tool.id) || (initiallyFavorite && !user);
  const note = getNote(tool.id);

  const [isEditingNote, setIsEditingNote] = useState(false);
  const [tempNote, setTempNote] = useState("");
  const [showFolderSelector, setShowFolderSelector] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [selectedFolderColor, setSelectedFolderColor] = useState("emerald");
  const [isActionPending, setIsActionPending] = useState(false);

  const [imageError, setImageError] = useState(false);
  const Icon = IconMap[tool.icon] || Zap;

  // Tiered icon fallback system
  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname;
    } catch (e) {
      return "";
    }
  };

  const domain = getDomain(tool.link);
  const localIconUrl = `/icons/${domain}-128x128__Estimated_.png`;
  const googleIconUrl = domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128` : null;

  // Initial state: tool.iconUrl -> local custom icon -> google favicon
  const [iconToDisplay, setIconToDisplay] = useState(tool.iconUrl || localIconUrl);
  const [fallbackLevel, setFallbackLevel] = useState(0); // 0: primary, 1: google fallback, 2: category icon

  const handleIconError = () => {
    if (fallbackLevel === 0 && googleIconUrl && iconToDisplay !== googleIconUrl) {
      setIconToDisplay(googleIconUrl);
      setFallbackLevel(1);
    } else {
      setImageError(true);
      setFallbackLevel(2);
    }
  };

  const handleCreateFolderInline = async () => {
    const name = newFolderName.trim();
    if (!name) return;
    try {
      const folderId = await createFolder(name, selectedFolderColor);
      await toggleToolInFolder(folderId, tool.id);
      setNewFolderName("");
      setSelectedFolderColor("emerald");
    } catch (e) {
      console.error("Error creating inline folder:", e);
    }
  };

  const handleToggleFavorite = async () => {
    if (isActionPending) return;
    setIsActionPending(true);
    try {
      await toggleFavorite(tool.id, note);
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
    } finally {
      setIsActionPending(false);
    }
  };

  const handleSaveNote = async () => {
    try {
      await saveNote(tool.id, tempNote);
      setIsEditingNote(false);
    } catch (err) {
      console.error("Failed to save note:", err);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group relative bg-[#a2efb3] rounded-3xl border border-[#a2efb3]/30 p-7 shadow-sm hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 flex flex-col h-full overflow-hidden"
    >
      {/* Restored Custom Background with dynamic radial dots */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(circle_at_50%_50%,#000_75%,transparent_100%)] [-webkit-mask-image:radial-gradient(circle_at_50%_50%,#000_75%,transparent_100%)] [mask-repeat:no-repeat] [-webkit-mask-repeat:no-repeat] opacity-60" />
      </div>

      {/* Decorative Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col h-full text-slate-900">
        <div className="absolute top-0 right-0 flex items-center gap-2">
          <div className="bg-emerald-50/80 backdrop-blur-sm text-emerald-700 text-[10px] font-bold px-3 py-1 rounded-full border border-emerald-100/50 shadow-sm">
            {tool.stars ? `★ ${tool.stars}` : `SCORE: ${tool.score}`}
          </div>
          <button 
            onClick={handleToggleFavorite}
            disabled={isActionPending}
            className={`p-2 rounded-full transition-all duration-300 ${
              isFavorite 
                ? "bg-rose-50 text-rose-600 border border-rose-100 shadow-sm" 
                : "bg-white/50 text-slate-400 border border-slate-100 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-100 shadow-sm"
            } ${isActionPending ? "opacity-60 cursor-not-allowed" : ""}`}
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorite ? "fill-current" : ""}`} />
          </button>
        </div>
        
        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-slate-100 transform group-hover:scale-110 transition-transform duration-500 ease-out">
          {iconToDisplay && !imageError ? (
            <img 
              src={iconToDisplay} 
              alt={tool.name} 
              className="w-full h-full object-contain p-2.5 rounded-2xl"
              referrerPolicy="no-referrer"
              onError={handleIconError}
            />
          ) : (
            <Icon className="w-7 h-7 text-emerald-600 group-hover:text-emerald-700 transition-colors" />
          )}
        </div>
        
        <h3 className="text-xl font-display font-bold text-slate-900 mb-1 leading-tight group-hover:text-emerald-700 transition-colors">{tool.name}</h3>
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-widest rounded transition-colors group-hover:bg-emerald-100">
            {tool.category}
          </span>
          <div className="h-1 w-1 rounded-full bg-slate-300" />
          <span className="text-[10px] font-medium text-slate-400 uppercase tracking-tight">Free Tool</span>
        </div>
        
        <p className="text-slate-500 text-sm font-medium line-clamp-2 mb-8 flex-grow leading-relaxed group-hover:text-slate-600 transition-colors">
          {tool.description}
        </p>

        {/* Note Section */}
        <AnimatePresence>
          {isFavorite && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 pt-5 border-t border-slate-100 overflow-hidden"
            >
              {isEditingNote ? (
                <div className="space-y-3">
                  <textarea
                    value={tempNote}
                    onChange={(e) => setTempNote(e.target.value)}
                    placeholder="Write a personal note..."
                    className="w-full text-xs p-3 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 min-h-[70px] resize-none placeholder-slate-400 font-sans transition-all"
                    autoFocus
                  />
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => setIsEditingNote(false)}
                      className="p-2 text-slate-400 hover:text-slate-900 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={handleSaveNote}
                      className="flex items-center gap-2 bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10"
                    >
                      <Save className="w-3 h-3" /> Save Note
                    </button>
                  </div>
                </div>
              ) : (
                <div 
                  onClick={() => {
                    setTempNote(note);
                    setIsEditingNote(true);
                  }}
                  className="group/note cursor-pointer p-3 rounded-xl hover:bg-emerald-50/50 transition-colors border border-transparent hover:border-emerald-100"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-1.5">
                      <MessageSquare className="w-3 h-3" /> Personal Note
                    </span>
                    <Sparkles className="w-3 h-3 text-emerald-400 opacity-0 group-hover/note:opacity-100 transition-opacity" />
                  </div>
                  <p className={`text-xs ${note ? "text-slate-700 font-medium" : "text-slate-400 italic"}`}>
                    {note || "Add a personal note about this tool..."}
                  </p>
                </div>
              )}
            </motion.div>
          )}
          {isFavorite && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 pt-4 border-t border-emerald-100/40 overflow-hidden text-slate-900"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-1.5">
                  <FolderHeart className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" /> Folders / Collections
                </span>
                <button 
                  onClick={() => setShowFolderSelector(!showFolderSelector)}
                  className="text-[10px] font-bold text-emerald-600 hover:text-emerald-700 hover:underline transition-colors focus:outline-none"
                >
                  {showFolderSelector ? "Close" : "Manage"}
                </button>
              </div>

              {!showFolderSelector && (
                <div className="flex flex-wrap gap-1.5 mb-1 max-h-[52px] overflow-y-auto">
                  {folders.filter(f => f.toolIds?.includes(tool.id)).length > 0 ? (
                    folders.filter(f => f.toolIds?.includes(tool.id)).map(f => {
                      const colorCfg = getFolderColor(f.color);
                      return (
                        <span 
                          key={f.id} 
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-bold border transition-all ${colorCfg.badgeClass}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${colorCfg.dotColor}`} />
                          {f.name}
                        </span>
                      );
                    })
                  ) : (
                    <span className="text-[10px] text-slate-400 italic">Aucun dossier</span>
                  )}
                </div>
              )}

              {showFolderSelector && (
                <div className="space-y-3 bg-white/80 p-3 rounded-2xl border border-slate-200/80 shadow-xs">
                  <div className="max-h-[110px] overflow-y-auto space-y-1 pr-1 scrollbar-thin">
                    {folders.length > 0 ? (
                      folders.map(f => {
                        const isInFolder = f.toolIds?.includes(tool.id);
                        const colorCfg = getFolderColor(f.color);
                        return (
                          <label 
                            key={f.id} 
                            className="flex items-center gap-2 cursor-pointer p-1.5 hover:bg-slate-50 rounded-lg transition-all border border-transparent hover:border-slate-100"
                          >
                            <input
                              type="checkbox"
                              checked={isInFolder}
                              onChange={() => toggleToolInFolder(f.id, tool.id)}
                              className="rounded text-emerald-600 focus:ring-emerald-500/20 border-slate-300 h-3.5 w-3.5"
                            />
                            <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${colorCfg.dotColor}`} />
                            <span className="text-xs text-slate-700 font-medium truncate">{f.name}</span>
                          </label>
                        );
                      })
                    ) : (
                      <p className="text-[10px] text-slate-400 italic">Aucun dossier créé.</p>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    <div className="flex items-center gap-1.5 px-0.5">
                      {FOLDER_COLORS.slice(0, 7).map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setSelectedFolderColor(c.id)}
                          className={`w-4 h-4 rounded-full ${c.dotColor} transition-all cursor-pointer ${
                            selectedFolderColor === c.id 
                              ? "scale-110 ring-2 ring-offset-1 ring-slate-400" 
                              : "opacity-60 hover:opacity-100"
                          }`}
                          title={c.name}
                        />
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Nouveau dossier..."
                        value={newFolderName}
                        onChange={(e) => setNewFolderName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleCreateFolderInline();
                          }
                        }}
                        className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 placeholder-slate-400 transition-all font-sans"
                      />
                      <button
                        onClick={handleCreateFolderInline}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-2.5 py-1.5 focus:outline-none flex items-center justify-center transition-colors shadow-xs shrink-0 cursor-pointer"
                        title="Créer le dossier"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        
        <Link 
          to={tool.link}
          target="_blank"
          className="inline-flex items-center justify-center gap-2 w-full py-4 bg-slate-900 text-white text-sm font-bold rounded-[1.25rem] hover:bg-emerald-600 transition-all duration-300 shadow-lg shadow-slate-900/10 hover:shadow-emerald-500/20 group/btn"
        >
          <span>Explore Tool</span>
          <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};

export default ToolCard;
