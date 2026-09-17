import {StrictMode} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import { SpeedInsights } from "@vercel/speed-insights/react";
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById('root')!;
const appNode = (
  <StrictMode>
    <App />
    <SpeedInsights />
  </StrictMode>
);

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, appNode);
} else {
  createRoot(rootElement).render(appNode);
}
