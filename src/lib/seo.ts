// SEO, Metadata, and Schema (JSON-LD) Utility Functions for Ammal Farm
// Optimized for Google Search Console, Bing Webmaster Tools, and Core Web Vitals.

export interface OrganizationInfo {
  name: string;
  industry: string;
  country: string;
  url: string;
  logo: string;
}

export const ORG_DETAILS: OrganizationInfo = {
  name: "Ammal Farm",
  industry: "Goat Breeding Farm",
  country: "India",
  url: "https://ammalfarm.com", // Canonical Domain
  logo: "https://dlugisbcds8fnzdn.public.blob.vercel-storage.com/images/logo.jpeg"
};

// Generates dynamic Open Graph Image URL via local API
export function getDynamicOGImageUrl(title: string, description: string): string {
  const base = "/api/og";
  const params = new URLSearchParams({
    title: title || ORG_DETAILS.name,
    desc: description || "Premium Nellore Jodipi Goat Farm in Tamil Nadu"
  });
  return `${base}?${params.toString()}`;
}

// Estimates estimated reading time in minutes for blog posts
export function estimateReadingTime(content: string): number {
  const wordsPerMinute = 225;
  const wordCount = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

// Schema Generators

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": ORG_DETAILS.name,
    "url": ORG_DETAILS.url,
    "logo": ORG_DETAILS.logo,
    "sameAs": [
      "https://www.instagram.com/ammal_farm"
    ]
  };
}

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": ORG_DETAILS.name,
    "image": ORG_DETAILS.logo,
    "@id": ORG_DETAILS.url,
    "url": ORG_DETAILS.url,
    "telephone": "+916380898358",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Ammal Farm, Rusha post",
      "addressLocality": "K V kuppam, Kollimedu, Chennangkuppam, VELLORE",
      "addressRegion": "Tamil Nadu",
      "postalCode": "632209",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 12.9818, // Coordinates for Vellore area
      "longitude": 79.2014
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "10:00",
      "closes": "17:00"
    }
  };
}

export function getAgriculturalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AgricultureService",
    "name": ORG_DETAILS.name,
    "image": ORG_DETAILS.logo,
    "url": ORG_DETAILS.url,
    "telephone": "+916380898358",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Ammal Farm, Rusha post, Kollimedu",
      "addressLocality": "VELLORE",
      "addressRegion": "Tamil Nadu",
      "postalCode": "632209",
      "addressCountry": "IN"
    }
  };
}

export function getProductSchema(goat: {
  name: string;
  id: string;
  description: string;
  image: string;
  aka?: string;
  age?: string;
  weight?: string;
  breedingDetails?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${goat.name} - ${goat.aka || "Nellore Jodipi Goat"}`,
    "image": goat.image,
    "description": goat.description,
    "sku": goat.id,
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "INR",
      "lowPrice": "15000",
      "highPrice": "65000",
      "offerCount": "10",
      "priceRange": "Inquire for custom breed pricing",
      "url": `${ORG_DETAILS.url}/goats/${goat.id}`
    },
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Age",
        "value": goat.age || "12-18 Months"
      },
      {
        "@type": "PropertyValue",
        "name": "Weight",
        "value": goat.weight || "35-55 kg"
      },
      {
        "@type": "PropertyValue",
        "name": "Breeding",
        "value": goat.breedingDetails || "Pure Linebred Genetics"
      }
    ]
  };
}

export function getImageObjectSchema(image: { url: string; caption: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "contentUrl": image.url,
    "caption": image.caption,
    "creator": {
      "@type": "Organization",
      "name": ORG_DETAILS.name
    }
  };
}

export function getVideoObjectSchema(video: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration: string;
  contentUrl: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": video.name,
    "description": video.description,
    "thumbnailUrl": video.thumbnailUrl,
    "uploadDate": video.uploadDate,
    "duration": video.duration,
    "contentUrl": video.contentUrl,
    "embedUrl": video.contentUrl
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

export function getFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What breeds of goats do you sell at Ammal Farm?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We specialize in premium Nellore Jodipi / Judipi goats and Salem Black goats, widely valued for both religious festivals (like Bakrid) and sustainable goat farming genetics."
        }
      },
      {
        "@type": "Question",
        "name": "Where is Ammal Farm located and can I inspect the herd?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We are located at Chennangkuppam, VELLORE, Tamil Nadu, 632209. You can visit the farm to inspect our goats, poultry, and farming practices. Visits are by appointment only."
        }
      },
      {
        "@type": "Question",
        "name": "How is goat pricing determined?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pricing is based on inquiry, considering genetic purity, weight, age, and individual breed characteristics. Contact us directly on WhatsApp support for tailored quotes."
        }
      }
    ]
  };
}

export function getBlogArticleSchema(article: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  slug: string;
  content: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${ORG_DETAILS.url}/blog/${article.slug}`
    },
    "headline": article.title,
    "description": article.description,
    "image": article.image,
    "datePublished": article.datePublished,
    "dateModified": article.dateModified,
    "author": {
      "@type": "Person",
      "name": "Ammal Farm Breeder",
      "url": ORG_DETAILS.url
    },
    "publisher": {
      "@type": "Organization",
      "name": ORG_DETAILS.name,
      "logo": {
        "@type": "ImageObject",
        "url": ORG_DETAILS.logo
      }
    },
    "wordCount": article.content.split(/\s+/).length
  };
}

// Injection helper to insert elements inside Client DOM (if using SPA router fallback)
export function injectJSONLD(schemaObj: object, schemaId: string) {
  if (typeof window === "undefined") return;
  let script = document.getElementById(schemaId) as HTMLScriptElement;
  if (!script) {
    script = document.createElement("script");
    script.id = schemaId;
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(schemaObj);
}

export function injectSEO(meta: {
  title: string;
  description: string;
  canonicalPath: string;
  keywords?: string;
  ogImage?: string;
}) {
  if (typeof window === "undefined") return;
  document.title = meta.title;
  
  // Set HTML language
  document.documentElement.lang = "en-IN";

  // Helper to update elements
  const updateMeta = (selector: string, attr: string, value: string) => {
    let el = document.querySelector(selector);
    if (!el) {
      if (selector.startsWith('meta[property=')) {
        el = document.createElement('meta');
        const matchProp = selector.match(/property="([^"]+)"/);
        if (matchProp) el.setAttribute('property', matchProp[1]);
        document.head.appendChild(el);
      } else if (selector.startsWith('meta[name=')) {
        el = document.createElement('meta');
        const matchName = selector.match(/name="([^"]+)"/);
        if (matchName) el.setAttribute('name', matchName[1]);
        document.head.appendChild(el);
      }
    }
    if (el) {
      el.setAttribute(attr, value);
    }
  };

  updateMeta('meta[name="description"]', 'content', meta.description);
  if (meta.keywords) {
    updateMeta('meta[name="keywords"]', 'content', meta.keywords);
  }

  // Canonical link tag
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', `${ORG_DETAILS.url}${meta.canonicalPath}`);

  // Socials
  const fullOgImage = meta.ogImage || getDynamicOGImageUrl(meta.title, meta.description);
  updateMeta('meta[property="og:title"]', 'content', meta.title);
  updateMeta('meta[property="og:description"]', 'content', meta.description);
  updateMeta('meta[property="og:url"]', 'content', `${ORG_DETAILS.url}${meta.canonicalPath}`);
  updateMeta('meta[property="og:image"]', 'content', fullOgImage);

  updateMeta('meta[name="twitter:title"]', 'content', meta.title);
  updateMeta('meta[name="twitter:description"]', 'content', meta.description);
  updateMeta('meta[name="twitter:image"]', 'content', fullOgImage);
}
