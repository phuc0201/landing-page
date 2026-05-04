/**
 * Convert a relative image path from BE to a full absolute URL.
 * Handles both relative paths and full URLs gracefully.
 */
export function getImageUrl(path?: string | null): string {
  if (!path) return "";

  const baseUrl = import.meta.env.VITE_BASE_URL || window.location.origin;

  try {
    // If it's already an absolute URL, return as-is
    new URL(path);
    return path;
  } catch {
    // It's a relative path, prepend base URL
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return baseUrl.endsWith("/") ? baseUrl.slice(0, -1) + cleanPath : baseUrl + cleanPath;
  }
}

export default getImageUrl;
