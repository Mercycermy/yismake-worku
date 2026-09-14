import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { authorData, verifiedBooks } from "../data/yismakeData";

const SITE_URL = "https://www.yismakeworku.com";
const DEFAULT_IMAGE = "https://cdn4.telesco.pe/file/s7pvyFISO6G1nMALQA-Vd5qQtykTSWAXNUJ6MiKaNnjfL1BViAr7hkGCMsv-pIOjVnDdgopiJUQ2WjpD3PypecpAj9z0zl5kD8uBZlNc3Org-Q5A8ayDYPI8k2XLCEk14777aOfdXAKMvfEuNpkgD3G-_X-YVHmWwXA3efuOlq_mdOQ7uaBhu3lCq_6I7eZzz8qq0ZBprc827FHwLEjPNZBWYS25GoHlngt6ukHL8uQSxTLhyselyRWz1D8ooKNjGyXgWVlvsOcvkkow8NHKOisxNYrbVoYwCV8VVctrWxJWm-Yqenk1hYKQwqfM5ayMJbc51O1iIgfzaf2KqSbRNg.jpg";

const authorSchema = {
  "@type": "Person",
  "@id": `${SITE_URL}/author#author`,
  name: authorData.name.en,
  alternateName: authorData.name.am,
  url: `${SITE_URL}/author`,
  image: authorData.avatar,
  jobTitle: "Author, Novelist, University Lecturer",
  nationality: {
    "@type": "Country",
    name: "Ethiopia"
  },
  sameAs: [
    authorData.telegram.url,
    "https://www.goodreads.com/book/show/16133457-dertogada",
    "https://henninghamfamilypress.com/the-lost-spell/"
  ]
};

const staticPages = {
  "/": {
    title: "Yismake Worku (ይስማዕከ ወርቁ) | Official Author Website & Literary Universe",
    description: "Discover the literary universe of Yismake Worku, acclaimed Ethiopian author of Dertogada, Ramatohara, and Kebur Dengay (The Lost Spell).",
    image: DEFAULT_IMAGE,
    type: "website",
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: "Yismake Worku Official",
        url: `${SITE_URL}/`,
        description: "Official author website and digital archive of Ethiopian novelist Yismake Worku.",
        author: authorSchema
      },
      { "@context": "https://schema.org", ...authorSchema }
    ]
  },
  "/universe": {
    title: "The Dertogada Universe | Canonical Pentology & Lore by Yismake Worku",
    description: "Explore the complete Dertogada saga: Dertogada, Ramatohara, Xantoxara, Yoratorad, and Yotod. Character dossiers and subterranean storyworld map.",
    image: DEFAULT_IMAGE,
    type: "website"
  },
  "/books": {
    title: "Complete Book Catalog | Yismake Worku (ይስማዕከ ወርቁ)",
    description: "Verified bibliography of all 15+ published works by Yismake Worku, including techno-thrillers, magical realism, poetry, and English translations.",
    image: DEFAULT_IMAGE,
    type: "website",
    schema: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Books by Yismake Worku",
      url: `${SITE_URL}/books`,
      mainEntity: {
        "@type": "ItemList",
        itemListElement: verifiedBooks.map((book, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: `${book.titleAm} (${book.titleEn})`,
          url: `${SITE_URL}/books/${book.slug}`
        }))
      }
    }
  },
  "/author": {
    title: "About Yismake Worku (ይስማዕከ ወርቁ) | Biography & Literary Milestones",
    description: "Verified biography of Ethiopian novelist Yismake Worku. Early years in Gojjam, the Dertogada revolution, 2017 accident survival, and international recognition.",
    image: DEFAULT_IMAGE,
    type: "profile",
    schema: {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/author#profile`,
      url: `${SITE_URL}/author`,
      name: "Yismake Worku – Ethiopian Novelist & Lecturer",
      mainEntity: authorSchema
    }
  },
  "/archive": {
    title: "Archival Media, Interviews & Public Record | Yismake Worku",
    description: "Archival record of television interviews (Seifu on EBS, Arts TV), peer-reviewed research papers (Taylor & Francis), and community dispatches.",
    image: DEFAULT_IMAGE,
    type: "website"
  },
  "/sources": {
    title: "Research Sources & Factual Citations | Yismake Worku Official",
    description: "Transparent academic bibliography and factual citations backing this official author showcase.",
    image: DEFAULT_IMAGE,
    type: "website"
  },
  "/contact": {
    title: "Contact & Community | Yismake Worku (ይስማዕከ ወርቁ)",
    description: "Official contact channels for reader communications, academic research inquiries, press requests, and Telegram community links.",
    image: DEFAULT_IMAGE,
    type: "website"
  }
};

function setMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

export default function SeoManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    const normalizedPath = pathname !== "/" ? pathname.replace(/\/+$/, "") : pathname;

    // Check if it is a book detail page (/books/:slug)
    let page = staticPages[normalizedPath];

    if (!page && normalizedPath.startsWith("/books/")) {
      const slug = normalizedPath.replace("/books/", "");
      const book = verifiedBooks.find((b) => b.slug === slug);

      if (book) {
        const canonical = `${SITE_URL}${normalizedPath}`;
        page = {
          title: `${book.titleAm} (${book.titleEn}) by Yismake Worku | Official Book Dossier`,
          description: `${book.tagline.en} Explore plot synopsis, themes, and purchase options for ${book.titleEn} by Ethiopian author Yismake Worku.`,
          image: DEFAULT_IMAGE,
          type: "book",
          schema: [
            {
              "@context": "https://schema.org",
              "@type": "Book",
              "@id": `${canonical}#book`,
              name: `${book.titleAm} (${book.titleEn})`,
              url: canonical,
              image: DEFAULT_IMAGE,
              description: book.description.en,
              genre: book.genre,
              inLanguage: ["am", book.translator ? "en" : "am"],
              datePublished: `${book.year}`,
              author: authorSchema
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
                { "@type": "ListItem", position: 2, name: "Books", item: `${SITE_URL}/books` },
                { "@type": "ListItem", position: 3, name: book.titleEn, item: canonical }
              ]
            }
          ]
        };
      }
    }

    if (!page) {
      page = {
        title: "Yismake Worku (ይስማዕከ ወርቁ) | Official Author Website",
        description: "Official author website and digital archive of Ethiopian novelist Yismake Worku.",
        image: DEFAULT_IMAGE,
        type: "website"
      };
    }

    const canonical = `${SITE_URL}${normalizedPath === "/" ? "/" : normalizedPath}`;

    document.title = page.title;
    setMeta("name", "description", page.description);
    setMeta("name", "robots", "index, follow, max-image-preview:large");
    setMeta("property", "og:title", page.title);
    setMeta("property", "og:description", page.description);
    setMeta("property", "og:image", page.image);
    setMeta("property", "og:url", canonical);
    setMeta("property", "og:type", page.type || "website");
    setMeta("property", "og:site_name", "Yismake Worku Official");
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", page.title);
    setMeta("name", "twitter:description", page.description);
    setMeta("name", "twitter:image", page.image);

    let canonicalLink = document.head.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonical);

    let structuredData = document.getElementById("seo-structured-data");
    if (page.schema) {
      if (!structuredData) {
        structuredData = document.createElement("script");
        structuredData.id = "seo-structured-data";
        structuredData.type = "application/ld+json";
        document.head.appendChild(structuredData);
      }
      structuredData.textContent = JSON.stringify(page.schema);
    }
  }, [pathname]);

  return null;
}
