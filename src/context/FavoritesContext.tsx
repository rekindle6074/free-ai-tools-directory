import React, { createContext, useContext, useState, useEffect, FC, ReactNode, useCallback, useRef } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  onSnapshot, 
  serverTimestamp,
  writeBatch
} from "firebase/firestore";
import { auth, db } from "../firebase";
import AuthModal from "../components/AuthModal";

export interface Folder {
  id: string;
  name: string;
  color?: string;
  toolIds: string[];
  shareId?: string;
  createdAt?: any;
}

export type SyncStatus = "synced" | "syncing" | "offline" | "local-only" | "error";

interface FavoritesContextType {
  user: User | null;
  authLoading: boolean;
  favoriteIds: string[];
  notes: Record<string, string>;
  folders: Folder[];
  loading: boolean;
  isFavorite: (toolId: string) => boolean;
  getNote: (toolId: string) => string;
  toggleFavorite: (toolId: string, initialNote?: string) => Promise<boolean>;
  saveNote: (toolId: string, note: string) => Promise<void>;
  createFolder: (name: string, color?: string) => Promise<string>;
  deleteFolder: (folderId: string) => Promise<void>;
  renameFolder: (folderId: string, name: string, color?: string) => Promise<void>;
  updateFolderColor: (folderId: string, color: string) => Promise<void>;
  toggleToolInFolder: (folderId: string, toolId: string) => Promise<boolean>;
  shareFolder: (folderId: string) => Promise<string>;
  unshareFolder: (folderId: string) => Promise<void>;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  syncStatus: SyncStatus;
}

// Keys used for temporary guest or migration storage
const GUEST_KEY_FAVORITES = "fa_guest_favorites";
const GUEST_KEY_NOTES = "fa_guest_notes";
const GUEST_KEY_FOLDERS = "fa_guest_folders";
const LEGACY_STORAGE_FAVORITES = "vetted_ai_favorites";
const LEGACY_STORAGE_NOTES = "vetted_ai_notes";
const LEGACY_STORAGE_FOLDERS = "vetted_ai_folders";

function getGuestFavorites(): string[] {
  try {
    for (const key of [GUEST_KEY_FAVORITES, "fa_favorites_v2", LEGACY_STORAGE_FAVORITES]) {
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          const valid = Array.from(new Set(parsed.filter(x => typeof x === "string")));
          if (valid.length > 0) return valid;
        }
      }
    }
  } catch (e) {
    console.warn("Error reading guest favorites:", e);
  }
  return [];
}

function getGuestNotes(): Record<string, string> {
  try {
    for (const key of [GUEST_KEY_NOTES, "fa_notes_v2", LEGACY_STORAGE_NOTES]) {
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") return parsed;
      }
    }
  } catch (e) {
    console.warn("Error reading guest notes:", e);
  }
  return {};
}

function getGuestFolders(): Folder[] {
  try {
    for (const key of [GUEST_KEY_FOLDERS, "fa_folders_v2", LEGACY_STORAGE_FOLDERS]) {
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    }
  } catch (e) {
    console.warn("Error reading guest folders:", e);
  }
  return [];
}

function clearGuestStorage() {
  try {
    [
      GUEST_KEY_FAVORITES,
      GUEST_KEY_NOTES,
      GUEST_KEY_FOLDERS,
      "fa_favorites_v2",
      "fa_notes_v2",
      "fa_folders_v2",
      LEGACY_STORAGE_FAVORITES,
      LEGACY_STORAGE_NOTES,
      LEGACY_STORAGE_FOLDERS
    ].forEach(k => localStorage.removeItem(k));
  } catch (e) {}
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export const FavoritesProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(auth?.currentUser || null);
  const [authLoading, setAuthLoading] = useState(true);

  // In-memory state synchronized in real-time with Cloud Firestore
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    // If guest storage exists, initialize with it so offline/guest users don't see empty list
    return getGuestFavorites();
  });
  const [notes, setNotes] = useState<Record<string, string>>(() => getGuestNotes());
  const [folders, setFolders] = useState<Folder[]>(() => getGuestFolders());

  const [loading, setLoading] = useState(false);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>(() => {
    if (typeof navigator !== "undefined" && !navigator.onLine) return "offline";
    return auth?.currentUser ? "syncing" : "local-only";
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Online / Offline tracking
  useEffect(() => {
    const handleOnline = () => {
      if (userRef.current) {
        setSyncStatus("syncing");
        setTimeout(() => setSyncStatus("synced"), 1000);
      } else {
        setSyncStatus("local-only");
      }
    };

    const handleOffline = () => {
      setSyncStatus("offline");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Keep ref of current user to avoid closure staleness
  const userRef = useRef<User | null>(user);
  userRef.current = user;

  // Track if we already migrated guest favorites for the current user
  const migratedForUidRef = useRef<string | null>(null);

  useEffect(() => {
    if (!auth) {
      setAuthLoading(false);
      setSyncStatus("local-only");
      return;
    }

    let unsubscribeFavorites: (() => void) | null = null;
    let unsubscribeFolders: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);

      if (!currentUser) {
        // User logged out: clear listeners and load guest state
        setSyncStatus("local-only");
        setLoading(false);
        if (unsubscribeFavorites) {
          unsubscribeFavorites();
          unsubscribeFavorites = null;
        }
        if (unsubscribeFolders) {
          unsubscribeFolders();
          unsubscribeFolders = null;
        }
        setFavoriteIds(getGuestFavorites());
        setNotes(getGuestNotes());
        setFolders(getGuestFolders());
        return;
      }

      if (!db) {
        setSyncStatus("local-only");
        setLoading(false);
        return;
      }

      setSyncStatus("syncing");
      setLoading(true);

      // --- AUTOMATIC ONE-TIME MIGRATION OF LOCAL GUEST DATA TO FIRESTORE ---
      if (migratedForUidRef.current !== currentUser.uid) {
        migratedForUidRef.current = currentUser.uid;
        const pendingGuestFavs = getGuestFavorites();
        const pendingGuestNotes = getGuestNotes();
        const pendingGuestFolders = getGuestFolders();

        if (pendingGuestFavs.length > 0 || pendingGuestFolders.length > 0) {
          try {
            const batch = writeBatch(db);
            let count = 0;

            for (const toolId of pendingGuestFavs) {
              const favDocRef = doc(db, "users", currentUser.uid, "favorites", toolId);
              batch.set(favDocRef, {
                toolId,
                note: pendingGuestNotes[toolId] || "",
                createdAt: serverTimestamp()
              }, { merge: true });
              count++;
            }

            for (const f of pendingGuestFolders) {
              const folderDocRef = doc(db, "users", currentUser.uid, "folders", f.id);
              batch.set(folderDocRef, {
                name: f.name,
                color: f.color || "emerald",
                toolIds: f.toolIds || [],
                createdAt: serverTimestamp()
              }, { merge: true });
              count++;
            }

            if (count > 0) {
              await batch.commit();
            }
            // Once safely committed to Firestore, clear guest storage so it doesn't resurrect later
            clearGuestStorage();
          } catch (migrationErr) {
            console.warn("[Firestore] One-time guest migration notice:", migrationErr);
          }
        }
      }

      // --- REAL-TIME FIRESTORE LISTENER FOR USER FAVORITES ---
      // This synchronizes across all devices and tabs in real-time
      const favoritesRef = collection(db, "users", currentUser.uid, "favorites");
      unsubscribeFavorites = onSnapshot(favoritesRef, (snapshot) => {
        const remoteIds: string[] = [];
        const remoteNotes: Record<string, string> = {};

        snapshot.docs.forEach((docSnap) => {
          remoteIds.push(docSnap.id);
          const data = docSnap.data();
          if (data && typeof data.note === "string") {
            remoteNotes[docSnap.id] = data.note;
          }
        });

        // The remote Firestore documents are the authoritative source of truth
        setFavoriteIds(remoteIds);
        setNotes(remoteNotes);
        if (typeof navigator !== "undefined" && !navigator.onLine) {
          setSyncStatus("offline");
        } else if (snapshot.metadata.hasPendingWrites) {
          setSyncStatus("syncing");
        } else {
          setSyncStatus("synced");
        }
        setLoading(false);

        // Cache locally for instant warm-boot on page reload
        try {
          localStorage.setItem(`fa_cloud_cache_${currentUser.uid}_favs`, JSON.stringify(remoteIds));
        } catch (e) {}
      }, (err) => {
        console.error("[Firestore] Favorites live sync error:", err);
        setSyncStatus("error");
        setLoading(false);
      });

      // --- REAL-TIME FIRESTORE LISTENER FOR USER FOLDERS ---
      const foldersRef = collection(db, "users", currentUser.uid, "folders");
      unsubscribeFolders = onSnapshot(foldersRef, (snapshot) => {
        const remoteFolders: Folder[] = snapshot.docs.map((docSnap) => {
          const d = docSnap.data();
          return {
            id: docSnap.id,
            name: d.name || "Sans titre",
            color: d.color || "emerald",
            toolIds: Array.isArray(d.toolIds) ? d.toolIds : [],
            shareId: d.shareId || undefined,
            createdAt: d.createdAt
          };
        });

        setFolders(remoteFolders);
        try {
          localStorage.setItem(`fa_cloud_cache_${currentUser.uid}_folders`, JSON.stringify(remoteFolders));
        } catch (e) {}
      }, (err) => {
        console.error("[Firestore] Folders live sync error:", err);
      });
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeFavorites) unsubscribeFavorites();
      if (unsubscribeFolders) unsubscribeFolders();
    };
  }, []);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const isFavorite = useCallback((toolId: string) => {
    return favoriteIds.includes(toolId);
  }, [favoriteIds]);

  const getNote = useCallback((toolId: string) => {
    return notes[toolId] || "";
  }, [notes]);

  // Toggle favorite: Writes directly to Firestore for automatic multi-device synchronization
  const toggleFavorite = async (toolId: string, initialNote = ""): Promise<boolean> => {
    const currentUser = userRef.current;
    
    // If not authenticated, prompt sign in so their favorites sync across all devices!
    if (!currentUser || !db) {
      openAuthModal();
      
      // Also update local guest state as a fallback
      const currentlyFav = favoriteIds.includes(toolId);
      const nextFavorites = currentlyFav
        ? favoriteIds.filter((id) => id !== toolId)
        : [...favoriteIds, toolId];
      setFavoriteIds(nextFavorites);
      try {
        localStorage.setItem(GUEST_KEY_FAVORITES, JSON.stringify(nextFavorites));
        if (!currentlyFav && initialNote) {
          const nextNotes = { ...notes, [toolId]: initialNote };
          setNotes(nextNotes);
          localStorage.setItem(GUEST_KEY_NOTES, JSON.stringify(nextNotes));
        }
      } catch (e) {}
      return !currentlyFav;
    }

    const currentlyFav = favoriteIds.includes(toolId);
    const favDocRef = doc(db, "users", currentUser.uid, "favorites", toolId);

    // Optimistic UI update for instant feedback
    if (currentlyFav) {
      setFavoriteIds(prev => prev.filter(id => id !== toolId));
    } else {
      setFavoriteIds(prev => [...prev, toolId]);
      if (initialNote) {
        setNotes(prev => ({ ...prev, [toolId]: initialNote }));
      }
    }

    if (typeof navigator !== "undefined" && !navigator.onLine) {
      setSyncStatus("offline");
    } else {
      setSyncStatus("syncing");
    }

    try {
      if (currentlyFav) {
        await deleteDoc(favDocRef);
        setSyncStatus(typeof navigator !== "undefined" && !navigator.onLine ? "offline" : "synced");
        return false;
      } else {
        await setDoc(favDocRef, {
          toolId,
          note: initialNote || notes[toolId] || "",
          createdAt: serverTimestamp()
        });
        setSyncStatus(typeof navigator !== "undefined" && !navigator.onLine ? "offline" : "synced");
        return true;
      }
    } catch (err) {
      console.error("[Firestore] Failed to persist favorite:", err);
      setSyncStatus(typeof navigator !== "undefined" && !navigator.onLine ? "offline" : "error");
      // Revert optimistic update on error
      if (currentlyFav) {
        setFavoriteIds(prev => [...prev, toolId]);
      } else {
        setFavoriteIds(prev => prev.filter(id => id !== toolId));
      }
      throw err;
    }
  };

  // Save note: Persists directly to Firestore document
  const saveNote = async (toolId: string, note: string): Promise<void> => {
    const trimmed = note.trim();
    const currentUser = userRef.current;

    // Optimistic state update
    setNotes(prev => ({ ...prev, [toolId]: trimmed }));

    if (!currentUser || !db) {
      openAuthModal();
      try {
        const nextNotes = { ...notes, [toolId]: trimmed };
        localStorage.setItem(GUEST_KEY_NOTES, JSON.stringify(nextNotes));
      } catch (e) {}
      return;
    }

    const favDocRef = doc(db, "users", currentUser.uid, "favorites", toolId);
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      setSyncStatus("offline");
    } else {
      setSyncStatus("syncing");
    }

    try {
      await setDoc(favDocRef, {
        toolId,
        note: trimmed,
        updatedAt: serverTimestamp()
      }, { merge: true });
      setSyncStatus(typeof navigator !== "undefined" && !navigator.onLine ? "offline" : "synced");
    } catch (err) {
      console.error("[Firestore] Failed to persist note:", err);
      setSyncStatus(typeof navigator !== "undefined" && !navigator.onLine ? "offline" : "error");
      throw err;
    }
  };

  // Create folder: Persists in Firestore under users/{uid}/folders
  const createFolder = async (name: string, color: string = "emerald"): Promise<string> => {
    const trimmed = name.trim();
    if (!trimmed) {
      throw new Error("Le nom du dossier ne peut pas être vide.");
    }

    const currentUser = userRef.current;
    if (!currentUser || !db) {
      openAuthModal();
      throw new Error("Veuillez vous connecter pour créer un dossier synchronisé sur le Cloud.");
    }

    const folderId = `f_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const folderDocRef = doc(db, "users", currentUser.uid, "folders", folderId);

    // Optimistic state update
    const newFolder: Folder = {
      id: folderId,
      name: trimmed,
      color: color || "emerald",
      toolIds: [],
      createdAt: new Date().toISOString()
    };
    setFolders(prev => [...prev, newFolder]);

    if (typeof navigator !== "undefined" && !navigator.onLine) {
      setSyncStatus("offline");
    } else {
      setSyncStatus("syncing");
    }

    try {
      await setDoc(folderDocRef, {
        name: trimmed,
        color: color || "emerald",
        toolIds: [],
        createdAt: serverTimestamp()
      });
      setSyncStatus(typeof navigator !== "undefined" && !navigator.onLine ? "offline" : "synced");
      return folderId;
    } catch (err) {
      console.error("[Firestore] Failed to persist folder:", err);
      setSyncStatus(typeof navigator !== "undefined" && !navigator.onLine ? "offline" : "error");
      setFolders(prev => prev.filter(f => f.id !== folderId));
      throw err;
    }
  };

  // Delete folder
  const deleteFolder = async (folderId: string): Promise<void> => {
    const currentUser = userRef.current;
    if (!currentUser || !db) return;

    const folderToDelete = folders.find((f) => f.id === folderId);
    setFolders(prev => prev.filter(f => f.id !== folderId));

    if (typeof navigator !== "undefined" && !navigator.onLine) {
      setSyncStatus("offline");
    } else {
      setSyncStatus("syncing");
    }

    try {
      if (folderToDelete?.shareId) {
        try {
          await deleteDoc(doc(db, "shared_folders", folderToDelete.shareId));
        } catch (e) {
          console.warn("[Firestore] Cleanup shared folder notice:", e);
        }
      }
      await deleteDoc(doc(db, "users", currentUser.uid, "folders", folderId));
      setSyncStatus(typeof navigator !== "undefined" && !navigator.onLine ? "offline" : "synced");
    } catch (err) {
      console.error("[Firestore] Failed to delete folder:", err);
      setSyncStatus(typeof navigator !== "undefined" && !navigator.onLine ? "offline" : "error");
      if (folderToDelete) {
        setFolders(prev => [...prev, folderToDelete]);
      }
      throw err;
    }
  };

  // Rename folder
  const renameFolder = async (folderId: string, name: string, color?: string): Promise<void> => {
    const trimmed = name.trim();
    if (!trimmed) return;

    const currentUser = userRef.current;
    if (!currentUser || !db) return;

    setFolders(prev => prev.map(f => {
      if (f.id === folderId) {
        return {
          ...f,
          name: trimmed,
          ...(color ? { color } : {})
        };
      }
      return f;
    }));

    try {
      const updateData: Record<string, any> = { name: trimmed };
      if (color) updateData.color = color;

      await setDoc(doc(db, "users", currentUser.uid, "folders", folderId), updateData, { merge: true });

      const currentFolder = folders.find((f) => f.id === folderId);
      if (currentFolder?.shareId) {
        await setDoc(doc(db, "shared_folders", currentFolder.shareId), updateData, { merge: true });
      }
    } catch (err) {
      console.error("[Firestore] Failed to rename folder:", err);
    }
  };

  // Update folder color
  const updateFolderColor = async (folderId: string, color: string): Promise<void> => {
    const currentUser = userRef.current;
    if (!currentUser || !db) return;

    setFolders(prev => prev.map(f => f.id === folderId ? { ...f, color } : f));

    try {
      await setDoc(doc(db, "users", currentUser.uid, "folders", folderId), { color }, { merge: true });
      const currentFolder = folders.find((f) => f.id === folderId);
      if (currentFolder?.shareId) {
        await setDoc(doc(db, "shared_folders", currentFolder.shareId), { color }, { merge: true });
      }
    } catch (err) {
      console.error("[Firestore] Failed to update folder color:", err);
    }
  };

  // Toggle tool in folder
  const toggleToolInFolder = async (folderId: string, toolId: string): Promise<boolean> => {
    const currentUser = userRef.current;
    if (!currentUser || !db) {
      openAuthModal();
      return false;
    }

    const targetFolder = folders.find((f) => f.id === folderId);
    if (!targetFolder) return false;

    const exists = targetFolder.toolIds.includes(toolId);
    const updatedIds = exists
      ? targetFolder.toolIds.filter((id) => id !== toolId)
      : [...targetFolder.toolIds, toolId];

    setFolders(prev => prev.map(f => f.id === folderId ? { ...f, toolIds: updatedIds } : f));

    try {
      await setDoc(doc(db, "users", currentUser.uid, "folders", folderId), { 
        toolIds: updatedIds 
      }, { merge: true });

      if (targetFolder.shareId) {
        await setDoc(doc(db, "shared_folders", targetFolder.shareId), { 
          toolIds: updatedIds 
        }, { merge: true });
      }
    } catch (err) {
      console.error("[Firestore] Failed to update tool in folder:", err);
    }

    return !exists;
  };

  // Share folder publicly
  const shareFolder = async (folderId: string): Promise<string> => {
    const currentUser = userRef.current;
    if (!currentUser || !db) {
      openAuthModal();
      throw new Error("Veuillez vous connecter pour créer un lien de partage public.");
    }

    const folder = folders.find((f) => f.id === folderId);
    if (!folder) throw new Error("Dossier introuvable.");

    if (folder.shareId) {
      return folder.shareId;
    }

    const shareId = `share_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const sharedDocRef = doc(db, "shared_folders", shareId);
    const folderDocRef = doc(db, "users", currentUser.uid, "folders", folderId);

    try {
      await setDoc(sharedDocRef, {
        name: folder.name,
        color: folder.color || "emerald",
        toolIds: folder.toolIds || [],
        creatorUid: currentUser.uid,
        createdAt: serverTimestamp()
      });

      await setDoc(folderDocRef, { shareId }, { merge: true });

      setFolders(prev => prev.map(f => f.id === folderId ? { ...f, shareId } : f));

      return shareId;
    } catch (err) {
      console.error("[Firestore] Failed to share folder:", err);
      throw err;
    }
  };

  // Unshare folder
  const unshareFolder = async (folderId: string): Promise<void> => {
    const currentUser = userRef.current;
    if (!currentUser || !db) return;

    const folder = folders.find((f) => f.id === folderId);
    if (!folder || !folder.shareId) return;

    const shareId = folder.shareId;
    const sharedDocRef = doc(db, "shared_folders", shareId);
    const folderDocRef = doc(db, "users", currentUser.uid, "folders", folderId);

    try {
      await deleteDoc(sharedDocRef);
      await setDoc(folderDocRef, { shareId: null }, { merge: true });

      setFolders(prev => prev.map(f => f.id === folderId ? { ...f, shareId: undefined } : f));
    } catch (err) {
      console.error("[Firestore] Failed to unshare folder:", err);
      throw err;
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        user,
        authLoading,
        favoriteIds,
        notes,
        folders,
        loading,
        isFavorite,
        getNote,
        toggleFavorite,
        saveNote,
        createFolder,
        deleteFolder,
        renameFolder,
        updateFolderColor,
        toggleToolInFolder,
        shareFolder,
        unshareFolder,
        openAuthModal,
        closeAuthModal,
        syncStatus
      }}
    >
      {children}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        allowSignup={true}
      />
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return ctx;
};
