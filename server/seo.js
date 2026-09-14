const SITE_URL = "https://www.yismakeworku.com";
const DEFAULT_IMAGE = "https://cdn4.telesco.pe/file/s7pvyFISO6G1nMALQA-Vd5qQtykTSWAXNUJ6MiKaNnjfL1BViAr7hkGCMsv-pIOjVnDdgopiJUQ2WjpD3PypecpAj9z0zl5kD8uBZlNc3Org-Q5A8ayDYPI8k2XLCEk14777aOfdXAKMvfEuNpkgD3G-_X-YVHmWwXA3efuOlq_mdOQ7uaBhu3lCq_6I7eZzz8qq0ZBprc827FHwLEjPNZBWYS25GoHlngt6ukHL8uQSxTLhyselyRWz1D8ooKNjGyXgWVlvsOcvkkow8NHKOisxNYrbVoYwCV8VVctrWxJWm-Yqenk1hYKQwqfM5ayMJbc51O1iIgfzaf2KqSbRNg.jpg";

const AUTHOR = {
  "@type": "Person",
  "@id": `${SITE_URL}/author#person`,
  name: "Yismake Worku",
  alternateName: "ይስማዕከ ወርቁ",
  url: `${SITE_URL}/author`,
  image: DEFAULT_IMAGE,
  jobTitle: "Author, Novelist, University Lecturer",
  nationality: { "@type": "Country", name: "Ethiopia" },
  sameAs: [
    "https://t.me/yismakeworku",
    "https://www.goodreads.com/book/show/16133457-dertogada",
    "https://henninghamfamilypress.com/the-lost-spell/"
  ]
};

function breadcrumb(name, url) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Books", item: `${SITE_URL}/books` },
      { "@type": "ListItem", position: 3, name, item: url }
    ]
  };
}

const pages = {
  "/": {
    title: "Yismake Worku (ይስማዕከ ወርቁ) | Official Author Website & Literary Universe",
    description: "Official author website of celebrated Ethiopian novelist Yismake Worku, creator of Dertogada, Ramatohara, The Lost Spell (Kebur Dengay), and pioneer of Ethiopian techno-fiction.",
    image: DEFAULT_IMAGE,
    type: "website",
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: "Yismake Worku Official",
        url: `${SITE_URL}/`,
        description: "Official author website of Ethiopian novelist Yismake Worku.",
        author: AUTHOR
      },
      { "@context": "https://schema.org", ...AUTHOR }
    ],
    body: `
      <h1>Yismake Worku (ይስማዕከ ወርቁ) — Official Author Website</h1>
      <p>Discover the groundbreaking Ethiopian literary universe of Yismake Worku, author of the bestselling Dertogada saga, Ramatohara, and The Lost Spell (Kebur Dengay).</p>
      <p><a href="/universe">Explore the Dertogada Universe</a> · <a href="/author">Visual Biography</a> · <a href="/books">Complete Book Catalog</a> · <a href="/sources">Academic Sources</a></p>
    `
  },
  "/author": {
    title: "About Yismake Worku (ይስማዕከ ወርቁ) – Biography & Literary Milestones",
    description: "Verified biography of Ethiopian novelist Yismake Worku. From his early years in Gojjam and university lectureship to the record-breaking Dertogada and international UK recognition.",
    image: DEFAULT_IMAGE,
    type: "profile",
    schema: {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/author#profile`,
      url: `${SITE_URL}/author`,
      name: "Yismake Worku – Ethiopian Novelist & Lecturer",
      mainEntity: AUTHOR
    },
    body: `
      <h1>About Yismake Worku (ይስማዕከ ወርቁ)</h1>
      <p>Yismake Worku is an acclaimed contemporary Ethiopian novelist who revolutionized Amharic literature with the 2009 techno-thriller Dertogada.</p>
    `
  },
  "/universe": {
    title: "The Dertogada Universe | Canonical Pentology & Lore by Yismake Worku",
    description: "Deep dive into the 5-volume Dertogada storyworld: Dertogada, Ramatohara, Xantoxara, Yoratorad, and Yotod.",
    image: DEFAULT_IMAGE,
    type: "website",
    body: `
      <h1>The Dertogada Universe (የዴርቶጋዳ ዓለም)</h1>
      <p>A high-tech subterranean quantum laboratory beneath ancient Lake Tana and island monasteries defying foreign espionage cartels.</p>
    `
  },
  "/books": {
    title: "Complete Book Catalog | Yismake Worku (ይስማዕከ ወርቁ)",
    description: "Verified bibliography of 15+ published novels, poetry collections, and translations by Ethiopian author Yismake Worku.",
    image: DEFAULT_IMAGE,
    type: "website",
    body: `
      <h1>Complete Bibliography of Yismake Worku</h1>
      <p>Browse verified books including Dertogada, Ramatohara, Xantoxara, Kebur Dengay (The Lost Spell), Zamra, Gefuan, Melos, and Yewond Mit.</p>
    `
  },
  "/archive": {
    title: "Media, Broadcast Interviews & Research Papers | Yismake Worku",
    description: "Curated broadcast interviews (Seifu on EBS, Arts TV), Taylor & Francis peer-reviewed academic research, and official Telegram dispatches.",
    image: DEFAULT_IMAGE,
    type: "website",
    body: `
      <h1>Media & Research Archive</h1>
      <p>Interviews, broadcasts, and academic papers analyzing the speculative fiction of Yismake Worku.</p>
    `
  },
  "/sources": {
    title: "Academic Bibliography & Research Sources | Yismake Worku",
    description: "Transparent factual citations, academic research papers, university theses, and publishing references backing this author showcase.",
    image: DEFAULT_IMAGE,
    type: "website",
    body: `
      <h1>Academic & Factual Sources</h1>
      <p>Citations from Eastern African Literary and Cultural Studies, Addis Ababa University, and Henningham Family Press.</p>
    `
  },
  "/contact": {
    title: "Contact & Community | Yismake Worku (ይስማዕከ ወርቁ)",
    description: "Official inquiries for readers, academic researchers, translations, and media requests.",
    image: DEFAULT_IMAGE,
    type: "website",
    body: `
      <h1>Contact & Community</h1>
      <p>Connect with the author via official Telegram channel @yismakeworku or transmit an inquiry.</p>
    `
  },
  "/books/dertogada": {
    title: "Dertogada (ዴርቶጋዳ) by Yismake Worku | Official Book Dossier",
    description: "The historic 2009 Amharic techno-thriller that sold over 200,000 copies in ten editions in its debut year. Follow Shagiz Ejigu and the Lake Tana sanctuary.",
    image: DEFAULT_IMAGE,
    type: "book",
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "Book",
        name: "Dertogada (ዴርቶጋዳ)",
        url: `${SITE_URL}/books/dertogada`,
        author: AUTHOR,
        datePublished: "2009",
        inLanguage: ["am", "en"],
        genre: "Techno-Thriller / Science Fiction"
      },
      breadcrumb("Dertogada", `${SITE_URL}/books/dertogada`)
    ],
    body: `
      <h1>Dertogada (ዴርቶጋዳ) by Yismake Worku</h1>
      <p>The groundbreaking Ethiopian science fiction novel centered on NASA rocket scientist Shagiz Ejigu and a clandestine subterranean laboratory beneath Lake Tana.</p>
    `
  },
  "/books/kebur-dengay": {
    title: "Kebur Dengay / The Lost Spell (ክቡር ድንጋይ) by Yismake Worku",
    description: "A corrupt businessman transforms into a street dog in this Ethiopian magical realism satire. English translation shortlisted for 2022 TA First Translation Prize in the UK.",
    image: DEFAULT_IMAGE,
    type: "book",
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "Book",
        name: "Kebur Dengay / The Lost Spell (ክቡር ድንጋይ)",
        url: `${SITE_URL}/books/kebur-dengay`,
        author: AUTHOR,
        datePublished: "2013",
        inLanguage: ["am", "en"],
        genre: "Magical Realism / Political Satire"
      },
      breadcrumb("Kebur Dengay", `${SITE_URL}/books/kebur-dengay`)
    ],
    body: `
      <h1>Kebur Dengay / The Lost Spell (ክቡር ድንጋይ)</h1>
      <p>Ethiopian magical realism novel translated into English as The Lost Spell by Dr. Bethlehem Attfield (Henningham Family Press, UK).</p>
    `
  }
};

function renderSeoHtml(reqPath, htmlContent) {
  const normalizedPath = reqPath !== "/" ? reqPath.replace(/\/+$/, "") : reqPath;
  const page = pages[normalizedPath] || pages["/"];

  let result = htmlContent;

  // Replace Title
  result = result.replace(/<title>.*?<\/title>/i, `<title>${page.title}</title>`);

  // Replace Meta Description
  result = result.replace(
    /<meta\s+name=["']description["']\s+content=["'].*?["']\s*\/?>/i,
    `<meta name="description" content="${page.description}" />`
  );

  // Replace Canonical Link
  const canonical = `${SITE_URL}${normalizedPath === "/" ? "/" : normalizedPath}`;
  result = result.replace(
    /<link\s+rel=["']canonical["']\s+href=["'].*?["']\s*\/?>/i,
    `<link rel="canonical" href="${canonical}" />`
  );

  return result;
}

module.exports = {
  renderSeoHtml,
  pages,
  SITE_URL,
  AUTHOR
};
