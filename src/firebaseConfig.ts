// Safely load firebase configuration without failing if firebase-applet-config.json is absent
let config: Record<string, any> = {};

try {
  // @ts-ignore
  if (typeof __FIREBASE_CONFIG__ !== 'undefined' && __FIREBASE_CONFIG__) {
    // @ts-ignore
    config = __FIREBASE_CONFIG__;
  }
} catch {
  // fallback to empty config
}

export default config;
