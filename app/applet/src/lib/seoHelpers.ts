import { Tool } from "../data/tools";

export function getSubCategorySeoTitle(subCategoryName: string): string {
  return `Best Free ${subCategoryName} Tools (2026) | AI App Store`;
}

export function getSubCategorySeoDescription(subCategoryName: string): string {
  return `Discover the top free ${subCategoryName} tools in 2026. Compare features, pricing, and capabilities to find the perfect free AI solution for your projects.`;
}

export function createItemListSchema(tools: Tool[], subCategoryName: string) {
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
