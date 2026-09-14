import { verifiedBooks } from "./yismakeData";

export const booksData = verifiedBooks.map(book => ({
  ...book,
  path: `/books/${book.slug}`,
  title: book.titleEn,
  type: book.genre,
  typeAm: book.genreAm,
  tagline: book.tagline.en,
  taglineAm: book.tagline.am,
  description: book.description.en,
  descriptionAm: book.description.am,
  cover: book.coverImage,
  buyLink: book.purchaseLinks?.[0]?.url || "https://t.me/yismakeworku"
}));

export default booksData;
