import { FC, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Helmet } from "react-helmet-async";
import { 
  Heart, 
  Search, 
  Zap,
  LogIn,
  ArrowRight
} from "lucide-react";
import { auth, db, handleFirestoreError, OperationType } from "../firebase";
import { collection, onSnapshot, query, orderBy, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { featuredTools, toolsByTag, Tool } from "../data/tools";
import ToolCard from "../components/ToolCard";
import { Link } from "react-router-dom";

const FavoritesPage: FC = () => {
  const [user, setUser] = useState(auth?.currentUser || null);
  const [authLoading, setAuthLoading] = useState(true);
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const localFavs = localStorage.getItem("vetted_ai_favorites");
      if (localFavs) {
        const parsed = JSON.parse(localFavs);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {}
    return [];
  });
  const [loading, setLoading] = useState(() => {
    try {
      const localFavs = localStorage.getItem("vetted_ai_favorites");
      if (localFavs) {
        const parsed = JSON.parse(localFavs);
        if (Array.isArray(parsed) && parsed.length > 0) return false;
      }
    } catch (e) {}
    return true;
  });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    const handleSync = () => {
      try {
        const localFavs = localStorage.getItem("vetted_ai_favorites");
        if (localFavs) {
          const parsed = JSON.parse(localFavs);
          if (Array.isArray(parsed)) {
            setFavoriteIds(parsed);
          }
        } else {
          setFavoriteIds([]);
        }
      } catch (e) {}
      setLoading(false);
    };

    window.addEventListener("vetted_favorites_changed", handleSync);
    // Initial sync load
    handleSync();

    return () => window.removeEventListener("vetted_favorites_changed", handleSync);
  }, []);

  // Map favorite IDs to actual Tool objects
  const favoriteTools = favoriteIds.map(id => {
    // Search in featuredTools
    const featured = featuredTools.find(t => t.id === id);
    if (featured) return featured;

    // Search in toolsByTag
    for (const tools of Object.values(toolsByTag)) {
      const found = tools.find(t => t.id === id);
      if (found) return found;
    }
    return null;
  }).filter((t): t is Tool => t !== null);

  const filteredTools = favoriteTools.filter(tool => 
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!user && !loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[2.5rem] p-12 text-center border border-slate-200 shadow-sm max-w-md w-full"
        >
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <LogIn className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Login Required</h2>
          <p className="text-slate-500 mb-8">
            Please log in to view and manage your favorite AI tools and personal notes.
          </p>
          <button 
            onClick={() => {
              const loginBtn = document.getElementById('login-button');
              if (loginBtn) loginBtn.click();
            }}
            className="w-full bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2"
          >
            Sign In Now <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>My Favorite AI Tools - Personal Collection</title>
        <meta name="description" content="View and manage your personal collection of favorite AI tools and notes." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-emerald-600 fill-emerald-600" />
              </div>
              <h1 className="text-4xl md:text-6xl font-display text-slate-900 tracking-tight">
                My <span className="text-emerald-600">Favorites</span>
              </h1>
            </div>
            <p className="text-xl text-slate-500 max-w-3xl leading-relaxed">
              Your personal library of AI tools. Access your saved tools and custom notes anytime.
            </p>

            {favoriteTools.length > 0 && (
              <div className="mt-10 relative max-w-2xl">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search your favorites..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-11 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm transition-all"
                />
              </div>
            )}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-2xl h-64 animate-pulse border border-slate-100" />
              ))}
            </div>
          ) : favoriteTools.length > 0 ? (
            <>
              {filteredTools.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <AnimatePresence mode="popLayout">
                    {filteredTools.map((tool) => (
                      <motion.div
                        key={tool.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ToolCard tool={tool} initiallyFavorite={true} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="bg-white rounded-[2rem] p-12 text-center border border-slate-200 shadow-sm">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-10 h-10 text-slate-300" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">No matches found</h3>
                  <p className="text-slate-500">Try a different search term to find tools in your favorites.</p>
                </div>
              )}
            </>
          ) : (
            <div className="bg-white rounded-[2rem] p-16 text-center border border-slate-200 shadow-sm">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8">
                <Heart className="w-12 h-12 text-slate-200" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Your collection is empty</h2>
              <p className="text-slate-500 max-w-md mx-auto mb-10">
                Start adding tools to your favorites to build your personal AI toolkit. You can also add custom notes to each tool!
              </p>
              <Link 
                to="/browse" 
                className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20"
              >
                Browse All Tools
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FavoritesPage;
