import { Category, categories, toolsByTag } from "./tools";

export interface TopicSectionItem {
  name: string;
  path: string;
}

export interface TopicSection {
  title: string;
  items: TopicSectionItem[];
}

export interface ParentCategory {
  id: string;
  name: string;
  shortName: string;
  description: string;
  tagline?: string;
  categoryIds: string[];
  gradient?: string;
  topicSections: TopicSection[];
  focus?: string;
}

export const parentCategories: ParentCategory[] = [
  {
    id: "ai-media-studio",
    name: "Media & Creative Studio",
    shortName: "Media",
    description: "Generative video, imagery, visual arts, and audio composition suites powered by neural networks.",
    tagline: "Video, Image, Design & Audio",
    categoryIds: ["video-generator", "image-generators", "creative-design", "music-audio"],
    gradient: "from-purple-500 to-pink-500",
    focus: "Video, Image, Design & Audio",
    topicSections: [
      {
        title: "Video & Animation",
        items: [
          { name: "Free AI Video Generator", path: "free-ai-video-generator" },
          { name: "Free AI Short Video", path: "free-ai-short-video" }
        ]
      },
      {
        title: "Image & Audio",
        items: [
          { name: "Free AI Image Generator", path: "free-ai-image-generator" },
          { name: "Free AI Music Generator", path: "free-ai-music-generator" }
        ]
      }
    ]
  },
  {
    id: "business-growth",
    name: "Business & Growth",
    shortName: "Business",
    description: "Enterprise operations, viral social media scaling, legal automation, and high-impact marketing engines.",
    tagline: "Marketing, Sales, Legal & Finance",
    categoryIds: ["business-ai", "marketing", "social-growth", "law-finance"],
    gradient: "from-blue-500 to-emerald-500",
    focus: "Marketing, Sales, Legal & Social",
    topicSections: [
      {
        title: "Marketing & Sales",
        items: [
          { name: "Free AI Marketing", path: "free-ai-marketing" },
          { name: "Free AI Sales", path: "free-ai-sales" }
        ]
      },
      {
        title: "Business & Legal",
        items: [
          { name: "Free AI Company Name Generator", path: "free-ai-company-name-generator" },
          { name: "Free AI Legal Assistant", path: "free-ai-legal-assistant" }
        ]
      }
    ]
  },
  {
    id: "productivity-communication",
    name: "Productivity & Knowledge",
    shortName: "Productivity",
    description: "Workflow streamlining, intelligent conversation agents, and adaptive learning accelerators.",
    tagline: "Productivity, Chatbots & Education",
    categoryIds: ["office-productivity", "ai-chatbots", "education-translation"],
    gradient: "from-emerald-500 to-teal-500",
    focus: "Productivity, Chatbots & Learning",
    topicSections: [
      {
        title: "Work & Chat",
        items: [
          { name: "Free AI Office Productivity", path: "office-productivity" },
          { name: "Free AI Chatbots", path: "ai-chatbots" }
        ]
      }
    ]
  },
  {
    id: "tech-development",
    name: "Tech & Engineering",
    shortName: "Engineering",
    description: "Code generation, developer tooling, neural analytics, and machine learning infrastructure.",
    tagline: "Code, DevTools & Analytics",
    categoryIds: ["developer-tools", "neural-analytics"],
    gradient: "from-cyan-500 to-blue-600",
    focus: "Code, DevTools & Analytics",
    topicSections: [
      {
        title: "Coding & Dev",
        items: [
          { name: "Free AI Developer Tools", path: "developer-tools" },
          { name: "Free AI Neural Analytics", path: "neural-analytics" }
        ]
      }
    ]
  },
  {
    id: "lifestyle-specialized",
    name: "Living & Specialized",
    shortName: "Living",
    description: "Architectural modeling, personal lifestyle assistants, and healthcare intelligence.",
    tagline: "Architecture, Lifestyle & Health",
    categoryIds: ["interior-architectural", "ai-lifestyle-directory", "smart-medical"],
    gradient: "from-amber-500 to-orange-600",
    focus: "Interior, Lifestyle & Health",
    topicSections: [
      {
        title: "Design & Living",
        items: [
          { name: "Free AI Interior Design", path: "free-ai-interior-design" },
          { name: "AI Fitness", path: "ai-fitness" },
          { name: "AI Shopping Assistant", path: "ai-shopping-assistant" }
        ]
      }
    ]
  },
  {
    id: "general",
    name: "General & Vision Tools",
    shortName: "General",
    description: "Computer vision processing, multi-modal recognition, and miscellaneous AI utilities.",
    tagline: "Vision, OCR & Multimodal",
    categoryIds: ["image-analysis", "other"],
    gradient: "from-slate-600 to-slate-800",
    focus: "Vision, OCR & Utilities",
    topicSections: [
      {
        title: "Vision & Utilities",
        items: [
          { name: "Free AI Image Analysis", path: "image-analysis" },
          { name: "Free AI Other Tools", path: "other" }
        ]
      }
    ]
  }
];

export function getCategoriesForParent(parent: ParentCategory): Category[] {
  if (!parent || !parent.categoryIds) return [];
  return categories.filter((c) => parent.categoryIds.includes(c.id));
}

export function getParentCategoryForCategoryId(categoryId: string): ParentCategory | undefined {
  return parentCategories.find((p) => p.categoryIds.includes(categoryId));
}

export function getParentCategoryStats(parent: ParentCategory): {
  subCategoryCount: number;
  toolCount: number;
  totalSubcategories: number;
  totalTools: number;
} {
  const memberCats = getCategoriesForParent(parent);
  let subCategoryCount = 0;
  let toolCount = 0;

  for (const cat of memberCats) {
    subCategoryCount += cat.subCategories.length;
    for (const sub of cat.subCategories) {
      const tools = toolsByTag[sub.tag] || [];
      toolCount += tools.length || sub.count || 0;
    }
  }

  return {
    subCategoryCount,
    toolCount,
    totalSubcategories: subCategoryCount,
    totalTools: toolCount
  };
}
