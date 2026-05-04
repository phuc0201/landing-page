/**
 * Convert a string to a URL-friendly slug.
 * - removes diacritics (Vietnamese and others)
 * - converts to lower-case
 * - replaces non-alphanumeric characters with hyphens
 * - collapses multiple hyphens
 * - trims leading/trailing hyphens
 */
export function toSlug(input: string, options?: { maxLength?: number }): string {
  if (!input) return "";

  const maxLength = options?.maxLength;

  // Normalize and remove diacritics
  let slug = input.normalize("NFD").replace(/\p{Diacritic}/gu, "");

  // Handle special Vietnamese characters not covered by normalization
  slug = slug.replace(/đ/g, "d").replace(/Đ/g, "D");

  // Lowercase
  slug = slug.toLowerCase();

  // Replace any non-alphanumeric character with a space (keep ASCII letters/numbers)
  slug = slug.replace(/[^a-z0-9\s-]/g, " ");

  // Replace spaces and consecutive hyphens with single hyphen
  slug = slug.trim().replace(/\s+/g, "-").replace(/-+/g, "-");

  // Apply max length if provided (avoid trailing hyphen)
  if (maxLength && slug.length > maxLength) {
    slug = slug.slice(0, maxLength).replace(/-+$/g, "");
  }

  return slug;
}

export default toSlug;
