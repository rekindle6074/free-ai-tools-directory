export const STATIC_PAGE_SEO = {
  home: {
    title: "Free AI Tools Directory 2026 | Best Free AI Alternatives",
    description: "Explore hundreds of 100% free AI tools and software across video, image, music, marketing, design, and code with zero subscriptions."
  },
  browse: {
    title: "Browse All Free AI Tools | Complete 2026 AI Directory",
    description: "Search and filter through hundreds of curated free artificial intelligence apps and alternatives."
  },
  categories: {
    title: "Free AI Tools Categories & Directory Hub (2026)",
    description: "Discover curated AI software organized across major categories: Video, Image, Writing, Marketing, and Development."
  },
  insights: {
    title: "AI Trends & Insights 2026 | Free AI App Store",
    description: "In-depth analysis, comparisons, and market trends covering generative AI models and tools."
  },
  weeklyPicks: {
    title: "Weekly AI Picks | Handpicked Free Tools of the Week",
    description: "Every week our editorial team tests and selects the top free AI applications and gems."
  },
  favorites: {
    title: "My Favorite AI Tools | Personal AI Collection",
    description: "Manage your saved and bookmarked free AI tools in one convenient dashboard."
  },
  sharedFolder: {
    title: "Shared AI Tools Collection | AI App Store",
    description: "View collaborative lists of curated free artificial intelligence software."
  },
  legal: {
    title: "Privacy Policy & Terms of Service | AI App Store",
    description: "Review our privacy policy, terms of service, and directory guidelines."
  },
  notFound: {
    title: "404 - Page Not Found | AI App Store",
    description: "The page you are looking for does not exist or has been moved."
  }
};

export function getSubCategorySeoTitle(subCategoryName: string): string {
  return `Best Free ${subCategoryName} Tools (2026) | AI App Store`;
}

export function getSubCategorySeoDescription(subCategoryName: string): string {
  return `Discover the top free ${subCategoryName} tools in 2026. Compare features, pricing, and capabilities to find the perfect free AI solution for your projects.`;
}

export function getToolSeoTitle(toolName: string, category: string): string {
  return `${toolName} Review & Free Alternatives (2026) | ${category}`;
}

export function getToolSeoDescription(toolName: string, toolDesc: string, category: string): string {
  return `Learn all about ${toolName} in ${category}. ${toolDesc} Free access details, features, and reviews.`;
}

export function createItemListSchema(
  arg1: any,
  arg2?: any,
  arg3?: any
): any {
  if (typeof arg1 === "string") {
    // Called as: createItemListSchema(name, description, items)
    const name = arg1;
    const description = arg2 || "";
    const items = Array.isArray(arg3) ? arg3 : [];
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": name,
      "description": description,
      "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "description": item.description,
        "url": item.url || item.link
      }))
    };
  }

  // Called as: createItemListSchema(tools, subCategoryName)
  const tools = Array.isArray(arg1) ? arg1 : [];
  const subCategoryName = arg2 || "AI Tools";
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `Top Free ${subCategoryName} Tools`,
    "description": `Curated directory of the best free ${subCategoryName} software and AI platforms.`,
    "itemListElement": tools.map((tool, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": tool.name,
      "description": tool.description,
      "url": tool.link
    }))
  };
}

export function createSoftwareApplicationSchema(tool: {
  name: string;
  description: string;
  url: string;
  applicationCategory?: string;
  operatingSystem?: string;
  price?: string;
  offers?: any;
  [key: string]: any;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.name,
    "description": tool.description,
    "url": tool.url,
    "applicationCategory": tool.applicationCategory || "BusinessApplication",
    "operatingSystem": tool.operatingSystem || "Web",
    "offers": tool.offers || {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };
}
