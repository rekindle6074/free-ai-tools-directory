import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, loadEnv, Plugin} from 'vite';

const optionalFirebaseConfigPlugin: Plugin = {
  name: 'optional-firebase-config',
  enforce: 'pre',
  resolveId(id) {
    if (id.includes('firebase-applet-config.json')) {
      const configPath = path.resolve(__dirname, 'firebase-applet-config.json');
      if (fs.existsSync(configPath)) {
        return configPath;
      }
      return '\0virtual:firebase-applet-config.json';
    }
  },
  load(id) {
    if (id === '\0virtual:firebase-applet-config.json') {
      return 'export default {};';
    }
  }
};

export default defineConfig(({mode}) => {
  const env = { ...process.env, ...loadEnv(mode, '.', '') };
  
  let fileFirebaseConfig: Record<string, any> = {};
  const configPath = path.resolve(__dirname, 'firebase-applet-config.json');
  if (fs.existsSync(configPath)) {
    try {
      fileFirebaseConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    } catch {}
  }

  return {
    plugins: [optionalFirebaseConfigPlugin, react(), tailwindcss()],
    define: {
      '__FIREBASE_CONFIG__': JSON.stringify(fileFirebaseConfig),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'import.meta.env.VITE_FIREBASE_API_KEY': JSON.stringify(env.VITE_FIREBASE_API_KEY),
      'import.meta.env.VITE_FIREBASE_AUTH_DOMAIN': JSON.stringify(env.VITE_FIREBASE_AUTH_DOMAIN),
      'import.meta.env.VITE_FIREBASE_PROJECT_ID': JSON.stringify(env.VITE_FIREBASE_PROJECT_ID),
      'import.meta.env.VITE_FIREBASE_STORAGE_BUCKET': JSON.stringify(env.VITE_FIREBASE_STORAGE_BUCKET),
      'import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(env.VITE_FIREBASE_MESSAGING_SENDER_ID),
      'import.meta.env.VITE_FIREBASE_APP_ID': JSON.stringify(env.VITE_FIREBASE_APP_ID),
      'import.meta.env.VITE_FIREBASE_DATABASE_ID': JSON.stringify(env.VITE_FIREBASE_DATABASE_ID),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      chunkSizeWarningLimit: 1000,
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
