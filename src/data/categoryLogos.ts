/**
 * Category Custom 3D Logo Registry
 *
 * Maps categories, subcategories, and parent categories to their dedicated 3D visual logos.
 * As new category logos are provided in the series (e.g., Design-Editing.png, Chatbots.png, etc.),
 * they are registered here and automatically displayed across all placements:
 * - Mega-menus (Fixed & Navbar dropdowns)
 * - Categories Hub page & directory lists
 * - Subcategory headers & breadcrumb banners
 * - Tool Cards (category badges & fallback avatars)
 * - Tool Detail pages
 */

export const CATEGORY_CUSTOM_LOGOS: Record<string, string> = {
  // --- PARENT CATEGORIES (Catégories Mères / Thematic Hubs) ---
  "ai-media-studio": "/categories/Video-Generation.png",
  "AI Media Studio": "/categories/Video-Generation.png",
  "media-studio": "/categories/Video-Generation.png",

  "business-growth": "/categories/Data-Databases.png",
  "Business & Growth": "/categories/Data-Databases.png",
  "business-suite": "/categories/Data-Databases.png",

  "productivity-communication": "/categories/Writing-Documents.png",
  "Productivity & Communication": "/categories/Writing-Documents.png",
  "Productivity & Comm.": "/categories/Writing-Documents.png",

  "tech-development": "/categories/Code-Development.png",
  "Tech & Development": "/categories/Code-Development.png",
  "Tech & Dev": "/categories/Code-Development.png",

  "lifestyle-specialized": "/categories/Productivity.png",
  "Lifestyle & Specialized": "/categories/Productivity.png",
  "Lifestyle & Spec.": "/categories/Productivity.png",

  "general": "/categories/Web-Tools.png",
  "General": "/categories/Web-Tools.png",

  // 1. Design & Editing (Creative Design)
  "creative-design": "/categories/Design-Editing.png",
  "design-editing": "/categories/Design-Editing.png",
  "Design-Editing": "/categories/Design-Editing.png",
  "AI Creative & Design": "/categories/Design-Editing.png",
  "Editing & Stock": "/categories/Design-Editing.png",
  "ai-editing-stock": "/categories/Design-Editing.png",
  "AI Editing & Stock Tools": "/categories/Design-Editing.png",
  "ai-design-presentation": "/categories/Design-Editing.png",
  "AI Design & Presentations": "/categories/Design-Editing.png",
  "ai-photo-editing": "/categories/Design-Editing.png",
  "Photo Editing": "/categories/Design-Editing.png",
  "Photo Editing & Retouching": "/categories/Design-Editing.png",
  "ai-graphic-design": "/categories/Design-Editing.png",
  "Graphic Design Tools": "/categories/Design-Editing.png",
  "ai-interface-ux": "/categories/Design-Editing.png",
  "AI Interface & UX Design": "/categories/Design-Editing.png",

  // 2. Writing & Documents
  "office-productivity": "/categories/Productivity.png",
  "writing-documents": "/categories/Writing-Documents.png",
  "Writing-Documents": "/categories/Writing-Documents.png",
  "Writing & Documents": "/categories/Writing-Documents.png",
  "AI Office & Productivity": "/categories/Productivity.png",
  "Writing Tools": "/categories/writing.png",
  "Document Processing": "/categories/Writing-Documents.png",
  "ai-writing": "/categories/writing.png",
  "writing": "/categories/writing.png",
  "Writing": "/categories/writing.png",
  "ai-documents": "/categories/Writing-Documents.png",
  "ai-notes": "/categories/Writing-Documents.png",
  "ai-smart-productivity": "/categories/Productivity.png",
  "productivity": "/categories/Productivity.png",
  "Productivity": "/categories/Productivity.png",
  "Documents": "/categories/Writing-Documents.png",

  // 3. AI Assistants & Chatbots
  "ai-chatbots": "/categories/Chatbots.png",
  "chatbots": "/categories/Chatbots.png",
  "Chatbots": "/categories/Chatbots.png",
  "ai-assistants": "/categories/AI-Assistants.png",
  "AI-Assistants": "/categories/AI-Assistants.png",
  "AI Assistants": "/categories/AI-Assistants.png",
  "AI Chatbots": "/categories/Chatbots.png",
  "General Chatbots": "/categories/Chatbots.png",
  "Roleplay & Characters": "/categories/AI-Assistants.png",
  "free-ai-chatbot": "/categories/Chatbots.png",
  "free-ai-character": "/categories/AI-Assistants.png",
  "ai-dating-roleplay": "/categories/AI-Assistants.png",
  "free-dirty-talking-ai": "/categories/AI-Assistants.png",
  "ai-joke-generator": "/categories/AI-Assistants.png",

  // 4. Computer Vision & Image Analysis & OCR
  "image-analysis": "/categories/Computer Vision.png",
  "computer-vision": "/categories/Computer Vision.png",
  "Computer Vision": "/categories/Computer Vision.png",
  "Computer-Vision": "/categories/Computer Vision.png",
  "Image Analysis & Vision": "/categories/Computer Vision.png",
  "free-ai-image-recognition": "/categories/Computer Vision.png",
  "free-ai-ocr": "/categories/OCR-Text-Scanning.png",
  "OCR-Text-Scanning": "/categories/OCR-Text-Scanning.png",
  "ocr-text-scanning": "/categories/OCR-Text-Scanning.png",
  "Free AI OCR": "/categories/OCR-Text-Scanning.png",
  "free-image-to-prompt": "/categories/Computer Vision.png",
  "free-ai-face-recognition": "/categories/Computer Vision.png",
  "free-ai-describe-image": "/categories/Computer Vision.png",

  // 5. Voice & Speech
  "voice-speech": "/categories/VoiceSpeech.png",
  "VoiceSpeech": "/categories/VoiceSpeech.png",
  "Voice & Speech": "/categories/VoiceSpeech.png",
  "voicespeech": "/categories/VoiceSpeech.png",
  "free-ai-text-to-speech": "/categories/VoiceSpeech.png",
  "free-ai-speech-to-text": "/categories/VoiceSpeech.png",
  "free-ai-voice-cloning": "/categories/VoiceSpeech.png",
  "free-ai-voice-generator": "/categories/VoiceSpeech.png",
  "free-ai-voice-over": "/categories/VoiceSpeech.png",
  "free-ai-transcription": "/categories/VoiceSpeech.png",

  // 6. Data & Databases
  "neural-analytics-hub": "/categories/Data-Databases.png",
  "data-databases": "/categories/Data-Databases.png",
  "Data-Databases": "/categories/Data-Databases.png",
  "Data & Databases": "/categories/Data-Databases.png",
  "Neural Analytics & Data": "/categories/Data-Databases.png",
  "free-ai-for-data-analytics": "/categories/Data-Databases.png",
  "free-ai-research-tool": "/categories/Data-Databases.png",
  "free-ai-predictions": "/categories/Data-Databases.png",
  "free-ai-research-papers": "/categories/Data-Databases.png",

  // 7. Web & Tools
  "web-tools": "/categories/Web-Tools.png",
  "Web-Tools": "/categories/Web-Tools.png",
  "Web & Tools": "/categories/Web-Tools.png",
  "Builders & Web": "/categories/Web-Tools.png",
  "free-ai-app-builder": "/categories/Web-Tools.png",
  "ai-website-builder": "/categories/Web-Tools.png",
  "ai-landing-page-builder": "/categories/Web-Tools.png",
  "web-scraping": "/categories/Web-Tools.png",

  // 8. Code & Development
  "developer-tools": "/categories/Code-Development.png",
  "code-development": "/categories/Code-Development.png",
  "Code-Development": "/categories/Code-Development.png",
  "Code & Development": "/categories/Code-Development.png",
  "AI Developer Tools": "/categories/Code-Development.png",
  "Code & Engineering": "/categories/Code-Development.png",
  "free-ai-code-assistant": "/categories/Code-Development.png",
  "free-ai-code-generator": "/categories/Code-Development.png",
  "free-ai-developer-tools": "/categories/Code-Development.png",
  "free-low-code": "/categories/Code-Development.png",

  // 9. Video Generation
  "video-generator": "/categories/Video-Generation.png",
  "video-generation": "/categories/Video-Generation.png",
  "Video-Generation": "/categories/Video-Generation.png",
  "Video Generation": "/categories/Video-Generation.png",
  "AI Video Generators": "/categories/Video-Generation.png",
  "Video & Animation": "/categories/Video-Generation.png",
  "free-text-to-video": "/categories/Video-Generation.png",
  "free-ai-video-editor": "/categories/Video-Generation.png",
  "free-ai-animation-generator": "/categories/Video-Generation.png",
  "free-image-to-video": "/categories/Video-Generation.png",
  "free-ai-lip-sync-generator": "/categories/Video-Generation.png",

  // 10. Music & Audio
  "music-audio": "/categories/Music-Audio.png",
  "music-creation": "/categories/Music-Audio.png",
  "Music-Audio": "/categories/Music-Audio.png",
  "Music & Audio": "/categories/Music-Audio.png",
  "Free AI Music & Audio": "/categories/Music-Audio.png",
  "Music Creation": "/categories/Music-Audio.png",
  "Audio Editing & Production": "/categories/Music-Audio.png",
  "Songwriting & Lyrics": "/categories/Music-Audio.png",
  "free-ai-music-generator": "/categories/Music-Audio.png",
  "free-ai-song-generator": "/categories/Music-Audio.png",
  "free-ai-instrumental-generator": "/categories/Music-Audio.png",
  "free-ai-beat-generator": "/categories/Music-Audio.png",
  "free-ai-melody-generator": "/categories/Music-Audio.png",
  "free-ai-audio-editing": "/categories/Music-Audio.png",
  "free-ai-mastering": "/categories/Music-Audio.png",
  "free-ai-audio-enhancer": "/categories/Music-Audio.png",
  "free-ai-vocal-remover": "/categories/Music-Audio.png",
  "free-ai-lyrics-generator": "/categories/Music-Audio.png",

  // 11. Analytics & Growth / Business
  "analytics-growth": "/categories/Analytics-Growth.png",
  "Analytics-Growth": "/categories/Analytics-Growth.png",
  "analytics": "/categories/Analytics-Growth.png",
  "marketing": "/categories/Analytics-Growth.png",
  "business-management": "/categories/Analytics-Growth.png",
  "business-research": "/categories/Analytics-Growth.png",
  "social-growth-hub": "/categories/Analytics-Growth.png",

  // 12. Finance & Accounting
  "finance": "/categories/Finance.png",
  "Finance": "/categories/Finance.png",
  "free-ai-for-finance": "/categories/Finance.png",
  "free-ai-accounting": "/categories/Finance.png",
  "free-ai-investing": "/categories/Finance.png",

  // 13. Legal & Law
  "legal": "/categories/Legal.png",
  "Legal": "/categories/Legal.png",
  "law-finance": "/categories/Legal.png",
  "Law & Finance": "/categories/Legal.png",
  "free-ai-legal-assistant": "/categories/Legal.png",
  "free-ai-contract-review": "/categories/Legal.png",

  // 14. Image & Visual Generation Card
  "image-generators": "/categories/image.png",
  "image-generation": "/categories/image.png",
  "Image & Visuals": "/categories/image.png",
  "free-text-to-image": "/categories/image.png",
  "Free Text to Image": "/categories/image.png",
};

/**
 * Resolves the custom 3D logo URL for any category ID, category name, or subcategory tag.
 */
export function getCategoryLogo(identifier?: string | null): string | null {
  if (!identifier) return null;
  
  // Exact match
  if (CATEGORY_CUSTOM_LOGOS[identifier]) {
    return CATEGORY_CUSTOM_LOGOS[identifier];
  }

  // Normalized match (lower-cased, alphanumeric + hyphen)
  const normalized = identifier.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");
  
  for (const [key, path] of Object.entries(CATEGORY_CUSTOM_LOGOS)) {
    const normKey = key.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");
    if (normKey === normalized) {
      return path;
    }
  }

  // Semantic keyword heuristics if no exact match found
  if (
    normalized.includes("design-editing") ||
    normalized.includes("creative-design") ||
    (normalized.includes("design") && normalized.includes("editing"))
  ) {
    return "/categories/Design-Editing.png";
  }

  if (
    normalized.includes("writing") ||
    normalized.includes("document") ||
    normalized.includes("office-productivity")
  ) {
    return "/categories/Writing-Documents.png";
  }

  if (
    normalized.includes("chatbot") ||
    normalized.includes("assistant") ||
    normalized.includes("roleplay")
  ) {
    return "/categories/AI-Assistants.png";
  }

  if (
    normalized.includes("ocr") ||
    normalized.includes("text-scanning") ||
    normalized.includes("scanning")
  ) {
    return "/categories/OCR-Text-Scanning.png";
  }

  if (
    normalized.includes("vision") ||
    normalized.includes("image-analysis") ||
    normalized.includes("image-recognition")
  ) {
    return "/categories/Computer Vision.png";
  }

  if (
    normalized.includes("finance") ||
    normalized.includes("accounting") ||
    normalized.includes("investing")
  ) {
    return "/categories/Finance.png";
  }

  if (
    normalized.includes("legal") ||
    normalized.includes("contract-review") ||
    normalized.includes("law")
  ) {
    return "/categories/Legal.png";
  }

  if (
    normalized.includes("growth") ||
    normalized.includes("business-growth")
  ) {
    return "/categories/Data-Databases.png";
  }

  if (
    normalized.includes("media-studio") ||
    normalized.includes("ai-media-studio")
  ) {
    return "/categories/Video-Generation.png";
  }

  if (
    normalized.includes("productivity-communication") ||
    normalized.includes("productivity-comm")
  ) {
    return "/categories/Writing-Documents.png";
  }

  if (
    normalized.includes("tech-development") ||
    normalized.includes("tech-dev")
  ) {
    return "/categories/Code-Development.png";
  }

  if (
    normalized.includes("lifestyle-specialized") ||
    normalized.includes("lifestyle-spec")
  ) {
    return "/categories/Productivity.png";
  }

  if (normalized === "general") {
    return "/categories/Web-Tools.png";
  }

  if (
    normalized.includes("voice") ||
    normalized.includes("speech") ||
    normalized.includes("tts")
  ) {
    return "/categories/VoiceSpeech.png";
  }

  if (
    normalized.includes("database") ||
    normalized.includes("analytics") ||
    normalized.includes("data-analytics") ||
    normalized.includes("neural-analytics")
  ) {
    return "/categories/Data-Databases.png";
  }

  if (
    normalized.includes("web-tool") ||
    normalized.includes("website-builder") ||
    normalized.includes("scraping") ||
    normalized.includes("builder")
  ) {
    return "/categories/Web-Tools.png";
  }

  if (
    normalized.includes("code") ||
    normalized.includes("developer") ||
    normalized.includes("programming")
  ) {
    return "/categories/Code-Development.png";
  }

  if (
    normalized.includes("video") ||
    normalized.includes("animation")
  ) {
    return "/categories/Video-Generation.png";
  }

  if (
    normalized.includes("music") ||
    normalized.includes("audio") ||
    normalized.includes("instrumental") ||
    normalized.includes("melody") ||
    normalized.includes("beat") ||
    normalized.includes("song")
  ) {
    return "/categories/Music-Audio.png";
  }

  return null;
}

/**
 * Returns whether a custom logo exists for the given category
 */
export function hasCategoryLogo(identifier?: string | null): boolean {
  return getCategoryLogo(identifier) !== null;
}
