// ─────────────────────────────────────────────────────────────
//  PROJECTS  (placeholder — replace with your real work)
//  Projects are the visual centerpiece. Each one drives a unique
//  procedural "signal glyph" via `seed`, so give every project a
//  distinct integer seed. `accent` picks the trace color.
//
//  Fields:
//   slug       url segment for /projects/:slug
//   name       display title
//   tagline    one line, shown large
//   year       string
//   role       your role
//   kind       short category label (e.g. "Systems", "Web", "Tooling")
//   status     "Live" | "Shipped" | "Archived" | "WIP"
//   stack      tech array (rendered as instrument readouts)
//   seed       integer — drives the generative graphic (make unique)
//   accent     "amber" | "azure" | "mint" | "flare"
//   featured   surfaced on the home page
//   blurb      2–3 sentence summary
//   problem/approach/outcome  case-study sections (ProjectDetail)
//   highlights bullet points on the detail page
//   metrics    [{ label, value }] instrument readouts
//   links      { live, source, writeup } — omit any that don't apply
// ─────────────────────────────────────────────────────────────
export const projects = [
  {
    slug: "driftsync",
    name: "DriftSync",
    tagline: "A local-first sync engine that never loses your edits.",
    year: "2025",
    role: "Creator · Solo",
    kind: "Systems",
    status: "WIP",
    stack: ["Rust", "CRDT", "WebAssembly", "IndexedDB", "TypeScript"],
    seed: 1471,
    accent: "amber",
    featured: true,
    blurb:
      "An offline-first data layer built on conflict-free replicated data types. Edits merge deterministically across devices with no central lock, and the whole engine ships to the browser as a 90KB Wasm module.",
    problem:
      "Collaborative apps break the moment the network does. Most reach for a server as the single source of truth, which means every keystroke is one round-trip away from being lost.",
    approach:
      "I modeled the document as a set of CRDTs so any two replicas converge without coordination, then compiled the core to WebAssembly and wired it to a compact binary log persisted in IndexedDB.",
    outcome:
      "Edits apply in under a millisecond locally and reconcile automatically when a peer reconnects — no spinners, no lost work, no merge dialogs.",
    highlights: [
      "Deterministic merge across N replicas with causal ordering",
      "90KB Wasm core, zero runtime dependencies",
      "Binary op-log with compaction; survives hard refresh mid-edit",
      "Pluggable transport — WebSocket, WebRTC, or plain fetch",
    ],
    metrics: [
      { label: "Local apply", value: "0.8ms" },
      { label: "Wasm size", value: "90KB" },
      { label: "Merge", value: "O(n)" },
    ],
    links: { source: "https://github.com/alexrivera/driftsync" },
  },
  {
    slug: "oscilliscope",
    name: "Oscilliscope",
    tagline: "Real-time telemetry for systems that can't stop to be watched.",
    year: "2024",
    role: "Lead Engineer",
    kind: "Observability",
    status: "Live",
    stack: ["Go", "Grafana", "ClickHouse", "gRPC", "React"],
    seed: 8802,
    accent: "azure",
    featured: true,
    blurb:
      "A high-cardinality metrics pipeline that ingests two million events a second and renders them live. Built to answer 'what is happening right now' without sampling the truth away.",
    problem:
      "Existing dashboards aggregated away exactly the outliers we needed. When latency spiked, the p99 was already smoothed into a lie.",
    approach:
      "I built a columnar ingestion path in Go feeding ClickHouse, with a streaming query layer over gRPC that pushes deltas to the browser instead of re-polling.",
    outcome:
      "On-call engineers see anomalies within 200ms of them happening, at full resolution, across thousands of services.",
    highlights: [
      "2M events/sec sustained ingestion on 3 nodes",
      "Streaming deltas over gRPC — no dashboard re-polling",
      "Exemplar tracing links a spike straight to the request",
      "Sub-second queries over 30 days of raw events",
    ],
    metrics: [
      { label: "Ingest", value: "2M/s" },
      { label: "Freshness", value: "200ms" },
      { label: "Retention", value: "30d raw" },
    ],
    links: {
      live: "https://example.com/oscilliscope",
      source: "https://github.com/alexrivera/oscilliscope",
    },
  },
  {
    slug: "latch",
    name: "Latch",
    tagline: "A build cache that makes the second build feel like a typo fix.",
    year: "2024",
    role: "Creator · Solo",
    kind: "Tooling",
    status: "Shipped",
    stack: ["Rust", "Content-addressing", "S3", "CLI"],
    seed: 3310,
    accent: "mint",
    featured: true,
    blurb:
      "A content-addressed build cache that fingerprints inputs and skips work that's already been done — locally or shared across a team's CI.",
    problem:
      "CI was rebuilding artifacts that hadn't changed, burning minutes and money on every push.",
    approach:
      "Latch hashes the full input closure of each build step and stores outputs in a content-addressed store backed by S3, so identical inputs anywhere hit the cache.",
    outcome:
      "Median CI time dropped from 9 minutes to under 2, and warm local builds became effectively instant.",
    highlights: [
      "Content-addressed store with remote + local tiers",
      "Deterministic input hashing across machines",
      "Drop-in wrapper — no build-system rewrite",
      "78% cache hit rate in steady state",
    ],
    metrics: [
      { label: "CI time", value: "-78%" },
      { label: "Hit rate", value: "78%" },
      { label: "Warm build", value: "<1s" },
    ],
    links: { source: "https://github.com/alexrivera/latch" },
  },
  {
    slug: "prism",
    name: "Prism",
    tagline: "A WebGPU playground for shaders you can feel.",
    year: "2023",
    role: "Creator · Solo",
    kind: "Graphics",
    status: "Live",
    stack: ["WebGPU", "WGSL", "TypeScript", "Vite"],
    seed: 6127,
    accent: "flare",
    featured: false,
    blurb:
      "A browser-based shader editor with hot reload and a node graph, built to make GPU programming approachable without hiding what the hardware is actually doing.",
    problem:
      "Learning shader programming means fighting boilerplate before you ever see a pixel move.",
    approach:
      "Prism wraps WebGPU in a live-reloading editor with a visual node graph, compiling WGSL on every keystroke and surfacing GPU timings inline.",
    outcome:
      "You can go from blank canvas to a working raymarch in a few minutes, watching frame cost update as you type.",
    highlights: [
      "Live WGSL compile on every keystroke",
      "Inline GPU timing per pass",
      "Shareable permalinks encode the full graph",
    ],
    metrics: [
      { label: "Compile", value: "hot" },
      { label: "Target", value: "60fps" },
    ],
    links: {
      live: "https://example.com/prism",
      source: "https://github.com/alexrivera/prism",
    },
  },
  {
    slug: "quorum",
    name: "Quorum",
    tagline: "Raft, implemented so you can actually read it.",
    year: "2023",
    role: "Creator · Solo",
    kind: "Systems",
    status: "Archived",
    stack: ["Go", "Raft", "gRPC"],
    seed: 2049,
    accent: "azure",
    featured: false,
    blurb:
      "A from-scratch implementation of the Raft consensus protocol with a visual inspector that lets you step through elections and log replication one message at a time.",
    problem:
      "Consensus is famously hard to internalize from the paper alone.",
    approach:
      "I implemented Raft cleanly in Go and paired it with a time-travel debugger that visualizes every RPC, term change, and commit.",
    outcome:
      "It became a teaching tool — you can inject partitions and watch the cluster heal itself.",
    highlights: [
      "Leader election, log replication, and snapshotting",
      "Deterministic simulation harness for fault injection",
      "Step-through visual inspector",
    ],
    metrics: [
      { label: "Protocol", value: "Raft" },
      { label: "Tests", value: "sim" },
    ],
    links: { source: "https://github.com/alexrivera/quorum" },
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const getProject = (slug) => projects.find((p) => p.slug === slug);
