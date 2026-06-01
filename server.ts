import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { put, del } from "@vercel/blob";
import dotenv from "dotenv";

dotenv.config();

// Define our lists for the sitemaps
const BASE_URL = "https://ammalfarm.com";

const STATIC_ROUTES = [
  "",
  "/livestock",
  "/poultry",
  "/gallery",
  "/visit"
];


// Rich Image mappings for Image Sitemap
const IMAGES = [
  { url: "https://dlugisbcds8fnzdn.public.blob.vercel-storage.com/images/logo.jpeg", title: "Ammal Farm Logo and Emblem", caption: "Registered breeding emblem of Ammal Farm in Tamil Nadu, India." },
  { url: "https://dlugisbcds8fnzdn.public.blob.vercel-storage.com/images/Livestock/nellore-judipi.jpg", title: "Nellore Jodipi Sheep Breeder Male", caption: "Elite pure Nellore Jodipi livestock displaying characteristic black eye patches and grand stature." },
  { url: "https://dlugisbcds8fnzdn.public.blob.vercel-storage.com/images/Livestock/salem-black.jpg", title: "Salem Black Goat", caption: "Healthy, glossy native Salem Black goat reared sustainably under free-grazing structures." },
  { url: "https://dlugisbcds8fnzdn.public.blob.vercel-storage.com/images/Poultry/kadaknath.jpg", title: "Purebred Kadaknath Black Rooster", caption: "High melanin Kadaknath poultry selected for premium immunities and certified black meat." },
  { url: "https://dlugisbcds8fnzdn.public.blob.vercel-storage.com/images/Poultry/turkey.jpg", title: "Broad Breasted Turkey Stock", caption: "Premium white turkey stock raised organically on forage fields in dryland climates." },
  { url: "https://dlugisbcds8fnzdn.public.blob.vercel-storage.com/images/Poultry/aseel_cross.jpg", title: "Heavyweight Aseel Rooster", caption: "High resilience native Aseel cross rooster selected for local breeding and muscle definition." }
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  // 1. Security Headers Middleware
  app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "SAMEORIGIN"); // Safe for deployment & editing previews
    res.setHeader("Referrer-Policy", "no-referrer-when-downgrade");
    next();
  });

  // Ensure high-resolution, desc-named images copies exist in public directory
  const publicDir = path.join(process.cwd(), "public");
  const copyMap = {
    "nellore-judipi.jpg": [
      "nellore-jodipi-breeding-male-goat-ammal-farm.jpg",
      "nellore-jodipi-goat-for-sale-ammal-farm.jpg",
      "pure-bred-nellore-jodipi-stud-goat-ammal-farm.jpg"
    ],
    "salem-black.jpg": [
      "premium-salem-black-goat-breeding-male-ammal-farm.jpg",
      "healthy-breeding-buck-salem-black-goat-ammal-farm.jpg"
    ]
  };

  try {
    if (fs.existsSync(publicDir)) {
      for (const [src, dests] of Object.entries(copyMap)) {
        const srcPath = path.join(publicDir, src);
        if (fs.existsSync(srcPath)) {
          for (const dest of dests) {
            const destPath = path.join(publicDir, dest);
            if (!fs.existsSync(destPath)) {
              fs.copyFileSync(srcPath, destPath);
              console.log(`Programmatic SEO Copy Created: ${src} -> ${dest}`);
            }
          }
        }
      }
    }
  } catch (err) {
    console.error("Failed to copy search-optimized assets at start:", err);
  }

  // 2. robots.txt Route
  app.get("/robots.txt", (req, res) => {
    res.type("text/plain");
    res.send(
      `User-agent: *\n` +
      `Allow: /\n` +
      `Disallow: /admin\n` +
      `Disallow: /api/\n` +
      `\n` +
      `Sitemap: ${BASE_URL}/sitemap.xml\n` +
      `Sitemap: ${BASE_URL}/image-sitemap.xml\n`
    );
  });

  // 3. Dynamic sitemap.xml Route
  app.get("/sitemap.xml", (req, res) => {
    res.type("application/xml");
    
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    const addUrl = (path: string, priority: string, changefreq: string) => {
      xml += `  <url>\n`;
      xml += `    <loc>${BASE_URL}${path}</loc>\n`;
      xml += `    <priority>${priority}</priority>\n`;
      xml += `    <changefreq>${changefreq}</changefreq>\n`;
      xml += `  </url>\n`;
    };

    // Static pages
    STATIC_ROUTES.forEach(route => addUrl(route, route === "" ? "1.0" : "0.8", "weekly"));

    xml += `</urlset>\n`;
    res.send(xml);
  });

  // Dynamic image-sitemap.xml route for backward compatibility
  app.get("/image-sitemap.xml", (req, res) => {
    res.type("application/xml");

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

    IMAGES.forEach((img) => {
      xml += `  <url>\n`;
      xml += `    <loc>${BASE_URL}/gallery</loc>\n`;
      xml += `    <image:image>\n`;
      xml += `      <image:loc>${img.url}</image:loc>\n`;
      xml += `      <image:title>${img.title}</image:title>\n`;
      xml += `      <image:caption>${img.caption}</image:caption>\n`;
      xml += `    </image:image>\n`;
      xml += `  </url>\n`;
    });

    xml += `</urlset>\n`;
    res.send(xml);
  });

  // 5. Open Graph Dynamic Card Generator (/api/og)
  // Generates clean vectors representing dynamic headlines for WhatsApp/Meta/X cards
  app.get("/api/og", (req, res) => {
    const title = (req.query.title as string) || "Ammal Farm";
    const desc = (req.query.desc as string) || "Premium Goat Breeding Farm In Tamil Nadu";

    const svg = `
      <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
        <rect width="1200" height="630" fill="#14211D"/>
        <!-- Accent circles -->
        <circle cx="1100" cy="100" r="150" fill="#1C382F" opacity="0.6" />
        <circle cx="100" cy="550" r="200" fill="#E8B547" opacity="0.08" />
        
        <!-- Branding banner -->
        <g transform="translate(100, 100)">
          <rect width="80" height="80" fill="#E8B547" rx="10"/>
          <text x="40" y="52" font-family="Georgia, serif" font-size="36" font-weight="bold" fill="#14211D" text-anchor="middle">A</text>
          <text x="110" y="50" font-family="'Inter', sans-serif" font-size="32" font-weight="950" fill="#FFFFFF" letter-spacing="4">AMMAL FARM</text>
          <text x="110" y="80" font-family="'Inter', sans-serif" font-size="14" font-weight="bold" fill="#E8B547" letter-spacing="6">CERTIFIED BREEDER</text>
        </g>

        <!-- Main Title -->
        <text x="100" y="320" font-family="'Inter', sans-serif" font-size="52" font-weight="bold" fill="#FFFFFF" width="1000">
          ${title.length > 40 ? title.substring(0, 38) + "..." : title}
        </text>

        <!-- Description -->
        <text x="100" y="420" font-family="'Inter', sans-serif" font-size="24" font-weight="normal" fill="#BBBBBB" width="1000">
          ${desc.length > 80 ? desc.substring(0, 78) + "..." : desc}
        </text>

        <!-- Footer -->
        <line x1="100" y1="520" x2="1100" y2="520" stroke="#1C382F" stroke-width="2"/>
        <text x="100" y="560" font-family="'Inter', sans-serif" font-size="16" font-weight="bold" fill="#E8B547">📍 VELLORE, TAMIL NADU</text>
        <text x="1100" y="560" font-family="'Inter', sans-serif" font-size="16" font-weight="bold" fill="#FFFFFF" text-anchor="end">WWW.AMMALFARM.COM</text>
      </svg>
    `;

    res.type("image/svg+xml");
    res.setHeader("Cache-Control", "public, max-age=86400, s-maxage=86400");
    res.send(svg);
  });

  // API health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vercel Blob proxy delete route
  app.delete("/api/delete", async (req, res) => {
    try {
      const url = req.query.url as string;
      if (!url) {
        return res.status(400).json({ error: "URL query parameter is required." });
      }

      const token = process.env.BLOB_READ_WRITE_TOKEN;
      if (!token) {
        return res.status(401).json({ error: "BLOB_READ_WRITE_TOKEN environment variable is not set." });
      }

      await del(url, { token });
      res.json({ success: true });
    } catch (error: any) {
      console.error("Vercel Blob delete error:", error);
      res.status(500).json({ error: error.message || "Delete failed on proxy server." });
    }
  });

  // Vercel Blob proxy upload route
  app.post("/api/upload", express.raw({ type: "*/*", limit: "50mb" }), async (req, res) => {
    try {
      const filename = (req.query.filename as string) || "file";
      const contentType = (req.headers["content-type"] as string) || "application/octet-stream";
      
      const token = process.env.BLOB_READ_WRITE_TOKEN;
      if (!token) {
        return res.status(401).json({ error: "BLOB_READ_WRITE_TOKEN environment variable is not set." });
      }

      const blobResult = await put(filename, req.body, {
        contentType,
        access: "public",
        token,
      });

      res.json(blobResult);
    } catch (error: any) {
      console.error("Vercel Blob upload error:", error);
      res.status(500).json({ error: error.message || "Upload failed on proxy server." });
    }
  });

  // Dynamic SEO Injection helper for serving index.html
  const getSeoInjectedHtml = (originalHtml: string, urlPath: string): string => {
    let title = "Ammal Farm | Premium Nellore Jodipi and Salem Black Goats in Tamil Nadu";
    let desc = "Ammal Farm is Tamil Nadu's elite breeding farm. Producing registered, high-bone-density Nellore Jodipi / Judipi sheep, pure black Salem Black goats, and organic free-range poultry.";
    let keywords = "Ammal Farm, Nellore Jodipi, Jodipi Goat, Salem Black, Tamil Nadu Goat Breeding, Buy goats Vellore, Organic Poultry";
    let canonical = `${BASE_URL}${urlPath}`;

    // 1. Fallback primary screens
    if (urlPath === "/livestock") {
      title = "Pure Livestock Selections | Nellore Jodipi & Salem Black | Ammal Farm";
      desc = "Discover our verified, high-retention goat directory at Ammal Farm. View pedigree weights, ages, feed details, and request immediate quotations.";
    } else if (urlPath === "/poultry") {
      title = "Organic Country Chickens & Kadaknath Eggs | Ammal Farm";
      desc = "Purchase premium hyper-melanic Kadaknath black meat chickens, high-grade Aseel crosses, turkey poults, and fresh farm-direct organic eggs.";
    } else if (urlPath === "/gallery") {
      title = "Livestock Gallery and Field Videos | Ammal Farm";
      desc = "Step inside Ammal Farm's breeding pens. Explore real images and demonstrative videos showcasing our healthy Jodipi sheep, Salem Black bucks, and free-range chickens.";
    } else if (urlPath === "/visit") {
      title = "Schedule a Farm Visit & Agro Consulting | Ammal Farm";
      desc = "Plan your guided study visit of Ammal Farm in Vellore, Tamil Nadu. Touch base with veteran breeders on slatted wood design, vaccination, and feeds.";
    }

    // Dynamic OG image using our internal SVG engine
    const ogImageUrl = `${BASE_URL}/api/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(desc)}`;

    // Do surgical replacements on meta tags
    let html = originalHtml;
    html = html.replace(/<title>[^*]*?<\/title>/gi, `<title>${title}</title>`);
    
    // Replace metadata properties
    html = html.replace(/<meta name="description" content="[^"]*?"/gi, `<meta name="description" content="${desc}"`);
    html = html.replace(/<meta name="keywords" content="[^"]*?"/gi, `<meta name="keywords" content="${keywords}"`);
    
    // Open Graph
    html = html.replace(/<meta property="og:title" content="[^"]*?"/gi, `<meta property="og:title" content="${title}"`);
    html = html.replace(/<meta property="og:description" content="[^"]*?"/gi, `<meta property="og:description" content="${desc}"`);
    html = html.replace(/<meta property="og:url" content="[^"]*?"/gi, `<meta property="og:url" content="${canonical}"`);
    html = html.replace(/<meta property="og:image" content="[^"]*?"/gi, `<meta property="og:image" content="${ogImageUrl}"`);

    // Twitter
    html = html.replace(/<meta name="twitter:title" content="[^"]*?"/gi, `<meta name="twitter:title" content="${title}"`);
    html = html.replace(/<meta name="twitter:description" content="[^"]*?"/gi, `<meta name="twitter:description" content="${desc}"`);
    html = html.replace(/<meta name="twitter:image" content="[^"]*?"/gi, `<meta name="twitter:image" content="${ogImageUrl}"`);

    // Canonical link tag update
    const canonicalRegex = /<link rel="canonical" href="[^"]*?"/gi;
    if (canonicalRegex.test(html)) {
      html = html.replace(canonicalRegex, `<link rel="canonical" href="${canonical}"`);
    } else {
      html = html.replace("</head>", `  <link rel="canonical" href="${canonical}" />\n</head>`);
    }

    return html;
  };

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    
    // Serve static files (ignore index.html itself to intercept its routing dynamically)
    app.use(express.static(distPath, { index: false }));

    app.get("*", (req, res) => {
      try {
        const indexPath = path.join(distPath, "index.html");
        if (fs.existsSync(indexPath)) {
          const rawHtml = fs.readFileSync(indexPath, "utf8");
          const seoHtml = getSeoInjectedHtml(rawHtml, req.path);
          res.send(seoHtml);
        } else {
          res.sendFile(path.join(distPath, "index.html"));
        }
      } catch (err) {
        console.error("SEO pre-rendering error, rendering default template:", err);
        res.sendFile(path.join(distPath, "index.html"));
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running in ${process.env.NODE_ENV || "development"} mode on http://localhost:${PORT}`);
  });
}

startServer();
