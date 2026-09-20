import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product' | string;
  jsonLd?: Record<string, any> | Array<Record<string, any>>;
  keywords?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

const DEFAULT_OG_IMAGE = 'https://free-ai-tools-directory.vercel.app/og-image.jpg';
const SITE_NAME = 'FreeAI Tools';
const BASE_URL = 'https://free-ai-tools-directory.vercel.app';

export const SEO: FC<SEOProps> = ({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  jsonLd,
  keywords,
  noindex = false,
  nofollow = false,
}) => {
  // Always guarantee a normalized absolute canonical URL
  const resolvedCanonical = canonical
    ? (canonical.startsWith('http') ? canonical : `${BASE_URL}${canonical.startsWith('/') ? '' : '/'}${canonical}`)
    : (typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}` : BASE_URL);

  // Always guarantee a normalized absolute Open Graph / Twitter image URL
  const resolvedOgImage = ogImage
    ? (ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`)
    : DEFAULT_OG_IMAGE;

  const robots = noindex
    ? (nofollow ? 'noindex, nofollow' : 'noindex, follow')
    : (nofollow ? 'index, nofollow' : 'index, follow');

  const jsonLdArray = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      {/* Title */}
      <title>{title}</title>

      {/* Meta Description & Keywords */}
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robots} />

      {/* Canonical URL */}
      <link rel="canonical" href={resolvedCanonical} />

      {/* Open Graph Tags (Full Protocol) */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={resolvedCanonical} />
      <meta property="og:image" content={resolvedOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Cards (summary_large_image) */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={resolvedOgImage} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:url" content={resolvedCanonical} />

      {/* Structured Data (JSON-LD) */}
      {jsonLdArray.map((schema, idx) => (
        <script key={idx} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
