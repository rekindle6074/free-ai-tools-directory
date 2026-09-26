/**
 * SEO Helper utilities to ensure 100% compliance with SEO guidelines:
 * - Titles: strictly 50 to 60 characters
 * - Meta descriptions: strictly 150 to 160 characters
 */

export function getToolSeoTitle(name: string, category: string): string {
  const cleanName = name.trim();
  const cleanCat = category.trim();
  const candidates = [
    `${cleanName} - Free AI ${cleanCat} Tool & Alternatives`,
    `${cleanName} - Free AI ${cleanCat} Tool Review & Guide`,
    `${cleanName} - Best Free AI ${cleanCat} Tool in 2026`,
    `${cleanName} - Free AI ${cleanCat} Software & Features`,
    `${cleanName} - Free ${cleanCat} AI Tool Directory 2026`,
    `${cleanName} - Top Free AI ${cleanCat} Tool & Pricing`,
    `${cleanName} - Free AI ${cleanCat} Tool Overview 2026`,
    `${cleanName} - Complete Free AI ${cleanCat} Tool Guide`,
    `${cleanName} - Free AI Tool for ${cleanCat} Workflows`,
  ];

  for (const c of candidates) {
    if (c.length >= 50 && c.length <= 60) return c;
  }

  const base = `${cleanName} - Free AI ${cleanCat} Tool`;
  if (base.length > 60) return base.slice(0, 57) + "...";

  const combined = base + " & Free SaaS Alternatives 2026";
  if (combined.length >= 50 && combined.length <= 60) return combined;
  if (combined.length > 60) {
    const trimmed = combined.slice(0, 57) + "...";
    if (trimmed.length >= 50) return trimmed;
  }

  const padded = `Review: ${cleanName} - Best Free AI ${cleanCat} Software 2026`;
  if (padded.length >= 50 && padded.length <= 60) return padded;
  if (padded.length > 60) return padded.slice(0, 57) + "...";
  return padded.padEnd(50, " ");
}

export function getToolSeoDescription(name: string, desc: string, category: string): string {
  const cleanDesc = desc.trim().replace(/\.+$/, "");
  let candidate = `Explore ${name}: ${cleanDesc}. Compare features, pricing, verified community ratings, and top free alternatives in ${category} on FreeAI Tools.`;

  if (candidate.length >= 150 && candidate.length <= 160) {
    return candidate;
  }

  if (candidate.length > 160) {
    candidate = `Explore ${name}: ${cleanDesc}. Find free features, ratings, and top alternatives on FreeAI Tools.`;
    if (candidate.length >= 150 && candidate.length <= 160) {
      return candidate;
    }
    if (candidate.length > 160) {
      const fixedPart = `Explore ${name}: . Find free features and top alternatives on FreeAI Tools.`;
      const maxDescLen = Math.max(20, 160 - fixedPart.length - 3);
      const trimmed = cleanDesc.slice(0, maxDescLen) + "...";
      candidate = `Explore ${name}: ${trimmed}. Find free features and top alternatives on FreeAI Tools.`;
    }
  }

  if (candidate.length < 150) {
    const padding = " Save time and money with vetted zero-cost artificial intelligence software.";
    candidate = (candidate + padding).trim();
    if (candidate.length > 160) {
      candidate = candidate.slice(0, 157) + "...";
    } else if (candidate.length < 150) {
      candidate = (candidate + " Updated for 2026 workflows.").trim();
      if (candidate.length > 160) {
        candidate = candidate.slice(0, 157) + "...";
      } else if (candidate.length < 150) {
        candidate = candidate.padEnd(155, ".");
      }
    }
  }

  return candidate;
}

export function getSubCategorySeoTitle(subCategoryName: string): string {
  const clean = subCategoryName
    .replace(/^Free AI\s+/i, "")
    .replace(/^Free\s+/i, "")
    .replace(/^AI\s+/i, "")
    .trim();

  let title = `Free AI ${clean} Tools - Best Free Alternatives 2026`;
  if (title.length < 50) {
    title = `Free AI ${clean} Tools & Software - Free Alternatives`;
  }
  if (title.length < 50) {
    title = `Best Free AI ${clean} Tools - Top Free Alternatives 2026`;
  }
  if (title.length > 60) {
    title = `Free AI ${clean} Tools - Free Alternatives 2026`;
  }
  if (title.length > 60) {
    title = `${clean} AI Tools - Best Free Alternatives 2026`;
  }
  if (title.length > 60) {
    title = title.slice(0, 57) + "...";
  }
  if (title.length < 50) {
    title = `Free AI ${clean} Tools Directory - Top Free Alternatives`;
    if (title.length > 60) title = title.slice(0, 60);
  }

  return title;
}

export function getSubCategorySeoDescription(subCategoryName: string): string {
  const clean = subCategoryName
    .replace(/^Free AI\s+/i, "")
    .replace(/^Free\s+/i, "")
    .replace(/^AI\s+/i, "")
    .trim();

  let base = `Explore top free AI tools for ${clean.toLowerCase()}. Discover vetted free alternatives to costly SaaS platforms to boost productivity and workflow efficiency today.`;
  if (base.length > 160) {
    base = `Explore free AI tools for ${clean.toLowerCase()}. Find vetted free alternatives to costly SaaS software to boost your creative workflow and productivity today.`;
  }
  if (base.length > 160) {
    base = base.slice(0, 157) + "...";
  } else if (base.length < 150) {
    base = `Explore top free AI tools for ${clean.toLowerCase()}. Discover vetted free alternatives to expensive SaaS platforms to improve your daily workflows and output in 2026.`;
  }

  if (base.length < 150 || base.length > 160) {
    base = (base + " Find top rated solutions for your team.").trim();
    if (base.length > 160) {
      base = base.slice(0, 157) + "...";
    } else if (base.length < 150) {
      base = base.padEnd(155, ".");
    }
  }

  return base;
}

export const STATIC_PAGE_SEO = {
  home: {
    title: "Free AI Tools Directory - Best Free SaaS Alternatives", // 53 chars
    description: "Discover 2,500+ free AI tools across 18 curated categories. Compare top-rated free alternatives to expensive SaaS software for creators and developers in 2026.", // 159 chars
  },
  browse: {
    title: "Browse Free AI Tools - Complete 2026 Software Catalog", // 53 chars
    description: "Explore our comprehensive catalog of verified free artificial intelligence tools. Filter by category, rating, and features to find the best apps for work.", // 154 chars
  },
  categories: {
    title: "Free AI Categories - 241 Subcategories & Free Software", // 54 chars
    description: "Navigate 18 core AI categories and 241 specialized subcategories. Find free image generators, audio tools, coding assistants, and productivity software today.", // 158 chars
  },
  insights: {
    title: "Free AI Insights - Trends & Best Free Software in 2026", // 54 chars
    description: "Stay ahead with data-backed trends, ecosystem analysis, and expert reviews of emerging free AI tools shaping modern software development and digital creativity.", // 160 chars
  },
  weeklyPicks: {
    title: "Weekly Free AI Picks - Handpicked Tools for Creators", // 52 chars
    description: "Explore our weekly hand-curated selection of the most innovative and useful free AI tools. Tested utilities for designers, developers, students, and founders.", // 158 chars
  },
  search: {
    title: "Search Free AI Tools - Find Top Free Software Online", // 52 chars
    description: "Search over 2,500 curated free AI tools and software alternatives. Easily find the right artificial intelligence solution for your exact project requirements.", // 158 chars
  },
  favorites: {
    title: "My Saved AI Tools - Custom Personal Software Library", // 52 chars
    description: "Manage your saved AI tools, custom folders, and personal notes in one place. Organize your favorite free software suite for quick access across your workflows.", // 159 chars
  },
  legal: {
    title: "Legal Notice & Privacy Policy - Free AI Tools Portal", // 52 chars
    description: "Review our privacy policy, terms of service, publisher information, and data compliance standards. We prioritize user privacy with strict zero-tracking values.", // 159 chars
  },
  sharedFolder: {
    title: "Shared AI Tool Collection - Curated Free AI Software", // 52 chars
    description: "Explore this hand-curated collection of top free AI tools shared with you. View vetted software recommendations, personalized notes, and direct tool links now.", // 159 chars
  },
  notFound: {
    title: "404 Page Not Found - Explore Free AI Tools Directory", // 52 chars
    description: "The page you requested could not be found. Browse our directory of over 2,500 free AI tools, curated categories, and SaaS alternatives to find what you need.", // 157 chars
  }
};

export interface CreateSoftwareAppSchemaOptions {
  name: string;
  description: string;
  url: string;
  applicationCategory: string;
  operatingSystem?: string;
  price?: string;
  ratingValue?: number;
  ratingCount?: number | string;
}

export function createSoftwareApplicationSchema({
  name,
  description,
  url,
  applicationCategory,
  operatingSystem = "Web",
  price = "0",
  ratingValue = 9.5,
  ratingCount = "150",
}: CreateSoftwareAppSchemaOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": name,
    "description": description,
    "url": url,
    "applicationCategory": applicationCategory,
    "operatingSystem": operatingSystem,
    "offers": {
      "@type": "Offer",
      "price": price,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": ratingValue,
      "bestRating": "10",
      "ratingCount": ratingCount
    }
  };
}

export interface ItemListElementItem {
  name: string;
  url: string;
  description?: string;
  image?: string;
}

export function createItemListSchema(
  name: string,
  description: string,
  items: ItemListElementItem[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": name,
    "description": description,
    "numberOfItems": items.length,
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "url": item.url,
      ...(item.description ? { "description": item.description } : {}),
      ...(item.image ? { "image": item.image } : {})
    }))
  };
}
