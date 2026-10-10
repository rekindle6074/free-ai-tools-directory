import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure tool stubs exist synchronously before Vite or other modules resolve them
try {
  const toolsDir = path.join(__dirname, "src", "data", "tools");
  const STUBS = [
    { file: "ai-lifestyle-directory.ts", exportName: "ai_lifestyle_directory_tools" },
    { file: "video-generator.ts", exportName: "video_generator_tools" },
    { file: "image-generators.ts", exportName: "image_generators_tools" },
    { file: "music-audio.ts", exportName: "music_audio_tools" },
    { file: "creative-design.ts", exportName: "creative_design_tools" },
    { file: "developer-tools.ts", exportName: "developer_tools_tools" },
    { file: "education-translation.ts", exportName: "education_translation_tools" },
    { file: "office-productivity.ts", exportName: "office_productivity_tools" },
    { file: "ai-chatbots.ts", exportName: "ai_chatbots_tools" },
    { file: "business-ai.ts", exportName: "business_ai_tools" },
    { file: "interior-architectural.ts", exportName: "interior_architectural_tools" },
    { file: "other.ts", exportName: "other_tools" },
    { file: "image-analysis.ts", exportName: "image_analysis_tools" },
    { file: "law-finance.ts", exportName: "law_finance_tools" },
    { file: "marketing.ts", exportName: "marketing_tools" },
    { file: "social-growth.ts", exportName: "social_growth_tools" },
    { file: "neural-analytics.ts", exportName: "neuralAnalyticsTools" },
    { file: "smart-medical.ts", exportName: "medicalTools" }
  ];
  if (!fs.existsSync(toolsDir)) {
    fs.mkdirSync(toolsDir, { recursive: true });
  }
  for (const stub of STUBS) {
    const filePath = path.join(toolsDir, stub.file);
    if (!fs.existsSync(filePath)) {
      const stubContent = `// Protected member catalog stub - Real data excluded from public repository\nimport { Tool } from "../tools";\n\nexport const ${stub.exportName}: Record<string, Tool[]> = {};\n`;
      fs.writeFileSync(filePath, stubContent, "utf-8");
    }
  }
} catch (e) {
  console.warn("Failed to check tool stubs:", e);
}

// Helper function to recursively parse Firestore REST API response values into regular JS values
function parseValue(value: any): any {
  if (!value || typeof value !== "object") return value;
  
  if ("stringValue" in value) return value.stringValue;
  if ("integerValue" in value) return parseInt(value.integerValue, 10);
  if ("doubleValue" in value) return Number(value.doubleValue);
  if ("booleanValue" in value) return value.booleanValue;
  if ("timestampValue" in value) {
    const d = new Date(value.timestampValue);
    return {
      seconds: Math.floor(d.getTime() / 1000),
      nanoseconds: (d.getTime() % 1000) * 1000000
    };
  }
  if ("arrayValue" in value) {
    const list = value.arrayValue.values || [];
    return list.map((item: any) => parseValue(item));
  }
  if ("mapValue" in value) {
    return parseFields(value.mapValue.fields || {});
  }
  if ("nullValue" in value) return null;
  
  return value;
}

function parseFields(fields: any): any {
  const result: any = {};
  if (!fields) return result;
  for (const [key, val] of Object.entries(fields)) {
    result[key] = parseValue(val);
  }
  return result;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  
  // Security headers
  app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    next();
  });

  // Load Firebase Config for Server Queries
  const firebaseConfigPath = path.join(process.cwd(), "firebase-applet-config.json");
  let fbConfig: any = null;

  if (fs.existsSync(firebaseConfigPath)) {
    try {
      fbConfig = JSON.parse(fs.readFileSync(firebaseConfigPath, "utf-8"));
      if (fbConfig && fbConfig.projectId) {
        console.log(`[Server-Firebase] Cleanly loaded Firebase configuration for REST queries (Project ID: ${fbConfig.projectId})`);
      }
    } catch (err) {
      console.error("[Server-Firebase] Failed to load Firebase config:", err);
    }
  }

  // Server API Proxy Route for shared collections to bypass iframe WebSocket/sandboxing restrictions
  app.get("/api/shared-folders/:shareId", async (req, res) => {
    try {
      const { shareId } = req.params;
      
      if (!fbConfig || !fbConfig.projectId || !fbConfig.apiKey) {
        console.warn("[Server-API] Firebase configuration is incomplete or unconfigured on backend server, proxy fetch failed");
        return res.status(503).json({ error: "Server-side database client is currently unconfigured." });
      }

      const projectId = fbConfig.projectId;
      const rawDbId = fbConfig.firestoreDatabaseId;
      const dbId = (rawDbId && rawDbId.trim() !== "" && rawDbId !== "undefined") ? rawDbId.trim() : "(default)";
      const apiKey = fbConfig.apiKey;

      console.log(`[Server-API] Fetching shared collection details for share ID: ${shareId} using Firestore REST API`);
      const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/${dbId}/documents/shared_folders/${shareId}?key=${apiKey}`;
      
      const response = await fetch(url);
      
      if (response.status === 404) {
        console.log(`[Server-API] Shared collection ${shareId} was not found inside Firestore via REST`);
        return res.status(404).json({ error: "Shared collection not found." });
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`[Server-API] Firestore REST API returned error status ${response.status}:`, errorText);
        return res.status(response.status).json({ error: `Firestore REST API failed with status ${response.status}` });
      }

      const docData = await response.json();
      const parsedData = parseFields(docData.fields);
      
      console.log(`[Server-API] Successfully decoded and parsed shared collection data for ID ${shareId}:`, parsedData);
      return res.json(parsedData);
    } catch (err: any) {
      console.error(`[Server-API] Error querying shared collection REST API proxy on ${req.params.shareId}:`, err);
      return res.status(500).json({ error: err.message || "Internal database proxy error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
