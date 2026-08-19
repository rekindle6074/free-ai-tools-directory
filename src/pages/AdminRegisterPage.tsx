import React, { FC, useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  User, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  ExternalLink, 
  Key, 
  UserPlus, 
  LogIn, 
  LogOut, 
  ShieldAlert, 
  Sparkles,
  ArrowRight,
  Eye,
  EyeOff
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export const AdminRegisterPage: FC = () => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [activeTab, setActiveTab] = useState<"register" | "login">("register");
  
  // Registration form state
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"admin" | "member">("admin");
  const [showPassword, setShowPassword] = useState(false);
  
  // Status states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [createdAccount, setCreatedAccount] = useState<{ email: string; name: string; role: string } | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setCreatedAccount(null);
    setLoading(true);

    try {
      if (!auth || !db) {
        throw new Error("Firebase Authentication is unconfigured.");
      }

      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters long.");
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      const user = userCredential.user;

      if (displayName.trim()) {
        await updateProfile(user, { displayName: displayName.trim() });
      }

      // Store in Firestore with role and authorization flags
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        uid: user.uid,
        email: user.email,
        displayName: displayName.trim() || user.email?.split("@")[0] || "Authorized User",
        role: role,
        isAuthorized: true,
        registeredVia: "admin_private_portal",
        favorites: [],
        createdAt: serverTimestamp(),
      });

      setCreatedAccount({
        email: user.email || email,
        name: displayName.trim() || user.email?.split("@")[0] || "User",
        role: role === "admin" ? "Administrateur" : "Membre Autorisé"
      });

      setSuccessMessage(`Account created successfully for ${email} with role: ${role.toUpperCase()}!`);
      // Reset form fields
      setDisplayName("");
      setEmail("");
      setPassword("");
    } catch (err: any) {
      console.error("Admin registration error:", err);
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered in the system.");
      } else if (err.code === "auth/weak-password") {
        setError("Password is too weak. Please use at least 6 characters.");
      } else if (err.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else {
        setError(err.message || "An unexpected error occurred during account creation.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      if (!auth) throw new Error("Firebase Auth is unconfigured.");
      await signInWithEmailAndPassword(auth, email.trim(), password);
      setSuccessMessage("Successfully logged in!");
      setEmail("");
      setPassword("");
    } catch (err: any) {
      console.error("Admin login error:", err);
      if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password" || err.code === "auth/user-not-found") {
        setError("Invalid email or password.");
      } else {
        setError(err.message || "Failed to log in.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      if (!auth || !db) throw new Error("Firebase is not initialized.");
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDocRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userDocRef);

      if (!docSnap.exists()) {
        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || "Google User",
          role: "admin",
          isAuthorized: true,
          registeredVia: "admin_private_google_sso",
          favorites: [],
          createdAt: serverTimestamp(),
        });
      }

      setSuccessMessage(`Google registration / login successful for ${user.email}!`);
    } catch (err: any) {
      if (err.code !== "auth/popup-closed-by-user") {
        setError("Google authentication failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    const secretUrl = window.location.href;
    navigator.clipboard.writeText(secretUrl).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };

  const handleLogout = async () => {
    if (!auth) return;
    try {
      await signOut(auth);
      setSuccessMessage("Logged out successfully.");
      setCreatedAccount(null);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <>
      <Helmet>
        <title>Private Admin Portal | Registration - FreeAI Tools</title>
        <meta name="robots" content="noindex, nofollow, noarchive" />
      </Helmet>

      <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Top Restricted Banner */}
        <div className="mb-8 p-4 rounded-2xl bg-slate-900 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-widest text-emerald-400">Portail Privé</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Accès Non Référencé
                </span>
              </div>
              <h1 className="text-lg font-bold text-slate-100">
                Administration & Inscription Privée
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={handleCopyLink}
              className="px-3.5 py-2 text-xs font-bold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-2 transition-all active:scale-95 shadow-sm"
              title="Copier le lien secret de cette page"
            >
              {copiedLink ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Lien Copié !</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-400" />
                  <span>Copier le Lien Privé</span>
                </>
              )}
            </button>
            <Link
              to="/"
              className="px-3.5 py-2 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 transition-all shadow-md shadow-emerald-900/30"
            >
              <span>Voir le Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Informational Status Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-white/70 backdrop-blur-md border border-slate-200/80 shadow-sm flex items-start gap-3.5">
            <div className="p-2 rounded-xl bg-rose-50 text-rose-600 shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Site Public</p>
              <h3 className="text-sm font-extrabold text-slate-900">Inscriptions Désactivées</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Le grand public ne peut plus créer de compte librement sur la page d'accueil ou la barre de navigation.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/70 backdrop-blur-md border border-slate-200/80 shadow-sm flex items-start gap-3.5">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Lien Secret</p>
              <h3 className="text-sm font-extrabold text-slate-900">Portail Actif</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Seules les personnes disposant de ce lien confidentiel peuvent créer et enregistrer de nouveaux comptes.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/70 backdrop-blur-md border border-slate-200/80 shadow-sm flex items-start gap-3.5">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600 shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Confidentialité SEO</p>
              <h3 className="text-sm font-extrabold text-slate-900">Robots.txt Disallow</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Cette URL est exclue des sitemaps et protégée contre l'indexation de Google Search Console.
              </p>
            </div>
          </div>
        </div>

        {/* Current Logged in User Bar if available */}
        {currentUser && (
          <div className="mb-8 p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
                {currentUser.displayName ? currentUser.displayName[0].toUpperCase() : "A"}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Connecté Actuellement
                </p>
                <p className="text-sm font-extrabold text-slate-900">
                  {currentUser.displayName || "Administrateur"} <span className="text-slate-500 font-normal">({currentUser.email})</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                to="/favorites"
                className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-white hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-all flex items-center gap-1.5"
              >
                <span>Mes Favoris & Outils</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 text-xs font-bold rounded-xl bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 transition-all flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
        )}

        {/* Main Workspace Box */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-slate-100 bg-slate-50/70 p-2 gap-2">
            <button
              onClick={() => {
                setActiveTab("register");
                setError(null);
                setSuccessMessage(null);
              }}
              className={`flex-1 py-3 px-4 rounded-2xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                activeTab === "register"
                  ? "bg-white text-emerald-700 shadow-sm border border-slate-200/80"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-100/80"
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>Créer un Nouveau Compte</span>
            </button>
            <button
              onClick={() => {
                setActiveTab("login");
                setError(null);
                setSuccessMessage(null);
              }}
              className={`flex-1 py-3 px-4 rounded-2xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                activeTab === "login"
                  ? "bg-white text-emerald-700 shadow-sm border border-slate-200/80"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-100/80"
              }`}
            >
              <LogIn className="w-4 h-4" />
              <span>Connexion Administrateur</span>
            </button>
          </div>

          <div className="p-6 sm:p-10">
            {/* Feedback Alerts */}
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 flex items-start gap-3 text-sm"
              >
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Erreur d'inscription</p>
                  <p className="text-xs text-rose-600 mt-0.5">{error}</p>
                </div>
              </motion.div>
            )}

            {successMessage && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-start gap-3 text-sm"
              >
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600 mt-0.5" />
                <div>
                  <p className="font-bold">Opération Réussie</p>
                  <p className="text-xs text-emerald-700 mt-0.5">{successMessage}</p>
                </div>
              </motion.div>
            )}

            {createdAccount && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-8 p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30"
              >
                <div className="flex items-center gap-2 text-emerald-700 font-black text-xs uppercase tracking-wider mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Nouveau Compte Enregistré avec Succès</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-white/80 p-3.5 rounded-xl border border-emerald-200/50">
                  <div>
                    <span className="text-slate-400 font-bold block">Nom d'utilisateur:</span>
                    <span className="font-bold text-slate-800">{createdAccount.name}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block">Email:</span>
                    <span className="font-bold text-slate-800">{createdAccount.email}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block">Rôle assigné:</span>
                    <span className="font-extrabold text-emerald-600">{createdAccount.role}</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Forms */}
            {activeTab === "register" ? (
              <form onSubmit={handleRegister} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider ml-1">
                      Nom / Prénom ou Alias
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        type="text"
                        required
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="ex. Administrateur Max"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all text-sm font-medium text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider ml-1">
                      Rôle & Privilèges
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value as "admin" | "member")}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all text-sm font-bold text-slate-800"
                    >
                      <option value="admin">Administrateur (Tous les droits)</option>
                      <option value="member">Membre Privilégié / Autorisé</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider ml-1">
                    Adresse Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nom@domaine.com"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all text-sm font-medium text-slate-900"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider ml-1">
                    Mot de Passe Sécurisé
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Minimum 6 caractères"
                      className="w-full pl-10 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all text-sm font-medium text-slate-900"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm uppercase tracking-wider transition-all shadow-lg shadow-emerald-600/20 active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4" />
                        <span>Créer & Enregistrer le Compte</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-4 text-slate-400 font-bold tracking-widest">Ou inscription instantanée avec Google</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleSignup}
                  disabled={loading}
                  className="w-full py-3 px-6 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm border border-slate-200 transition-all flex items-center justify-center gap-3 active:scale-[0.99]"
                >
                  <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
                  <span>Enregistrer / Authentifier via Google</span>
                </button>
              </form>
            ) : (
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider ml-1">
                    Adresse Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nom@domaine.com"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all text-sm font-medium text-slate-900"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider ml-1">
                    Mot de Passe
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all text-sm font-medium text-slate-900"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm uppercase tracking-wider transition-all shadow-lg shadow-slate-900/20 active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <LogIn className="w-4 h-4" />
                        <span>Se Connecter à l'Espace Admin</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Security & Link Sharing Box */}
        <div className="mt-8 p-6 rounded-3xl bg-slate-100/80 border border-slate-200 text-slate-600 text-xs">
          <h4 className="font-extrabold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-600" />
            Guide & Sécurité du Lien d'Inscription
          </h4>
          <p className="leading-relaxed mb-3">
            Pour maintenir votre site en règle et éviter toute inscription indésirable du grand public :
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-500">
            <li>Conservez l'URL secrète de cette page pour vous et vos collaborateurs autorisés.</li>
            <li>Le menu public du site web redirige uniquement vers la connexion des utilisateurs existants.</li>
            <li>Cette page d'administration est exclue de <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800">sitemap.xml</code> et balisée avec <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800">noindex, nofollow</code> pour protéger votre référencement SEO sur Google.</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AdminRegisterPage;
