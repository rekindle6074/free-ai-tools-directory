import { FC, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { signOut, onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { LogIn, LogOut, User as UserIcon } from "lucide-react";
import AuthModal from "./AuthModal";
import { Button } from "./ui/Button";
import { LoginIcon } from "./ui/Icons";

const AuthButton: FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(!!auth);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!auth || !db) {
      // Sandbox fallback mode - read from localstorage
      const checkMockUser = () => {
        const stored = localStorage.getItem("mock_user");
        setUser(stored ? JSON.parse(stored) as any : null);
        setLoading(false);
      };
      checkMockUser();
      window.addEventListener("auth-state-change", checkMockUser);
      return () => window.removeEventListener("auth-state-change", checkMockUser);
    }
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          // Ensure user document exists in Firestore
          const userRef = doc(db, "users", currentUser.uid);
          const userSnap = await getDoc(userRef);
          if (!userSnap.exists()) {
            await setDoc(userRef, {
              uid: currentUser.uid,
              email: currentUser.email,
              displayName: currentUser.displayName,
              createdAt: serverTimestamp(),
            });
          }
        } catch (error) {
          console.error("Error updating user profile in Firestore:", error);
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    if (!auth) {
      localStorage.removeItem("mock_user");
      window.dispatchEvent(new Event("auth-state-change"));
      setUser(null);
      return;
    }
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading) return <div className="w-6 h-6 rounded-full bg-slate-100 animate-pulse" />;

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-50 rounded-full border border-emerald-100/50 backdrop-blur-md">
          {user.photoURL ? (
            <img src={user.photoURL} alt={user.displayName || ""} className="w-4 h-4 rounded-full border border-white" referrerPolicy="no-referrer" />
          ) : (
            <div className="w-4 h-4 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <UserIcon className="w-2.5 h-2.5 text-emerald-600" />
            </div>
          )}
          <span className="text-[10px] font-black text-slate-700 uppercase tracking-wider hidden lg:inline pr-0.5">{user.displayName?.split(" ")[0] || "User"}</span>
        </div>
        <button 
          onClick={handleLogout}
          className="p-1 text-slate-400 hover:text-red-500 transition-colors"
          title="Logout"
        >
          <LogOut className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return (
    <>
      <button 
        id="login-button"
        onClick={() => setIsModalOpen(true)}
        className="px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-slate-50 text-slate-600 border border-slate-200 hover:border-emerald-500/30 hover:text-emerald-600 hover:bg-emerald-50/50 rounded-full shadow-sm transition-all flex items-center justify-center gap-1.5 active:scale-95 shrink-0"
      >
        <LoginIcon size={10} />
        <span>LogIn</span>
      </button>

      <AuthModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default AuthButton;
