export function sanitizeInput(str) {
  return str.replace(/<[^>]*>?/gm, ""); // strips HTML tags
}
