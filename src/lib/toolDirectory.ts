import { featuredTools, toolsByTag, Tool } from "../data/tools";

// Pre-indexed map for O(1) instant lookups with case and whitespace insensitivity
const toolMap = new Map<string, Tool>();

function indexTools() {
  if (toolMap.size > 0) return;

  featuredTools.forEach(t => {
    if (t && t.id) {
      toolMap.set(t.id, t);
      toolMap.set(t.id.trim().toLowerCase(), t);
    }
  });

  Object.values(toolsByTag).forEach(toolsArray => {
    if (Array.isArray(toolsArray)) {
      toolsArray.forEach(t => {
        if (t && t.id) {
          toolMap.set(t.id, t);
          toolMap.set(t.id.trim().toLowerCase(), t);
        }
      });
    }
  });
}

indexTools();

export function findToolById(id: string): Tool {
  indexTools();
  if (!id) {
    return {
      id: "unknown",
      name: "Outil Enregistré",
      description: "Outil favori",
      category: "AI",
      score: 9.5,
      link: "#",
      icon: "Zap"
    };
  }

  const cleanId = id.trim();
  const direct = toolMap.get(cleanId) || toolMap.get(cleanId.toLowerCase());
  if (direct) return direct;

  // Graceful fallback tool object so user never sees their favorite vanish
  const formattedName = cleanId
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, char => char.toUpperCase());

  return {
    id: cleanId,
    name: formattedName,
    description: "Outil personnalisé enregistré dans vos favoris.",
    category: "Favoris",
    score: 9.5,
    link: "#",
    icon: "Zap"
  };
}

export function getAllUniqueTools(): Tool[] {
  indexTools();
  const uniqueMap = new Map<string, Tool>();
  featuredTools.forEach(t => uniqueMap.set(t.id, t));
  Object.values(toolsByTag).forEach(toolsArray => {
    if (Array.isArray(toolsArray)) {
      toolsArray.forEach(t => uniqueMap.set(t.id, t));
    }
  });
  return Array.from(uniqueMap.values());
}
