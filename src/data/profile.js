// ─────────────────────────────────────────────────────────────
//  PERSONAL INFORMATION  (placeholder — replace with real resume)
//  The UI reads only from these fields; never edit component markup
//  to change content.
// ─────────────────────────────────────────────────────────────
export const profile = {
  name: "Alex Rivera",
  handle: "alex.rivera",
  // Rotating words used in the animated hero headline.
  roles: ["Software Engineer", "Systems Builder", "Interface Designer", "Problem Solver"],
  // Short status line near the name.
  status: "Building at the intersection of infrastructure & interface.",
  // Longer intro used on Home + About.
  intro:
    "I'm a software engineer who likes the hard, unglamorous parts — the data model " +
    "that makes everything else simple, the render loop that stays smooth, the API that " +
    "never surprises you. I build products end to end and care a lot about how they feel.",
  // A more personal paragraph for the About page.
  bio:
    "I started programming because I wanted to make things move on a screen, and I never " +
    "really stopped. Somewhere along the way I fell for the layer underneath — schedulers, " +
    "sync engines, the quiet machinery that has to be correct so the surface can feel effortless. " +
    "Today I move comfortably between a distributed backend and a hand-tuned animation curve.",

  location: "San Francisco, CA",
  timezone: "America/Los_Angeles",
  tzLabel: "PST",
  available: true,
  availableLabel: "Open to Summer 2026 internships",
  email: "hello@alexrivera.dev",
  resumeUrl: "/resume.pdf", // drop the real PDF into /public later

  // Numbers surfaced as animated stats. Keep them honest.
  stats: [
    { value: 12, suffix: "+", label: "Projects shipped" },
    { value: 4, suffix: "", label: "Languages in production" },
    { value: 1, suffix: "", label: "Internship (so far)" },
    { value: 40, suffix: "K", label: "Lines of code this year" },
  ],

  // About-page fuel.
  nowLearning: ["Rust", "Distributed systems", "WebGPU", "Type theory"],
  currently:
    "Prototyping a local-first sync engine and reading everything I can about CRDTs.",
  // Short "operating principles" — shown as an editorial list on About.
  principles: [
    "Make the correct thing the easy thing.",
    "Latency is a feature. Guard it like one.",
    "The data model is the product.",
    "Ship the boring version, then earn the clever one.",
  ],
};
