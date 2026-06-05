import { FC, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Helmet } from "react-helmet-async";
import { 
  Heart, 
  Search, 
  Zap,
  LogIn,
  ArrowRight,
  FolderHeart,
  FolderPlus,
  Plus,
  Trash2,
  Edit2,
  Check,
  X
} from "lucide-react";
import { auth, db, handleFirestoreError, OperationType } from "../firebase";
import { collection, onSnapshot, query, orderBy, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { featuredTools, toolsByTag, Tool } from "../data/tools";
import ToolCard from "../components/ToolCard";
import { Link } from "react-router-dom";
import { Folder as FolderType, getLocalFolders, createFolder, deleteFolder, renameFolder } from "../lib/folderUtils";

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
  const [folders, setFolders] = useState<FolderType[]>(getLocalFolders());
  const [activeFolderId, setActiveFolderId] = useState<string | null>(null);
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [editingFolderId, setEditingFolderId] = useState<string | null>(null);
  const [editingFolderName, setEditingFolderName] = useState("");

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

  useEffect(() => {
    const handleFoldersSync = () => {
      try {
        const localFolders = localStorage.getItem("vetted_ai_folders");
        if (localFolders) {
          setFolders(JSON.parse(localFolders));
        } else {
          setFolders([]);
        }
      } catch (e) {}
    };

    window.addEventListener("vetted_folders_changed", handleFoldersSync);
    handleFoldersSync();

    return () => window.removeEventListener("vetted_folders_changed", handleFoldersSync);
  }, []);

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) return;
    try {
      const folderId = await createFolder(newFolderName.trim());
      setActiveFolderId(folderId);
      setNewFolderName("");
      setIsCreatingFolder(false);
    } catch (e) {
      console.error("Error creating folder on FavoritesPage:", e);
    }
  };

  const handleDeleteFolder = async (folderId: string) => {
    if (confirm("Voulez-vous vraiment supprimer ce dossier ? Les outils ne seront pas supprimés de vos favoris.")) {
      try {
        await deleteFolder(folderId);
        if (activeFolderId === folderId) {
          setActiveFolderId(null);
        }
      } catch (e) {
        console.error("Error deleting folder on FavoritesPage:", e);
      }
    }
  };

  const handleStartRename = (folder: FolderType) => {
    setEditingFolderId(folder.id);
    setEditingFolderName(folder.name);
  };

  const handleSaveRename = async () => {
    if (!editingFolderId || !editingFolderName.trim()) return;
    try {
      await renameFolder(editingFolderId, editingFolderName.trim());
      setEditingFolderId(null);
      setEditingFolderName("");
    } catch (e) {
      console.error("Error saving renamed folder on FavoritesPage:", e);
    }
  };

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

  // Filter tools by active folder
  const folderFilteredTools = activeFolderId 
    ? favoriteTools.filter(tool => {
        const activeFolder = folders.find(f => f.id === activeFolderId);
        return activeFolder?.toolIds?.includes(tool.id);
      })
    : favoriteTools;

  const filteredTools = folderFilteredTools.filter(tool => 
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

            {/* Mes Collections / Dossiers personnalisés */}
            {favoriteTools.length > 0 && (
              <div className="mt-8 bg-white rounded-[2rem] border border-slate-200/80 p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <FolderHeart className="w-5 h-5 text-emerald-600 fill-emerald-50" /> Mes Collections / Dossiers
                    </h2>
                    <p className="text-xs text-slate-450 mt-0.5">Organisez vos outils favoris dans des listes personnalisées.</p>
                  </div>
                  <button
                    onClick={() => setIsCreatingFolder(!isCreatingFolder)}
                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all shadow-md shadow-emerald-600/10"
                  >
                    <FolderPlus className="w-4 h-4" /> Nouveau Dossier
                  </button>
                </div>

                {/* Création de dossier inline */}
                <AnimatePresence>
                  {isCreatingFolder && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden mb-6"
                    >
                      <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex flex-col sm:flex-row gap-2 max-w-lg">
                        <input
                          type="text"
                          placeholder="Nom du dossier (ex: Rédaction, Design...)"
                          value={newFolderName}
                          onChange={(e) => setNewFolderName(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleCreateFolder();
                            }
                          }}
                          className="flex-grow text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 placeholder-slate-400 font-sans transition-all"
                        />
                        <div className="flex gap-1.5">
                          <button
                            onClick={handleCreateFolder}
                            className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
                          >
                            Créer
                          </button>
                          <button
                            onClick={() => {
                              setIsCreatingFolder(false);
                              setNewFolderName("");
                            }}
                            className="text-slate-500 hover:text-slate-700 text-xs font-bold px-3 py-2 rounded-lg transition-colors border border-slate-200"
                          >
                            Annuler
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Dossier Pills */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setActiveFolderId(null)}
                    className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border ${
                      activeFolderId === null
                        ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    Tout ({favoriteTools.length})
                  </button>

                  {folders.map(folder => {
                    const isActive = activeFolderId === folder.id;
                    const isEditing = editingFolderId === folder.id;
                    const count = favoriteTools.filter(t => folder.toolIds?.includes(t.id)).length;

                    if (isEditing) {
                      return (
                        <div key={folder.id} className="flex items-center gap-1.5 bg-white border border-emerald-300 rounded-xl px-2.5 py-1.5 shadow-sm">
                          <input
                            type="text"
                            value={editingFolderName}
                            onChange={(e) => setEditingFolderName(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                handleSaveRename();
                              }
                            }}
                            className="text-xs font-bold text-slate-800 focus:outline-none border-b border-emerald-500 px-1 py-0.5 max-w-[100px]"
                            autoFocus
                          />
                          <button onClick={handleSaveRename} className="p-1 text-emerald-600 hover:text-emerald-700">
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => setEditingFolderId(null)} className="p-1 text-rose-600 hover:text-rose-700">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={folder.id}
                        className={`inline-flex items-center gap-1 rounded-xl border transition-all ${
                          isActive
                            ? "bg-emerald-650 text-emerald-600 font-bold border-emerald-300 bg-emerald-50/50 shadow-sm"
                            : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        <button
                          onClick={() => setActiveFolderId(folder.id)}
                          className={`pl-4 pr-2 py-2.5 text-[10px] font-black uppercase tracking-wider text-left transition-colors ${
                            isActive ? "text-emerald-700" : "text-slate-600"
                          }`}
                        >
                          {folder.name} ({count})
                        </button>
                        
                        <div className="flex items-center pr-1.5 border-l border-slate-200/50 my-1 py-0.5">
                          <button
                            onClick={() => handleStartRename(folder)}
                            className={`p-1 rounded-lg transition-colors ${
                              isActive ? "text-emerald-600 hover:bg-emerald-100" : "text-slate-400 hover:text-slate-600"
                            }`}
                            title="Renommer"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleDeleteFolder(folder.id)}
                            className={`p-1 rounded-lg transition-colors ${
                              isActive ? "text-rose-500 hover:bg-rose-50" : "text-rose-400 hover:text-rose-600"
                            }`}
                            title="Supprimer"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

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
