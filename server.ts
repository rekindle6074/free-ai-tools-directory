import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
