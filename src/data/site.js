// ─────────────────────────────────────────────────────────────
//  SITE — navigation + global meta
//  Nav order also defines the "channel index" shown in the rail.
// ─────────────────────────────────────────────────────────────
export const site = {
  title: "SIGNAL",
  wordmark: "SIGNAL",
  tagline: "Software Engineer & Systems Builder",
  // Used by the top coordinate bar; purely decorative "instrument" flavor.
  coords: { lat: "37.7749°N", lon: "122.4194°W" },
};

export const nav = [
  { id: "00", label: "Home", to: "/" },
  { id: "01", label: "Projects", to: "/projects" },
  { id: "02", label: "Experience", to: "/experience" },
  { id: "03", label: "About", to: "/about" },
  { id: "04", label: "Resume", to: "/resume" },
];
