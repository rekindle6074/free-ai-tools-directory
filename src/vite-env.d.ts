/// <reference types="vite/client" />

declare const __FIREBASE_CONFIG__: Record<string, any>;

declare module '*/firebase-applet-config.json' {
  const value: Record<string, any>;
  export default value;
}
