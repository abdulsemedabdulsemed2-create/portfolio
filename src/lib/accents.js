// Map a project/entry `accent` name to its CSS variable + a soft rgba.
export const ACCENTS = {
  amber: { color: "var(--amber)", rgb: "255, 182, 39" },
  azure: { color: "var(--azure)", rgb: "76, 125, 255" },
  mint: { color: "var(--mint)", rgb: "70, 226, 176" },
  flare: { color: "var(--flare)", rgb: "255, 92, 56" },
};

export function accent(name) {
  return ACCENTS[name] ?? ACCENTS.amber;
}
