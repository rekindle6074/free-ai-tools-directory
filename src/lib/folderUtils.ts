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

// Helper function to prevent infinite hangs in Firestore setDoc/deleteDoc operations
const withTimeout = <T>(promise: Promise<T>, timeoutMs = 8000, errorMsg = "Operation timed out after 8 seconds."): Promise<T> => {
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

// Create a new folder
export const createFolder = async (name: string): Promise<string> => {
  const folderId = "f_" + generateId();
  const folders = getLocalFolders();
  const newFolder: Folder = {
    id: folderId,
    name,
    toolIds: []
  };

  folders.push(newFolder);
  saveLocalFolders(folders);

  const user = auth?.currentUser;
  if (user && db) {
    const folderDocRef = doc(db, "users", user.uid, "folders", folderId);
    // Sync to Firestore in the background
    (async () => {
      try {
        await withTimeout(
          setDoc(folderDocRef, {
            name,
            toolIds: [],
            createdAt: serverTimestamp()
          }),
          6500,
          "Creating folder in Firestore timed out."
        );
      } catch (error) {
        console.error("Error saving folder to Firestore in background:", error);
      }
    })();
  }

  return folderId;
};

// Delete folder
export const deleteFolder = async (folderId: string): Promise<void> => {
  const folders = getLocalFolders().filter(f => f.id !== folderId);
  saveLocalFolders(folders);

  const user = auth?.currentUser;
  if (user && db) {
    const folderDocRef = doc(db, "users", user.uid, "folders", folderId);
    // Sync to Firestore in the background
    (async () => {
      try {
        await withTimeout(
          deleteDoc(folderDocRef),
          6500,
          "Deleting folder from Firestore timed out."
        );
      } catch (error) {
        console.error("Error deleting folder from Firestore in background:", error);
      }
    })();
  }
};

// Rename folder
export const renameFolder = async (folderId: string, name: string): Promise<void> => {
  const folders = getLocalFolders().map(f => {
    if (f.id === folderId) {
      return { ...f, name };
    }
    return f;
  });
  saveLocalFolders(folders);

  const user = auth?.currentUser;
  if (user && db) {
    const folderDocRef = doc(db, "users", user.uid, "folders", folderId);
    // Sync to Firestore in the background
    (async () => {
      try {
        await withTimeout(
          setDoc(folderDocRef, { name }, { merge: true }),
          6500,
          "Renaming folder in Firestore timed out."
        );
      } catch (error) {
        console.error("Error renaming folder in Firestore in background:", error);
      }
    })();
  }
};

// Add / Remove tool from folder
export const toggleToolInFolder = async (folderId: string, toolId: string): Promise<boolean> => {
  let isAdded = false;
  const folders = getLocalFolders().map(f => {
    if (f.id === folderId) {
      const toolIds = f.toolIds || [];
      if (toolIds.includes(toolId)) {
        f.toolIds = toolIds.filter(id => id !== toolId);
        isAdded = false;
      } else {
        f.toolIds = [...toolIds, toolId];
        isAdded = true;
      }
    }
    return f;
  });
  saveLocalFolders(folders);

  const user = auth?.currentUser;
  if (user && db) {
    const folderDocRef = doc(db, "users", user.uid, "folders", folderId);
    const folder = folders.find(f => f.id === folderId);
    if (folder) {
      // Sync to Firestore in the background
      (async () => {
        try {
          await withTimeout(
            setDoc(folderDocRef, {
              toolIds: folder.toolIds
            }, { merge: true }),
            6500,
            "Updating folder's tool list in Firestore timed out."
          );
        } catch (error) {
          console.error("Error updating tool list inside Firestore folder in background:", error);
        }
      })();
    }
  }
  return isAdded;
};

// Share custom folder/collection publicly
export const shareFolder = async (folderId: string): Promise<string> => {
  const folders = getLocalFolders();
  const folder = folders.find(f => f.id === folderId);
  if (!folder) throw new Error("Folder not found");

  const user = auth?.currentUser;
  if (!user || !db) {
    throw new Error("You must be logged in to share a folder");
  }

  // Generate a shareId if it doesn't already exist on this folder
  const shareId = folder.shareId || "s_" + generateId();
  
  // IMMEDIATELY update local storage so the UI updates and displays the share link instantly
  folder.shareId = shareId;
  saveLocalFolders(folders);

  // Sync to Firestore securely in the background
  (async () => {
    try {
      console.log(`[Share-BG] Step 1: Writing shared folder to shared_folders/${shareId}`);
      const sharedRef = doc(db, "shared_folders", shareId);
      await withTimeout(
        setDoc(sharedRef, {
          name: folder.name,
          toolIds: folder.toolIds || [],
          creatorUid: user.uid,
          createdAt: serverTimestamp()
        }),
        6500,
        "Step 1 of sharing timed out. Firestore took too long to write the shared collection."
      );

      console.log(`[Share-BG] Step 2: Saving shareId and folder schema to user folders collection`);
      const folderDocRef = doc(db, "users", user.uid, "folders", folderId);
      await withTimeout(
        setDoc(folderDocRef, {
          name: folder.name,
          toolIds: folder.toolIds || [],
          shareId,
          createdAt: serverTimestamp()
        }, { merge: true }),
        6500,
        "Step 2 of sharing timed out. User's personal collection folder write took too long."
      );
      console.log(`[Share-BG] Successfully synced shared folder to Firestore!`);
    } catch (error) {
      console.error("[Share-BG] Background Firestore write failed:", error);
    }
  })();

  return shareId;
};

// Remove public share link of a collection
export const unshareFolder = async (folderId: string): Promise<void> => {
  const folders = getLocalFolders();
  const folder = folders.find(f => f.id === folderId);
  if (!folder || !folder.shareId) return;

  const user = auth?.currentUser;
  if (!user || !db) return;

  const shareId = folder.shareId;

  // IMMEDIATELY clear the shareId from local storage so UI resets instantly
  delete folder.shareId;
  saveLocalFolders(folders);

  // Sync to Firestore in the background
  (async () => {
    try {
      console.log(`[Unshare-BG] Step 1: Deleting shared collection link`);
      const sharedRef = doc(db, "shared_folders", shareId);
      await withTimeout(
        deleteDoc(sharedRef),
        6500,
        "Deleting shared collection link timed out."
      );

      console.log(`[Unshare-BG] Step 2: Resetting user folder document to omit shareId`);
      const folderDocRef = doc(db, "users", user.uid, "folders", folderId);
      await withTimeout(
        setDoc(folderDocRef, {
          name: folder.name,
          toolIds: folder.toolIds || [],
          createdAt: serverTimestamp()
        }),
        6500,
        "Updating user folders during unshare timed out."
      );
      console.log(`[Unshare-BG] Successfully unshared folder on Firestore!`);
    } catch (error) {
      console.error("[Unshare-BG] Background Firestore unshare failed:", error);
    }
  })();
};

