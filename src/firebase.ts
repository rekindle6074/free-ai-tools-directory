import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore, getFirestore } from 'firebase/firestore';
import firebaseConfig from './firebaseConfig';

// Safely retrieve environment variables across Vite client and Node SSR
const getEnv = (key: string) => {
  try {
    if (typeof import.meta !== 'undefined' && (import.meta as any).env && (import.meta as any).env[key]) {
      return (import.meta as any).env[key];
    }
  } catch {}
  try {
    if (typeof process !== 'undefined' && process.env && process.env[key]) {
      return process.env[key];
    }
  } catch {}
  return '';
};

const safeConfig = (firebaseConfig as any) || {};

const firebaseAppConfig = {
  apiKey: getEnv('VITE_FIREBASE_API_KEY') || safeConfig.apiKey || '',
  authDomain: getEnv('VITE_FIREBASE_AUTH_DOMAIN') || safeConfig.authDomain || '',
  projectId: getEnv('VITE_FIREBASE_PROJECT_ID') || safeConfig.projectId || '',
  storageBucket: getEnv('VITE_FIREBASE_STORAGE_BUCKET') || safeConfig.storageBucket || '',
  messagingSenderId: getEnv('VITE_FIREBASE_MESSAGING_SENDER_ID') || safeConfig.messagingSenderId || '',
  appId: getEnv('VITE_FIREBASE_APP_ID') || safeConfig.appId || '',
  firestoreDatabaseId: getEnv('VITE_FIREBASE_DATABASE_ID') || safeConfig.firestoreDatabaseId || ''
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
    const dbIdToUse = (dbId && dbId.trim() !== "" && dbId !== "(default)" && dbId !== "undefined")
      ? dbId.trim()
      : null;

    const settings = {
      experimentalAutoDetectLongPolling: true,
      experimentalLongPollingOptions: {
        timeoutSeconds: 30,
      },
    };

    try {
      if (dbIdToUse) {
        dbInstance = initializeFirestore(app, settings, dbIdToUse);
      } else {
        dbInstance = initializeFirestore(app, settings);
      }
    } catch (initError) {
      console.warn("Firestore already initialized or error encountered, attempting to retrieve existing instance:", initError);
      if (dbIdToUse) {
        dbInstance = getFirestore(app, dbIdToUse);
      } else {
        dbInstance = getFirestore(app);
      }
    }
  } catch (error) {
    console.error("Critical error initializing Firebase services:", error);
  }
}

export const auth = authInstance as any;
export const db = dbInstance as any;

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth?.currentUser?.uid,
      email: auth?.currentUser?.email,
      emailVerified: auth?.currentUser?.emailVerified,
      isAnonymous: auth?.currentUser?.isAnonymous,
      tenantId: auth?.currentUser?.tenantId,
      providerInfo: auth?.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export default app;
