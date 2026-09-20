const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, '..', 'src', 'data', 'tools');

const STUBS = [
  { file: 'ai-lifestyle-directory.ts', exportName: 'ai_lifestyle_directory_tools' },
  { file: 'video-generator.ts', exportName: 'video_generator_tools' },
  { file: 'image-generators.ts', exportName: 'image_generators_tools' },
  { file: 'music-audio.ts', exportName: 'music_audio_tools' },
  { file: 'creative-design.ts', exportName: 'creative_design_tools' },
  { file: 'developer-tools.ts', exportName: 'developer_tools_tools' },
  { file: 'education-translation.ts', exportName: 'education_translation_tools' },
  { file: 'office-productivity.ts', exportName: 'office_productivity_tools' },
  { file: 'ai-chatbots.ts', exportName: 'ai_chatbots_tools' },
  { file: 'business-management.ts', exportName: 'business_management_tools' },
  { file: 'interior-architectural.ts', exportName: 'interior_architectural_tools' },
  { file: 'other.ts', exportName: 'other_tools' },
  { file: 'business-research.ts', exportName: 'business_research_tools' },
  { file: 'image-analysis.ts', exportName: 'image_analysis_tools' },
  { file: 'law-finance.ts', exportName: 'law_finance_tools' },
  { file: 'marketing.ts', exportName: 'marketing_tools' },
  { file: 'social-growth.ts', exportName: 'social_growth_tools' },
  { file: 'neural-analytics.ts', exportName: 'neuralAnalyticsTools' },
  { file: 'smart-medical.ts', exportName: 'medicalTools' }
];

if (!fs.existsSync(toolsDir)) {
  fs.mkdirSync(toolsDir, { recursive: true });
}

let createdCount = 0;
for (const stub of STUBS) {
  const filePath = path.join(toolsDir, stub.file);
  if (!fs.existsSync(filePath)) {
    const stubContent = `// Protected member catalog stub - Real data excluded from public repository\nimport { Tool } from "../tools";\n\nexport const ${stub.exportName}: Record<string, Tool[]> = {};\n`;
    fs.writeFileSync(filePath, stubContent, 'utf-8');
    createdCount++;
  }
}

if (createdCount > 0) {
  console.log(`[security] Created ${createdCount} private tools fallback stubs for repository build.`);
}
