import { FC, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Helmet } from "react-helmet-async";
import { 
  Heart, 
  Search, 
  LogIn, 
  Sparkles, 
  FolderHeart, 
  FolderPlus, 
  Trash2, 
  Edit2, 
  Check, 
  X, 
  Share2, 
  Copy, 
  ExternalLink,
  Loader2,
  Cloud,
  CloudOff,
  AlertCircle
} from "lucide-react";
import { Tool } from "../data/tools";
import { findToolById } from "../lib/toolDirectory";
import ToolCard from "../components/ToolCard";
import { Link } from "react-router-dom";
import { useFavorites, Folder as FolderType } from "../context/FavoritesContext";
import { FOLDER_COLORS, getFolderColor } from "../lib/folderColors";

const FavoritesPage: FC = () => {
  const {
    user,
    authLoading,
    favoriteIds,
    folders,
    loading,
    syncStatus,
    createFolder,
    deleteFolder,
    renameFolder,
    updateFolderColor,
    shareFolder,
    unshareFolder,
    openAuthModal
  } = useFavorites();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFolderId, setActiveFolderId] = useState<string | null>(null);
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [newFolderColor, setNewFolderColor] = useState("emerald");
  const [editingFolderId, setEditingFolderId] = useState<string | null>(null);
  const [editingFolderName, setEditingFolderName] = useState("");
  const [editingFolderColor, setEditingFolderColor] = useState("emerald");
  const [shareLoadingFolderId, setShareLoadingFolderId] = useState<string | null>(null);
  const [copiedFolderId, setCopiedFolderId] = useState<string | null>(null);
  const [shareError, setShareError] = useState<string | null>(null);

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) return;
    try {
      const folderId = await createFolder(newFolderName.trim(), newFolderColor);
      setActiveFolderId(folderId);
      setNewFolderName("");
      setNewFolderColor("emerald");
      setIsCreatingFolder(false);
    } catch (e) {
      console.error("Error creating folder on FavoritesPage:", e);
    }
  };

  const handleDeleteFolder = async (folderId: string) => {
    if (confirm("Are you sure you want to delete this folder? Favorited tools inside it will not be removed from your favorites.")) {
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
    setEditingFolderColor(folder.color || "emerald");
  };

  const handleSaveRename = async () => {
    if (!editingFolderId || !editingFolderName.trim()) return;
    try {
      await renameFolder(editingFolderId, editingFolderName.trim(), editingFolderColor);
      setEditingFolderId(null);
      setEditingFolderName("");
    } catch (e) {
      console.error("Error saving renamed folder on FavoritesPage:", e);
    }
  };

  const handleShareFolder = async (folderId: string) => {
    try {
      setShareLoadingFolderId(folderId);
      setShareError(null);
      await shareFolder(folderId);
    } catch (err: any) {
      console.error("Error sharing folder:", err);
      setShareError(err?.message || "Failed to generate share link.");
    } finally {
      setShareLoadingFolderId(null);
    }
  };

  const handleUnshareFolder = async (folderId: string) => {
    if (confirm("Are you sure you want to disable the public share link for this collection?")) {
      try {
        setShareLoadingFolderId(folderId);
        await unshareFolder(folderId);
      } catch (err: any) {
        console.error("Error unsharing folder:", err);
      } finally {
        setShareLoadingFolderId(null);
      }
    }
  };

  const handleCopyLink = async (folder: FolderType) => {
    if (!folder.shareId) return;
    const shareUrl = `${window.location.origin}/shared-folder/${folder.shareId}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedFolderId(folder.id);
      setTimeout(() => setCopiedFolderId(null), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  // Map favorite IDs to actual Tool objects with guaranteed resolution
  const favoriteTools = favoriteIds.map(id => findToolById(id));

  const activeFolder = activeFolderId ? folders.find(f => f.id === activeFolderId) : null;

  // Filter tools by active folder
  const folderFilteredTools = activeFolderId 
    ? favoriteTools.filter(tool => {
        return activeFolder?.toolIds?.includes(tool.id);
      })
    : favoriteTools;

  const filteredTools = folderFilteredTools.filter(tool => 
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>My Favorite AI Tools - Personal Collection</title>
        <meta name="description" content="View and manage your personal collection of favorite AI tools and notes." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                  <Heart className="w-6 h-6 text-emerald-600 fill-emerald-600" />
                </div>
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 tracking-tight">
                      My <span className="text-emerald-600">Favorites</span>
                    </h1>

                    {/* Small visual indicator in header showing Firestore sync status */}
                    {syncStatus === "synced" && (
                      <div
                        id="favorites-sync-indicator"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-xs"
                        title="All changes saved to Cloud Firestore in real time"
                      >
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Synced</span>
                      </div>
                    )}

                    {syncStatus === "syncing" && (
                      <div
                        id="favorites-sync-indicator"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200/80 shadow-xs"
                        title="Saving changes to Cloud Firestore..."
                      >
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-600" />
                        <span>Syncing...</span>
                      </div>
                    )}

                    {syncStatus === "offline" && (
                      <div
                        id="favorites-sync-indicator"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200/90 shadow-xs"
                        title="Offline: Changes saved locally and will sync when reconnected"
                      >
                        <CloudOff className="w-3.5 h-3.5 text-slate-500" />
                        <span>Offline</span>
                      </div>
                    )}

                    {syncStatus === "error" && (
                      <div
                        id="favorites-sync-indicator"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200 shadow-xs"
                        title="Connection error syncing with Firestore"
                      >
                        <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                        <span>Sync error</span>
                      </div>
                    )}

                    {syncStatus === "local-only" && (
                      <button
                        type="button"
                        id="favorites-sync-indicator"
                        onClick={openAuthModal}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200/90 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-all shadow-xs cursor-pointer"
                        title="Saved locally in browser. Click to sign in and sync to Firestore."
                      >
                        <Cloud className="w-3.5 h-3.5 text-slate-500" />
                        <span>Local • Connect to sync</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <p className="text-lg text-slate-500 max-w-3xl leading-relaxed">
              Your personal library of AI tools. Access your saved tools and custom notes anytime.
            </p>

            {/* Account & Sync Status Banner */}
            {!user ? (
              <div className="mt-6 p-4 bg-emerald-50/70 border border-emerald-200/70 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">Cloud Firestore Synchronization</h3>
                    <p className="text-xs text-slate-600">Sign in to save and synchronize your favorites and folders across all your devices in real time.</p>
                  </div>
                </div>
                <button
                  id="favorites-signin-cta-btn"
                  onClick={openAuthModal}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm shrink-0 flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5" /> Sign in
                </button>
              </div>
            ) : (
              <div className="mt-6 px-4 py-3 bg-white border border-slate-200/80 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${
                    syncStatus === "synced"
                      ? "bg-emerald-500 animate-pulse"
                      : syncStatus === "syncing"
                      ? "bg-amber-500 animate-ping"
                      : syncStatus === "offline"
                      ? "bg-slate-400"
                      : "bg-rose-500"
                  }`} />
                  <span>Multi-device Firestore Sync • Account: <strong>{user.email}</strong></span>
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border self-start sm:self-auto ${
                  syncStatus === "synced"
                    ? "text-emerald-700 bg-emerald-50 border-emerald-100"
                    : syncStatus === "syncing"
                    ? "text-amber-700 bg-amber-50 border-amber-100"
                    : syncStatus === "offline"
                    ? "text-slate-600 bg-slate-100 border-slate-200"
                    : "text-rose-700 bg-rose-50 border-rose-100"
                }`}>
                  {syncStatus === "synced"
                    ? "Real-time synced"
                    : syncStatus === "syncing"
                    ? "Syncing..."
                    : syncStatus === "offline"
                    ? "Offline"
                    : "Sync error"}
                </span>
              </div>
            )}

            {/* My Custom Collections / Folders */}
            {true && (
              <div className="mt-8 bg-white rounded-[2rem] border border-slate-200/80 p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <FolderHeart className="w-5 h-5 text-emerald-600 fill-emerald-50" /> My Collections / Folders
                    </h2>
                    <p className="text-xs text-slate-450 mt-0.5">Organize your favorite tools into custom lists.</p>
                  </div>
                  <button
                    onClick={() => setIsCreatingFolder(!isCreatingFolder)}
                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all shadow-md shadow-emerald-600/10"
                  >
                    <FolderPlus className="w-4 h-4" /> New Folder
                  </button>
                </div>

                {/* Inline folder creation */}
                <AnimatePresence>
                  {isCreatingFolder && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden mb-6"
                    >
                      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex flex-col gap-3 max-w-xl shadow-xs">
                        <div className="flex flex-col sm:flex-row gap-2">
                          <input
                            type="text"
                            placeholder="Folder name (e.g. Writing, Design, Dev...)"
                            value={newFolderName}
                            onChange={(e) => setNewFolderName(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                handleCreateFolder();
                              }
                            }}
                            className="flex-grow text-xs px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 placeholder-slate-400 font-sans transition-all"
                            autoFocus
                          />
                          <div className="flex gap-1.5">
                            <button
                              onClick={handleCreateFolder}
                              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
                            >
                              Create
                            </button>
                            <button
                              onClick={() => {
                                setIsCreatingFolder(false);
                                setNewFolderName("");
                                setNewFolderColor("emerald");
                              }}
                              className="text-slate-500 hover:text-slate-700 text-xs font-bold px-3 py-2.5 rounded-xl transition-colors border border-slate-200 bg-white cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>

                        {/* Color Selector */}
                        <div className="flex items-center gap-2 pt-1 border-t border-slate-200/60 flex-wrap">
                          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Color:</span>
                          <div className="flex items-center gap-2 flex-wrap">
                            {FOLDER_COLORS.map((c) => {
                              const isSelected = newFolderColor === c.id;
                              return (
                                <button
                                  key={c.id}
                                  type="button"
                                  onClick={() => setNewFolderColor(c.id)}
                                  className={`w-5 h-5 rounded-full ${c.dotColor} transition-all cursor-pointer flex items-center justify-center ${
                                    isSelected 
                                      ? "ring-2 ring-offset-2 ring-slate-800 scale-110 shadow-xs" 
                                      : "opacity-65 hover:opacity-100 hover:scale-105"
                                  }`}
                                  title={c.name}
                                >
                                  {isSelected && <Check className="w-3 h-3 text-white stroke-[3]" />}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Folder Pills */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setActiveFolderId(null)}
                    className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border cursor-pointer ${
                      activeFolderId === null
                        ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    All ({favoriteTools.length})
                  </button>

                  {folders.map(folder => {
                    const isActive = activeFolderId === folder.id;
                    const isEditing = editingFolderId === folder.id;
                    const count = favoriteTools.filter(t => folder.toolIds?.includes(t.id)).length;
                    const colorCfg = getFolderColor(folder.color);

                    if (isEditing) {
                      return (
                        <div key={folder.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-2 bg-white border border-slate-300 rounded-2xl p-2.5 shadow-sm">
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
                            className="text-xs font-bold text-slate-800 focus:outline-none border-b border-slate-400 px-1 py-0.5 max-w-[120px]"
                            autoFocus
                          />
                          <div className="flex items-center gap-1">
                            {FOLDER_COLORS.map(c => (
                              <button
                                key={c.id}
                                type="button"
                                onClick={() => setEditingFolderColor(c.id)}
                                className={`w-3.5 h-3.5 rounded-full ${c.dotColor} cursor-pointer transition-transform ${
                                  editingFolderColor === c.id 
                                    ? "ring-2 ring-offset-1 ring-slate-800 scale-110" 
                                    : "opacity-60 hover:opacity-100"
                                }`}
                                title={c.name}
                              />
                            ))}
                          </div>
                          <div className="flex items-center gap-1">
                            <button onClick={handleSaveRename} className="p-1 text-emerald-600 hover:text-emerald-700 cursor-pointer" title="Save">
                              <Check className="w-3.5 h-3.5" />
                            </button>
                            <button onClick={() => setEditingFolderId(null)} className="p-1 text-rose-600 hover:text-rose-700 cursor-pointer" title="Cancel">
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={folder.id}
                        className={`inline-flex items-center gap-1 rounded-xl border transition-all ${
                          isActive
                            ? `${colorCfg.activeTabClass} font-bold shadow-xs`
                            : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 shadow-2xs"
                        }`}
                      >
                        <button
                          onClick={() => setActiveFolderId(folder.id)}
                          className="pl-3.5 pr-2 py-2.5 text-[10px] font-black uppercase tracking-wider text-left transition-colors flex items-center gap-2 cursor-pointer"
                        >
                          <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${isActive ? "bg-white ring-2 ring-white/30" : colorCfg.dotColor}`} />
                          <span>{folder.name}</span>
                          <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${isActive ? "bg-black/20 text-white" : "bg-slate-100 text-slate-500"}`}>
                            {count}
                          </span>
                        </button>
                        
                        <div className={`flex items-center pr-1.5 border-l my-1 py-0.5 ${isActive ? "border-white/30" : "border-slate-200/60"}`}>
                          <button
                            onClick={() => handleStartRename(folder)}
                            className={`p-1 rounded-lg transition-colors cursor-pointer ${
                              isActive ? "text-white/80 hover:text-white hover:bg-white/15" : "text-slate-400 hover:text-slate-600"
                            }`}
                            title="Rename and change color"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleDeleteFolder(folder.id)}
                            className={`p-1 rounded-lg transition-colors cursor-pointer ${
                              isActive ? "text-white/80 hover:text-rose-200 hover:bg-rose-500/30" : "text-rose-400 hover:text-rose-600"
                            }`}
                            title="Delete"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Active Folder Share Manager */}
                {activeFolder && (() => {
                  const activeColorCfg = getFolderColor(activeFolder.color);
                  return (
                    <div className={`mt-6 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border transition-all ${activeColorCfg.cardClass}`}>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`w-3 h-3 rounded-full shrink-0 ${activeColorCfg.dotColor}`} />
                          <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                            <Share2 className="w-4 h-4 shrink-0 text-slate-700" /> Folder: "{activeFolder.name}"
                          </h3>
                        </div>
                        <p className="text-[11px] text-slate-600">
                          {activeFolder.shareId 
                            ? "This custom collection is public! Copy the link to share it." 
                            : "Generate a unique public link to share this curated collection of tools."}
                        </p>

                        {/* Quick Color Changer */}
                        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-200/50">
                          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Change color:</span>
                          <div className="flex items-center gap-1.5">
                            {FOLDER_COLORS.map(c => (
                              <button
                                key={c.id}
                                type="button"
                                onClick={() => updateFolderColor(activeFolder.id, c.id)}
                                className={`w-3.5 h-3.5 rounded-full ${c.dotColor} cursor-pointer transition-transform ${
                                  activeFolder.color === c.id 
                                    ? "scale-125 ring-2 ring-offset-1 ring-slate-800" 
                                    : "opacity-60 hover:opacity-100"
                                }`}
                                title={c.name}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        {activeFolder.shareId ? (
                          <>
                            <div className="flex items-center bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 shadow-2xs">
                              <input
                                type="text"
                                readOnly
                                value={`${window.location.origin}/shared-folder/${activeFolder.shareId}`}
                                className="text-[9px] text-slate-500 font-mono focus:outline-none truncate w-36 sm:w-48"
                                onClick={(e) => (e.target as HTMLInputElement).select()}
                              />
                              <button
                                onClick={() => handleCopyLink(activeFolder)}
                                className="p-1 text-slate-600 hover:text-slate-900 ml-1 transition-colors cursor-pointer"
                                title="Copy link"
                              >
                                {copiedFolderId === activeFolder.id ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>

                            <Link
                              to={`/shared-folder/${activeFolder.shareId}`}
                              className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-slate-800 bg-white border border-slate-200 hover:bg-slate-50 px-3 py-2.5 rounded-xl transition-all shadow-2xs"
                            >
                              View <ExternalLink className="w-3 h-3" />
                            </Link>

                            <button
                              onClick={() => handleUnshareFolder(activeFolder.id)}
                              className="text-[9px] font-black uppercase tracking-widest text-rose-650 hover:text-rose-700 bg-white border border-rose-200 hover:border-rose-300 px-3 py-2.5 rounded-xl transition-all cursor-pointer"
                            >
                              Disable
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleShareFolder(activeFolder.id)}
                            disabled={shareLoadingFolderId === activeFolder.id}
                            className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-[9.5px] font-black uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all shadow-md shadow-slate-900/10 cursor-pointer"
                          >
                            {shareLoadingFolderId === activeFolder.id ? (
                              <>
                                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Sharing...
                              </>
                            ) : (
                              <>
                                <Share2 className="w-3.5 h-3.5" /> Share this folder
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })()}

                {shareError && (
                  <div className="mt-3 text-[10px] font-bold text-rose-600 bg-rose-50 border border-rose-100 p-2.5 rounded-xl flex items-center justify-between">
                    <span>{shareError}</span>
                    <button onClick={() => setShareError(null)} className="text-rose-400 hover:text-rose-600 font-bold">Close</button>
                  </div>
                )}
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
