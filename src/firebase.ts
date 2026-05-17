import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

// Combine JSON config with environment variables for flexibility (Vercel/AI Studio)
const firebaseAppConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || firebaseConfig?.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || firebaseConfig?.authDomain,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || firebaseConfig?.projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || firebaseConfig?.storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || firebaseConfig?.messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || firebaseConfig?.appId,
  firestoreDatabaseId: import.meta.env.VITE_FIREBASE_DATABASE_ID || firebaseConfig?.firestoreDatabaseId
};

const isConfigValid = firebaseAppConfig && firebaseAppConfig.apiKey && firebaseAppConfig.projectId;

const app = (!getApps().length && isConfigValid) 
  ? initializeApp(firebaseAppConfig) 
  : (getApps().length ? getApp() : null);

export const auth = app ? getAuth(app) : null as any;
export const db = app ? getFirestore(app, firebaseAppConfig?.firestoreDatabaseId) : null as any;

export default app;
