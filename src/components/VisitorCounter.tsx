import { FC, useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, setDoc, increment, onSnapshot } from "firebase/firestore";

const VisitorCounter: FC = () => {
  const [count, setCount] = useState<number>(() => {
    try {
      const cached = localStorage.getItem("ais_visitor_count");
      if (cached) {
        const parsed = parseInt(cached, 10);
        if (!isNaN(parsed) && parsed > 0) return parsed;
      }
    } catch {
      // ignore storage access errors
    }
    return 1371;
  });

  useEffect(() => {
    if (!db) return;
    const statRef = doc(db, "stats", "visitor_count");

    const incrementCount = async () => {
      try {
        const sessionKey = "visitor_counted_session";
        const hasBeenCounted = sessionStorage.getItem(sessionKey);
        
        if (!hasBeenCounted) {
          sessionStorage.setItem(sessionKey, "true");
          // Atomically increment with merge without requiring getDoc first.
          // This avoids the 'Failed to get document because the client is offline' error.
          await setDoc(statRef, { count: increment(1) }, { merge: true });
        }
      } catch (error: any) {
        // Silently handle offline/transient connection states (Firestore queues mutations automatically)
        const isOffline = error?.code === "unavailable" || 
                          error?.message?.includes("offline") || 
                          (typeof navigator !== "undefined" && !navigator.onLine);
        if (!isOffline) {
          console.warn("Could not increment visitor count:", error?.message || error);
        }
      }
    };

    incrementCount();

    // Listen for real-time updates from cache or Firestore server
    const unsubscribe = onSnapshot(
      statRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const val = snapshot.data()?.count;
          if (typeof val === "number") {
            setCount(val);
            try {
              localStorage.setItem("ais_visitor_count", String(val));
            } catch {
              // ignore
            }
          }
        }
      },
      (error) => {
        // Suppress expected offline warnings when client operates without internet
        const isOffline = error?.code === "unavailable" || 
                          error?.message?.includes("offline") || 
                          (typeof navigator !== "undefined" && !navigator.onLine);
        if (!isOffline) {
          console.warn("Visitor counter snapshot notice:", error?.message || error);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  if (!db) return null;

  // Format number to 8 digits with leading zeros
  const formattedCount = count.toString().padStart(8, "0");

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Visitor Counter</span>
      <div className="flex gap-0.5 bg-black p-1.5 rounded-md border-2 border-slate-800 shadow-inner">
        {formattedCount.split("").map((digit, idx) => (
          <div 
            key={idx}
            className="w-7 h-10 bg-gradient-to-b from-zinc-800 via-black to-zinc-900 flex items-center justify-center border-x border-zinc-700/30 first:border-l-0 last:border-r-0 relative overflow-hidden"
          >
            {/* Horizontal line across the middle for that old-school LCD/Odometer look */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-full h-[1px] bg-white/5 z-10" />
            </div>
            <span className="text-emerald-500 font-mono text-2xl font-bold drop-shadow-[0_0_8px_rgba(16,185,129,0.6)] relative z-0">
              {digit}
            </span>
          </div>
        ))}
      </div>
      <span className="text-[9px] text-slate-400 italic">Since 2026</span>
    </div>
  );
};

export default VisitorCounter;
