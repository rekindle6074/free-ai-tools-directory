export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  stars?: string;
  score?: number;
  link: string;
  icon: string;
  iconUrl?: string;
}

export interface Category {
  name: string;
  id: string;
  color: string;
  subCategories: SubCategory[];
}

export interface SubCategory {
  name: string;
  tag: string;
  path: string;
  count: number;
}

export const categories: Category[] = [
  {
    id: "ai-chatbots",
    name: "AI Chatbots",
    color: "emerald",
    subCategories: [
      { name: "Free AI Chatbot", tag: "free-ai-chatbot", path: "free-ai-chatbot", count: 23 },
      { name: "Free AI Character", tag: "free-ai-character", path: "free-ai-character", count: 11 },
      { name: "Free AI Roleplay", tag: "free-ai-roleplay", path: "free-ai-roleplay", count: 9 },
      { name: "Free AI Dating Assistant", tag: "free-ai-dating-assistant", path: "free-ai-dating-assistant", count: 9 },
      { name: "Free AI Anime Girlfriend", tag: "free-ai-anime-girlfriend", path: "free-ai-anime-girlfriend", count: 5 },
      { name: "Free AI Boyfriend", tag: "free-ai-boyfriend", path: "free-ai-boyfriend", count: 5 },
      { name: "Free Dirty Talking AI", tag: "free-dirty-talking-ai", path: "free-dirty-talking-ai", count: 4 }
    ]
  },
  {
    id: "image-generators",
    name: "AI Image Generators",
    color: "emerald",
    subCategories: [
      { name: "Free Text to Image", tag: "free-text-to-image", path: "free-text-to-image", count: 48 },
      { name: "Free AI Photo Editor", tag: "free-ai-photo-editor", path: "free-ai-photo-editor", count: 47 },
      { name: "Free AI Image Enhancer", tag: "free-ai-image-enhancer", path: "free-ai-image-enhancer", count: 47 },
      { name: "Free AI Image Upscaler", tag: "free-ai-image-upscaler", path: "free-ai-image-upscaler", count: 50 },
      { name: "Free AI Photo Filter", tag: "free-ai-photo-filter", path: "free-ai-photo-filter", count: 50 },
      { name: "Free AI Photo Restoration", tag: "free-ai-photo-restoration", path: "free-ai-photo-restoration", count: 50 },
      { name: "Free AI Eraser", tag: "free-ai-eraser", path: "free-ai-eraser", count: 76 },
      { name: "Free AI Background Remover", tag: "free-ai-background-remover", path: "free-ai-background-remover", count: 50 },
      { name: "Free AI Product Photography", tag: "free-ai-product-photography", path: "free-ai-product-photography", count: 48 },
      { name: "Free AI Avatar Generator", tag: "free-ai-avatar-generator", path: "free-ai-avatar-generator", count: 49 }
    ]
  },
  {
    id: "music-audio",
    name: "Free AI Music & Audio",
    color: "emerald",
    subCategories: [
      { name: "Free AI Audio Editing", tag: "free-ai-audio-editing", path: "free-ai-audio-editing", count: 50 },
      { name: "Free AI Audio Enhancer", tag: "free-ai-audio-enhancer", path: "free-ai-audio-enhancer", count: 23 },
      { name: "Free AI Instrumental Generator", tag: "free-ai-instrumental-generator", path: "free-ai-instrumental-generator", count: 48 },
      { name: "Free AI Mastering", tag: "free-ai-mastering", path: "free-ai-mastering", count: 16 },
      { name: "Free AI Melody Generator", tag: "free-ai-melody-generator", path: "free-ai-melody-generator", count: 29 },
      { name: "Free AI Midi Generator", tag: "free-ai-midi-generator", path: "free-ai-midi-generator", count: 7 },
      { name: "Free AI Music Generator", tag: "free-ai-music-generator", path: "free-ai-music-generator", count: 48 },
      { name: "Free AI Noise Cancellation", tag: "free-ai-noise-cancellation", path: "free-ai-noise-cancellation", count: 51 },
      { name: "Free AI Singing Generator", tag: "free-ai-singing-generator", path: "free-ai-singing-generator", count: 32 },
      { name: "Free AI Song Generator", tag: "free-ai-song-generator", path: "free-ai-song-generator", count: 49 },
      { name: "Free AI Sound Effect Generator", tag: "free-ai-sfx-generator", path: "free-ai-sfx-generator", count: 48 },
      { name: "Free AI Vocal Remover", tag: "free-ai-vocal-remover", path: "free-ai-vocal-remover", count: 49 },
      { name: "Free AI Podcast", tag: "free-ai-podcast", path: "free-ai-podcast", count: 21 },
      { name: "Free AI Speech-to-Text", tag: "free-ai-speech-to-text", path: "free-ai-speech-to-text", count: 46 },
      { name: "Free AI Text-to-Speech", tag: "free-ai-text-to-speech", path: "free-ai-text-to-speech", count: 50 },
      { name: "Free AI Transcription", tag: "free-ai-transcription", path: "free-ai-transcription", count: 50 },
      { name: "Free AI Speech Recognition", tag: "free-ai-speech-recognition", path: "free-ai-speech-recognition", count: 50 },
      { name: "Free AI Voice Cloning", tag: "free-ai-voice-cloning", path: "free-ai-voice-cloning", count: 50 },
      { name: "Free AI Voice Enhancer", tag: "free-ai-voice-enhancer", path: "free-ai-voice-enhancer", count: 15 },
      { name: "Free AI Voice Generator", tag: "free-ai-voice-generator", path: "free-ai-voice-generator", count: 50 },
      { name: "Free AI Voice Over", tag: "free-ai-voice-over", path: "free-ai-voice-over", count: 23 },
      { name: "Free Audio To Text AI", tag: "free-audio-to-text", path: "free-audio-to-text", count: 20 },
      { name: "Free AI Audio Splitter", tag: "free-ai-audio-splitter", path: "free-ai-audio-splitter", count: 15 },
      { name: "Free AI Beat Generator", tag: "free-ai-beat-generator", path: "free-ai-beat-generator", count: 31 },
      { name: "Free AI Lyrics Generator", tag: "free-ai-lyrics-generator", path: "free-ai-lyrics-generator", count: 51 },
      { name: "Free AI Rap Generator", tag: "free-ai-rap-generator", path: "free-ai-rap-generator", count: 11 },
      { name: "Free AI Rap Lyrics Generator", tag: "free-ai-rap-lyrics-generator", path: "free-ai-rap-lyrics-generator", count: 9 },
      { name: "Free AI Song Cover", tag: "free-ai-song-cover", path: "free-ai-song-cover", count: 49 },
      { name: "Free AI Song Remixer", tag: "free-ai-song-remixer", path: "free-ai-song-remixer", count: 10 },
      { name: "Free AI Splitter", tag: "free-ai-splitter", path: "free-ai-splitter", count: 15 },
      { name: "Free AI Stems Splitter", tag: "free-ai-stems-splitter", path: "free-ai-stems-splitter", count: 40 },
      { name: "Free AI Text-to-Music", tag: "free-ai-text-to-music", path: "free-ai-text-to-music", count: 51 },
      { name: "Free Chord AI", tag: "free-chord-ai", path: "free-chord-ai", count: 4 }
    ]
  },
  {
    id: "video-generator",
    name: "Free AI Video Generator",
    color: "emerald",
    subCategories: [
      { name: "Free AI Video Generator", tag: "free-ai-video-generator", path: "free-ai-video-generator", count: 23 },
      { name: "Free AI Animation Generator", tag: "free-ai-animation-generator", path: "free-ai-animation-generator", count: 15 },
      { name: "Free Image to Video", tag: "free-image-to-video", path: "free-image-to-video", count: 18 },
      { name: "Free Text to Video", tag: "free-text-to-video", path: "free-text-to-video", count: 25 },
      { name: "Free AI Avatar Video Generator", tag: "free-ai-avatar-video-generator", path: "free-ai-avatar-video-generator", count: 19 },
      { name: "Free AI Lip Sync Generator", tag: "free-ai-lip-sync-generator", path: "free-ai-lip-sync-generator", count: 48 },
      { name: "Free AI Face Swap Video", tag: "free-ai-face-swap-video", path: "free-ai-face-swap-video", count: 49 },
      { name: "Free Script To Video AI Generator", tag: "free-script-to-video", path: "free-script-to-video", count: 50 },
      { name: "Free AI Commercial Generator", tag: "free-ai-commercial-generator", path: "free-ai-commercial-generator", count: 30 },
      { name: "Free AI Video Editor", tag: "free-ai-video-editor", path: "free-ai-video-editor", count: 20 },
      { name: "Free AI Video Enhancer", tag: "free-ai-video-enhancer", path: "free-ai-video-enhancer", count: 19 },
      { name: "Free AI Video Upscaler", tag: "free-ai-video-upscaler", path: "free-ai-video-upscaler", count: 19 },
      { name: "Free AI UGC Video Generator", tag: "free-ai-ugc-video-generator", path: "free-ai-ugc-video-generator", count: 47 },
      { name: "Free Video to Video", tag: "free-video-to-video", path: "free-video-to-video", count: 20 },
      { name: "Free AI TikTok Video Generator", tag: "free-ai-tiktok-generator", path: "free-ai-tiktok-generator", count: 50 },
      { name: "Free AI YouTube Video Maker", tag: "free-ai-youtube-maker", path: "free-ai-youtube-maker", count: 14 },
      { name: "Free AI Short Video Generator", tag: "free-ai-short-video", path: "free-ai-short-video", count: 49 },
      { name: "Free AI Reel Generator", tag: "free-ai-reel-generator", path: "free-ai-reel-generator", count: 44 }
    ]
  },
  {
    id: "developer-tools",
    name: "Free AI Developer Tools",
    color: "emerald",
    subCategories: [
      { name: "Free AI Developer Tools", tag: "free-ai-developer-tools", path: "free-ai-developer-tools", count: 53 },
      { name: "Free AI Code Assistant", tag: "free-ai-code-assistant", path: "free-ai-code-assistant", count: 50 },
      { name: "Free No-Code & Low-Code", tag: "free-low-code", path: "free-low-code", count: 52 },
      { name: "Free AI Code Generator", tag: "free-ai-code-generator", path: "free-ai-code-generator", count: 53 },
      { name: "Free AI App Builder", tag: "free-ai-app-builder", path: "free-ai-app-builder", count: 49 },
      { name: "Free AI Website Builder", tag: "ai-website-builder", path: "ai-website-builder", count: 50 },
      { name: "Free AI Landing Page Builder", tag: "ai-landing-page-builder", path: "ai-landing-page-builder", count: 35 },
      { name: "Free AI Browsers", tag: "free-ai-browsers", path: "free-ai-browsers", count: 29 },
      { name: "Free AI Web Scraping", tag: "web-scraping", path: "web-scraping", count: 47 }
    ]
  },
  {
    id: "creative-design",
    name: "AI Creative & Design",
    color: "emerald",
    subCategories: [
      { name: "Text-to-Image Generation", tag: "free-text-to-image", path: "free-text-to-image", count: 19 },
      { name: "Advanced Art Tools & Community", tag: "ai-art-community", path: "ai-art-community", count: 6 },
      { name: "Specialized Art Generators", tag: "ai-art-styles", path: "ai-art-styles", count: 7 },
      { name: "Specialized Artistic Styles", tag: "ai-art-specialized", path: "ai-art-specialized", count: 5 },
      { name: "AI Editing & Stock Tools", tag: "ai-editing-stock", path: "ai-editing-stock", count: 19 },
      { name: "AI Design & Presentations", tag: "ai-design-presentation", path: "ai-design-presentation", count: 14 },
      { name: "AI Logo & Brand Identity", tag: "ai-logo-brand", path: "ai-logo-brand", count: 12 },
      { name: "AI Interface & UX Design", tag: "ai-interface-ux", path: "ai-interface-ux", count: 8 },
      { name: "AI Architecture & Interior", tag: "ai-architecture-interior", path: "ai-architecture-interior", count: 8 },
      { name: "AI Visual & Mockup Generators", tag: "ai-visual-mockup", path: "ai-visual-mockup", count: 14 },
      { name: "AI Web & E-commerce", tag: "ai-web-ecommerce", path: "ai-web-ecommerce", count: 8 },
      { name: "Colors & Palettes", tag: "ai-colors-palettes", path: "ai-colors-palettes", count: 4 },
      { name: "Typography & Fonts", tag: "ai-typography", path: "ai-typography", count: 4 },
      { name: "Graphic Design Tools", tag: "ai-graphic-design", path: "ai-graphic-design", count: 4 },
      { name: "Photo Editing & Retouching", tag: "ai-photo-editing", path: "ai-photo-editing", count: 5 },
      { name: "Vector & SVG Creation", tag: "ai-vector-svg", path: "ai-vector-svg", count: 4 },
      { name: "Storytelling & AI Stories", tag: "ai-storytelling", path: "ai-storytelling", count: 16 },
      { name: "Coloring & Activity Pages", tag: "ai-coloring-pages", path: "ai-coloring-pages", count: 4 },
      { name: "Invitation & Event Solutions", tag: "ai-invitation-events", path: "ai-invitation-events", count: 20 },
      { name: "Specialized & Niche AI", tag: "ai-niche-tools", path: "ai-niche-tools", count: 8 },
      { name: "AI Illustration Generators", tag: "ai-illustration-generators", path: "ai-illustration-generators", count: 14 },
      { name: "AI 3D Model Generators", tag: "ai-3d-modeling", path: "ai-3d-modeling", count: 14 },
      { name: "AI 2D to 3D Conversion", tag: "ai-2d-to-3d", path: "ai-2d-to-3d", count: 7 },
      { name: "3D Design & Collaboration", tag: "ai-3d-design-collab", path: "ai-3d-design-collab", count: 6 },
      { name: "3D Assets & Resources", tag: "ai-3d-assets-resources", path: "ai-3d-assets-resources", count: 8 },
      { name: "3D Rendering & Visualization", tag: "ai-3d-rendering-viz", path: "ai-3d-rendering-viz", count: 4 },
      { name: "3D Scanning & Capture", tag: "ai-3d-scanning-capture", path: "ai-3d-scanning-capture", count: 8 },
      { name: "Specialized 3D Applications", tag: "ai-specialized-3d", path: "ai-specialized-3d", count: 6 }
    ]
  },
  {
    id: "education-translation",
    name: "AI Education & Translation",
    color: "emerald",
    subCategories: [
      { name: "AI Education", tag: "ai-education", path: "ai-education", count: 18 },
      { name: "AI Pedagogical Assistance", tag: "ai-pedagogical", path: "ai-pedagogical", count: 7 },
      { name: "AI Intelligent Search", tag: "ai-intelligent-search", path: "ai-intelligent-search", count: 18 },
      { name: "AI Mathematics", tag: "ai-mathematics", path: "ai-mathematics", count: 52 },
      { name: "AI Translation", tag: "ai-translation", path: "ai-translation", count: 55 },
      { name: "Teacher Tools", tag: "ai-teachers", path: "ai-teachers", count: 13 },
      { name: "Student Tools", tag: "ai-students", path: "ai-students", count: 12 },
      { name: "Language Learning Tools", tag: "ai-languages", path: "ai-languages", count: 10 },
      { name: "Writing Tools", tag: "ai-writing", path: "ai-writing", count: 7 },
      { name: "Assessment Tools", tag: "ai-assessment", path: "ai-assessment", count: 7 }
    ]
  },
  {
    id: "office-productivity",
    name: "Office & Productivity",
    color: "emerald",
    subCategories: [
      { name: "AI Tools Directory Office", tag: "ai-office", path: "ai-office", count: 0 },
      { name: "AI Smart Productivity", tag: "ai-smart-productivity", path: "ai-smart-productivity", count: 69 },
      { name: "AI File Management", tag: "ai-file-management", path: "ai-file-management", count: 43 },
      { name: "AI Search", tag: "ai-search", path: "ai-search", count: 52 },
      { name: "Email & Communication", tag: "ai-email", path: "ai-email", count: 5 },
      { name: "Planning & Calendar", tag: "ai-planning", path: "ai-planning", count: 4 },
      { name: "Note Taking", tag: "ai-notes", path: "ai-notes", count: 4 },
      { name: "Meeting Assistant", tag: "ai-meetings", path: "ai-meetings", count: 4 },
      { name: "Document Processing", tag: "ai-documents", path: "ai-documents", count: 4 },
      { name: "Automation", tag: "ai-automation", path: "ai-automation", count: 4 }
    ]
  },
  {
    id: "business-management",
    name: "Business Management",
    color: "emerald",
    subCategories: [
      { name: "Free AI CRM", tag: "free-ai-crm", path: "free-ai-crm", count: 50 },
      { name: "Free AI Project Management", tag: "free-ai-project-management", path: "free-ai-project-management", count: 50 },
      { name: "Free AI Workflow", tag: "free-ai-workflow", path: "free-ai-workflow", count: 50 },
      { name: "Free AI Recruiting", tag: "free-ai-recruiting", path: "free-ai-recruiting", count: 50 },
      { name: "Free AI Customer Service", tag: "free-ai-customer-service", path: "free-ai-customer-service", count: 50 },
      { name: "Free AI Interview Assistant", tag: "free-ai-interview-assistant", path: "free-ai-interview-assistant", count: 50 },
      { name: "Free AI Call Center", tag: "free-ai-call-center", path: "free-ai-call-center", count: 50 },
      { name: "Free AI Product Manager", tag: "free-ai-product-manager", path: "free-ai-product-manager", count: 50 },
      { name: "Free AI ERP", tag: "free-ai-erp", path: "free-ai-erp", count: 19 },
      { name: "Free AI Roadmap", tag: "free-ai-roadmap", path: "free-ai-roadmap", count: 35 }
    ]
  },
  {
    id: "business-research",
    name: "Business Research",
    color: "emerald",
    subCategories: [
      { name: "Free AI Business Name Generator", tag: "free-ai-business-name-generator", path: "free-ai-business-name-generator", count: 41 },
      { name: "Free AI Crypto", tag: "free-ai-crypto", path: "free-ai-crypto", count: 114 },
      { name: "Free AI Consulting", tag: "free-ai-consulting", path: "free-ai-consulting", count: 50 },
      { name: "Free AI Business Ideas Generator", tag: "free-ai-business-ideas-generator", path: "free-ai-business-ideas-generator", count: 54 },
      { name: "Free NFTs", tag: "free-nfts", path: "free-nfts", count: 27 },
      { name: "Free Web3", tag: "free-web3", path: "free-web3", count: 46 },
      { name: "Free Blockchain", tag: "free-blockchain", path: "free-blockchain", count: 50 },
      { name: "Free AI Domain Name Generator", tag: "free-ai-domain-name-generator", path: "free-ai-domain-name-generator", count: 26 },
      { name: "Free AI Company Name Generator", tag: "free-ai-company-name-generator", path: "free-ai-company-name-generator", count: 14 }
    ]
  },
  {
    id: "interior-architectural",
    name: "Interior & Architectural",
    color: "emerald",
    subCategories: [
      { name: "Free AI Floor Plan Generator", tag: "free-ai-floor-plan", path: "free-ai-floor-plan", count: 12 },
      { name: "Free AI Interior Design", tag: "free-ai-interior-design", path: "free-ai-interior-design", count: 50 },
      { name: "Free AI Room Planner", tag: "free-ai-room-planner", path: "free-ai-room-planner", count: 33 },
      { name: "Free AI Landscape Generator", tag: "free-ai-landscape-generator", path: "free-ai-landscape-generator", count: 18 },
      { name: "Free AI Backyard Design", tag: "free-ai-backyard-design", path: "free-ai-backyard-design", count: 10 },
      { name: "Free AI Kitchen Design", tag: "free-ai-kitchen-design", path: "free-ai-kitchen-design", count: 14 }
    ]
  },
  {
    id: "ai-lifestyle-directory",
    name: "AI Lifestyle Directory",
    color: "emerald",
    subCategories: [
      { name: "AI Trip Planner", tag: "ai-trip-planner", path: "ai-trip-planner", count: 66 },
      { name: "AI Sports", tag: "ai-sports", path: "ai-sports", count: 70 },
      { name: "AI Shopping Assistant", tag: "ai-shopping-assistant", path: "ai-shopping-assistant", count: 50 },
      { name: "AI News", tag: "ai-news", path: "ai-news", count: 50 },
      { name: "AI Portrait Generator", tag: "ai-portrait-generator", path: "ai-portrait-generator", count: 52 },
      { name: "AI Fitness", tag: "ai-fitness", path: "ai-fitness", count: 59 },
      { name: "AI Bible", tag: "ai-bible", path: "ai-bible", count: 17 },
      { name: "AI Newsletter", tag: "ai-newsletter", path: "ai-newsletter", count: 43 },
      { name: "AI Religion", tag: "ai-religion", path: "ai-religion", count: 27 },
      { name: "AI Recipe", tag: "ai-recipe", path: "ai-recipe", count: 50 },
      { name: "AI Travel", tag: "ai-travel", path: "ai-travel", count: 50 }
    ]
  },
  {
    id: "image-analysis",
    name: "Image Analysis",
    color: "emerald",
    subCategories: [
      { name: "Free AI OCR", tag: "free-ai-ocr", path: "free-ai-ocr", count: 50 },
      { name: "Free AI Image Recognition", tag: "free-ai-image-recognition", path: "free-ai-image-recognition", count: 57 },
      { name: "Free Image to Prompt", tag: "free-image-to-prompt", path: "free-image-to-prompt", count: 54 },
      { name: "Free AI Face Analyzer", tag: "free-ai-face-analyzer", path: "free-ai-face-analyzer", count: 46 },
      { name: "Free AI Face Recognition", tag: "free-ai-face-recognition", path: "free-ai-face-recognition", count: 59 },
      { name: "Free AI Describe Image", tag: "free-ai-describe-image", path: "free-ai-describe-image", count: 66 },
      { name: "Free AI Image Segmentation", tag: "free-ai-image-segmentation", path: "free-ai-image-segmentation", count: 32 },
      { name: "Free AI Image Scanning", tag: "free-ai-image-scanning", path: "free-ai-image-scanning", count: 17 }
    ]
  },
  {
    id: "law-finance",
    name: "Law & Finance",
    color: "emerald",
    subCategories: [
      { name: "Free AI For Finance", tag: "free-ai-for-finance", path: "free-ai-for-finance", count: 56 },
      { name: "Free AI Investing", tag: "free-ai-investing", path: "free-ai-investing", count: 52 },
      { name: "Free AI Legal Assistant", tag: "free-ai-legal-assistant", path: "free-ai-legal-assistant", count: 65 },
      { name: "Free AI Real Estate", tag: "free-ai-real-estate", path: "free-ai-real-estate", count: 69 },
      { name: "Free AI Accounting", tag: "free-ai-accounting", path: "free-ai-accounting", count: 59 },
      { name: "Free AI Trading Bot", tag: "free-ai-trading-bot", path: "free-ai-trading-bot", count: 44 },
      { name: "Free AI Tax Assistant", tag: "free-ai-tax-assistant", path: "free-ai-tax-assistant", count: 39 },
      { name: "Free AI Contract Review", tag: "free-ai-contract-review", path: "free-ai-contract-review", count: 52 },
      { name: "Free AI Stock Trading", tag: "free-ai-stock-trading", path: "free-ai-stock-trading", count: 51 },
      { name: "Free AI Contract Management", tag: "free-ai-contract-management", path: "free-ai-contract-management", count: 46 },
      { name: "Free AI Contract Generator", tag: "free-ai-contract-generator", path: "free-ai-contract-generator", count: 43 }
    ]
  },
  {
    id: "marketing",
    name: "Marketing",
    color: "emerald",
    subCategories: [
      { name: "Free AI Marketing", tag: "free-ai-marketing", path: "free-ai-marketing", count: 50 },
      { name: "Free AI Sales", tag: "free-ai-sales", path: "free-ai-sales", count: 50 },
      { name: "Free AI SEO Tools", tag: "free-ai-seo-tools", path: "free-ai-seo-tools", count: 50 },
      { name: "Free AI Ad Generator", tag: "free-ai-ad-generator", path: "free-ai-ad-generator", count: 50 },
      { name: "Free AI Sales Assistant", tag: "free-ai-sales-assistant", path: "free-ai-sales-assistant", count: 50 },
      { name: "Free AI Lead Generation", tag: "free-ai-lead-generation", path: "free-ai-lead-generation", count: 50 },
      { name: "Free AI Email Marketing", tag: "free-ai-email-marketing", path: "free-ai-email-marketing", count: 50 },
      { name: "Free AI Advertising", tag: "free-ai-advertising", path: "free-ai-advertising", count: 50 },
      { name: "Free SEO Writing AI", tag: "free-seo-writing-ai", path: "free-seo-writing-ai", count: 50 },
      { name: "Free Ad Copy", tag: "free-ad-copy", path: "free-ad-copy", count: 34 },
      { name: "Free AI Ad Creative", tag: "free-ai-ad-creative", path: "free-ai-ad-creative", count: 50 },
      { name: "Free AI Affiliate Marketing", tag: "free-ai-affiliate-marketing", path: "free-ai-affiliate-marketing", count: 47 },
      { name: "Free AI Cold Calling", tag: "free-ai-cold-calling", path: "free-ai-cold-calling", count: 34 },
      { name: "Free AI Email Generator", tag: "free-ai-email-generator", path: "free-ai-email-generator", count: 50 },
      { name: "Free AI Digital Marketing", tag: "free-ai-digital-marketing", path: "free-ai-digital-marketing", count: 50 },
      { name: "Free AI Marketing Plan Generator", tag: "free-ai-marketing-plan-generator", path: "free-ai-marketing-plan-generator", count: 50 },
      { name: "Free AI Pitch Deck Generator", tag: "free-ai-pitch-deck-generator", path: "free-ai-pitch-deck-generator", count: 33 },
      { name: "Free AI Reply", tag: "free-ai-reply", path: "free-ai-reply", count: 50 },
      { name: "Free AI Response Generator", tag: "free-ai-response-generator", path: "free-ai-response-generator", count: 50 },
      { name: "Free AI Reviews", tag: "free-ai-reviews", path: "free-ai-reviews", count: 27 },
      { name: "Free AI Website Designer", tag: "free-ai-website-designer", path: "free-ai-website-designer", count: 28 },
      { name: "Free Google Ads AI", tag: "free-google-ads-ai", path: "free-google-ads-ai", count: 25 }
    ]
  },
  {
    id: "social-growth-hub",
    name: "Social Growth Hub",
    color: "emerald",
    subCategories: [
      { name: "Free AI Bio Generator", tag: "free-ai-bio-generator", path: "free-ai-bio-generator", count: 50 },
      { name: "Free AI Facebook", tag: "free-ai-facebook", path: "free-ai-facebook", count: 45 },
      { name: "Free AI Hashtag", tag: "free-ai-hashtag", path: "free-ai-hashtag", count: 50 },
      { name: "Free AI Influencer", tag: "free-ai-influencer", path: "free-ai-influencer", count: 50 },
      { name: "Free AI Instagram Caption Generator", tag: "free-ai-instagram-caption-generator", path: "free-ai-instagram-caption-generator", count: 39 },
      { name: "Free AI Instagram", tag: "free-ai-instagram", path: "free-ai-instagram", count: 50 },
      { name: "Free AI Meme Generator", tag: "free-ai-meme-generator", path: "free-ai-meme-generator", count: 50 },
      { name: "Free AI Social Media Post Generator", tag: "free-ai-social-media-post-generator", path: "free-ai-social-media-post-generator", count: 50 },
      { name: "Free AI Social Media", tag: "free-ai-social-media", path: "free-ai-social-media", count: 50 },
      { name: "Free AI Tiktok", tag: "free-ai-tiktok", path: "free-ai-tiktok", count: 50 },
      { name: "Free AI Tweet Generator", tag: "free-ai-tweet-generator", path: "free-ai-tweet-generator", count: 49 },
      { name: "Free AI Twitter", tag: "free-ai-twitter", path: "free-ai-twitter", count: 49 },
      { name: "Free AI Youtube Summary", tag: "free-ai-youtube-summary", path: "free-ai-youtube-summary", count: 50 },
      { name: "Free AI Youtube Thumbnail Generator", tag: "free-ai-youtube-thumbnail-generator", path: "free-ai-youtube-thumbnail-generator", count: 30 },
      { name: "Free AI YouTube", tag: "free-ai-youtube", path: "free-ai-youtube", count: 50 },
      { name: "Free Bio Link", tag: "free-bio-link", path: "free-bio-link", count: 38 },
      { name: "Free Youtube Tags Generator", tag: "free-ai-youtube-tags-generator", path: "free-ai-youtube-tags-generator", count: 25 }
    ]
  },
  {
    id: "neural-analytics-hub",
    name: "Neural Analytics Hub",
    color: "emerald",
    subCategories: [
      { name: "Free AI Data Mining", tag: "free-ai-data-mining", path: "free-ai-data-mining", count: 50 },
      { name: "Free AI For Data Analytics", tag: "free-ai-for-data-analytics", path: "free-ai-for-data-analytics", count: 51 },
      { name: "Free AI Papers", tag: "free-ai-papers", path: "free-ai-papers", count: 27 },
      { name: "Free AI Predictions", tag: "free-ai-predictions", path: "free-ai-predictions", count: 50 },
      { name: "Free AI Research Papers", tag: "free-ai-research-papers", path: "free-ai-research-papers", count: 46 },
      { name: "Free AI Research Tool", tag: "free-ai-research-tool", path: "free-ai-research-tool", count: 50 },
      { name: "Free AI Sports Betting", tag: "free-ai-sports-betting", path: "free-ai-sports-betting", count: 19 },
      { name: "Free AI Sports Predictions", tag: "free-ai-sports-predictions", path: "free-ai-sports-predictions", count: 17 }
    ]
  },
  {
    id: "other",
    name: "Other",
    color: "emerald",
    subCategories: [
      { name: "AI Detection", tag: "ai-detection", path: "ai-detection", count: 77 },
      { name: "Free Large Language Models (LLMs)", tag: "free-llms", path: "free-llms", count: 51 },
      { name: "Free AI Models", tag: "free-ai-models", path: "free-ai-models", count: 31 },
      { name: "Free Open Source AI Models", tag: "free-open-source-ai-models", path: "free-open-source-ai-models", count: 65 },
      { name: "Free AI Tools Directory", tag: "free-ai-tools-directory", path: "free-ai-tools-directory", count: 57 },
      { name: "Free AI Games", tag: "free-ai-games", path: "free-ai-games", count: 58 },
      { name: "Free AI Game Generator", tag: "free-ai-game-generator", path: "free-ai-game-generator", count: 30 },
      { name: "Free AI Robot", tag: "free-ai-robot", path: "free-ai-robot", count: 31 },
      { name: "Free Minecraft AI", tag: "free-minecraft-ai", path: "free-minecraft-ai", count: 17 },
      { name: "Free AI Poker", tag: "free-ai-poker", path: "free-ai-poker", count: 12 },
      { name: "Other", tag: "other-misc", path: "other-misc", count: 63 }
    ]
  },
  {
    id: "smart-medical-directory",
    name: "Smart Medical Directory",
    color: "emerald",
    subCategories: [
      { name: "Free AI Dermatology", tag: "free-ai-dermatology", path: "free-ai-dermatology", count: 7 },
      { name: "Free AI Healthcare", tag: "free-ai-healthcare", path: "free-ai-healthcare", count: 50 },
      { name: "Free AI Medical Diagnosis", tag: "free-ai-medical-diagnosis", path: "free-ai-medical-diagnosis", count: 35 },
      { name: "Free AI Mental Health", tag: "free-ai-mental-health", path: "free-ai-mental-health", count: 50 },
      { name: "Free AI Symptom Checker", tag: "free-ai-symptom-checker", path: "free-ai-symptom-checker", count: 29 },
      { name: "Free AI Therapist", tag: "free-ai-therapist", path: "free-ai-therapist", count: 50 }
    ]
  }
];

import { ai_lifestyle_directory_tools } from './tools/ai-lifestyle-directory';
import { video_generator_tools } from './tools/video-generator';
import { image_generators_tools } from './tools/image-generators';
import { music_audio_tools } from './tools/music-audio';
import { creative_design_tools } from './tools/creative-design';
import { developer_tools_tools } from './tools/developer-tools';
import { education_translation_tools } from './tools/education-translation';
import { office_productivity_tools } from './tools/office-productivity';
import { ai_chatbots_tools } from './tools/ai-chatbots';
import { business_management_tools } from './tools/business-management';
import { interior_architectural_tools } from './tools/interior-architectural';
import { other_tools } from './tools/other';
import { business_research_tools } from './tools/business-research';
import { image_analysis_tools } from './tools/image-analysis';
import { law_finance_tools } from './tools/law-finance';
import { marketing_tools } from './tools/marketing';
import { social_growth_tools } from './tools/social-growth';
import { neuralAnalyticsTools } from './tools/neural-analytics';
import { medicalTools } from './tools/smart-medical';

export const toolsByTag: Record<string, Tool[]> = {
  ...ai_lifestyle_directory_tools,
  ...video_generator_tools,
  ...image_generators_tools,
  ...music_audio_tools,
  ...creative_design_tools,
  ...developer_tools_tools,
  ...education_translation_tools,
  ...office_productivity_tools,
  ...ai_chatbots_tools,
  ...business_management_tools,
  ...interior_architectural_tools,
  ...other_tools,
  ...business_research_tools,
  ...image_analysis_tools,
  ...law_finance_tools,
  ...marketing_tools,
  ...social_growth_tools,
  ...neuralAnalyticsTools,
  ...medicalTools
};

export const featuredTools: Tool[] = [
  {
    id: "captions",
    name: "Captions",
    description: "Transform your videos with AI-powered automatic captions and UGC-style ad generation.",
    category: "AI Video",
    stars: "48k",
    score: 9.8,
    link: "https://www.getcaptions.app/",
    iconUrl: "/icons/getcaptions.app-128x128__Estimated_.png",
    icon: "Video"
  },
  {
    id: "minimax-m2",
    name: "MiniMax-M2",
    description: "An efficient MoE model with 230B parameters, optimized for coding and agentic workflows.",
    category: "Developer Tools",
    stars: "12k",
    score: 9.9,
    link: "https://www.minimax.io/",
    iconUrl: "/icons/minimax.io-128x128__Estimated_.png",
    icon: "Code2"
  },
  {
    id: "freepik-ai",
    name: "Freepik AI",
    description: "Real-time AI image generation and upscaling with photorealistic results.",
    category: "AI Image",
    stars: "35k",
    score: 9.5,
    link: "https://www.freepik.com/ai/image-generator",
    iconUrl: "/icons/freepik.com-128x128__Estimated_.png",
    icon: "Image"
  },
  {
    id: "perplexity-comet",
    name: "Perplexity Comet",
    description: "Revolutionary AI browser that acts as your personal assistant for research and navigation.",
    category: "AI Browsers",
    stars: "15k",
    score: 9.7,
    link: "https://www.perplexity.ai/comet/",
    iconUrl: "/icons/perplexity.ai-128x128__Estimated_.png",
    icon: "Globe"
  },
  {
    id: "music-ai",
    name: "Music AI",
    description: "Professional AI music platform offering advanced stem separation and audio processing.",
    category: "AI Audio",
    stars: "8k",
    score: 9.4,
    link: "https://music.ai/",
    iconUrl: "/icons/music.ai-128x128__Estimated_.png",
    icon: "Music"
  },
  {
    id: "browse-ai",
    name: "Browse AI",
    description: "AI-powered no-code web scraper that monitors websites and turns them into APIs.",
    category: "Web Scraping",
    stars: "10k",
    score: 9.6,
    link: "https://www.browse.ai/",
    iconUrl: "/icons/browse.ai-128x128__Estimated_.png",
    icon: "Database"
  }
];
