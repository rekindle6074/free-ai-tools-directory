import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// We no longer import the JSON file directly to avoid leaking secrets and build errors
// If you are in AI Studio, it will use these env vars.
// If you are on Vercel, it uses the ones you added in the dashboard.
const meta = import.meta as any;

const firebaseAppConfig = {
  apiKey: meta.env?.VITE_FIREBASE_API_KEY,
  authDomain: meta.env?.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: meta.env?.VITE_FIREBASE_PROJECT_ID,
  storageBucket: meta.env?.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: meta.env?.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: meta.env?.VITE_FIREBASE_APP_ID,
  firestoreDatabaseId: meta.env?.VITE_FIREBASE_DATABASE_ID
};

const isConfigValid = firebaseAppConfig && firebaseAppConfig.apiKey && firebaseAppConfig.projectId;

const app = (!getApps().length && isConfigValid) 
  ? initializeApp(firebaseAppConfig) 
  : (getApps().length ? getApp() : null);

let authInstance = null;
let dbInstance = null;

if (app) {
  try {
    authInstance = getAuth(app);
    const dbId = firebaseAppConfig?.firestoreDatabaseId;
    if (dbId && dbId.trim() !== "" && dbId !== "(default)" && dbId !== "undefined") {
      dbInstance = getFirestore(app, dbId.trim());
    } else {
      dbInstance = getFirestore(app);
    }
  } catch (error) {
    console.error("Error initializing Firebase services:", error);
  }
}

export const auth = authInstance as any;
export const db = dbInstance as any;

export default app;
