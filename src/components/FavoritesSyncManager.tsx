import { FC, useEffect, useRef } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, setDoc, getDocs, onSnapshot, serverTimestamp } from "firebase/firestore";
import { auth, db, handleFirestoreError, OperationType } from "../firebase";

export const FavoritesSyncManager: FC = () => {
  const isSyncingRef = useRef(false);

  useEffect(() => {
    if (!auth || !db) return;

    let unsubscribeSnapshot: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      // If user logs out, stop subscription
      if (!user) {
        if (unsubscribeSnapshot) {
          unsubscribeSnapshot();
          unsubscribeSnapshot = null;
        }
        return;
      }

      // Guard against double auth runs
      if (isSyncingRef.current) return;
      isSyncingRef.current = true;

      try {
        // --- 1. INITIAL SYNC / MERGE ---
        // Get local favorites first
        let localIds: string[] = [];
        try {
          const stored = localStorage.getItem("vetted_ai_favorites");
          if (stored) {
            localIds = JSON.parse(stored) || [];
          }
        } catch (e) {}

        // Query Firestore favorites once
        const favoritesRef = collection(db, "users", user.uid, "favorites");
        const snapshot = await getDocs(favoritesRef);
        const dbIds = snapshot.docs.map(docSnap => docSnap.id);
        const dbSet = new Set(dbIds);

        // Find items in local storage that don't exist in firestore
        const missingFromDb = localIds.filter(id => !dbSet.has(id));

        if (missingFromDb.length > 0) {
          console.log(`[Sync] Uploading ${missingFromDb.length} offline/local favorites to Firestore...`);
          
          await Promise.all(
            missingFromDb.map(async (id) => {
              const favDocRef = doc(db, "users", user.uid, "favorites", id);
              let localNote = "";
              try {
                const notesObj = JSON.parse(localStorage.getItem("vetted_ai_notes") || "{}");
                localNote = notesObj[id] || "";
              } catch (e) {}

              try {
                await setDoc(favDocRef, {
                  toolId: id,
                  note: localNote,
                  createdAt: serverTimestamp()
                }, { merge: true });
              } catch (err) {
                console.warn(`[Sync] Failed to upload favorite ${id}:`, err);
              }
            })
          );
        }

        // --- 2. SET UP LIVE COLLECTION SUBSCRIPTION (ONE-WAY CLOUD SOURCE OF TRUTH) ---
        if (unsubscribeSnapshot) {
          unsubscribeSnapshot();
        }

        unsubscribeSnapshot = onSnapshot(favoritesRef, (subSnapshot) => {
          const currentDbIds = subSnapshot.docs.map(d => d.id);
          
          try {
            // Keep local storage synced with latest cloud state
            localStorage.setItem("vetted_ai_favorites", JSON.stringify(currentDbIds));
            
            const notesObj = JSON.parse(localStorage.getItem("vetted_ai_notes") || "{}");
            subSnapshot.docs.forEach(docSnap => {
              const data = docSnap.data();
              if (data.note !== undefined) {
                notesObj[docSnap.id] = data.note;
              }
            });
            localStorage.setItem("vetted_ai_notes", JSON.stringify(notesObj));
            
            // Mark initial load/sync as done
            localStorage.setItem("vetted_ai_sync_completed", "true");
          } catch (e) {}

          // Notify all components that favorites have synced/changed
          window.dispatchEvent(new Event("vetted_favorites_changed"));
        }, (error) => {
          console.error("[Sync] Firestore favorites listener error:", error);
          handleFirestoreError(error, OperationType.GET, `users/${user.uid}/favorites`);
        });

      } catch (error) {
        console.error("[Sync] Error during initial sync setup:", error);
      } finally {
        isSyncingRef.current = false;
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeSnapshot) {
        unsubscribeSnapshot();
      }
    };
  }, []);

  return null; // Side-effect only component
};
