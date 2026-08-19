import React, { FC, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { auth, db } from "../firebase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { X, Mail, Lock, User, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  allowSignup?: boolean;
  initialMode?: AuthMode;
}

type AuthMode = "login" | "signup" | "reset";

const AuthModal: FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  allowSignup = false, 
  initialMode = "login" 
}) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // If signup is not allowed and mode was somehow set to signup, fallback to login
      if (!allowSignup && mode === "signup") {
        setMode("login");
      } else if (allowSignup && initialMode) {
        setMode(initialMode);
      }
    }
  }, [isOpen, allowSignup, initialMode]);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      if (!auth) {
        setError("Firebase Auth not initialized.");
        return;
      }
      if (mode === "signup") {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName });
        
        await setDoc(doc(db, "users", userCredential.user.uid), {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName,
          favorites: [],
          createdAt: serverTimestamp(),
        });
        onClose();
      } else if (mode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
        onClose();
      } else if (mode === "reset") {
        await sendPasswordResetEmail(auth, email);
        setMessage("Check your email for a password reset link.");
        setTimeout(() => setMode("login"), 3000);
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      if (err.code === "auth/email-already-in-use") setError("Email already in use.");
      else if (err.code === "auth/invalid-credential") setError("Invalid email or password.");
      else if (err.code === "auth/weak-password") setError("Password should be at least 6 characters.");
      else if (err.code === "auth/user-not-found") setError("No user found with this email.");
      else setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      if (!auth) {
        setError("Firebase Auth not initialized.");
        return;
      }
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          favorites: [],
          createdAt: serverTimestamp(),
        });
      }
      onClose();
    } catch (err: any) {
      if (err.code !== "auth/popup-closed-by-user") {
        setError("Google login failed.");
      }
    }
  };

  if (!mounted) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden relative my-auto pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-extrabold text-slate-900">
                  {mode === "login" && "Welcome Back"}
                  {mode === "signup" && "Create Account"}
                  {mode === "reset" && "Reset Password"}
                </h2>
                <p className="text-slate-500 text-sm mt-2">
                  {mode === "login" && (allowSignup ? "Log in to save your favorite tools" : "Authorized member login")}
                  {mode === "signup" && "Register authorized member account"}
                  {mode === "reset" && "We'll send you a link to reset your password"}
                </p>
              </div>

              {error && (
                <div className="mb-6 p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              {message && (
                <div className="mb-6 p-3 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-3 text-emerald-600 text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <p>{message}</p>
                </div>
              )}

              <form onSubmit={handleAuth} className="space-y-4">
                {mode === "signup" && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input 
                        type="text"
                        required
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Your Name"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-slate-900"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-slate-900"
                    />
                  </div>
                </div>

                {mode !== "reset" && (
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center ml-1">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Password</label>
                      {mode === "login" && (
                        <button 
                          type="button"
                          onClick={() => setMode("reset")}
                          className="text-xs font-bold text-emerald-600 hover:text-emerald-700"
                        >
                          Forgot?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input 
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-slate-900"
                      />
                    </div>
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-slate-900 text-white py-3 rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                    <>
                      {mode === "login" && "Log In"}
                      {mode === "signup" && "Sign Up"}
                      {mode === "reset" && "Send Reset Link"}
                    </>
                  )}
                </button>
              </form>

              {mode !== "reset" && (
                <>
                  <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-100"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-4 text-slate-400 font-bold tracking-widest">Or continue with</span>
                    </div>
                  </div>

                  <button 
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-3 py-3 border border-slate-200 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 transition-all"
                  >
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
                    Google
                  </button>
                </>
              )}

              <div className="mt-8 text-center">
                {allowSignup ? (
                  <p className="text-sm text-slate-500">
                    {mode === "login" ? "Don't have an account?" : "Already have an account?"}
                    <button 
                      onClick={() => setMode(mode === "login" ? "signup" : "login")}
                      className="ml-2 text-emerald-600 font-bold hover:text-emerald-700"
                    >
                      {mode === "login" ? "Sign Up" : "Log In"}
                    </button>
                  </p>
                ) : (
                  <div className="text-xs text-slate-400 font-medium py-1 px-3 bg-slate-50 rounded-xl border border-slate-100/80 inline-block">
                    Public registrations are restricted to authorized members.
                  </div>
                )}
                {mode === "reset" && (
                  <div>
                    <button 
                      onClick={() => setMode("login")}
                      className="mt-4 text-sm text-slate-400 font-medium hover:text-slate-600"
                    >
                      Back to Login
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};

export default AuthModal;
