import { FC, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { featuredTools, toolsByTag, Tool } from "../data/tools";
import ToolCard from "../components/ToolCard";
import { FolderHeart, ChevronLeft, Calendar, Share2, Compass, AlertCircle } from "lucide-react";
import { motion } from "motion/react";

interface SharedFolderData {
  name: string;
  toolIds: string[];
  creatorUid: string;
  createdAt?: any;
}

const SharedFolderPage: FC = () => {
  const { shareId } = useParams<{ shareId: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sharedData, setSharedData] = useState<SharedFolderData | null>(null);
  const [resolvedTools, setResolvedTools] = useState<Tool[]>([]);
  const [retryTrigger, setRetryTrigger] = useState(0);

  const handleRetry = () => {
    setRetryTrigger(prev => prev + 1);
  };

  useEffect(() => {
    const fetchSharedFolder = async () => {
      if (!shareId) {
        setLoading(false);
        setError("Invalid link or database not configured.");
        return;
      }

      try {
        setLoading(true);
        let data: SharedFolderData | null = null;

        // Try reading from the server proxy API first — bypassing iframe connectivity issues entirely
        try {
          const response = await fetch(`/api/shared-folders/${shareId}`);
          if (response.ok) {
            data = await response.json();
            console.log("[SharedFolderPage] Successfully retrieved shared folder data from server proxy API.");
          } else if (response.status === 404) {
            setError("This shared collection does not exist or has been deleted by its owner.");
            setLoading(false);
            return;
          } else {
            console.warn(`[SharedFolderPage] Server proxy returned non-200 status: ${response.status}`);
          }
        } catch (fetchErr) {
          console.warn("[SharedFolderPage] Server API proxy fetch failed or not running, falling back to direct Firestore fetch:", fetchErr);
        }

        // Fallback to client-side Firestore connection if server API query failed
        if (!data) {
          if (!db) {
            throw new Error("Local database instance is unconfigured and server proxy API is offline.");
          }

          const sharedRef = doc(db, "shared_folders", shareId);
          const docSnap = await Promise.race([
            getDoc(sharedRef),
            new Promise<never>((_, reject) =>
              setTimeout(() => reject(new Error("Database fetch timed out. Please check your internet connection and try reloading.")), 15000)
            )
          ]);

          if (!docSnap.exists()) {
            setError("This shared collection does not exist or has been deleted by its owner.");
            setLoading(false);
            return;
          }

          data = docSnap.data() as SharedFolderData;
        }

        setSharedData(data);

        // Resolve tool IDs back to Tool objects
        const ids = data.toolIds || [];
        const mapped = ids.map(id => {
          const featured = featuredTools.find(t => t.id === id);
          if (featured) return featured;

          for (const tools of Object.values(toolsByTag)) {
            const found = tools.find(t => t.id === id);
            if (found) return found;
          }
          return null;
        }).filter((t): t is Tool => t !== null);

        setResolvedTools(mapped);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching shared folder:", err);
        setError(err instanceof Error ? err.message : "Could not load shared folder. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSharedFolder();
  }, [shareId, retryTrigger]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium animate-pulse">Loading shared collection...</p>
        </div>
      </div>
    );
  }

  if (error || !sharedData) {
    const isOfflineError = 
      error?.toLowerCase().includes("offline") || 
      error?.toLowerCase().includes("timed out") || 
      error?.toLowerCase().includes("network") ||
      error?.toLowerCase().includes("connection");

    const errorTitle = isOfflineError ? "Database Connection Issue" : "Collection Not Found";
    const errorDescription = isOfflineError
      ? "Could not establish a connection to Firestore. This commonly occurs because of security sandboxing or WebSocket restrictions inside iframe previews. We have automatically fallback-reconfigured the connection to HTTP long polling. Please click 'Try Again' below to reconnect."
      : (error || "The requested favorite folder link is invalid or no longer active.");

    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 border ${isOfflineError ? 'bg-amber-50 text-amber-500 border-amber-150' : 'bg-rose-50 text-rose-500 border-rose-150'}`}>
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black text-slate-950 uppercase tracking-tight mb-3">
          {errorTitle}
        </h1>
        <p className="text-slate-500 leading-relaxed max-w-md mx-auto mb-8 text-sm">
          {errorDescription}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleRetry}
            className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-2xl transition-all shadow-md cursor-pointer hover:shadow-emerald-100/40 text-sm active:scale-98"
          >
            <Share2 className="w-4 h-4" /> Try Again
          </button>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-2xl transition-all shadow-md text-sm active:scale-98"
          >
            <Compass className="w-4 h-4" /> Go back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Format date
  const shareDateString = sharedData.createdAt
    ? new Date(sharedData.createdAt.seconds * 1000).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      })
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back button */}
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-xs font-black uppercase text-slate-500 hover:text-emerald-700 transition-colors mb-8"
      >
        <ChevronLeft className="w-4 h-4" /> Back to Directory
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-12">
        {/* Curated Share Header Card */}
        <div className="lg:col-span-1 bg-white rounded-[2.5rem] border border-slate-200/80 p-8 shadow-sm">
          <div className="flex items-center gap-1 text-[9px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 self-start px-2 py-0.5 rounded-full mb-4">
            <Share2 className="w-3.5 h-3.5" /> Shared Collection
          </div>

          <h1 className="text-3xl font-black text-slate-950 tracking-tight leading-none mb-4 flex items-center gap-3">
            <FolderHeart className="w-8 h-8 text-emerald-600 fill-emerald-50 shrink-0" />
            {sharedData.name}
          </h1>

          <p className="text-sm text-slate-500 leading-relaxed mb-6">
            A hand-picked selection of free AI tools saved and organized in one single custom collection. 
            Explore these tools and curate your own favorites folder to simplify your workflow!
          </p>

          <hr className="border-slate-100 mb-6" />

          <div className="space-y-3.5 text-xs">
            <div className="flex items-center gap-3 text-slate-650 font-medium">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>Shared on {shareDateString || "recently"}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-650 font-medium">
              <Compass className="w-4 h-4 text-emerald-550" />
              <span>{resolvedTools.length} curated tool{resolvedTools.length === 1 ? "" : "s"} included</span>
            </div>
          </div>

          {/* Prompt to register */}
          <div className="mt-8 bg-gradient-to-br from-emerald-50 to-teal-50/50 rounded-2xl border border-emerald-100/60 p-5">
            <h3 className="text-xs font-black uppercase tracking-wider text-emerald-800 mb-1.5">
              Curate Your Own Directory
            </h3>
            <p className="text-xs text-emerald-700 leading-relaxed mb-4">
              Create custom folders, pin helpful free AI tools and share your beautiful collections with the world.
            </p>
            <Link
              to="/favorites"
              className="block text-center bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2.5 rounded-xl transition-all"
            >
              Get Started Now
            </Link>
          </div>
        </div>

        {/* List of tools */}
        <div className="lg:col-span-2">
          {resolvedTools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resolvedTools.map((tool) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ToolCard tool={tool} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center shadow-sm">
              <p className="text-slate-400 italic text-sm">There are no tools present in this shared folder collection.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SharedFolderPage;
