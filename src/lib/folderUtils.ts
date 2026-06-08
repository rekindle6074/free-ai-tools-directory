import { doc, setDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { auth, db, handleFirestoreError, OperationType } from "../firebase";

export interface Folder {
  id: string;
  name: string;
  toolIds: string[];
  shareId?: string;
}

// Generate random ID for offline usage
const generateId = () => Math.random().toString(36).substring(2, 15);

// Helper function to prevent infinite hangs in Firestore operations
const withTimeout = <T>(promise: Promise<T>, timeoutMs = 25000, errorMsg = "Operation timed out. Please check your internet connection and try again."): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error(errorMsg)), timeoutMs)
    )
  ]);
};

// Get current folders from localStorage
export const getLocalFolders = (): Folder[] => {
  try {
    const stored = localStorage.getItem("vetted_ai_folders");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {}
  return [];
};

// Save folders to localStorage & dispatch change event
export const saveLocalFolders = (folders: Folder[]) => {
  try {
    localStorage.setItem("vetted_ai_folders", JSON.stringify(folders));
    window.dispatchEvent(new Event("vetted_folders_changed"));
  } catch (e) {}
};

// Create a new folder (Awaited Sync & Rollback enabled)
export const createFolder = async (name: string): Promise<string> => {
  const folderId = "f_" + generateId();
  const folders = getLocalFolders();
  const newFolder: Folder = {
    id: folderId,
    name,
    toolIds: []
  };

  // Optimistic local update
  saveLocalFolders([...folders, newFolder]);

  const user = auth?.currentUser;
  if (user && db) {
    const folderDocRef = doc(db, "users", user.uid, "folders", folderId);
    try {
      await withTimeout(
        setDoc(folderDocRef, {
          name,
          toolIds: [],
          createdAt: new Date()
        }),
        60000,
        "Firestore timed out while creating folder."
      );
    } catch (error) {
      // Rollback local state on sync failure
      const rollbackFolders = getLocalFolders().filter(f => f.id !== folderId);
      saveLocalFolders(rollbackFolders);
      console.error("[Sync-Error] Folder creation failed. Rolled back.", error);
      throw error;
    }
  }

  return folderId;
};

// Delete folder (Awaited Sync & Rollback enabled)
export const deleteFolder = async (folderId: string): Promise<void> => {
  const folders = getLocalFolders();
  const folderToDelete = folders.find(f => f.id === folderId);
  if (!folderToDelete) return;

  // Optimistic local update
  saveLocalFolders(folders.filter(f => f.id !== folderId));

  const user = auth?.currentUser;
  if (user && db) {
    const folderDocRef = doc(db, "users", user.uid, "folders", folderId);
    try {
      await withTimeout(
        deleteDoc(folderDocRef),
        60000,
        "Firestore timed out while deleting folder."
      );
    } catch (error) {
      // Rollback local state on sync failure
      const rollbackFolders = getLocalFolders();
      if (!rollbackFolders.some(f => f.id === folderId)) {
        saveLocalFolders([...rollbackFolders, folderToDelete]);
      }
      console.error("[Sync-Error] Folder deletion failed. Rolled back.", error);
      throw error;
    }
  }
};

// Rename folder (Awaited Sync & Rollback enabled)
export const renameFolder = async (folderId: string, name: string): Promise<void> => {
  const folders = getLocalFolders();
  const folderIndex = folders.findIndex(f => f.id === folderId);
  if (folderIndex === -1) return;
  
  const originalFolder = folders[folderIndex];
  const originalName = originalFolder.name;

  // Optimistic local update
  const updatedFolders = [...folders];
  updatedFolders[folderIndex] = { ...originalFolder, name };
  saveLocalFolders(updatedFolders);

  const user = auth?.currentUser;
  if (user && db) {
    const folderDocRef = doc(db, "users", user.uid, "folders", folderId);
    try {
      await withTimeout(
        setDoc(folderDocRef, { name }, { merge: true }),
        60000,
        "Firestore timed out while renaming folder."
      );
    } catch (error) {
      // Rollback local state on sync failure
      const rollbackFolders = getLocalFolders();
      const rollbackIndex = rollbackFolders.findIndex(f => f.id === folderId);
      if (rollbackIndex !== -1) {
        rollbackFolders[rollbackIndex].name = originalName;
        saveLocalFolders(rollbackFolders);
      }
      console.error("[Sync-Error] Folder renaming failed. Rolled back.", error);
      throw error;
    }
  }
};

// Add / Remove tool from folder (Awaited Sync & Rollback enabled)
export const toggleToolInFolder = async (folderId: string, toolId: string): Promise<boolean> => {
  const folders = getLocalFolders();
  const folderIndex = folders.findIndex(f => f.id === folderId);
  if (folderIndex === -1) return false;

  const folder = folders[folderIndex];
  const originalToolIds = [...(folder.toolIds || [])];
  
  let isAdded = false;
  let newToolIds = [...originalToolIds];
  if (newToolIds.includes(toolId)) {
    newToolIds = newToolIds.filter(id => id !== toolId);
    isAdded = false;
  } else {
    newToolIds.push(toolId);
    isAdded = true;
  }

  // Optimistic local update
  const updatedFolders = [...folders];
  updatedFolders[folderIndex] = { ...folder, toolIds: newToolIds };
  saveLocalFolders(updatedFolders);

  const user = auth?.currentUser;
  if (user && db) {
    const folderDocRef = doc(db, "users", user.uid, "folders", folderId);
    try {
      await withTimeout(
        setDoc(folderDocRef, {
          toolIds: newToolIds
        }, { merge: true }),
        60000,
        "Firestore timed out while updating tools inside the folder."
      );
    } catch (error) {
      // Rollback local state on sync failure
      const rollbackFolders = getLocalFolders();
      const rollbackIndex = rollbackFolders.findIndex(f => f.id === folderId);
      if (rollbackIndex !== -1) {
        rollbackFolders[rollbackIndex].toolIds = originalToolIds;
        saveLocalFolders(rollbackFolders);
      }
      console.error("[Sync-Error] Updating tools in folder failed. Rolled back.", error);
      throw error;
    }
  }
  return isAdded;
};

// Share custom folder/collection publicly (Awaited Sync & ROLLBACK enabled)
export const shareFolder = async (folderId: string): Promise<string> => {
  const folders = getLocalFolders();
  const folderIndex = folders.findIndex(f => f.id === folderId);
  if (folderIndex === -1) throw new Error("Folder not found");
  
  const folder = folders[folderIndex];
  const user = auth?.currentUser;
  if (!user || !db) {
    throw new Error("You must be logged in to share a folder publicly.");
  }

  const shareId = folder.shareId || "s_" + generateId();
  const originalShareId = folder.shareId;

  // Optimistic local update of local storage
  const updatedFolders = [...folders];
  updatedFolders[folderIndex] = { ...folder, shareId };
  saveLocalFolders(updatedFolders);

  try {
    console.log(`[Share-Sync] Step 1: Writing shared folder document to shared_folders/${shareId}`);
    const sharedRef = doc(db, "shared_folders", shareId);
    await withTimeout(
      setDoc(sharedRef, {
        name: folder.name,
        toolIds: folder.toolIds || [],
        creatorUid: user.uid,
        createdAt: new Date()
      }),
      60000,
      "Failed to register the public shared collection. Please check your connection."
    );

    console.log(`[Share-Sync] Step 2: Saving shareId and folder schema to user folders collection`);
    const folderDocRef = doc(db, "users", user.uid, "folders", folderId);
    await withTimeout(
      setDoc(folderDocRef, {
        name: folder.name,
        toolIds: folder.toolIds || [],
        shareId: shareId,
        createdAt: new Date()
      }, { merge: true }),
      60000,
      "Failed to bind the shared link reference to your profile."
    );

    console.log(`[Share-Sync] Successfully synced shared folder to Firestore! ID: ${shareId}`);
    return shareId;
  } catch (error: any) {
    // ROLLBACK optimistic update immediately on any error!
    console.error("[Share-Sync-Error] Failed to share folder. Rolling back local state...", error);
    const rollbackFolders = getLocalFolders();
    const rollbackIndex = rollbackFolders.findIndex(f => f.id === folderId);
    if (rollbackIndex !== -1) {
      if (originalShareId) {
        rollbackFolders[rollbackIndex].shareId = originalShareId;
      } else {
        delete rollbackFolders[rollbackIndex].shareId;
      }
      saveLocalFolders(rollbackFolders);
    }
    throw error;
  }
};

// Remove public share link of a collection (Awaited Sync & ROLLBACK enabled)
export const unshareFolder = async (folderId: string): Promise<void> => {
  const folders = getLocalFolders();
  const folderIndex = folders.findIndex(f => f.id === folderId);
  if (folderIndex === -1) return;
  
  const folder = folders[folderIndex];
  const shareId = folder.shareId;
  if (!shareId) return;

  const user = auth?.currentUser;
  if (!user || !db) {
    throw new Error("You must be logged in to unshare folders.");
  }

  // Optimistic local update
  const updatedFolders = [...folders];
  delete updatedFolders[folderIndex].shareId;
  saveLocalFolders(updatedFolders);

  try {
    console.log(`[Unshare-Sync] Step 1: Deleting shared collection link`);
    const sharedRef = doc(db, "shared_folders", shareId);
    await withTimeout(
      deleteDoc(sharedRef),
      60000,
      "Failed to delete the public shared link."
    );

    console.log(`[Unshare-Sync] Step 2: Resetting user folder document to omit shareId`);
    const folderDocRef = doc(db, "users", user.uid, "folders", folderId);
    await withTimeout(
      setDoc(folderDocRef, {
        shareId: null,
        updatedAt: new Date()
      }, { merge: true }),
      60000,
      "Failed to remove the shared reference from your profile."
    );
    console.log(`[Unshare-Sync] Successfully unshared folder on Firestore!`);
  } catch (error: any) {
    console.error("[Unshare-Sync-Error] Failed to unshare folder. Rolling back...", error);
    // Rollback
    const rollbackFolders = getLocalFolders();
    const rollbackIndex = rollbackFolders.findIndex(f => f.id === folderId);
    if (rollbackIndex !== -1) {
      rollbackFolders[rollbackIndex].shareId = shareId;
      saveLocalFolders(rollbackFolders);
    }
    throw error;
  }
};
