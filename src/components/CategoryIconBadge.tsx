import React, { FC, useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { getCategoryLogo } from "../data/categoryLogos";

export interface CategoryIconBadgeProps {
  categoryId?: string | null;
  categoryName?: string;
  subCategoryPath?: string | null;
  fallbackIcon?: React.ElementType;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  imgClassName?: string;
  isSelected?: boolean;
}

const SIZE_CLASSES = {
  xs: "w-9 h-9 rounded-xl",
  sm: "w-12 h-12 rounded-2xl",
  md: "w-16 h-16 rounded-2xl",
  lg: "w-20 h-20 rounded-3xl",
  xl: "w-32 h-32 sm:w-36 sm:h-36 rounded-3xl"
};

const ICON_SIZES = {
  xs: "w-7 h-7",
  sm: "w-9 h-9",
  md: "w-12 h-12",
  lg: "w-16 h-16",
  xl: "w-24 h-24 sm:w-28 sm:h-28"
};

export const CategoryIconBadge: FC<CategoryIconBadgeProps> = ({
  categoryId,
  categoryName = "Category",
  subCategoryPath,
  fallbackIcon: FallbackIcon = Sparkles,
  size = "md",
  className = "",
  imgClassName = "",
  isSelected = false
}) => {
  const logoUrl = getCategoryLogo(subCategoryPath) || getCategoryLogo(categoryId) || getCategoryLogo(categoryName);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [logoUrl]);

  if (logoUrl && !imgError) {
    return (
      <div
        className={`relative overflow-hidden shrink-0 shadow-xs flex items-center justify-center transition-transform ${SIZE_CLASSES[size]} ${className}`}
      >
        <img
          src={logoUrl}
          alt={`${categoryName} 3D category logo`}
          className={`w-full h-full object-cover scale-125 transition-transform duration-300 ${imgClassName}`}
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
