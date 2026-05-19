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
  Search
} from "lucide-react";
import { Tool } from "../data/tools";
import { auth, db } from "../firebase";
import { doc, setDoc, deleteDoc, onSnapshot, serverTimestamp } from "firebase/firestore";

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
}

const ToolCard: FC<ToolCardProps> = ({ tool }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [note, setNote] = useState("");
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [tempNote, setTempNote] = useState("");
  const [user, setUser] = useState(auth?.currentUser || null);

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

  useEffect(() => {
    if (!auth) return;
    const unsubscribeAuth = auth.onAuthStateChanged((u) => {
      setUser(u);
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!user || !db) {
      setIsFavorite(false);
      setNote("");
      return;
    }

    const favDocRef = doc(db, "users", user.uid, "favorites", tool.id);
    const unsubscribe = onSnapshot(favDocRef, (docSnap) => {
      if (docSnap.exists()) {
        setIsFavorite(true);
        setNote(docSnap.data().note || "");
      } else {
        setIsFavorite(false);
        setNote("");
      }
    });

    return () => unsubscribe();
  }, [user, tool.id]);

  const toggleFavorite = async () => {
    if (!user) {
      // In a real app, trigger the login modal here
      alert("Please log in to add favorites.");
      return;
    }
    if (!db) {
      console.warn("Database is not configured/available.");
      return;
    }

    const path = `users/${user.uid}/favorites/${tool.id}`;
    const favDocRef = doc(db, "users", user.uid, "favorites", tool.id);
    
    try {
      if (isFavorite) {
        await deleteDoc(favDocRef);
      } else {
        await setDoc(favDocRef, {
          toolId: tool.id,
          note: "",
          createdAt: serverTimestamp()
        });
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      // Detailed error info for AIS Agent if needed
      const errInfo = {
        error: error instanceof Error ? error.message : String(error),
        operation: isFavorite ? "delete" : "create",
        path,
        userId: user.uid
      };
      console.error("Firestore Error Details:", JSON.stringify(errInfo));
    }
  };

  const saveNote = async () => {
    if (!user || !db) return;
    const path = `users/${user.uid}/favorites/${tool.id}`;
    const favDocRef = doc(db, "users", user.uid, "favorites", tool.id);
    try {
      await setDoc(favDocRef, { note: tempNote }, { merge: true });
      setIsEditingNote(false);
    } catch (error) {
      console.error("Error saving note:", error);
      const errInfo = {
        error: error instanceof Error ? error.message : String(error),
        operation: "update",
        path,
        userId: user.uid
      };
      console.error("Firestore Error Details:", JSON.stringify(errInfo));
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group relative rounded-3xl border border-[#a2efb3]/30 p-7 shadow-sm hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 flex flex-col h-full overflow-hidden"
    >
      {/* Restored Custom Background with #a2efb3 and dynamic radial dots */}
      <div className="absolute inset-0 -z-10 bg-[#a2efb3]">
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
            onClick={toggleFavorite}
            className={`p-2 rounded-full transition-all duration-300 ${
              isFavorite 
                ? "bg-rose-50 text-rose-600 border border-rose-100 shadow-sm" 
                : "bg-white/50 text-slate-400 border border-slate-100 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-100 shadow-sm"
            }`}
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
                      onClick={saveNote}
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
