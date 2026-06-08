import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  let serverDb: any = null;

  if (fs.existsSync(firebaseConfigPath)) {
    try {
      const fbConfig = JSON.parse(fs.readFileSync(firebaseConfigPath, "utf-8"));
      if (fbConfig && fbConfig.projectId && fbConfig.apiKey) {
        const serverApp = initializeApp(fbConfig, "server-app-instance");
        const dbId = fbConfig.firestoreDatabaseId;
        if (dbId && dbId.trim() !== "" && dbId !== "(default)" && dbId !== "undefined") {
          serverDb = getFirestore(serverApp, dbId.trim());
        } else {
          serverDb = getFirestore(serverApp);
        }
        console.log(`[Server-Firebase] Successfully initialized server-side Firebase client (Database: ${dbId || "default"})`);
      }
    } catch (err) {
      console.error("[Server-Firebase] Failed to initialize backend Firebase client:", err);
    }
  }

  // Server API Proxy Route for shared collections to bypass iframe WebSocket/sandboxing restrictions
  app.get("/api/shared-folders/:shareId", async (req, res) => {
    try {
      const { shareId } = req.params;
      
      if (!serverDb) {
        console.warn("[Server-API] Firebase is disabled or unconfigured on backend server, proxy fetch failed");
        return res.status(503).json({ error: "Server-side database client is currently unconfigured." });
      }

      console.log(`[Server-API] Fetching shared collection details for share ID: ${shareId}`);
      const sharedRef = doc(serverDb, "shared_folders", shareId);
      const docSnap = await getDoc(sharedRef);

      if (!docSnap.exists()) {
        console.log(`[Server-API] Shared collection ${shareId} was not found inside Firestore`);
        return res.status(404).json({ error: "Shared collection not found." });
      }

      return res.json(docSnap.data());
    } catch (err: any) {
      console.error(`[Server-API] Error querying shared collection ${req.params.shareId}:`, err);
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
