// ─────────────────────────────────────────────────────────────
//  EXPERIENCE  (placeholder — replace with real roles)
//  Designed to read well even with a single internship. `channel`
//  categorizes entries into tracks: "work" is the primary signal,
//  "education" and "leadership" are secondary tracks.
//
//  Fields:
//   channel   "work" | "education" | "leadership"
//   role      title
//   org       company / school / group
//   period    display string
//   start/end sortable ISO-ish strings (for ordering)
//   location  optional
//   summary   one line
//   points    bullet achievements
//   stack     optional tech array
//   current   optional boolean (renders a "live" indicator)
// ─────────────────────────────────────────────────────────────
export const experience = [
  {
    channel: "work",
    role: "Software Engineer Intern",
    org: "Northwind Systems",
    period: "Jun 2025 — Sep 2025",
    start: "2025-06",
    end: "2025-09",
    location: "Seattle, WA",
    summary:
      "Owned a latency-critical slice of the platform's real-time data pipeline.",
    points: [
      "Rebuilt the event fan-out service in Go, cutting p99 delivery latency from 340ms to 90ms under peak load.",
      "Designed and shipped a backpressure protocol that kept the pipeline stable during a 5x traffic spike with zero dropped events.",
      "Added exemplar tracing that let on-call engineers jump from a latency graph to the exact slow request.",
      "Wrote the load-testing harness now used to gate every release of the service.",
    ],
    stack: ["Go", "Kafka", "gRPC", "Kubernetes", "Prometheus"],
  },
  {
    channel: "education",
    role: "B.S. Computer Science",
    org: "University of California, Berkeley",
    period: "2022 — 2026 (expected)",
    start: "2022-08",
    end: "2026-05",
    location: "Berkeley, CA",
    summary: "Focus in distributed systems and programming languages.",
    points: [
      "Coursework: Operating Systems, Distributed Computing, Compilers, Databases, Computer Graphics.",
      "Undergraduate reader for the systems programming course (2 semesters).",
    ],
    stack: ["C", "Rust", "Go", "SQL"],
    current: true,
  },
  {
    channel: "leadership",
    role: "Founder & Lead",
    org: "Systems Reading Group",
    period: "2023 — Present",
    start: "2023-01",
    end: "",
    location: "Berkeley, CA",
    summary:
      "Run a weekly group working through foundational systems papers and building the ideas.",
    points: [
      "Grew a weekly session from 4 to 30+ regulars across two years.",
      "Led implementations of Raft, LSM-trees, and a toy CRDT library as a group.",
    ],
    current: true,
  },
];

export const experienceByChannel = (channel) =>
  experience.filter((e) => e.channel === channel);
