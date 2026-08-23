import { useMemo } from "react";
import SectionHeader from "../components/ui/SectionHeader";
import Reveal from "../components/ui/Reveal";
import ProjectChannel from "../components/projects/ProjectChannel";
import { projects } from "../data/projects";
import styles from "./Projects.module.css";

export default function Projects() {
  const legend = useMemo(() => {
    const counts = {};
    for (const p of projects) counts[p.kind] = (counts[p.kind] || 0) + 1;
    return Object.entries(counts);
  }, []);

  return (
    <div className="page">
      <SectionHeader
        index="01"
        eyebrow={`Full index · ${projects.length} entries`}
        title="The patch bay"
      />

      <div className={styles.legend}>
        <span className={styles.legendLabel}>// filed under</span>
        <ul className={styles.legendList}>
          {legend.map(([kind, n]) => (
            <li key={kind}>
              {kind}
              <span className={styles.legendCount}>{n}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.channels}>
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={Math.min(i * 0.04, 0.2)}>
            <ProjectChannel project={p} index={i} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
