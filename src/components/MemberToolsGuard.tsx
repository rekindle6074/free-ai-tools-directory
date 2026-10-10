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

  // Allow browsing the verified tools directory for all users, with member-only interactions
  return (
    <div className={`w-full ${className}`}>
      {children}
    </div>
  );
};

export default MemberToolsGuard;
