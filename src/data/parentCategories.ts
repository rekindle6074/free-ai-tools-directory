import { categories, Category, SubCategory } from "./tools";

export interface TopicItem {
  name: string;
  path: string;
}

export interface TopicSection {
  title: string;
  items: TopicItem[];
}

export interface ParentCategory {
  id: string;
  name: string;
  shortName: string;
  description: string;
  focus: string;
  badge: string;
  iconName: string; // Lucide icon name
  categoryIds: string[];
  topicSections: TopicSection[];
}

export const parentCategories: ParentCategory[] = [
  {
    id: "ai-media-studio",
    name: "AI Media Studio",
    shortName: "AI Media Studio",
    description: "Content creation: visual, video, audio & design",
    focus: "Content creation involving images, video, audio, and design.",
    badge: "Media Studio",
    iconName: "Clapperboard",
    categoryIds: [
      "image-generators",
      "video-generator",
      "music-audio",
      "creative-design"
    ],
    topicSections: [
      {
        title: "Music Creation",
        items: [
          { name: "Free AI Music Generator", path: "free-ai-music-generator" },
          { name: "Free AI Song Generator", path: "free-ai-song-generator" },
          { name: "Free AI Singing Generator", path: "free-ai-singing-generator" },
          { name: "Free AI Instrumental Generator", path: "free-ai-instrumental-generator" },
          { name: "Free AI Beat Generator", path: "free-ai-beat-generator" },
          { name: "Free AI Melody Generator", path: "free-ai-melody-generator" },
          { name: "Free AI Midi Generator", path: "free-ai-midi-generator" },
          { name: "Free AI Text-to-Music", path: "free-ai-text-to-music" }
        ]
      },
      {
        title: "Voice & Speech",
        items: [
          { name: "Free AI Text-to-Speech", path: "free-ai-text-to-speech" },
          { name: "Free AI Speech-to-Text", path: "free-ai-speech-to-text" },
          { name: "Free AI Voice Cloning", path: "free-ai-voice-cloning" },
          { name: "Free AI Voice Generator", path: "free-ai-voice-generator" },
          { name: "Free AI Voice Over", path: "free-ai-voice-over" },
          { name: "Free AI Transcription", path: "free-ai-transcription" }
        ]
      },
      {
        title: "Audio Editing & Production",
        items: [
          { name: "Free AI Audio Editing", path: "free-ai-audio-editing" },
          { name: "Free AI Audio Enhancer", path: "free-ai-audio-enhancer" },
          { name: "Free AI Mastering", path: "free-ai-mastering" },
          { name: "Free AI Audio Splitter", path: "free-ai-audio-splitter" },
          { name: "Free AI Vocal Remover", path: "free-ai-vocal-remover" },
          { name: "Free AI Noise Cancellation", path: "free-ai-noise-cancellation" },
          { name: "Free AI Sound Effect Generator", path: "free-ai-sfx-generator" },
          { name: "Free AI Podcast", path: "free-ai-podcast" },
          { name: "Free Chord AI", path: "free-chord-ai" }
        ]
      },
      {
        title: "Songwriting & Lyrics",
        items: [
          { name: "Free AI Lyrics Generator", path: "free-ai-lyrics-generator" },
          { name: "Free AI Rap Generator", path: "free-ai-rap-generator" },
          { name: "Free AI Rap Lyrics Generator", path: "free-ai-rap-lyrics-generator" }
        ]
      },
      {
        title: "Image & Visuals",
        items: [
          { name: "Free Text to Image", path: "free-text-to-image" },
          { name: "Free AI Photo Editor", path: "free-ai-photo-editor" },
          { name: "Free AI Image Enhancer", path: "free-ai-image-enhancer" },
          { name: "Free AI Image Upscaler", path: "free-ai-image-upscaler" },
          { name: "Free AI Photo Filter", path: "free-ai-photo-filter" },
          { name: "Free AI Photo Restoration", path: "free-ai-photo-restoration" },
          { name: "Free AI Eraser", path: "free-ai-eraser" },
          { name: "Free AI Background Remover", path: "free-ai-background-remover" },
          { name: "Free AI Product Photography", path: "free-ai-product-photography" },
          { name: "Free AI Avatar Generator", path: "free-ai-avatar-generator" }
        ]
      },
      {
        title: "Video & Animation",
        items: [
          { name: "Free Text to Video", path: "free-text-to-video" },
          { name: "Free AI Video Editor", path: "free-ai-video-editor" },
          { name: "Free AI Animation Generator", path: "free-ai-animation-generator" },
          { name: "Free Image to Video", path: "free-image-to-video" },
          { name: "Free AI Avatar Video Generator", path: "free-ai-avatar-video-generator" },
          { name: "Free AI Lip Sync Generator", path: "free-ai-lip-sync-generator" },
          { name: "Free AI Face Swap Video", path: "free-ai-face-swap-video" },
          { name: "Free Script To Video AI Generator", path: "free-script-to-video" },
          { name: "Free AI Commercial Generator", path: "free-ai-commercial-generator" },
          { name: "Free AI Video Enhancer", path: "free-ai-video-enhancer" },
          { name: "Free AI Video Upscaler", path: "free-ai-video-upscaler" },
          { name: "Free AI UGC Video Generator", path: "free-ai-ugc-video-generator" },
          { name: "Free Video to Video", path: "free-video-to-video" },
          { name: "Free AI TikTok Video Generator", path: "free-ai-tiktok-generator" },
          { name: "Free AI YouTube Video Maker", path: "free-ai-youtube-maker" },
          { name: "Free AI Short Video Generator", path: "free-ai-short-video" },
          { name: "Free AI Reel Generator", path: "free-ai-reel-generator" }
        ]
      }
    ]
  },
  {
    id: "business-growth",
    name: "Business & Growth",
    shortName: "Business & Growth",
    description: "Marketing, intelligence & corporate acceleration",
    focus: "Professional tools, marketing, and business intelligence.",
    badge: "Business Suite",
    iconName: "TrendingUp",
    categoryIds: [
      "marketing",
      "business-management",
      "business-research",
      "social-growth-hub",
      "neural-analytics-hub",
      "law-finance"
    ],
    topicSections: [
      {
        title: "Content & Copy",
        items: [
          { name: "Free AI Marketing", path: "free-ai-marketing" },
          { name: "Free Ad Copy", path: "free-ad-copy" },
          { name: "Free SEO Writing AI", path: "free-seo-writing-ai" },
          { name: "Free AI Ad Creative", path: "free-ai-ad-creative" }
        ]
      },
      {
        title: "SEO & Traffic",
        items: [
          { name: "Free AI SEO Tools", path: "free-ai-seo-tools" },
          { name: "Free AI Lead Generation", path: "free-ai-lead-generation" },
          { name: "Free AI Sales Assistant", path: "free-ai-sales-assistant" }
        ]
      },
      {
        title: "Social Media",
        items: [
          { name: "Free AI Social Media Post Generator", path: "free-ai-social-media-post-generator" },
          { name: "Free AI Instagram Caption Generator", path: "free-ai-instagram-caption-generator" },
          { name: "Free AI Tweet Generator", path: "free-ai-tweet-generator" },
          { name: "Free AI Meme Generator", path: "free-ai-meme-generator" },
          { name: "Free AI Youtube Summary", path: "free-ai-youtube-summary" }
        ]
      },
      {
        title: "Strategy & Management",
        items: [
          { name: "Free AI CRM", path: "free-ai-crm" },
          { name: "Free AI Project Management", path: "free-ai-project-management" },
          { name: "Free AI Workflow", path: "free-ai-workflow" },
          { name: "Free AI Pitch Deck Generator", path: "free-ai-pitch-deck-generator" }
        ]
      },
      {
        title: "Law & Finance",
        items: [
          { name: "Free AI Contract Review", path: "free-ai-contract-review" },
          { name: "Free AI Legal Assistant", path: "free-ai-legal-assistant" },
          { name: "Free AI Accounting", path: "free-ai-accounting" },
          { name: "Free AI For Finance", path: "free-ai-for-finance" },
          { name: "Free AI Investing", path: "free-ai-investing" }
        ]
      },
      {
        title: "Neural Analytics & Data",
        items: [
          { name: "Free AI For Data Analytics", path: "free-ai-for-data-analytics" },
          { name: "Free AI Research Tool", path: "free-ai-research-tool" },
          { name: "Free AI Predictions", path: "free-ai-predictions" },
          { name: "Free AI Research Papers", path: "free-ai-research-papers" }
        ]
      }
    ]
  },
  {
    id: "productivity-communication",
    name: "Productivity & Communication",
    shortName: "Productivity & Comm.",
    description: "Writing, documents, chatbots & translation",
    focus: "Text generation, office tools, and general assistance.",
    badge: "Productivity",
    iconName: "FileText",
    categoryIds: [
      "office-productivity",
      "ai-chatbots",
      "education-translation"
    ],
    topicSections: [
      {
        title: "Writing & Documents",
        items: [
          { name: "Writing Tools", path: "ai-writing" },
          { name: "Document Processing", path: "ai-documents" },
          { name: "Note Taking", path: "ai-notes" },
          { name: "AI Smart Productivity", path: "ai-smart-productivity" }
        ]
      },
      {
        title: "Communication & Meetings",
        items: [
          { name: "Email & Communication", path: "ai-email" },
          { name: "Meeting Assistant", path: "ai-meetings" },
          { name: "Planning & Calendar", path: "ai-planning" },
          { name: "Automation", path: "ai-automation" }
        ]
      },
      {
        title: "General Chatbots",
        items: [
          { name: "Free AI Chatbot", path: "free-ai-chatbot" },
          { name: "AI Joke Generator", path: "ai-joke-generator" }
        ]
      },
      {
        title: "Roleplay & Characters",
        items: [
          { name: "Free AI Character", path: "free-ai-character" },
          { name: "AI Dating & Roleplay", path: "ai-dating-roleplay" },
          { name: "Free Dirty Talking AI", path: "free-dirty-talking-ai" }
        ]
      },
      {
        title: "Education & Translation",
        items: [
          { name: "AI Translation", path: "ai-translation" },
          { name: "Language Learning Tools", path: "ai-languages" },
          { name: "AI Education", path: "ai-education" },
          { name: "AI Mathematics", path: "ai-mathematics" },
          { name: "Teacher Tools", path: "ai-teachers" }
        ]
      }
    ]
  },
  {
    id: "tech-development",
    name: "Tech & Development",
    shortName: "Tech & Dev",
    description: "Code, engineering, automation & vision",
    focus: "Tools for developers and technical analysis.",
    badge: "Dev & Code",
    iconName: "Code2",
    categoryIds: [
      "developer-tools",
      "image-analysis"
    ],
    topicSections: [
      {
        title: "Code & Engineering",
        items: [
          { name: "Free AI Code Assistant", path: "free-ai-code-assistant" },
          { name: "Free AI Code Generator", path: "free-ai-code-generator" },
          { name: "Free AI Developer Tools", path: "free-ai-developer-tools" },
          { name: "Free No-Code & Low-Code", path: "free-low-code" }
        ]
      },
      {
        title: "Builders & Web",
        items: [
          { name: "Free AI App Builder", path: "free-ai-app-builder" },
          { name: "Free AI Website Builder", path: "ai-website-builder" },
          { name: "Free AI Landing Page Builder", path: "ai-landing-page-builder" },
          { name: "Free AI Browsers", path: "free-ai-browsers" },
          { name: "Free AI Web Scraping", path: "web-scraping" }
        ]
      },
      {
        title: "Image Analysis & Vision",
        items: [
          { name: "Free AI Image Recognition", path: "free-ai-image-recognition" },
          { name: "Free AI OCR", path: "free-ai-ocr" },
          { name: "Free Image to Prompt", path: "free-image-to-prompt" },
          { name: "Free AI Face Recognition", path: "free-ai-face-recognition" },
          { name: "Free AI Describe Image", path: "free-ai-describe-image" }
        ]
      }
    ]
  },
  {
    id: "lifestyle-specialized",
    name: "Lifestyle & Specialized",
    shortName: "Lifestyle & Spec.",
    description: "Personal daily life, health, home & architecture",
    focus: "Personal daily life, health, and specific niches.",
    badge: "Lifestyle",
    iconName: "HeartPulse",
    categoryIds: [
      "ai-lifestyle-directory",
      "interior-architectural",
      "smart-medical-directory"
    ],
    topicSections: [
      {
        title: "Health & Well-being",
        items: [
          { name: "Free AI Healthcare", path: "free-ai-healthcare" },
          { name: "Free AI Symptom Checker", path: "free-ai-symptom-checker" },
          { name: "Free AI Medical Diagnosis", path: "free-ai-medical-diagnosis" },
          { name: "Free AI Mental Health", path: "free-ai-mental-health" },
          { name: "Free AI Therapist", path: "free-ai-therapist" }
        ]
      },
      {
        title: "Home & Architecture",
        items: [
          { name: "Free AI Interior Design", path: "free-ai-interior-design" },
          { name: "Free AI Room Planner", path: "free-ai-room-planner" },
          { name: "Free AI Floor Plan Generator", path: "free-ai-floor-plan" },
          { name: "Free AI Landscape Generator", path: "free-ai-landscape-generator" },
          { name: "Free AI Kitchen Design", path: "free-ai-kitchen-design" }
        ]
      },
      {
        title: "Daily Life & Travel",
        items: [
          { name: "AI Trip Planner", path: "ai-trip-planner" },
          { name: "AI Fitness", path: "ai-fitness" },
          { name: "AI Recipe", path: "ai-recipe" },
          { name: "AI Travel", path: "ai-travel" },
          { name: "AI Shopping Assistant", path: "ai-shopping-assistant" }
        ]
      }
    ]
  },
  {
    id: "general",
    name: "General",
    shortName: "More",
    description: "Foundation models, games, open-source & utilities",
    focus: "Uncategorized tools, foundation models, and utilities.",
    badge: "Foundation & Misc",
    iconName: "LayoutGrid",
    categoryIds: [
      "other"
    ],
    topicSections: [
      {
        title: "Models & Detection",
        items: [
          { name: "Free Large Language Models (LLMs)", path: "free-llms" },
          { name: "Free Open Source AI Models", path: "free-open-source-ai-models" },
          { name: "Free AI Models", path: "free-ai-models" },
          { name: "AI Detection", path: "ai-detection" },
          { name: "Free AI Tools Directory", path: "free-ai-tools-directory" }
        ]
      },
      {
        title: "Gaming & Entertainment",
        items: [
          { name: "Free AI Games", path: "free-ai-games" },
          { name: "Free AI Game Generator", path: "free-ai-game-generator" },
          { name: "Free AI Robot", path: "free-ai-robot" },
          { name: "Free Minecraft AI", path: "free-minecraft-ai" },
          { name: "Other AI Utilities", path: "other-misc" }
        ]
      }
    ]
  }
];

// Helper functions
export function getCategoriesForParent(parent: ParentCategory): Category[] {
  return categories.filter((c) => parent.categoryIds.includes(c.id));
}

export function getParentCategoryById(id: string): ParentCategory | undefined {
  return parentCategories.find((p) => p.id === id);
}

export function getParentCategoryForCategoryId(categoryId: string): ParentCategory | undefined {
  return parentCategories.find((p) => p.categoryIds.includes(categoryId));
}

export function getParentCategoryStats(parent: ParentCategory): {
  totalTools: number;
  totalSubcategories: number;
  categoriesCount: number;
} {
  const memberCats = getCategoriesForParent(parent);
  let totalTools = 0;
  let totalSubcategories = 0;

  for (const cat of memberCats) {
    totalSubcategories += cat.subCategories.length;
    for (const sub of cat.subCategories) {
      totalTools += sub.count;
    }
  }

  return {
    totalTools,
    totalSubcategories,
    categoriesCount: memberCats.length
  };
}
