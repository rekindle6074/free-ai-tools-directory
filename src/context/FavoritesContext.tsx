import React, { createContext, useContext, useState, useEffect, FC, ReactNode } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  onSnapshot, 
  serverTimestamp,
  getDoc
} from "firebase/firestore";
import { auth, db, handleFirestoreError, OperationType } from "../firebase";
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
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export const FavoritesProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(auth?.currentUser || null);
  const [authLoading, setAuthLoading] = useState(true);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [folders, setFolders] = useState<Folder[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // 1. One-time purge of any obsolete localStorage keys to ensure zero browser-cached data
  useEffect(() => {
    try {
      localStorage.removeItem("vetted_ai_favorites");
      localStorage.removeItem("vetted_ai_notes");
      localStorage.removeItem("vetted_ai_folders");
      localStorage.removeItem("vetted_ai_sync_completed");
    } catch (e) {
      // Ignore if disabled
    }
  }, []);

  // 2. Track authentication state and attach live Firestore listeners
  useEffect(() => {
    if (!auth) {
      setAuthLoading(false);
      setLoading(false);
      return;
    }

    let unsubscribeFavorites: (() => void) | null = null;
    let unsubscribeFolders: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);

      if (!currentUser) {
        // User is logged out: Reset in-memory states
        setFavoriteIds([]);
        setNotes({});
        setFolders([]);
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
        setLoading(false);
        return;
      }

      setLoading(true);

      // A. Live Firestore listener for favorites
      const favoritesRef = collection(db, "users", currentUser.uid, "favorites");
      unsubscribeFavorites = onSnapshot(favoritesRef, (snapshot) => {
        const ids: string[] = [];
        const notesMap: Record<string, string> = {};

        snapshot.docs.forEach((docSnap) => {
          ids.push(docSnap.id);
          const data = docSnap.data();
          if (data && typeof data.note === "string") {
            notesMap[docSnap.id] = data.note;
          }
        });

        setFavoriteIds(ids);
        setNotes(notesMap);
        setLoading(false);
      }, (err) => {
        console.error("[Firestore] Favorites subscription error:", err);
        handleFirestoreError(err, OperationType.LIST, `users/${currentUser.uid}/favorites`);
        setLoading(false);
      });

      // B. Live Firestore listener for custom folders
      const foldersRef = collection(db, "users", currentUser.uid, "folders");
      unsubscribeFolders = onSnapshot(foldersRef, (snapshot) => {
        const folderList: Folder[] = snapshot.docs.map((docSnap) => {
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

        setFolders(folderList);
      }, (err) => {
        console.error("[Firestore] Folders subscription error:", err);
        handleFirestoreError(err, OperationType.LIST, `users/${currentUser.uid}/folders`);
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

  const isFavorite = (toolId: string) => {
    return favoriteIds.includes(toolId);
  };

  const getNote = (toolId: string) => {
    return notes[toolId] || "";
  };

  // Toggle favorite directly in Firestore
  const toggleFavorite = async (toolId: string, initialNote = ""): Promise<boolean> => {
    if (!user) {
      openAuthModal();
      return false;
    }

    if (!db) {
      throw new Error("Firestore database is unconfigured.");
    }

    const currentlyFav = favoriteIds.includes(toolId);
    const favDocRef = doc(db, "users", user.uid, "favorites", toolId);
    const path = `users/${user.uid}/favorites/${toolId}`;

    try {
      if (currentlyFav) {
        await deleteDoc(favDocRef);
        return false;
      } else {
        await setDoc(favDocRef, {
          toolId,
          note: initialNote || "",
          createdAt: serverTimestamp()
        });
        return true;
      }
    } catch (err) {
      handleFirestoreError(err, currentlyFav ? OperationType.DELETE : OperationType.WRITE, path);
      throw err;
    }
  };

  // Save or update note directly in Firestore
  const saveNote = async (toolId: string, note: string): Promise<void> => {
    if (!user) {
      openAuthModal();
      return;
    }

    if (!db) {
      throw new Error("Firestore database is unconfigured.");
    }

    const favDocRef = doc(db, "users", user.uid, "favorites", toolId);
    const path = `users/${user.uid}/favorites/${toolId}`;

    try {
      await setDoc(favDocRef, {
        toolId,
        note: note.trim(),
        createdAt: serverTimestamp()
      }, { merge: true });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, path);
      throw err;
    }
  };

  // Create folder directly in Firestore with color
  const createFolder = async (name: string, color: string = "emerald"): Promise<string> => {
    if (!user) {
      openAuthModal();
      throw new Error("Vous devez être connecté pour créer un dossier.");
    }

    if (!db) {
      throw new Error("Firestore database is unconfigured.");
    }

    const trimmed = name.trim();
    if (!trimmed) {
      throw new Error("Le nom du dossier ne peut pas être vide.");
    }

    const folderId = `f_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const folderDocRef = doc(db, "users", user.uid, "folders", folderId);
    const path = `users/${user.uid}/folders/${folderId}`;

    try {
      await setDoc(folderDocRef, {
        name: trimmed,
        color: color || "emerald",
        toolIds: [],
        createdAt: serverTimestamp()
      });
      return folderId;
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, path);
      throw err;
    }
  };

  // Delete folder directly in Firestore
  const deleteFolder = async (folderId: string): Promise<void> => {
    if (!user || !db) return;

    const folderToDelete = folders.find((f) => f.id === folderId);
    const folderDocRef = doc(db, "users", user.uid, "folders", folderId);
    const path = `users/${user.uid}/folders/${folderId}`;

    try {
      // If folder was publicly shared, remove shared document as well
      if (folderToDelete?.shareId) {
        try {
          await deleteDoc(doc(db, "shared_folders", folderToDelete.shareId));
        } catch (e) {
          console.warn("[Firestore] Failed to delete shared link:", e);
        }
      }
      await deleteDoc(folderDocRef);
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, path);
      throw err;
    }
  };

  // Rename folder and optionally update its color directly in Firestore
  const renameFolder = async (folderId: string, name: string, color?: string): Promise<void> => {
    if (!user || !db) return;

    const trimmed = name.trim();
    if (!trimmed) return;

    const folderDocRef = doc(db, "users", user.uid, "folders", folderId);
    const path = `users/${user.uid}/folders/${folderId}`;

    try {
      const updateData: Record<string, any> = { name: trimmed };
      if (color) {
        updateData.color = color;
      }
      await setDoc(folderDocRef, updateData, { merge: true });

      // If public link exists, update name and color there too
      const currentFolder = folders.find((f) => f.id === folderId);
      if (currentFolder?.shareId) {
        await setDoc(doc(db, "shared_folders", currentFolder.shareId), updateData, { merge: true });
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, path);
      throw err;
    }
  };

  // Update folder color directly in Firestore
  const updateFolderColor = async (folderId: string, color: string): Promise<void> => {
    if (!user || !db) return;

    const folderDocRef = doc(db, "users", user.uid, "folders", folderId);
    const path = `users/${user.uid}/folders/${folderId}`;

    try {
      await setDoc(folderDocRef, { color }, { merge: true });

      const currentFolder = folders.find((f) => f.id === folderId);
      if (currentFolder?.shareId) {
        await setDoc(doc(db, "shared_folders", currentFolder.shareId), { color }, { merge: true });
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, path);
      throw err;
    }
  };

  // Toggle tool inside folder directly in Firestore
  const toggleToolInFolder = async (folderId: string, toolId: string): Promise<boolean> => {
    if (!user) {
      openAuthModal();
      return false;
    }

    if (!db) return false;

    const targetFolder = folders.find((f) => f.id === folderId);
    if (!targetFolder) return false;

    const exists = targetFolder.toolIds.includes(toolId);
    const updatedIds = exists
      ? targetFolder.toolIds.filter((id) => id !== toolId)
      : [...targetFolder.toolIds, toolId];

    const folderDocRef = doc(db, "users", user.uid, "folders", folderId);
    const path = `users/${user.uid}/folders/${folderId}`;

    try {
      await setDoc(folderDocRef, { toolIds: updatedIds }, { merge: true });

      // If publicly shared, update toolIds in shared collection
      if (targetFolder.shareId) {
        await setDoc(doc(db, "shared_folders", targetFolder.shareId), { toolIds: updatedIds }, { merge: true });
      }

      return !exists;
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, path);
      throw err;
    }
  };

  // Share folder publicly on Firestore
  const shareFolder = async (folderId: string): Promise<string> => {
    if (!user || !db) {
      openAuthModal();
      throw new Error("Vous devez être connecté pour partager un dossier.");
    }

    const folder = folders.find((f) => f.id === folderId);
    if (!folder) throw new Error("Dossier introuvable.");

    // If already shared, return existing shareId
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
      return shareId;
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `shared_folders/${shareId}`);
      throw err;
    }
  };

  // Unshare folder on Firestore
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
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `shared_folders/${shareId}`);
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
        closeAuthModal
      }}
    >
      {children}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        allowSignup={false}
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
