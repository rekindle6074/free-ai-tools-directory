import React, { FC, useState } from "react";
import { Sparkles } from "lucide-react";
import { getCategoryLogo } from "../data/categoryLogos";

export interface CategoryIconBadgeProps {
  categoryId?: string | null;
  categoryName?: string;
  fallbackIcon?: React.ElementType;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  imgClassName?: string;
  isSelected?: boolean;
}

const SIZE_CLASSES = {
  xs: "w-4 h-4 rounded-md",
  sm: "w-6 h-6 rounded-lg",
  md: "w-8 h-8 rounded-xl",
  lg: "w-12 h-12 rounded-2xl",
  xl: "w-16 h-16 sm:w-20 sm:h-20 rounded-3xl"
};

const ICON_SIZES = {
  xs: "w-2.5 h-2.5",
  sm: "w-3.5 h-3.5",
  md: "w-4 h-4",
  lg: "w-6 h-6",
  xl: "w-8 h-8"
};

export const CategoryIconBadge: FC<CategoryIconBadgeProps> = ({
  categoryId,
  categoryName = "Category",
  fallbackIcon: FallbackIcon = Sparkles,
  size = "md",
  className = "",
  imgClassName = "",
  isSelected = false
}) => {
  const logoUrl = getCategoryLogo(categoryId) || getCategoryLogo(categoryName);
  const [prevUrl, setPrevUrl] = useState<string | null>(logoUrl);
  const [imgError, setImgError] = useState(false);

  if (prevUrl !== logoUrl) {
    setPrevUrl(logoUrl);
    setImgError(false);
  }

  if (logoUrl && !imgError) {
    return (
      <div
        className={`relative overflow-hidden shrink-0 border border-slate-200/80 shadow-xs bg-white flex items-center justify-center transition-transform ${SIZE_CLASSES[size]} ${className}`}
      >
        <img
          src={logoUrl}
          alt={`${categoryName} 3D category logo`}
          className={`w-full h-full object-cover transition-transform duration-300 ${imgClassName}`}
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  // Fallback to Lucide Icon
  return (
    <div
      className={`flex items-center justify-center shrink-0 transition-transform ${SIZE_CLASSES[size]} ${
        isSelected
          ? "bg-emerald-400 text-slate-950 font-bold shadow-md shadow-emerald-400/30"
          : "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
      } ${className}`}
    >
      <FallbackIcon className={ICON_SIZES[size]} />
    </div>
  );
};
