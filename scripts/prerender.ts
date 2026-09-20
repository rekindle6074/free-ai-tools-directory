import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createRequire } from 'module';
import { categories, toolsByTag } from '../src/data/tools';

const require = createRequire(import.meta.url);
const { StaticRouter } = require('react-router');
const { HelmetProvider } = require('react-helmet-async');
const { AppContent } = require('../src/App');

async function prerender() {
  const distDir = path.resolve(process.cwd(), 'dist');
  const templatePath = path.join(distDir, 'index.html');

  if (!fs.existsSync(templatePath)) {
    console.error('dist/index.html not found! Run vite build first.');
    process.exit(1);
  }

  const template = fs.readFileSync(templatePath, 'utf-8');

  // List of all public static routes to pre-render (tool detail cards are gated for authenticated members)
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
      let ogImage = '';
      let ogType = '';
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

      // Extract OG image
      const ogImageMatch =
        renderedOutput.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']*)["'][^>]*>/i) ||
        renderedOutput.match(/<meta[^>]*content=["']([^"']*)["'][^>]*property=["']og:image["'][^>]*>/i);
      if (ogImageMatch) {
        ogImage = ogImageMatch[1];
      }

      // Extract OG type
      const ogTypeMatch =
        renderedOutput.match(/<meta[^>]*property=["']og:type["'][^>]*content=["']([^"']*)["'][^>]*>/i) ||
        renderedOutput.match(/<meta[^>]*content=["']([^"']*)["'][^>]*property=["']og:type["'][^>]*>/i);
      if (ogTypeMatch) {
        ogType = ogTypeMatch[1];
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
        .replace(/<meta[^>]*>/gi, '')
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

      // Update or insert canonical & og:url & twitter:url
      const targetCanonical = canonicalUrl || `https://free-ai-tools-directory.vercel.app${route === '/' ? '' : route}`;
      if (pageHtml.includes('rel="canonical"')) {
        pageHtml = pageHtml.replace(/<link rel=["']canonical["'] href=["'][^"']*["'][^>]*>/i, `<link rel="canonical" href="${targetCanonical}" />`);
      } else {
        pageHtml = pageHtml.replace('</head>', `  <link rel="canonical" href="${targetCanonical}" />\n</head>`);
      }
      pageHtml = pageHtml.replace(/<meta property=["']og:url["'] content=["'][^"']*["']/i, `<meta property="og:url" content="${targetCanonical}"`);
      pageHtml = pageHtml.replace(/<meta name=["']twitter:url["'] content=["'][^"']*["']/i, `<meta name="twitter:url" content="${targetCanonical}"`);

      // Update OG Image & Twitter Image
      if (ogImage) {
        pageHtml = pageHtml.replace(/<meta property=["']og:image["'] content=["'][^"']*["']/i, `<meta property="og:image" content="${ogImage}"`);
        pageHtml = pageHtml.replace(/<meta name=["']twitter:image["'] content=["'][^"']*["']/i, `<meta name="twitter:image" content="${ogImage}"`);
      }

      // Update OG Type
      if (ogType) {
        pageHtml = pageHtml.replace(/<meta property=["']og:type["'] content=["'][^"']*["']/i, `<meta property="og:type" content="${ogType}"`);
      }

      // Ensure og:site_name is present
      if (!pageHtml.includes('property="og:site_name"')) {
        pageHtml = pageHtml.replace('</head>', '  <meta property="og:site_name" content="FreeAI Tools" />\n</head>');
      }

      // Ensure twitter:card is summary_large_image
      if (pageHtml.includes('name="twitter:card"')) {
        pageHtml = pageHtml.replace(/<meta name=["']twitter:card["'] content=["'][^"']*["']/i, '<meta name="twitter:card" content="summary_large_image"');
      } else {
        pageHtml = pageHtml.replace('</head>', '  <meta name="twitter:card" content="summary_large_image" />\n</head>');
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

  // Generate sitemap1.xml directly from the pre-render routes list
  console.log('🗺️ Generating dist/sitemap1.xml...');
  const lastmod = new Date().toISOString().split('T')[0];
  const baseUrl = 'https://free-ai-tools-directory.vercel.app';

  // Exclude non-indexable, private, or search paths
  const excludedPatterns = [
    /^\/search/,
    /^\/favorites/,
    /^\/shared-folder/,
    /^\/admin/,
    /^\/portal-admin/
  ];

  const sitemapRoutes = routes.filter(route => !excludedPatterns.some(pattern => pattern.test(route)));

  let staticCount = 0;
  let categoryCount = 0;
  let toolCount = 0;

  const urlEntries = sitemapRoutes.map(route => {
    let loc = `${baseUrl}${route === '/' ? '/' : route}`;
    let changefreq = 'weekly';
    let priority = '0.7';

    if (route === '/') {
      staticCount++;
      changefreq = 'daily';
      priority = '1.0';
    } else if (['/browse', '/categories', '/insights', '/weekly-picks', '/legal', '/avatar-generator'].includes(route)) {
      staticCount++;
      changefreq = 'weekly';
      priority = '0.8';
    } else if (route.startsWith('/category/')) {
      categoryCount++;
      changefreq = 'weekly';
      priority = '0.7';
    } else if (route.startsWith('/tool/')) {
      toolCount++;
      changefreq = 'weekly';
      priority = '0.6';
    }

    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
  });

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries.join('\n')}\n</urlset>\n`;

  const sitemapPath = path.join(distDir, 'sitemap1.xml');
  fs.writeFileSync(sitemapPath, sitemapXml, 'utf-8');
  console.log(`✅ dist/sitemap1.xml generated successfully! Total URLs: ${urlEntries.length} (Static: ${staticCount}, Categories: ${categoryCount}, Tools: ${toolCount}).`);
}

prerender();
