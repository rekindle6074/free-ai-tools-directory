import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import { AppContent } from '../src/App';
import { categories } from '../src/data/tools';

async function prerender() {
  const distDir = path.resolve(process.cwd(), 'dist');
  const templatePath = path.join(distDir, 'index.html');

  if (!fs.existsSync(templatePath)) {
    console.error('dist/index.html not found! Run vite build first.');
    process.exit(1);
  }

  const template = fs.readFileSync(templatePath, 'utf-8');

  // List of all routes to pre-render
  const routes = [
    '/',
    '/browse',
    '/categories',
    '/insights',
    '/weekly-picks',
    '/legal',
    '/avatar-generator',
    ...categories.flatMap(c => c.subCategories.map(s => '/category/' + s.path))
  ];

  console.log(`🚀 Starting static pre-rendering for ${routes.length} routes...`);
  const startTime = Date.now();

  let renderedCount = 0;

  for (const route of routes) {
    try {
      const helmetContext: any = {};
      const app = React.createElement(
        HelmetProvider,
        { context: helmetContext },
        React.createElement(
          StaticRouter,
          { location: route },
          React.createElement(AppContent, { openSubmitForm: () => {} })
        )
      );

      const renderedOutput = renderToString(app);

      // Extract metadata from rendered output
      let pageTitle = '';
      let pageDesc = '';
      let pageKeywords = '';
      let canonicalUrl = '';
      const jsonLdScripts: string[] = [];

      // Extract title
      const titleMatch = renderedOutput.match(/<title[^>]*>(.*?)<\/title>/);
      if (titleMatch) {
        pageTitle = titleMatch[1];
      }

      // Extract meta description
      const descMatch =
        renderedOutput.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i) ||
        renderedOutput.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["'][^>]*>/i);
      if (descMatch) {
        pageDesc = descMatch[1];
      }

      // Extract meta keywords
      const keywordsMatch = renderedOutput.match(/<meta[^>]*name=["']keywords["'][^>]*content=["']([^"']*)["'][^>]*>/i);
      if (keywordsMatch) {
        pageKeywords = keywordsMatch[1];
      }

      // Extract canonical
      const canonicalMatch = renderedOutput.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["'][^>]*>/i);
      if (canonicalMatch) {
        canonicalUrl = canonicalMatch[1];
      }

      // Extract JSON-LD scripts
      const scriptRegex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
      let sMatch;
      while ((sMatch = scriptRegex.exec(renderedOutput)) !== null) {
        jsonLdScripts.push(sMatch[0]);
      }

      // Clean metadata elements from root content
      const cleanBody = renderedOutput
        .replace(/<title[^>]*>.*?<\/title>/gi, '')
        .replace(/<meta[^>]*name=["'](description|keywords)["'][^>]*>/gi, '')
        .replace(/<link[^>]*rel=["']canonical["'][^>]*>/gi, '')
        .replace(/<script[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, '');

      // Create page HTML from template
      let pageHtml = template;

      // Update Title
      if (pageTitle) {
        pageHtml = pageHtml.replace(/<title>.*?<\/title>/i, `<title>${pageTitle}</title>`);
        pageHtml = pageHtml.replace(/<meta property=["']og:title["'] content=["'][^"']*["']/i, `<meta property="og:title" content="${pageTitle}"`);
        pageHtml = pageHtml.replace(/<meta name=["']twitter:title["'] content=["'][^"']*["']/i, `<meta name="twitter:title" content="${pageTitle}"`);
      }

      // Update Description
      if (pageDesc) {
        pageHtml = pageHtml.replace(/<meta name=["']description["'] content=["'][^"']*["']/i, `<meta name="description" content="${pageDesc}"`);
        pageHtml = pageHtml.replace(/<meta property=["']og:description["'] content=["'][^"']*["']/i, `<meta property="og:description" content="${pageDesc}"`);
        pageHtml = pageHtml.replace(/<meta name=["']twitter:description["'] content=["'][^"']*["']/i, `<meta name="twitter:description" content="${pageDesc}"`);
      }

      // Update Keywords
      if (pageKeywords) {
        if (pageHtml.includes('name="keywords"')) {
          pageHtml = pageHtml.replace(/<meta name=["']keywords["'] content=["'][^"']*["']/i, `<meta name="keywords" content="${pageKeywords}"`);
        } else {
          pageHtml = pageHtml.replace('</head>', `  <meta name="keywords" content="${pageKeywords}" />\n</head>`);
        }
      }

      // Update or insert canonical
      if (canonicalUrl) {
        if (pageHtml.includes('rel="canonical"')) {
          pageHtml = pageHtml.replace(/<link rel=["']canonical["'] href=["'][^"']*["'][^>]*>/i, `<link rel="canonical" href="${canonicalUrl}" />`);
        } else {
          pageHtml = pageHtml.replace('</head>', `  <link rel="canonical" href="${canonicalUrl}" />\n</head>`);
        }
      }

      // Insert JSON-LD scripts into head if found
      if (jsonLdScripts.length > 0) {
        pageHtml = pageHtml.replace('</head>', `  ${jsonLdScripts.join('\n  ')}\n</head>`);
      }

      // Inject rendered content into root
      pageHtml = pageHtml.replace('<div id="root"></div>', `<div id="root">${cleanBody}</div>`);

      // Determine output file path
      let outFilePath: string;
      if (route === '/') {
        outFilePath = path.join(distDir, 'index.html');
      } else {
        const routeDir = path.join(distDir, route.replace(/^\//, ''));
        if (!fs.existsSync(routeDir)) {
          fs.mkdirSync(routeDir, { recursive: true });
        }
        outFilePath = path.join(routeDir, 'index.html');
      }

      fs.writeFileSync(outFilePath, pageHtml, 'utf-8');
      renderedCount++;
    } catch (err) {
      console.warn(`Warning: failed to pre-render route ${route}:`, err);
    }
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`✅ Pre-rendering complete! ${renderedCount}/${routes.length} pages generated in ${duration}s.`);
}

prerender();
