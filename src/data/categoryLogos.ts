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
  "ai-media-studio": "/categories/AI-Media-Studio.png",
  "AI-Media-Studio": "/categories/AI-Media-Studio.png",
  "AI Media Studio": "/categories/AI-Media-Studio.png",
  "media-studio": "/categories/AI-Media-Studio.png",

  "business-growth": "/categories/Business-Growth.png",
  "Business-Growth": "/categories/Business-Growth.png",
  "Business & Growth": "/categories/Business-Growth.png",
  "business-suite": "/categories/Business-Growth.png",
  "business": "/categories/Business-Growth.png",

  "productivity-communication": "/categories/Writing-Documents.png",
  "Productivity & Communication": "/categories/Writing-Documents.png",
  "Productivity & Comm.": "/categories/Writing-Documents.png",

  "tech-development": "/categories/Code-Development.png",
  "Tech & Development": "/categories/Code-Development.png",
  "Tech & Dev": "/categories/Code-Development.png",

  "lifestyle-specialized": "/categories/AI-Lifestyle-Directory.png",
  "Lifestyle & Specialized": "/categories/AI-Lifestyle-Directory.png",
  "Lifestyle & Spec.": "/categories/AI-Lifestyle-Directory.png",

  "general": "/categories/General.png",
  "General": "/categories/General.png",
  "other": "/categories/Other.png",
  "Other": "/categories/Other.png",

  // 1. Design & Editing (Creative Design)
  "creative-design": "/categories/AI-Creative-Design.png",
  "AI-Creative-Design": "/categories/AI-Creative-Design.png",
  "design-editing": "/categories/AI-Creative-Design.png",
  "Design-Editing": "/categories/AI-Creative-Design.png",
  "AI Creative & Design": "/categories/AI-Creative-Design.png",
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
  "Free AI Music Generator": "/categories/Music-Audio.png",
  "music-generator": "/categories/Music-Audio.png",
  "Music Generator": "/categories/Music-Audio.png",
  "ai-music-generator": "/categories/Music-Audio.png",
  "free-ai-song-generator": "/categories/Music-Audio.png",
  "Free AI Song Generator": "/categories/Music-Audio.png",
  "song-generator": "/categories/Music-Audio.png",
  "Song Generator": "/categories/Music-Audio.png",
  "ai-song-generator": "/categories/Music-Audio.png",
  "free-ai-singing-generator": "/categories/Music-Audio.png",
  "Free AI Singing Generator": "/categories/Music-Audio.png",
  "singing-generator": "/categories/Music-Audio.png",
  "Singing Generator": "/categories/Music-Audio.png",
  "ai-singing-generator": "/categories/Music-Audio.png",
  "free-ai-instrumental-generator": "/categories/Music-Audio.png",
  "Free AI Instrumental Generator": "/categories/Music-Audio.png",
  "instrumental-generator": "/categories/Music-Audio.png",
  "Instrumental Generator": "/categories/Music-Audio.png",
  "ai-instrumental-generator": "/categories/Music-Audio.png",
  "free-ai-beat-generator": "/categories/Music-Audio.png",
  "free-ai-melody-generator": "/categories/Music-Audio.png",
  "Free AI Melody Generator": "/categories/Music-Audio.png",
  "melody-generator": "/categories/Music-Audio.png",
  "Melody Generator": "/categories/Music-Audio.png",
  "ai-melody-generator": "/categories/Music-Audio.png",
  "free-ai-midi-generator": "/categories/Music-Audio.png",
  "Free AI Midi Generator": "/categories/Music-Audio.png",
  "midi-generator": "/categories/Music-Audio.png",
  "Midi Generator": "/categories/Music-Audio.png",
  "ai-midi-generator": "/categories/Music-Audio.png",
  "free-ai-audio-editing": "/categories/Music-Audio.png",
  "Free AI Audio Editing": "/categories/Music-Audio.png",
  "audio-editing": "/categories/Music-Audio.png",
  "Audio Editing": "/categories/Music-Audio.png",
  "free-ai-mastering": "/categories/Music-Audio.png",
  "Free AI Mastering": "/categories/Music-Audio.png",
  "mastering": "/categories/Music-Audio.png",
  "Mastering": "/categories/Music-Audio.png",
  "ai-mastering": "/categories/Music-Audio.png",
  "free-ai-audio-enhancer": "/categories/Music-Audio.png",
  "Free AI Audio Enhancer": "/categories/Music-Audio.png",
  "audio-enhancer": "/categories/Music-Audio.png",
  "Audio Enhancer": "/categories/Music-Audio.png",
  "free-ai-vocal-remover": "/categories/Music-Audio.png",
  "Free AI Vocal Remover": "/categories/Music-Audio.png",
  "vocal-remover": "/categories/Music-Audio.png",
  "Vocal Remover": "/categories/Music-Audio.png",
  "ai-vocal-remover": "/categories/Music-Audio.png",
  "free-ai-noise-cancellation": "/categories/Music-Audio.png",
  "Free AI Noise Cancellation": "/categories/Music-Audio.png",
  "noise-cancellation": "/categories/Music-Audio.png",
  "Noise Cancellation": "/categories/Music-Audio.png",
  "ai-noise-cancellation": "/categories/Music-Audio.png",
  "free-ai-sfx-generator": "/categories/Music-Audio.png",
  "Free AI Sound Effect Generator": "/categories/Music-Audio.png",
  "free-ai-sound-effect-generator": "/categories/Music-Audio.png",
  "sfx-generator": "/categories/Music-Audio.png",
  "sound-effect-generator": "/categories/Music-Audio.png",
  "Sound Effect Generator": "/categories/Music-Audio.png",
  "ai-sfx-generator": "/categories/Music-Audio.png",
  "free-ai-podcast": "/categories/Music-Audio.png",
  "Free AI Podcast": "/categories/Music-Audio.png",
  "podcast": "/categories/Music-Audio.png",
  "Podcast": "/categories/Music-Audio.png",
  "ai-podcast": "/categories/Music-Audio.png",
  "free-ai-lyrics-generator": "/categories/Music-Audio.png",

  // 11. Marketing & Business
  "marketing": "/categories/Marketing.png",
  "Marketing": "/categories/Marketing.png",
  "business-management": "/categories/Business-Management.png",
  "Business-Management": "/categories/Business-Management.png",
  "Business Management": "/categories/Business-Management.png",
  "business-research": "/categories/Business-Research.png",
  "Business-Research": "/categories/Business-Research.png",
  "Business Research": "/categories/Business-Research.png",
  "social-growth-hub": "/categories/Social-Growth-Hub.png",
  "Social-Growth-Hub": "/categories/Social-Growth-Hub.png",
  "Social Growth Hub": "/categories/Social-Growth-Hub.png",
  "analytics-growth": "/categories/Analytics-Growth.png",
  "Analytics-Growth": "/categories/Analytics-Growth.png",
  "analytics": "/categories/Analytics-Growth.png",

  // 12. Finance & Accounting
  "finance": "/categories/Finance.png",
  "Finance": "/categories/Finance.png",
  "free-ai-for-finance": "/categories/Finance.png",
  "free-ai-accounting": "/categories/Finance.png",
  "free-ai-investing": "/categories/Finance.png",

  // 13. Legal & Law
  "law-finance": "/categories/Law-and-Finance.png",
  "Law-and-Finance": "/categories/Law-and-Finance.png",
  "Law & Finance": "/categories/Law-and-Finance.png",
  "legal": "/categories/Law-and-Finance.png",
  "Legal": "/categories/Law-and-Finance.png",
  "free-ai-legal-assistant": "/categories/Legal.png",
  "free-ai-contract-review": "/categories/Legal.png",

  // 14. Image & Visual Generation Card
  "image-generators": "/categories/AI-Image-Generators.png",
  "AI-Image-Generators": "/categories/AI-Image-Generators.png",
  "AI Image Generators": "/categories/AI-Image-Generators.png",
  "image-generation": "/categories/AI-Image-Generators.png",
  "Image & Visuals": "/categories/AI-Image-Generators.png",
  "free-text-to-image": "/categories/AI-Image-Generators.png",
  "Free Text to Image": "/categories/AI-Image-Generators.png",
  "free-ai-photo-editor": "/categories/AI-Image-Generators.png",
  "Free AI Photo Editor": "/categories/AI-Image-Generators.png",
  "free-ai-image-enhancer": "/categories/AI-Image-Generators.png",
  "Free AI Image Enhancer": "/categories/AI-Image-Generators.png",
  "free-ai-image-upscaler": "/categories/AI-Image-Generators.png",
  "Free AI Image Upscaler": "/categories/AI-Image-Generators.png",
  "free-ai-photo-filter": "/categories/AI-Image-Generators.png",
  "Free AI Photo Filter": "/categories/AI-Image-Generators.png",
  "free-ai-photo-restoration": "/categories/AI-Image-Generators.png",
  "Free AI Photo Restoration": "/categories/AI-Image-Generators.png",
  "free-ai-eraser": "/categories/AI-Image-Generators.png",
  "Free AI Eraser": "/categories/AI-Image-Generators.png",
  "free-ai-background-remover": "/categories/AI-Image-Generators.png",
  "Free AI Background Remover": "/categories/AI-Image-Generators.png",
  "free-ai-product-photography": "/categories/AI-Image-Generators.png",
  "Free AI Product Photography": "/categories/AI-Image-Generators.png",
  "free-ai-avatar-generator": "/categories/AI-Image-Generators.png",
  "Free AI Avatar Generator": "/categories/AI-Image-Generators.png",
  "avatar-generator": "/categories/AI-Image-Generators.png",
  "Avatar Generator": "/categories/AI-Image-Generators.png",

  // 15. Smart Medical Directory (Health & Medicine)
  "smart-medical-directory": "/categories/Smart-Medical-Directory.png",
  "Smart Medical Directory": "/categories/Smart-Medical-Directory.png",
  "Smart-Medical-Directory": "/categories/Smart-Medical-Directory.png",
  "smart-medical": "/categories/Smart-Medical-Directory.png",
  "free-ai-dermatology": "/categories/Smart-Medical-Directory.png",
  "free-ai-healthcare": "/categories/Smart-Medical-Directory.png",
  "free-ai-medical-diagnosis": "/categories/Smart-Medical-Directory.png",
  "free-ai-mental-health": "/categories/Smart-Medical-Directory.png",
  "free-ai-symptom-checker": "/categories/Smart-Medical-Directory.png",
  "free-ai-therapist": "/categories/Smart-Medical-Directory.png",
  "Healthcare & Wellness": "/categories/Smart-Medical-Directory.png",

  // 16. AI Lifestyle Directory (Daily Life & Wellbeing)
  "ai-lifestyle-directory": "/categories/AI-Lifestyle-Directory.png",
  "AI Lifestyle Directory": "/categories/AI-Lifestyle-Directory.png",
  "AI-Lifestyle-Directory": "/categories/AI-Lifestyle-Directory.png",
  "lifestyle": "/categories/AI-Lifestyle-Directory.png",
  "ai-trip-planner": "/categories/AI-Lifestyle-Directory.png",
  "ai-sports": "/categories/AI-Lifestyle-Directory.png",
  "ai-shopping-assistant": "/categories/AI-Lifestyle-Directory.png",
  "ai-news": "/categories/AI-Lifestyle-Directory.png",
  "ai-portrait-generator": "/categories/AI-Lifestyle-Directory.png",
  "ai-fitness": "/categories/AI-Lifestyle-Directory.png",
  "ai-bible": "/categories/AI-Lifestyle-Directory.png",
  "ai-newsletter": "/categories/AI-Lifestyle-Directory.png",
  "ai-religion": "/categories/AI-Lifestyle-Directory.png",
  "ai-recipe": "/categories/AI-Lifestyle-Directory.png",
  "ai-travel": "/categories/AI-Lifestyle-Directory.png",
  "Daily Life & Wellbeing": "/categories/AI-Lifestyle-Directory.png",

  // 17. Interior & Architectural Design
  "interior-architectural": "/categories/Interior-Architectural.png",
  "Interior & Architectural": "/categories/Interior-Architectural.png",
  "Interior-Architectural": "/categories/Interior-Architectural.png",
  "Interior & Architectural Design": "/categories/Interior-Architectural.png",
  "free-ai-floor-plan": "/categories/Interior-Architectural.png",
  "free-ai-interior-design": "/categories/Interior-Architectural.png",
  "free-ai-room-planner": "/categories/Interior-Architectural.png",
  "free-ai-landscape-generator": "/categories/Interior-Architectural.png",
  "free-ai-backyard-design": "/categories/Interior-Architectural.png",
  "free-ai-kitchen-design": "/categories/Interior-Architectural.png",
  "Architecture & Interior": "/categories/Interior-Architectural.png",

  // 18. AI Education & Translation
  "education-translation": "/categories/AI-Education-and-Translation.png",
  "Education-Translation": "/categories/AI-Education-and-Translation.png",
  "AI Education & Translation": "/categories/AI-Education-and-Translation.png",
  "AI Education and Translation": "/categories/AI-Education-and-Translation.png",
  "education": "/categories/AI-Education-and-Translation.png",
  "translation": "/categories/AI-Education-and-Translation.png",
  "ai-education": "/categories/AI-Education-and-Translation.png",
  "ai-pedagogical": "/categories/AI-Education-and-Translation.png",
  "ai-intelligent-search": "/categories/AI-Education-and-Translation.png",
  "ai-mathematics": "/categories/AI-Education-and-Translation.png",
  "ai-translation": "/categories/AI-Education-and-Translation.png",
  "ai-teachers": "/categories/AI-Education-and-Translation.png",
  "ai-students": "/categories/AI-Education-and-Translation.png",
  "ai-languages": "/categories/AI-Education-and-Translation.png",
  "ai-assessment": "/categories/AI-Education-and-Translation.png",
  "Teacher Tools": "/categories/AI-Education-and-Translation.png",
  "Student Tools": "/categories/AI-Education-and-Translation.png",
  "Language Learning Tools": "/categories/AI-Education-and-Translation.png",

  // 19. Other / Models / Miscellaneous
  "ai-detection": "/categories/Other.png",
  "free-llms": "/categories/Other.png",
  "free-ai-models": "/categories/Other.png",
  "free-open-source-ai-models": "/categories/Other.png",
  "free-ai-tools-directory": "/categories/Other.png",
  "free-ai-games": "/categories/Other.png",
  "free-ai-game-generator": "/categories/Other.png",
  "free-ai-robot": "/categories/Other.png",
  "free-minecraft-ai": "/categories/Other.png",
  "free-ai-poker": "/categories/Other.png",
  "other-misc": "/categories/Other.png",
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
    return "/categories/AI-Creative-Design.png";
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
    normalized.includes("law-finance") ||
    normalized.includes("law-and-finance") ||
    normalized.includes("legal") ||
    normalized.includes("contract-review") ||
    normalized.includes("law")
  ) {
    return "/categories/Law-and-Finance.png";
  }

  if (
    normalized.includes("business-growth") ||
    normalized === "growth"
  ) {
    return "/categories/Business-Growth.png";
  }

  if (
    normalized.includes("media-studio") ||
    normalized.includes("ai-media-studio")
  ) {
    return "/categories/AI-Media-Studio.png";
  }

  if (normalized.includes("marketing")) {
    return "/categories/Marketing.png";
  }

  if (normalized.includes("business-management")) {
    return "/categories/Business-Management.png";
  }

  if (normalized.includes("business-research")) {
    return "/categories/Business-Research.png";
  }

  if (normalized.includes("social-growth-hub") || normalized.includes("social-growth")) {
    return "/categories/Social-Growth-Hub.png";
  }

  if (normalized.includes("image-generator") || normalized.includes("text-to-image")) {
    return "/categories/AI-Image-Generators.png";
  }

  if (normalized.includes("video-generator") || normalized.includes("video-generation")) {
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
    return "/categories/AI-Lifestyle-Directory.png";
  }

  if (
    normalized.includes("medical") ||
    normalized.includes("health") ||
    normalized.includes("dermatology") ||
    normalized.includes("therapist") ||
    normalized.includes("diagnosis")
  ) {
    return "/categories/Smart-Medical-Directory.png";
  }

  if (
    normalized.includes("interior") ||
    normalized.includes("architectur") ||
    normalized.includes("floor-plan") ||
    normalized.includes("room-planner") ||
    normalized.includes("landscape-generator") ||
    normalized.includes("backyard-design") ||
    normalized.includes("kitchen-design")
  ) {
    return "/categories/Interior-Architectural.png";
  }

  if (
    normalized.includes("lifestyle") ||
    normalized.includes("trip-planner") ||
    normalized.includes("recipe") ||
    normalized.includes("fitness")
  ) {
    return "/categories/AI-Lifestyle-Directory.png";
  }

  if (
    normalized.includes("education") ||
    normalized.includes("translation") ||
    normalized.includes("pedagogical") ||
    normalized.includes("languages") ||
    normalized.includes("mathematics")
  ) {
    return "/categories/AI-Education-and-Translation.png";
  }

  if (normalized === "general" || normalized.includes("general")) {
    return "/categories/General.png";
  }

  if (
    normalized === "other" ||
    normalized.includes("llms") ||
    normalized.includes("games") ||
    normalized.includes("robot") ||
    normalized.includes("other")
  ) {
    return "/categories/Other.png";
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
