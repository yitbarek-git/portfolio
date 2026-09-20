import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogType?: string;
  ogImage?: string;
  canonicalUrl?: string;
}

const DEFAULT_TITLE = 'YITBAREK.K — Ethiopian Software Engineer, Tech Educator & Content Creator';
const DEFAULT_DESCRIPTION = 'Official portfolio, computer science curricula, and technical engineering content by Yitbarek K. — Ethiopian Software Engineer, Tech Educator, and Content Creator based in Addis Ababa.';
const DEFAULT_KEYWORDS = 'Yitbarek, Yitbarek K., Ethiopian Software Engineer, Ethiopian Developer, Tech Educator Ethiopia, Tech Content Creator Ethiopia, Full-Stack Developer Addis Ababa, TypeScript Developer, React Node.js Developer, Database Normalization, AI Engineering, Addis Ababa Tech';
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1534972195531-a756b1126f24?auto=format&fit=crop&w=1200&q=80';

export function useSEO({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  ogType = 'website',
  ogImage = DEFAULT_IMAGE,
  canonicalUrl,
}: SEOProps = {}) {
  useEffect(() => {
    // 1. Update Document Title
    const formattedTitle = title
      ? `${title} | YITBAREK.K — Ethiopian Software Engineer & Educator`
      : DEFAULT_TITLE;
    document.title = formattedTitle;

    // 2. Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // 3. Update Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', keywords);

    // 4. Update OpenGraph Tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', formattedTitle);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    const ogTypeMeta = document.querySelector('meta[property="og:type"]');
    if (ogTypeMeta) ogTypeMeta.setAttribute('content', ogType);

    const ogImageMeta = document.querySelector('meta[property="og:image"]');
    if (ogImageMeta) ogImageMeta.setAttribute('content', ogImage);

    // 5. Update Twitter Tags
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', formattedTitle);

    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', description);

    // 6. Update Canonical Link
    if (canonicalUrl) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonicalUrl);
    }
  }, [title, description, keywords, ogType, ogImage, canonicalUrl]);
}
