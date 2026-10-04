// Build a URL slug from a product name.
// Keeps letters from any script (the catalogue is bilingual EN/AR), so an
// Arabic-only name still produces a usable slug instead of an empty string.
export function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '') // drop accent marks, keep the base letter
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/[\s-]+/g, '_')
    .replace(/^_+|_+$/g, '');
}
