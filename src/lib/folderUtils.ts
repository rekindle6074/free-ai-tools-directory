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
    try {
      await setDoc(folderDocRef, {
        name,
        toolIds: [],
        createdAt: serverTimestamp()
      });
    } catch (error) {
      console.error("Error saving folder to Firestore:", error);
    }
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
    try {
      await deleteDoc(folderDocRef);
    } catch (error) {
      console.error("Error deleting folder from Firestore:", error);
    }
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
    try {
      await setDoc(folderDocRef, { name }, { merge: true });
    } catch (error) {
      console.error("Error renaming folder in Firestore:", error);
    }
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
      try {
        await setDoc(folderDocRef, {
          toolIds: folder.toolIds
        }, { merge: true });
      } catch (error) {
        console.error("Error updating tool list inside Firestore folder:", error);
      }
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
  
  try {
    console.log(`[Share] Step 1: Writing shared folder to shared_folders/${shareId}`);
    // Set in Firestore shared_folders
    const sharedRef = doc(db, "shared_folders", shareId);
    await setDoc(sharedRef, {
      name: folder.name,
      toolIds: folder.toolIds || [],
      creatorUid: user.uid,
      createdAt: serverTimestamp()
    });
  } catch (error) {
    console.error("[Share] Error writing to shared_folders doc:", error);
    handleFirestoreError(error, OperationType.WRITE, `shared_folders/${shareId}`);
  }

  // Save the shareId to the local folder as well
  folder.shareId = shareId;
  saveLocalFolders(folders);

  try {
    console.log(`[Share] Step 2: Saving shareId and folder schema to user folders collection`);
    // Save the complete folder payload to Firestore to comply with isValidFolder rules
    const folderDocRef = doc(db, "users", user.uid, "folders", folderId);
    await setDoc(folderDocRef, {
      name: folder.name,
      toolIds: folder.toolIds || [],
      shareId,
      createdAt: serverTimestamp()
    }, { merge: true });
  } catch (error) {
    console.error("[Share] Error of updating user folder document with share info:", error);
    handleFirestoreError(error, OperationType.WRITE, `users/${user.uid}/folders/${folderId}`);
  }

  return shareId;
};

// Remove public share link of a collection
export const unshareFolder = async (folderId: string): Promise<void> => {
  const folders = getLocalFolders();
  const folder = folders.find(f => f.id === folderId);
  if (!folder || !folder.shareId) return;

  const user = auth?.currentUser;
  if (!user || !db) return;

  const sharedRef = doc(db, "shared_folders", folder.shareId);
  try {
    await deleteDoc(sharedRef);
  } catch (error) {
    console.error("Error deleting shared folder database document:", error);
    try {
      handleFirestoreError(error, OperationType.DELETE, `shared_folders/${folder.shareId}`);
    } catch (e) {}
  }

  const oldShareId = folder.shareId;
  delete folder.shareId;
  saveLocalFolders(folders);

  const folderDocRef = doc(db, "users", user.uid, "folders", folderId);
  try {
    // Write full properties to maintain schema valid properties but omit shareId
    await setDoc(folderDocRef, {
      name: folder.name,
      toolIds: folder.toolIds || [],
      createdAt: serverTimestamp()
    }); // This resets the doc shape and removes shareId field from Firestore
  } catch (error) {
    console.error("Error clearing shareId on Firestore folder:", error);
    try {
      handleFirestoreError(error, OperationType.WRITE, `users/${user.uid}/folders/${folderId}`);
    } catch (e) {}
  }
};

