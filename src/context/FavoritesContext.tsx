import React, { createContext, useContext, useState, useEffect, FC, ReactNode, useCallback } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  onSnapshot, 
  serverTimestamp 
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
  syncStatus: "synced" | "syncing" | "local-only" | "error";
}

const STORAGE_KEY_FAVORITES = "fa_favorites_v2";
const STORAGE_KEY_NOTES = "fa_notes_v2";
const STORAGE_KEY_FOLDERS = "fa_folders_v2";

// Safe local persistence helpers with automatic legacy migration
function getInitialFavorites(): string[] {
  try {
    const v2 = localStorage.getItem(STORAGE_KEY_FAVORITES);
    if (v2) {
      const parsed = JSON.parse(v2);
      if (Array.isArray(parsed)) return Array.from(new Set(parsed.filter(x => typeof x === "string")));
    }
    // Check legacy storage
    const legacy = localStorage.getItem("vetted_ai_favorites");
    if (legacy) {
      const parsed = JSON.parse(legacy);
      if (Array.isArray(parsed)) {
        const valid = Array.from(new Set(parsed.filter(x => typeof x === "string")));
        if (valid.length > 0) {
          localStorage.setItem(STORAGE_KEY_FAVORITES, JSON.stringify(valid));
          return valid;
        }
      }
    }
  } catch (e) {
    console.warn("Could not read local favorites:", e);
  }
  return [];
}

function getInitialNotes(): Record<string, string> {
  try {
    const v2 = localStorage.getItem(STORAGE_KEY_NOTES);
    if (v2) {
      const parsed = JSON.parse(v2);
      if (parsed && typeof parsed === "object") return parsed;
    }
    const legacy = localStorage.getItem("vetted_ai_notes");
    if (legacy) {
      const parsed = JSON.parse(legacy);
      if (parsed && typeof parsed === "object") {
        localStorage.setItem(STORAGE_KEY_NOTES, JSON.stringify(parsed));
        return parsed;
      }
    }
  } catch (e) {
    console.warn("Could not read local notes:", e);
  }
  return {};
}

function getInitialFolders(): Folder[] {
  try {
    const v2 = localStorage.getItem(STORAGE_KEY_FOLDERS);
    if (v2) {
      const parsed = JSON.parse(v2);
      if (Array.isArray(parsed)) return parsed;
    }
    const legacy = localStorage.getItem("vetted_ai_folders");
    if (legacy) {
      const parsed = JSON.parse(legacy);
      if (Array.isArray(parsed)) {
        localStorage.setItem(STORAGE_KEY_FOLDERS, JSON.stringify(parsed));
        return parsed;
      }
    }
  } catch (e) {
    console.warn("Could not read local folders:", e);
  }
  return [];
}

function saveFavoritesToStorage(ids: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY_FAVORITES, JSON.stringify(ids));
  } catch (e) {
    console.warn("Could not persist favorites locally:", e);
  }
}

function saveNotesToStorage(notes: Record<string, string>) {
  try {
    localStorage.setItem(STORAGE_KEY_NOTES, JSON.stringify(notes));
  } catch (e) {
    console.warn("Could not persist notes locally:", e);
  }
}

function saveFoldersToStorage(folders: Folder[]) {
  try {
    localStorage.setItem(STORAGE_KEY_FOLDERS, JSON.stringify(folders));
  } catch (e) {
    console.warn("Could not persist folders locally:", e);
  }
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export const FavoritesProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(auth?.currentUser || null);
  const [authLoading, setAuthLoading] = useState(true);
  
  // Synchronous initialization from localStorage guarantees instant UI and zero data loss!
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => getInitialFavorites());
  const [notes, setNotes] = useState<Record<string, string>>(() => getInitialNotes());
  const [folders, setFolders] = useState<Folder[]>(() => getInitialFolders());
  
  const [loading, setLoading] = useState(false);
  const [syncStatus, setSyncStatus] = useState<"synced" | "syncing" | "local-only" | "error">(
    auth?.currentUser ? "syncing" : "local-only"
  );
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Authentication observer with real-time cloud synchronization and merging
  useEffect(() => {
    if (!auth) {
      setAuthLoading(false);
      setSyncStatus("local-only");
      return;
    }

    let unsubscribeFavorites: (() => void) | null = null;
    let unsubscribeFolders: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);

      if (!currentUser) {
        // IMPORTANT: NEVER wipe favoriteIds, notes, or folders when user is logged out!
        // The local favorites and folders are preserved safely in localStorage.
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
        return;
      }

      if (!db) {
        setSyncStatus("local-only");
        setLoading(false);
        return;
      }

      setSyncStatus("syncing");
      setLoading(true);

      // A. Live Firestore listener for favorites
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

        // Bi-directional merge: Keep any local favorites that aren't yet in Firestore and upload them!
        setFavoriteIds((prevLocal) => {
          const combined = Array.from(new Set([...prevLocal, ...remoteIds]));
          saveFavoritesToStorage(combined);

          // Upload any local items that are missing in Firestore so nothing is ever lost
          const missingInRemote = prevLocal.filter(id => !remoteIds.includes(id));
          if (missingInRemote.length > 0 && db) {
            missingInRemote.forEach(id => {
              setDoc(doc(db, "users", currentUser.uid, "favorites", id), {
                toolId: id,
                note: notes[id] || "",
                createdAt: serverTimestamp()
              }).catch(err => console.warn("[Firestore] Auto-sync favorite failed:", err));
            });
          }

          return combined;
        });

        setNotes((prevNotes) => {
          const merged = { ...prevNotes, ...remoteNotes };
          saveNotesToStorage(merged);
          return merged;
        });

        setSyncStatus("synced");
        setLoading(false);
      }, (err) => {
        console.warn("[Firestore] Favorites subscription note (using local cache):", err);
        setSyncStatus("error");
        setLoading(false);
      });

      // B. Live Firestore listener for custom folders
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

        setFolders((prevLocalFolders) => {
          // Merge remote folders with any local folders
          const folderMap = new Map<string, Folder>();
          prevLocalFolders.forEach(f => folderMap.set(f.id, f));
          remoteFolders.forEach(f => folderMap.set(f.id, f));

          const merged = Array.from(folderMap.values());
          saveFoldersToStorage(merged);

          // Auto-sync any local-only folders to Firestore
          const remoteIdsSet = new Set(remoteFolders.map(f => f.id));
          prevLocalFolders.forEach(localF => {
            if (!remoteIdsSet.has(localF.id) && db) {
              setDoc(doc(db, "users", currentUser.uid, "folders", localF.id), {
                name: localF.name,
                color: localF.color || "emerald",
                toolIds: localF.toolIds || [],
                createdAt: serverTimestamp()
              }).catch(err => console.warn("[Firestore] Auto-sync folder failed:", err));
            }
          });

          return merged;
        });
      }, (err) => {
        console.warn("[Firestore] Folders subscription note (using local cache):", err);
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

  // Toggle favorite with instant local persistence and background cloud sync
  const toggleFavorite = async (toolId: string, initialNote = ""): Promise<boolean> => {
    const currentlyFav = favoriteIds.includes(toolId);
    const nextFavorites = currentlyFav
      ? favoriteIds.filter((id) => id !== toolId)
      : [...favoriteIds, toolId];

    // 1. Instant local state & localStorage update
    setFavoriteIds(nextFavorites);
    saveFavoritesToStorage(nextFavorites);

    if (!currentlyFav && initialNote) {
      const nextNotes = { ...notes, [toolId]: initialNote };
      setNotes(nextNotes);
      saveNotesToStorage(nextNotes);
    }

    // 2. If user is logged in, sync in background with Firestore
    if (user && db) {
      const favDocRef = doc(db, "users", user.uid, "favorites", toolId);
      try {
        if (currentlyFav) {
          await deleteDoc(favDocRef);
        } else {
          await setDoc(favDocRef, {
            toolId,
            note: initialNote || notes[toolId] || "",
            createdAt: serverTimestamp()
          });
        }
      } catch (err) {
        console.warn("[Firestore] Failed to sync favorite:", err);
      }
    }

    return !currentlyFav;
  };

  // Save note with instant local persistence and background cloud sync
  const saveNote = async (toolId: string, note: string): Promise<void> => {
    const trimmed = note.trim();
    const nextNotes = { ...notes, [toolId]: trimmed };
    setNotes(nextNotes);
    saveNotesToStorage(nextNotes);

    if (user && db) {
      const favDocRef = doc(db, "users", user.uid, "favorites", toolId);
      try {
        await setDoc(favDocRef, {
          toolId,
          note: trimmed,
          createdAt: serverTimestamp()
        }, { merge: true });
      } catch (err) {
        console.warn("[Firestore] Failed to sync note:", err);
      }
    }
  };

  // Create folder with instant local persistence and cloud sync
  const createFolder = async (name: string, color: string = "emerald"): Promise<string> => {
    const trimmed = name.trim();
    if (!trimmed) {
      throw new Error("Le nom du dossier ne peut pas être vide.");
    }

    const folderId = `f_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const newFolder: Folder = {
      id: folderId,
      name: trimmed,
      color: color || "emerald",
      toolIds: [],
      createdAt: new Date().toISOString()
    };

    const nextFolders = [...folders, newFolder];
    setFolders(nextFolders);
    saveFoldersToStorage(nextFolders);

    if (user && db) {
      const folderDocRef = doc(db, "users", user.uid, "folders", folderId);
      try {
        await setDoc(folderDocRef, {
          name: trimmed,
          color: color || "emerald",
          toolIds: [],
          createdAt: serverTimestamp()
        });
      } catch (err) {
        console.warn("[Firestore] Failed to sync new folder:", err);
      }
    }

    return folderId;
  };

  // Delete folder
  const deleteFolder = async (folderId: string): Promise<void> => {
    const folderToDelete = folders.find((f) => f.id === folderId);
    const nextFolders = folders.filter((f) => f.id !== folderId);
    setFolders(nextFolders);
    saveFoldersToStorage(nextFolders);

    if (user && db) {
      try {
        if (folderToDelete?.shareId) {
          try {
            await deleteDoc(doc(db, "shared_folders", folderToDelete.shareId));
          } catch (e) {
            console.warn("[Firestore] Failed to delete shared doc:", e);
          }
        }
        await deleteDoc(doc(db, "users", user.uid, "folders", folderId));
      } catch (err) {
        console.warn("[Firestore] Failed to delete folder in Firestore:", err);
      }
    }
  };

  // Rename folder
  const renameFolder = async (folderId: string, name: string, color?: string): Promise<void> => {
    const trimmed = name.trim();
    if (!trimmed) return;

    const nextFolders = folders.map((f) => {
      if (f.id === folderId) {
        return {
          ...f,
          name: trimmed,
          ...(color ? { color } : {})
        };
      }
      return f;
    });

    setFolders(nextFolders);
    saveFoldersToStorage(nextFolders);

    if (user && db) {
      try {
        const updateData: Record<string, any> = { name: trimmed };
        if (color) updateData.color = color;

        await setDoc(doc(db, "users", user.uid, "folders", folderId), updateData, { merge: true });

        const currentFolder = folders.find((f) => f.id === folderId);
        if (currentFolder?.shareId) {
          await setDoc(doc(db, "shared_folders", currentFolder.shareId), updateData, { merge: true });
        }
      } catch (err) {
        console.warn("[Firestore] Failed to rename folder in Firestore:", err);
      }
    }
  };

  // Update folder color
  const updateFolderColor = async (folderId: string, color: string): Promise<void> => {
    const nextFolders = folders.map((f) => f.id === folderId ? { ...f, color } : f);
    setFolders(nextFolders);
    saveFoldersToStorage(nextFolders);

    if (user && db) {
      try {
        await setDoc(doc(db, "users", user.uid, "folders", folderId), { color }, { merge: true });
        const currentFolder = folders.find((f) => f.id === folderId);
        if (currentFolder?.shareId) {
          await setDoc(doc(db, "shared_folders", currentFolder.shareId), { color }, { merge: true });
        }
      } catch (err) {
        console.warn("[Firestore] Failed to update folder color in Firestore:", err);
      }
    }
  };

  // Toggle tool in folder
  const toggleToolInFolder = async (folderId: string, toolId: string): Promise<boolean> => {
    const targetFolder = folders.find((f) => f.id === folderId);
    if (!targetFolder) return false;

    const exists = targetFolder.toolIds.includes(toolId);
    const updatedIds = exists
      ? targetFolder.toolIds.filter((id) => id !== toolId)
      : [...targetFolder.toolIds, toolId];

    const nextFolders = folders.map((f) => f.id === folderId ? { ...f, toolIds: updatedIds } : f);
    setFolders(nextFolders);
    saveFoldersToStorage(nextFolders);

    if (user && db) {
      try {
        await setDoc(doc(db, "users", user.uid, "folders", folderId), { toolIds: updatedIds }, { merge: true });
        if (targetFolder.shareId) {
          await setDoc(doc(db, "shared_folders", targetFolder.shareId), { toolIds: updatedIds }, { merge: true });
        }
      } catch (err) {
        console.warn("[Firestore] Failed to update tool in folder:", err);
      }
    }

    return !exists;
  };

  // Share folder publicly
  const shareFolder = async (folderId: string): Promise<string> => {
    if (!user || !db) {
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
    const folderDocRef = doc(db, "users", user.uid, "folders", folderId);

    try {
      await setDoc(sharedDocRef, {
        name: folder.name,
        color: folder.color || "emerald",
        toolIds: folder.toolIds || [],
        creatorUid: user.uid,
        createdAt: serverTimestamp()
      });

      await setDoc(folderDocRef, { shareId }, { merge: true });

      const nextFolders = folders.map(f => f.id === folderId ? { ...f, shareId } : f);
      setFolders(nextFolders);
      saveFoldersToStorage(nextFolders);

      return shareId;
    } catch (err) {
      console.error("[Firestore] Failed to share folder:", err);
      throw err;
    }
  };

  // Unshare folder
  const unshareFolder = async (folderId: string): Promise<void> => {
    if (!user || !db) return;

    const folder = folders.find((f) => f.id === folderId);
    if (!folder || !folder.shareId) return;

    const shareId = folder.shareId;
    const sharedDocRef = doc(db, "shared_folders", shareId);
    const folderDocRef = doc(db, "users", user.uid, "folders", folderId);

    try {
      await deleteDoc(sharedDocRef);
      await setDoc(folderDocRef, { shareId: null }, { merge: true });

      const nextFolders = folders.map(f => f.id === folderId ? { ...f, shareId: undefined } : f);
      setFolders(nextFolders);
      saveFoldersToStorage(nextFolders);
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
