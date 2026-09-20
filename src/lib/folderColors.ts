export interface FolderColorConfig {
  id: string;
  name: string;
  hex: string;
  bgLight: string;
  borderLight: string;
  textColor: string;
  iconColor: string;
  badgeClass: string;
  activeTabClass: string;
  dotColor: string;
  ringClass: string;
  cardClass: string;
}

export const FOLDER_COLORS: FolderColorConfig[] = [
  {
    id: "emerald",
    name: "Émeraude",
    hex: "#10b981",
    bgLight: "bg-emerald-50",
    borderLight: "border-emerald-200",
    textColor: "text-emerald-700",
    iconColor: "text-emerald-600",
    badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
    activeTabClass: "bg-emerald-600 text-white border-emerald-600 shadow-sm shadow-emerald-600/30",
    dotColor: "bg-emerald-500",
    ringClass: "ring-emerald-500",
    cardClass: "bg-emerald-50/60 border-emerald-200"
  },
  {
    id: "blue",
    name: "Bleu Océan",
    hex: "#3b82f6",
    bgLight: "bg-blue-50",
    borderLight: "border-blue-200",
    textColor: "text-blue-700",
    iconColor: "text-blue-600",
    badgeClass: "bg-blue-50 text-blue-700 border-blue-200",
    activeTabClass: "bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-600/30",
    dotColor: "bg-blue-500",
    ringClass: "ring-blue-500",
    cardClass: "bg-blue-50/60 border-blue-200"
  },
  {
    id: "indigo",
    name: "Indigo",
    hex: "#6366f1",
    bgLight: "bg-indigo-50",
    borderLight: "border-indigo-200",
    textColor: "text-indigo-700",
    iconColor: "text-indigo-600",
    badgeClass: "bg-indigo-50 text-indigo-700 border-indigo-200",
    activeTabClass: "bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-600/30",
    dotColor: "bg-indigo-500",
    ringClass: "ring-indigo-500",
    cardClass: "bg-indigo-50/60 border-indigo-200"
  },
  {
    id: "violet",
    name: "Violet",
    hex: "#8b5cf6",
    bgLight: "bg-purple-50",
    borderLight: "border-purple-200",
    textColor: "text-purple-700",
    iconColor: "text-purple-600",
    badgeClass: "bg-purple-50 text-purple-700 border-purple-200",
    activeTabClass: "bg-purple-600 text-white border-purple-600 shadow-sm shadow-purple-600/30",
    dotColor: "bg-purple-500",
    ringClass: "ring-purple-500",
    cardClass: "bg-purple-50/60 border-purple-200"
  },
  {
    id: "rose",
    name: "Rose Vif",
    hex: "#f43f5e",
    bgLight: "bg-rose-50",
    borderLight: "border-rose-200",
    textColor: "text-rose-700",
    iconColor: "text-rose-600",
    badgeClass: "bg-rose-50 text-rose-700 border-rose-200",
    activeTabClass: "bg-rose-600 text-white border-rose-600 shadow-sm shadow-rose-600/30",
    dotColor: "bg-rose-500",
    ringClass: "ring-rose-500",
    cardClass: "bg-rose-50/60 border-rose-200"
  },
  {
    id: "amber",
    name: "Ambre Doré",
    hex: "#f59e0b",
    bgLight: "bg-amber-50",
    borderLight: "border-amber-200",
    textColor: "text-amber-800",
    iconColor: "text-amber-600",
    badgeClass: "bg-amber-50 text-amber-800 border-amber-200",
    activeTabClass: "bg-amber-600 text-white border-amber-600 shadow-sm shadow-amber-600/30",
    dotColor: "bg-amber-500",
    ringClass: "ring-amber-500",
    cardClass: "bg-amber-50/60 border-amber-200"
  },
  {
    id: "orange",
    name: "Orange Corail",
    hex: "#f97316",
    bgLight: "bg-orange-50",
    borderLight: "border-orange-200",
    textColor: "text-orange-700",
    iconColor: "text-orange-600",
    badgeClass: "bg-orange-50 text-orange-700 border-orange-200",
    activeTabClass: "bg-orange-600 text-white border-orange-600 shadow-sm shadow-orange-600/30",
    dotColor: "bg-orange-500",
    ringClass: "ring-orange-500",
    cardClass: "bg-orange-50/60 border-orange-200"
  },
  {
    id: "teal",
    name: "Turquoise",
    hex: "#14b8a6",
    bgLight: "bg-teal-50",
    borderLight: "border-teal-200",
    textColor: "text-teal-700",
    iconColor: "text-teal-600",
    badgeClass: "bg-teal-50 text-teal-700 border-teal-200",
    activeTabClass: "bg-teal-600 text-white border-teal-600 shadow-sm shadow-teal-600/30",
    dotColor: "bg-teal-500",
    ringClass: "ring-teal-500",
    cardClass: "bg-teal-50/60 border-teal-200"
  },
  {
    id: "slate",
    name: "Ardoise",
    hex: "#475569",
    bgLight: "bg-slate-100",
    borderLight: "border-slate-300",
    textColor: "text-slate-800",
    iconColor: "text-slate-600",
    badgeClass: "bg-slate-100 text-slate-800 border-slate-300",
    activeTabClass: "bg-slate-800 text-white border-slate-800 shadow-sm shadow-slate-800/30",
    dotColor: "bg-slate-500",
    ringClass: "ring-slate-500",
    cardClass: "bg-slate-100/70 border-slate-300"
  }
];

export const getFolderColor = (colorId?: string): FolderColorConfig => {
  if (!colorId) return FOLDER_COLORS[0];
  const found = FOLDER_COLORS.find(c => c.id === colorId);
  return found || FOLDER_COLORS[0];
};
