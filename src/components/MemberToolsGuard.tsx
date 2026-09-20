import React, { FC, ReactNode } from "react";
import { useFavorites } from "../context/FavoritesContext";
import { Lock, LogIn, ShieldAlert, Sparkles } from "lucide-react";

interface MemberToolsGuardProps {
  children: ReactNode;
  toolCount?: number;
  categoryTitle?: string;
  className?: string;
  customMessage?: string;
}

export const MemberToolsGuard: FC<MemberToolsGuardProps> = ({
  children,
  toolCount,
  categoryTitle,
  className = "",
  customMessage,
}) => {
  const { user, authLoading, openAuthModal } = useFavorites();

  // Show a smooth skeleton while Firebase initializes to prevent layout flash
  if (authLoading) {
    return (
      <div className={`w-full ${className}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white/60 rounded-[2rem] border border-slate-200/80 p-8 animate-pulse shadow-sm flex flex-col justify-between h-[280px]"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-200/70 shrink-0" />
                <div className="flex-1 space-y-2.5">
                  <div className="h-5 bg-slate-200/80 rounded-md w-3/4" />
                  <div className="h-3.5 bg-slate-200/60 rounded-md w-1/2" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-slate-200/60 rounded-md w-full" />
                <div className="h-3 bg-slate-200/60 rounded-md w-5/6" />
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="h-4 bg-slate-200/70 rounded-md w-20" />
                <div className="h-8 bg-slate-200/80 rounded-xl w-24" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // If user is authenticated, render the tool cards
  if (user) {
    return <>{children}</>;
  }

  // Otherwise, render the secure member-gate lock
  return (
    <div
      className={`relative overflow-hidden rounded-[2.5rem] border border-slate-200/90 bg-gradient-to-b from-white via-slate-50/70 to-slate-100/50 p-8 sm:p-12 md:p-16 text-center shadow-xl shadow-slate-200/30 ${className}`}
    >
      {/* Subtle decorative background glow */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Lock Icon */}
      <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-500/10 via-emerald-100/50 to-slate-100 border border-emerald-200/70 text-emerald-700 flex items-center justify-center mx-auto mb-6 shadow-sm shadow-emerald-500/10">
        <Lock className="w-9 h-9 text-emerald-600" strokeWidth={2.2} />
      </div>

      {/* Suspension Notice Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200/90 text-amber-800 text-xs font-black uppercase tracking-wider mb-5 shadow-2xs">
        <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0" />
        <span>Inscriptions publiques suspendues</span>
      </div>

      {/* Title */}
      <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-slate-900 tracking-[-0.03em] mb-4">
        Catalogue d'outils réservé aux membres inscrits
      </h3>

      {/* Description */}
      <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8 font-medium">
        {customMessage ||
          `La liste détaillée des outils${
            categoryTitle ? ` pour ${categoryTitle}` : ""
          }, les liens directs vers les services officiels et les critères d'évaluation sont strictement réservés aux utilisateurs déjà enregistrés.`}
      </p>

      {/* Login CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
        <button
          onClick={openAuthModal}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-slate-900 text-white font-bold text-sm hover:bg-emerald-600 transition-all shadow-xl shadow-slate-900/10 active:scale-95 group"
        >
          <LogIn className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
          <span>Se connecter avec un compte existant</span>
        </button>
      </div>

      {/* Reassuring note */}
      <div className="mt-8 pt-6 border-t border-slate-200/70 max-w-lg mx-auto flex flex-col items-center gap-2">
        <p className="text-xs text-slate-500 font-medium">
          {toolCount && toolCount > 0
            ? `${toolCount} outils vérifiés sont répertoriés dans cette section.`
            : "Accès instantané à l'ensemble des outils vérifiés dès votre connexion."}
        </p>
        <span className="text-[11px] text-slate-400 font-normal">
          Les nouvelles inscriptions sont actuellement fermées. Seuls les comptes membres et administrateurs existants peuvent se connecter.
        </span>
      </div>
    </div>
  );
};

export default MemberToolsGuard;
