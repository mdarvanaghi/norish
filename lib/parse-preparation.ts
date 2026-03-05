/**
 * Splits an ingredient description into a clean name and an optional preparation instruction.
 *
 * Only handles the comma-delimited format: "ingredient, preparation".
 * Examples:
 *   "carrot, cubed"         → { name: "carrot",        preparation: "cubed" }
 *   "onion, finely chopped" → { name: "onion",          preparation: "finely chopped" }
 *   "chicken breast"        → { name: "chicken breast", preparation: null }
 */
export function extractPreparation(description: string): {
  name: string;
  preparation: string | null;
} {
  const commaIndex = description.indexOf(",");

  if (commaIndex === -1) return { name: description.trim(), preparation: null };

  const name = description.slice(0, commaIndex).trim();
  const preparation = description.slice(commaIndex + 1).trim() || null;

  // Guard: if splitting produces an empty name, treat the whole string as the name
  if (!name) return { name: description.trim(), preparation: null };

  return { name, preparation };
}
