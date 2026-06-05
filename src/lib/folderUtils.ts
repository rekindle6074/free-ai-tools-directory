import { doc, setDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

export interface Folder {
  id: string;
  name: string;
  toolIds: string[];
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
