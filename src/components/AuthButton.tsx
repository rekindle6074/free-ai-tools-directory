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
      setLoading(false);
      return;
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

  if (!auth || !db) return null;

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading) return <div className="w-8 h-8 rounded-full bg-slate-100 animate-pulse" />;

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-2 py-1 bg-emerald-50 rounded-full border border-emerald-100/50 backdrop-blur-md">
          {user.photoURL ? (
            <img src={user.photoURL} alt={user.displayName || ""} className="w-5 h-5 rounded-full border border-white" referrerPolicy="no-referrer" />
          ) : (
            <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <UserIcon className="w-3 h-3 text-emerald-600" />
            </div>
          )}
          <span className="text-xs font-bold text-slate-700 hidden lg:inline pr-1">{user.displayName?.split(" ")[0]}</span>
        </div>
        <button 
          onClick={handleLogout}
          className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
          title="Logout"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <>
      <Button 
        label="LogIn"
        onClick={() => setIsModalOpen(true)}
        variant="secondary"
        size="sm"
        icon={<LoginIcon size={14} />}
        showIcon={true}
        className="bg-slate-50 text-slate-700 border-slate-200 hover:border-emerald-500/30 hover:text-emerald-600 hover:bg-emerald-50/50 shadow-sm"
      />

      <AuthModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default AuthButton;
