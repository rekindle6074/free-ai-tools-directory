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
  "ai-art-community": "/categories/Design-Editing.png",
  "Advanced Art Tools & Community": "/categories/Design-Editing.png",
  "free-ai-art-community": "/categories/Design-Editing.png",
  "ai-art-styles": "/categories/Design-Editing.png",
  "Specialized Art Generators": "/categories/Design-Editing.png",
  "free-ai-art-styles": "/categories/Design-Editing.png",
  "ai-art-specialized": "/categories/Design-Editing.png",
  "Specialized Artistic Styles": "/categories/Design-Editing.png",
  "free-ai-art-specialized": "/categories/Design-Editing.png",
  "Editing & Stock": "/categories/Design-Editing.png",
  "editing-stock": "/categories/Design-Editing.png",
  "ai-editing-stock": "/categories/Design-Editing.png",
  "AI Editing & Stock Tools": "/categories/Design-Editing.png",
  "free-ai-editing-stock": "/categories/Design-Editing.png",
  "ai-design-presentation": "/categories/Design-Editing.png",
  "AI Design & Presentations": "/categories/Design-Editing.png",
  "free-ai-design-presentation": "/categories/Design-Editing.png",
  "design-presentation": "/categories/Design-Editing.png",
  "ai-logo-brand": "/categories/Design-Editing.png",
  "AI Logo & Brand Identity": "/categories/Design-Editing.png",
  "free-ai-logo-brand": "/categories/Design-Editing.png",
  "logo-brand": "/categories/Design-Editing.png",
  "ai-photo-editing": "/categories/Design-Editing.png",
  "Photo Editing": "/categories/Design-Editing.png",
  "Photo Editing & Retouching": "/categories/Design-Editing.png",
  "free-ai-photo-editing": "/categories/Design-Editing.png",
  "photo-editing": "/categories/Design-Editing.png",
  "ai-graphic-design": "/categories/Design-Editing.png",
  "Graphic Design Tools": "/categories/Design-Editing.png",
  "free-ai-graphic-design": "/categories/Design-Editing.png",
  "graphic-design": "/categories/Design-Editing.png",
  "ai-interface-ux": "/categories/Design-Editing.png",
  "AI Interface & UX Design": "/categories/Design-Editing.png",
  "free-ai-interface-ux": "/categories/Design-Editing.png",
  "interface-ux": "/categories/Design-Editing.png",
  "ai-architecture-interior": "/categories/Design-Editing.png",
  "AI Architecture & Interior": "/categories/Design-Editing.png",
  "free-ai-architecture-interior": "/categories/Design-Editing.png",
  "architecture-interior": "/categories/Design-Editing.png",
  "ai-visual-mockup": "/categories/Design-Editing.png",
  "AI Visual & Mockup Generators": "/categories/Design-Editing.png",
  "free-ai-visual-mockup": "/categories/Design-Editing.png",
  "visual-mockup": "/categories/Design-Editing.png",
  "ai-web-ecommerce": "/categories/Design-Editing.png",
  "AI Web & E-commerce": "/categories/Design-Editing.png",
  "free-ai-web-ecommerce": "/categories/Design-Editing.png",
  "web-ecommerce": "/categories/Design-Editing.png",
  "ai-colors-palettes": "/categories/Design-Editing.png",
  "Colors & Palettes": "/categories/Design-Editing.png",
  "free-ai-colors-palettes": "/categories/Design-Editing.png",
  "colors-palettes": "/categories/Design-Editing.png",
  "ai-typography": "/categories/Design-Editing.png",
  "Typography & Fonts": "/categories/Design-Editing.png",
  "free-ai-typography": "/categories/Design-Editing.png",
  "typography": "/categories/Design-Editing.png",
  "ai-vector-svg": "/categories/Design-Editing.png",
  "Vector & SVG Creation": "/categories/Design-Editing.png",
  "free-ai-vector-svg": "/categories/Design-Editing.png",
  "vector-svg": "/categories/Design-Editing.png",
  "ai-storytelling": "/categories/Design-Editing.png",
  "Storytelling & AI Stories": "/categories/Design-Editing.png",
  "free-ai-storytelling": "/categories/Design-Editing.png",
  "storytelling": "/categories/Design-Editing.png",
  "ai-coloring-pages": "/categories/Design-Editing.png",
  "Coloring & Activity Pages": "/categories/Design-Editing.png",
  "free-ai-coloring-pages": "/categories/Design-Editing.png",
  "coloring-pages": "/categories/Design-Editing.png",
  "ai-invitation-events": "/categories/Design-Editing.png",
  "Invitation & Event Solutions": "/categories/Design-Editing.png",
  "free-ai-invitation-events": "/categories/Design-Editing.png",
  "invitation-events": "/categories/Design-Editing.png",
  "ai-niche-tools": "/categories/Design-Editing.png",
  "Specialized & Niche AI": "/categories/Design-Editing.png",
  "free-ai-niche-tools": "/categories/Design-Editing.png",
  "niche-tools": "/categories/Design-Editing.png",
  "ai-illustration-generators": "/categories/Design-Editing.png",
  "AI Illustration Generators": "/categories/Design-Editing.png",
  "free-ai-illustration-generators": "/categories/Design-Editing.png",
  "illustration-generators": "/categories/Design-Editing.png",
  "ai-3d-modeling": "/categories/Design-Editing.png",
  "AI 3D Model Generators": "/categories/Design-Editing.png",
  "free-ai-3d-modeling": "/categories/Design-Editing.png",
  "3d-modeling": "/categories/Design-Editing.png",
  "ai-2d-to-3d": "/categories/Design-Editing.png",
  "AI 2D to 3D Conversion": "/categories/Design-Editing.png",
  "free-ai-2d-to-3d": "/categories/Design-Editing.png",
  "2d-to-3d": "/categories/Design-Editing.png",
  "ai-3d-design-collab": "/categories/Design-Editing.png",
  "3D Design & Collaboration": "/categories/Design-Editing.png",
  "free-ai-3d-design-collab": "/categories/Design-Editing.png",
  "3d-design-collab": "/categories/Design-Editing.png",
  "ai-3d-assets-resources": "/categories/Design-Editing.png",
  "3D Assets & Resources": "/categories/Design-Editing.png",
  "free-ai-3d-assets-resources": "/categories/Design-Editing.png",
  "3d-assets-resources": "/categories/Design-Editing.png",
  "ai-3d-rendering-viz": "/categories/Design-Editing.png",
  "3D Rendering & Visualization": "/categories/Design-Editing.png",
  "free-ai-3d-rendering-viz": "/categories/Design-Editing.png",
  "3d-rendering-viz": "/categories/Design-Editing.png",
  "ai-3d-scanning-capture": "/categories/Design-Editing.png",
  "3D Scanning & Capture": "/categories/Design-Editing.png",
  "free-ai-3d-scanning-capture": "/categories/Design-Editing.png",
  "3d-scanning-capture": "/categories/Design-Editing.png",
  "ai-specialized-3d": "/categories/Design-Editing.png",
  "Specialized 3D Applications": "/categories/Design-Editing.png",
  "free-ai-specialized-3d": "/categories/Design-Editing.png",
  "specialized-3d": "/categories/Design-Editing.png",

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
  "image-analysis": "/categories/computer-vision.png",
  "computer-vision": "/categories/computer-vision.png",
  "Computer Vision": "/categories/computer-vision.png",
  "Computer-Vision": "/categories/computer-vision.png",
  "Image Analysis & Vision": "/categories/computer-vision.png",
  "free-ai-image-recognition": "/categories/computer-vision.png",
  "free-ai-ocr": "/categories/OCR-Text-Scanning.png",
  "OCR-Text-Scanning": "/categories/OCR-Text-Scanning.png",
  "ocr-text-scanning": "/categories/OCR-Text-Scanning.png",
  "Free AI OCR": "/categories/OCR-Text-Scanning.png",
  "free-image-to-prompt": "/categories/computer-vision.png",
  "free-ai-face-recognition": "/categories/computer-vision.png",
  "free-ai-describe-image": "/categories/computer-vision.png",

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
  "ai-app-builder": "/categories/Web-Tools.png",
  "app-builder": "/categories/Web-Tools.png",
  "ai-website-builder": "/categories/Web-Tools.png",
  "free-ai-website-builder": "/categories/Web-Tools.png",
  "website-builder": "/categories/Web-Tools.png",
  "ai-landing-page-builder": "/categories/Web-Tools.png",
  "free-ai-landing-page-builder": "/categories/Web-Tools.png",
  "landing-page-builder": "/categories/Web-Tools.png",
  "free-ai-browsers": "/categories/Web-Tools.png",
  "ai-browsers": "/categories/Web-Tools.png",
  "browsers": "/categories/Web-Tools.png",
  "web-scraping": "/categories/Web-Tools.png",
  "free-ai-web-scraping": "/categories/Web-Tools.png",
  "ai-web-scraping": "/categories/Web-Tools.png",

  // 8. Code & Development
  "developer-tools": "/categories/Code-Development.png",
  "code-development": "/categories/Code-Development.png",
  "Code-Development": "/categories/Code-Development.png",
  "Code & Development": "/categories/Code-Development.png",
  "AI Developer Tools": "/categories/Code-Development.png",
  "Code & Engineering": "/categories/Code-Development.png",
  "free-ai-code-assistant": "/categories/Code-Development.png",
  "ai-code-assistant": "/categories/Code-Development.png",
  "code-assistant": "/categories/Code-Development.png",
  "free-ai-code-generator": "/categories/Code-Development.png",
  "ai-code-generator": "/categories/Code-Development.png",
  "code-generator": "/categories/Code-Development.png",
  "free-ai-developer-tools": "/categories/Code-Development.png",
  "free-low-code": "/categories/Code-Development.png",
  "free-no-code": "/categories/Code-Development.png",
  "low-code": "/categories/Code-Development.png",
  "no-code": "/categories/Code-Development.png",

  // 9. Video Generation
  "video-generator": "/categories/Video-Generation.png",
  "video-generation": "/categories/Video-Generation.png",
  "Video-Generation": "/categories/Video-Generation.png",
  "Video Generation": "/categories/Video-Generation.png",
  "AI Video Generators": "/categories/Video-Generation.png",
  "Video & Animation": "/categories/Video-Generation.png",
  "free-text-to-video": "/categories/Video-Generation.png",
  "free-ai-video-editor": "/categories/Video-Generation.png",
  "ai-video-editor": "/categories/Video-Generation.png",
  "free-ai-animation-generator": "/categories/Video-Generation.png",
  "free-image-to-video": "/categories/Video-Generation.png",
  "free-ai-lip-sync-generator": "/categories/Video-Generation.png",
  "lip-sync-generator": "/categories/Video-Generation.png",
  "free-ai-avatar-video-generator": "/categories/Video-Generation.png",
  "free-ai-face-swap-video": "/categories/Video-Generation.png",
  "face-swap-video": "/categories/Video-Generation.png",
  "free-script-to-video": "/categories/Video-Generation.png",
  "script-to-video": "/categories/Video-Generation.png",
  "free-ai-commercial-generator": "/categories/Video-Generation.png",
  "ai-commercial-generator": "/categories/Video-Generation.png",
  "free-ai-video-enhancer": "/categories/Video-Generation.png",
  "ai-video-enhancer": "/categories/Video-Generation.png",
  "video-enhancer": "/categories/Video-Generation.png",
  "free-ai-video-upscaler": "/categories/Video-Generation.png",
  "ai-video-upscaler": "/categories/Video-Generation.png",
  "video-upscaler": "/categories/Video-Generation.png",
  "free-ai-ugc-video-generator": "/categories/Video-Generation.png",
  "ai-ugc-video-generator": "/categories/Video-Generation.png",
  "ugc-video-generator": "/categories/Video-Generation.png",
  "free-video-to-video": "/categories/Video-Generation.png",
  "video-to-video": "/categories/Video-Generation.png",
  "free-ai-video-to-video": "/categories/Video-Generation.png",
  "free-ai-tiktok-generator": "/categories/Video-Generation.png",
  "free-ai-tiktok-video-generator": "/categories/Video-Generation.png",
  "ai-tiktok-generator": "/categories/Video-Generation.png",
  "ai-tiktok-video-generator": "/categories/Video-Generation.png",
  "tiktok-video-generator": "/categories/Video-Generation.png",
  "free-ai-youtube-maker": "/categories/Video-Generation.png",
  "free-ai-youtube-video-maker": "/categories/Video-Generation.png",
  "ai-youtube-maker": "/categories/Video-Generation.png",
  "ai-youtube-video-maker": "/categories/Video-Generation.png",
  "youtube-video-maker": "/categories/Video-Generation.png",
  "free-ai-short-video": "/categories/Video-Generation.png",
  "free-ai-short-video-generator": "/categories/Video-Generation.png",
  "ai-short-video": "/categories/Video-Generation.png",
  "ai-short-video-generator": "/categories/Video-Generation.png",
  "short-video-generator": "/categories/Video-Generation.png",
  "free-ai-reel-generator": "/categories/Video-Generation.png",
  "free-ai-reels-generator": "/categories/Video-Generation.png",
  "ai-reel-generator": "/categories/Video-Generation.png",
  "ai-reels-generator": "/categories/Video-Generation.png",
  "reel-generator": "/categories/Video-Generation.png",

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
  "business-ai": "/categories/business-ai.png",
  "Business-AI": "/categories/business-ai.png",
  "Business AI": "/categories/business-ai.png",
  "business-management": "/categories/business-ai.png",
  "Business-Management": "/categories/business-ai.png",
  "Business Management": "/categories/business-ai.png",
  "business-research": "/categories/business-ai.png",
  "Business-Research": "/categories/business-ai.png",
  "Business Research": "/categories/business-ai.png",
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
  "free-ai-recipe": "/categories/AI-Lifestyle-Directory.png",
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
  "AI Education": "/categories/AI-Education-and-Translation.png",
  "free-ai-education": "/categories/AI-Education-and-Translation.png",
  "ai-pedagogical": "/categories/AI-Education-and-Translation.png",
  "AI Pedagogical Assistance": "/categories/AI-Education-and-Translation.png",
  "free-ai-pedagogical": "/categories/AI-Education-and-Translation.png",
  "pedagogical": "/categories/AI-Education-and-Translation.png",
  "ai-intelligent-search": "/categories/AI-Education-and-Translation.png",
  "AI Intelligent Search": "/categories/AI-Education-and-Translation.png",
  "free-ai-intelligent-search": "/categories/AI-Education-and-Translation.png",
  "intelligent-search": "/categories/AI-Education-and-Translation.png",
  "ai-mathematics": "/categories/AI-Education-and-Translation.png",
  "AI Mathematics": "/categories/AI-Education-and-Translation.png",
  "free-ai-mathematics": "/categories/AI-Education-and-Translation.png",
  "mathematics": "/categories/AI-Education-and-Translation.png",
  "ai-translation": "/categories/AI-Education-and-Translation.png",
  "AI Translation": "/categories/AI-Education-and-Translation.png",
  "free-ai-translation": "/categories/AI-Education-and-Translation.png",
  "ai-teachers": "/categories/AI-Education-and-Translation.png",
  "Teacher Tools": "/categories/AI-Education-and-Translation.png",
  "free-ai-teachers": "/categories/AI-Education-and-Translation.png",
  "teachers": "/categories/AI-Education-and-Translation.png",
  "teacher-tools": "/categories/AI-Education-and-Translation.png",
  "ai-students": "/categories/AI-Education-and-Translation.png",
  "Student Tools": "/categories/AI-Education-and-Translation.png",
  "free-ai-students": "/categories/AI-Education-and-Translation.png",
  "students": "/categories/AI-Education-and-Translation.png",
  "student-tools": "/categories/AI-Education-and-Translation.png",
  "ai-languages": "/categories/AI-Education-and-Translation.png",
  "Language Learning Tools": "/categories/AI-Education-and-Translation.png",
  "free-ai-languages": "/categories/AI-Education-and-Translation.png",
  "languages": "/categories/AI-Education-and-Translation.png",
  "language-learning-tools": "/categories/AI-Education-and-Translation.png",
  "free-ai-writing": "/categories/writing.png",
  "writing-tools": "/categories/writing.png",
  "ai-assessment": "/categories/AI-Education-and-Translation.png",
  "Assessment Tools": "/categories/AI-Education-and-Translation.png",
  "free-ai-assessment": "/categories/AI-Education-and-Translation.png",
  "assessment-tools": "/categories/AI-Education-and-Translation.png",
  "assessment": "/categories/AI-Education-and-Translation.png",

  // Subcategories transferred to AI Lifestyle Directory
  "ai-detection": "/categories/AI-Lifestyle-Directory.png",
  "free-llms": "/categories/AI-Lifestyle-Directory.png",
  "free-ai-models": "/categories/AI-Lifestyle-Directory.png",
  "free-open-source-ai-models": "/categories/AI-Lifestyle-Directory.png",
  "free-ai-tools-directory": "/categories/AI-Lifestyle-Directory.png",
  "free-ai-games": "/categories/AI-Lifestyle-Directory.png",
  "free-ai-game-generator": "/categories/AI-Lifestyle-Directory.png",
  "free-ai-robot": "/categories/AI-Lifestyle-Directory.png",
  "free-minecraft-ai": "/categories/AI-Lifestyle-Directory.png",
  "free-ai-poker": "/categories/AI-Lifestyle-Directory.png",
  "other-misc": "/categories/AI-Lifestyle-Directory.png",
  "The AI Toolbox": "/categories/AI-Lifestyle-Directory.png",
  "the-ai-toolbox": "/categories/AI-Lifestyle-Directory.png",
  "writing-and-marketing": "/categories/Marketing.png",
  "writing-marketing": "/categories/Marketing.png",
  "writing & marketing": "/categories/Marketing.png",
  "Writing & Marketing": "/categories/Marketing.png",

  // 31 tool categories
  "AI Image": "/categories/AI-Image-Generators.png",
  "ai-image": "/categories/AI-Image-Generators.png",
  "YouTube Maker": "/categories/Video-Generation.png",
  "youtube-maker": "/categories/Video-Generation.png",
  "Face Swap": "/categories/AI-Image-Generators.png",
  "face-swap": "/categories/AI-Image-Generators.png",
  "Photo Editor": "/categories/Design-Editing.png",
  "photo-editor": "/categories/Design-Editing.png",
  "Photo Restoration": "/categories/Design-Editing.png",
  "photo-restoration": "/categories/Design-Editing.png",
  "Photo Filter": "/categories/Design-Editing.png",
  "photo-filter": "/categories/Design-Editing.png",
  "Lyrics Generator": "/categories/Music-Audio.png",
  "lyrics-generator": "/categories/Music-Audio.png",
  "Art Community": "/categories/AI-Creative-Design.png",
  "art-community": "/categories/AI-Creative-Design.png",
  "Art Styles": "/categories/AI-Creative-Design.png",
  "art-styles": "/categories/AI-Creative-Design.png",
  "Specialized Art": "/categories/AI-Creative-Design.png",
  "specialized-art": "/categories/AI-Creative-Design.png",
  "Web & E-commerce": "/categories/Web-Tools.png",
  "web-e-commerce": "/categories/Web-Tools.png",
  "Niche AI": "/categories/AI-Lifestyle-Directory.png",
  "niche-ai": "/categories/AI-Lifestyle-Directory.png",
  "Illustration": "/categories/AI-Creative-Design.png",
  "illustration": "/categories/AI-Creative-Design.png",
  "3D Assets": "/categories/AI-Creative-Design.png",
  "3d-assets": "/categories/AI-Creative-Design.png",
  "3D Rendering": "/categories/AI-Creative-Design.png",
  "3d-rendering": "/categories/AI-Creative-Design.png",
  "Landing Page": "/categories/Web-Tools.png",
  "landing-page": "/categories/Web-Tools.png",
  "Email & Communication": "/categories/Writing-Documents.png",
  "email-communication": "/categories/Writing-Documents.png",
  "Planning & Calendar": "/categories/Productivity.png",
  "planning-calendar": "/categories/Productivity.png",
  "Note Taking": "/categories/Writing-Documents.png",
  "note-taking": "/categories/Writing-Documents.png",
  "Automation": "/categories/Productivity.png",
  "automation": "/categories/Productivity.png",
  "AI File Management": "/categories/Productivity.png",
  "ai-file-management": "/categories/Productivity.png",
  "AI Search": "/categories/Productivity.png",
  "ai-search": "/categories/Productivity.png",
  "Landscape": "/categories/Interior-Architectural.png",
  "landscape": "/categories/Interior-Architectural.png",
  "Backyard": "/categories/Interior-Architectural.png",
  "backyard": "/categories/Interior-Architectural.png",
  "Kitchen": "/categories/Interior-Architectural.png",
  "kitchen": "/categories/Interior-Architectural.png",
  "AI Models": "/categories/AI-Lifestyle-Directory.png",
  "ai-models": "/categories/AI-Lifestyle-Directory.png",
  "LLMs": "/categories/AI-Lifestyle-Directory.png",
  "llms": "/categories/AI-Lifestyle-Directory.png",
  "Open Source AI Models": "/categories/AI-Lifestyle-Directory.png",
  "open-source-ai-models": "/categories/AI-Lifestyle-Directory.png",
  "AI Tools Directory": "/categories/AI-Lifestyle-Directory.png",
  "ai-tools-directory": "/categories/AI-Lifestyle-Directory.png",
  "AI Game Generator": "/categories/AI-Lifestyle-Directory.png",
  "ai-game-generator": "/categories/AI-Lifestyle-Directory.png",
  "Minecraft AI": "/categories/AI-Lifestyle-Directory.png",
  "minecraft-ai": "/categories/AI-Lifestyle-Directory.png",
  "AI Poker": "/categories/AI-Lifestyle-Directory.png",
  "ai-poker": "/categories/AI-Lifestyle-Directory.png",

  // Audio & Voice specific categories
  "Speech-to-Text": "/categories/VoiceSpeech.png",
  "Text-to-Speech": "/categories/VoiceSpeech.png",
  "Transcription": "/categories/VoiceSpeech.png",
  "Speech Recognition": "/categories/VoiceSpeech.png",
  "Voice Cloning": "/categories/VoiceSpeech.png",
  "Voice Enhancer": "/categories/VoiceSpeech.png",
  "Voice Generator": "/categories/VoiceSpeech.png",
  "Voice Over": "/categories/VoiceSpeech.png",
  "Beat Generator": "/categories/Music-Audio.png",
  "Song Cover": "/categories/Music-Audio.png",
  "Song Remixer": "/categories/Music-Audio.png",
  "Background Remover": "/categories/Design-Editing.png",
  "Eraser": "/categories/Design-Editing.png",
  "AI Chatbot": "/categories/Chatbots.png",
  "AI Character": "/categories/Chatbots.png",
  "Dirty Talking AI": "/categories/Chatbots.png",
  "AI Games": "/categories/AI-Lifestyle-Directory.png"
};

// Subcategory to primary category 3D logo mapping
const SUBCATEGORY_TO_CATEGORY_LOGO: Record<string, string> = {
  // Office & Productivity subcategories
  "ai-office": "/categories/Productivity.png",
  "ai-file-management": "/categories/Productivity.png",
  "ai-search": "/categories/Productivity.png",
  "ai-email": "/categories/Writing-Documents.png",
  "ai-planning": "/categories/Productivity.png",
  "ai-meetings": "/categories/Productivity.png",
  "ai-automation": "/categories/Productivity.png",
  "ai-notes": "/categories/Writing-Documents.png",
  "ai-documents": "/categories/Writing-Documents.png",

  // Business AI subcategories
  "free-ai-crm": "/categories/Business-AI.png",
  "free-ai-project-management": "/categories/Business-AI.png",
  "free-ai-workflow": "/categories/Business-AI.png",
  "free-ai-recruiting": "/categories/Business-AI.png",
  "free-ai-customer-service": "/categories/Business-AI.png",
  "free-ai-interview-assistant": "/categories/Business-AI.png",
  "free-ai-call-center": "/categories/Business-AI.png",
  "free-ai-product-manager": "/categories/Business-AI.png",
  "free-ai-erp": "/categories/Business-AI.png",
  "free-ai-roadmap": "/categories/Business-AI.png",
  "free-ai-business-name-generator": "/categories/Business-AI.png",
  "free-ai-crypto": "/categories/Finance.png",
  "free-ai-consulting": "/categories/Business-AI.png",
  "free-ai-business-ideas-generator": "/categories/Business-AI.png",
  "free-nfts": "/categories/Business-AI.png",
  "free-web3": "/categories/Business-AI.png",
  "free-blockchain": "/categories/Business-AI.png",
  "free-ai-domain-name-generator": "/categories/Business-AI.png",
  "free-ai-company-name-generator": "/categories/Business-AI.png",

  // Image Analysis subcategories
  "free-ai-face-analyzer": "/categories/Computer-Vision.png",
  "free-ai-image-segmentation": "/categories/Computer-Vision.png",
  "free-ai-image-recognition": "/categories/Computer-Vision.png",
  "free-image-to-prompt": "/categories/Computer-Vision.png",
  "free-ai-ocr": "/categories/OCR-Text-Scanning.png",
  "free-ai-face-recognition": "/categories/Computer-Vision.png",
  "free-ai-describe-image": "/categories/Computer-Vision.png",

  // Law & Finance subcategories
  "free-ai-real-estate": "/categories/Law-and-Finance.png",
  "free-ai-trading-bot": "/categories/Finance.png",
  "free-ai-tax-assistant": "/categories/Finance.png",
  "free-ai-accounting": "/categories/Finance.png",
  "free-ai-contract-review": "/categories/Legal.png",
  "free-ai-stock-trading": "/categories/Finance.png",
  "free-ai-contract-management": "/categories/Legal.png",
  "free-ai-contract-generator": "/categories/Legal.png",
  "free-ai-investing": "/categories/Finance.png",

  // Marketing subcategories
  "free-ai-marketing": "/categories/Marketing.png",
  "free-ai-sales": "/categories/Marketing.png",
  "free-ai-seo-tools": "/categories/Marketing.png",
  "free-ai-ad-generator": "/categories/Marketing.png",
  "free-ai-sales-assistant": "/categories/Marketing.png",
  "free-ai-lead-generation": "/categories/Marketing.png",
  "free-ai-email-marketing": "/categories/Marketing.png",
  "free-ai-advertising": "/categories/Marketing.png",
  "free-seo-writing-ai": "/categories/Marketing.png",
  "free-ad-copy": "/categories/Marketing.png",
  "free-ai-ad-creative": "/categories/Marketing.png",
  "free-ai-affiliate-marketing": "/categories/Marketing.png",
  "free-ai-cold-calling": "/categories/Marketing.png",
  "free-ai-email-generator": "/categories/Marketing.png",
  "free-ai-digital-marketing": "/categories/Marketing.png",
  "free-ai-marketing-plan-generator": "/categories/Marketing.png",
  "free-ai-pitch-deck-generator": "/categories/Marketing.png",
  "free-ai-reply": "/categories/Marketing.png",
  "free-ai-response-generator": "/categories/Marketing.png",
  "free-ai-reviews": "/categories/Marketing.png",
  "free-ai-website-designer": "/categories/Marketing.png",
  "free-google-ads-ai": "/categories/Marketing.png",

  // Social Growth Hub subcategories
  "free-ai-bio-generator": "/categories/Social-Growth-Hub.png",
  "free-ai-facebook": "/categories/Social-Growth-Hub.png",
  "free-ai-hashtag": "/categories/Social-Growth-Hub.png",
  "free-ai-influencer": "/categories/Social-Growth-Hub.png",
  "free-ai-instagram-caption-generator": "/categories/Social-Growth-Hub.png",
  "free-ai-instagram": "/categories/Social-Growth-Hub.png",
  "free-ai-meme-generator": "/categories/Social-Growth-Hub.png",
  "free-ai-social-media-post-generator": "/categories/Social-Growth-Hub.png",
  "free-ai-social-media": "/categories/Social-Growth-Hub.png",
  "free-ai-tiktok": "/categories/Social-Growth-Hub.png",
  "free-ai-tweet-generator": "/categories/Social-Growth-Hub.png",
  "free-ai-twitter": "/categories/Social-Growth-Hub.png",
  "free-ai-youtube-summary": "/categories/Social-Growth-Hub.png",
  "free-ai-youtube-thumbnail-generator": "/categories/Social-Growth-Hub.png",
  "free-ai-youtube": "/categories/Social-Growth-Hub.png",
  "free-bio-link": "/categories/Social-Growth-Hub.png",
  "free-ai-youtube-tags-generator": "/categories/Social-Growth-Hub.png",

  // Neural Analytics Hub subcategories
  "free-ai-data-mining": "/categories/Data-Databases.png",
  "free-ai-for-data-analytics": "/categories/Data-Databases.png",
  "free-ai-papers": "/categories/Data-Databases.png",
  "free-ai-predictions": "/categories/Analytics-Growth.png",
  "free-ai-research-papers": "/categories/Data-Databases.png",
  "free-ai-research-tool": "/categories/Data-Databases.png",
  "free-ai-sports-betting": "/categories/Analytics-Growth.png",
  "free-ai-sports-predictions": "/categories/Analytics-Growth.png",

  // Additional creative & media subcategories
  "free-ai-instrumental-generator": "/categories/Music-Audio.png",
  "free-ai-mastering": "/categories/Music-Audio.png",
  "free-ai-midi-generator": "/categories/Music-Audio.png",
  "free-ai-noise-cancellation": "/categories/Music-Audio.png",
  "free-ai-singing-generator": "/categories/Music-Audio.png",
  "free-ai-sfx-generator": "/categories/Music-Audio.png",
  "free-ai-rap-generator": "/categories/Music-Audio.png",
  "free-ai-splitter": "/categories/Music-Audio.png",
  "free-chord-ai": "/categories/Music-Audio.png",
  "free-ai-lip-sync-generator": "/categories/Video-Generation.png",
  "free-ai-commercial-generator": "/categories/Video-Generation.png",
  "free-ai-reel-generator": "/categories/Video-Generation.png",
  "free-ai-browsers": "/categories/Web-Tools.png",
  "web-scraping": "/categories/Web-Tools.png"
};

/**
 * Resolves the custom 3D logo URL for any category ID, category name, or subcategory tag.
 */
export function getCategoryLogo(identifier?: string | null): string | null {
  if (!identifier) return null;
  
  // Exact match in dictionary
  if (CATEGORY_CUSTOM_LOGOS[identifier]) {
    return CATEGORY_CUSTOM_LOGOS[identifier];
  }

  // Exact match in subcategory map
  if (SUBCATEGORY_TO_CATEGORY_LOGO[identifier]) {
    return SUBCATEGORY_TO_CATEGORY_LOGO[identifier];
  }

  // Normalized match (lower-cased, alphanumeric + hyphen)
  const normalized = identifier.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");
  
  if (SUBCATEGORY_TO_CATEGORY_LOGO[normalized]) {
    return SUBCATEGORY_TO_CATEGORY_LOGO[normalized];
  }

  for (const [key, path] of Object.entries(CATEGORY_CUSTOM_LOGOS)) {
    const normKey = key.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");
    if (normKey === normalized) {
      return path;
    }
  }

  // Semantic keyword heuristics
  if (
    normalized.includes("marketing") ||
    normalized.includes("sales") ||
    normalized.includes("ad-") ||
    normalized.includes("lead-gen") ||
    normalized.includes("pitch-deck") ||
    normalized.includes("google-ads") ||
    normalized.includes("ad-copy") ||
    normalized.includes("cold-call") ||
    normalized.includes("affiliate")
  ) {
    return "/categories/Marketing.png";
  }

  if (
    normalized.includes("social-growth") ||
    normalized.includes("instagram") ||
    normalized.includes("tiktok") ||
    normalized.includes("twitter") ||
    normalized.includes("tweet") ||
    normalized.includes("youtube") ||
    normalized.includes("social-media") ||
    normalized.includes("hashtag") ||
    normalized.includes("bio-generator") ||
    normalized.includes("bio-link") ||
    normalized.includes("meme") ||
    normalized.includes("influencer") ||
    normalized.includes("facebook")
  ) {
    return "/categories/Social-Growth-Hub.png";
  }

  if (
    normalized.includes("business-ai") ||
    normalized.includes("crm") ||
    normalized.includes("project-management") ||
    normalized.includes("workflow") ||
    normalized.includes("recruiting") ||
    normalized.includes("customer-service") ||
    normalized.includes("call-center") ||
    normalized.includes("product-manager") ||
    normalized.includes("erp") ||
    normalized.includes("roadmap") ||
    normalized.includes("business-name") ||
    normalized.includes("consulting") ||
    normalized.includes("web3") ||
    normalized.includes("blockchain") ||
    normalized.includes("nfts") ||
    normalized.includes("domain-name") ||
    normalized.includes("company-name") ||
    normalized.includes("interview-assistant") ||
    normalized.includes("business-ideas")
  ) {
    return "/categories/Business-AI.png";
  }

  if (
    normalized.includes("design-editing") ||
    normalized.includes("creative-design") ||
    normalized.includes("photo-editor") ||
    normalized.includes("photo-filter") ||
    normalized.includes("photo-restoration") ||
    normalized.includes("eraser") ||
    normalized.includes("background-remover") ||
    normalized.includes("art-community") ||
    normalized.includes("art-style") ||
    normalized.includes("illustration") ||
    normalized.includes("3d-asset") ||
    normalized.includes("3d-render") ||
    normalized.includes("specialized-art") ||
    (normalized.includes("design") && normalized.includes("editing"))
  ) {
    return "/categories/AI-Creative-Design.png";
  }

  if (
    normalized.includes("office") ||
    normalized.includes("productivity") ||
    normalized.includes("file-management") ||
    normalized.includes("planning") ||
    normalized.includes("meeting") ||
    normalized.includes("calendar") ||
    normalized.includes("note") ||
    normalized.includes("document") ||
    normalized.includes("automation") ||
    normalized.includes("writing")
  ) {
    return "/categories/Writing-Documents.png";
  }

  if (
    normalized.includes("chatbot") ||
    normalized.includes("assistant") ||
    normalized.includes("roleplay") ||
    normalized.includes("character") ||
    normalized.includes("dating") ||
    normalized.includes("joke") ||
    normalized.includes("dirty-talking")
  ) {
    return "/categories/Chatbots.png";
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
    normalized.includes("image-recognition") ||
    normalized.includes("image-to-prompt") ||
    normalized.includes("face-analyzer") ||
    normalized.includes("segmentation")
  ) {
    return "/categories/Computer-Vision.png";
  }

  if (
    normalized.includes("finance") ||
    normalized.includes("trading") ||
    normalized.includes("stock") ||
    normalized.includes("accounting") ||
    normalized.includes("tax") ||
    normalized.includes("real-estate") ||
    normalized.includes("crypto") ||
    normalized.includes("investing")
  ) {
    return "/categories/Finance.png";
  }

  if (
    normalized.includes("law") ||
    normalized.includes("legal") ||
    normalized.includes("contract")
  ) {
    return "/categories/Legal.png";
  }

  if (
    normalized.includes("database") ||
    normalized.includes("analytics") ||
    normalized.includes("data-mining") ||
    normalized.includes("sports-betting") ||
    normalized.includes("prediction") ||
    normalized.includes("data-analytics") ||
    normalized.includes("research-paper")
  ) {
    return "/categories/Data-Databases.png";
  }

  if (
    normalized.includes("web") ||
    normalized.includes("browser") ||
    normalized.includes("scraping") ||
    normalized.includes("landing-page") ||
    normalized.includes("builder") ||
    normalized.includes("website")
  ) {
    return "/categories/Web-Tools.png";
  }

  if (
    normalized.includes("image-generator") ||
    normalized.includes("text-to-image") ||
    normalized.includes("ai-image") ||
    normalized.includes("face-swap") ||
    normalized.includes("avatar-generator") ||
    normalized.includes("product-photography") ||
    normalized.includes("image-enhancer") ||
    normalized.includes("image-upscaler")
  ) {
    return "/categories/AI-Image-Generators.png";
  }

  if (
    normalized.includes("video") ||
    normalized.includes("animation") ||
    normalized.includes("lip-sync") ||
    normalized.includes("reel") ||
    normalized.includes("commercial") ||
    normalized.includes("upscaler") ||
    normalized.includes("ugc") ||
    normalized.includes("short-video") ||
    normalized.includes("script-to-video") ||
    normalized.includes("youtube-maker")
  ) {
    return "/categories/Video-Generation.png";
  }

  if (
    normalized.includes("music") ||
    normalized.includes("song") ||
    normalized.includes("audio") ||
    normalized.includes("lyrics") ||
    normalized.includes("melody") ||
    normalized.includes("beat") ||
    normalized.includes("stem") ||
    normalized.includes("vocal") ||
    normalized.includes("instrumental") ||
    normalized.includes("mastering") ||
    normalized.includes("midi") ||
    normalized.includes("rap") ||
    normalized.includes("chord") ||
    normalized.includes("splitter")
  ) {
    return "/categories/Music-Audio.png";
  }

  if (
    normalized.includes("voice") ||
    normalized.includes("speech") ||
    normalized.includes("tts") ||
    normalized.includes("podcast") ||
    normalized.includes("transcription") ||
    normalized.includes("cloning") ||
    normalized.includes("enhancer") ||
    normalized.includes("voice-over")
  ) {
    return "/categories/VoiceSpeech.png";
  }

  if (
    normalized.includes("code") ||
    normalized.includes("developer") ||
    normalized.includes("programming")
  ) {
    return "/categories/Code-Development.png";
  }

  if (
    normalized.includes("education") ||
    normalized.includes("translation") ||
    normalized.includes("pedagogical") ||
    normalized.includes("languages") ||
    normalized.includes("mathematics") ||
    normalized.includes("learning") ||
    normalized.includes("student") ||
    normalized.includes("teacher")
  ) {
    return "/categories/AI-Education-and-Translation.png";
  }

  if (
    normalized.includes("medical") ||
    normalized.includes("health") ||
    normalized.includes("dermatology") ||
    normalized.includes("therapist") ||
    normalized.includes("diagnosis") ||
    normalized.includes("symptom")
  ) {
    return "/categories/Smart-Medical-Directory.png";
  }

  if (
    normalized.includes("interior") ||
    normalized.includes("architectur") ||
    normalized.includes("floor-plan") ||
    normalized.includes("room-planner") ||
    normalized.includes("landscape") ||
    normalized.includes("backyard") ||
    normalized.includes("kitchen")
  ) {
    return "/categories/Interior-Architectural.png";
  }

  if (
    normalized.includes("lifestyle") ||
    normalized.includes("trip") ||
    normalized.includes("sports") ||
    normalized.includes("shopping") ||
    normalized.includes("fitness") ||
    normalized.includes("recipe") ||
    normalized.includes("bible") ||
    normalized.includes("religion") ||
    normalized.includes("newsletter") ||
    normalized.includes("niche") ||
    normalized.includes("game") ||
    normalized.includes("minecraft") ||
    normalized.includes("poker") ||
    normalized.includes("robot") ||
    normalized.includes("models") ||
    normalized.includes("directory")
  ) {
    return "/categories/AI-Lifestyle-Directory.png";
  }

  return "/categories/General.png";
}

/**
 * Returns whether a custom logo exists for the given category
 */
export function hasCategoryLogo(identifier?: string | null): boolean {
  return getCategoryLogo(identifier) !== null;
}

