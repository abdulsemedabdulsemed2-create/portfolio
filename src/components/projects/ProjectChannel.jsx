import { Link } from "react-router-dom";
import ProjectGlyph from "../signal/ProjectGlyph";
import { accent as accentOf } from "../../lib/accents";
import styles from "./ProjectChannel.module.css";

// A full-width interactive "channel" row for one project.
// Reused on Home (featured) and the Projects gallery. Links to the
// case-study detail with a native view transition on the glyph/title.
export default function ProjectChannel({ project, index }) {
  const a = accentOf(project.accent);
  const idx = String(index + 1).padStart(2, "0");

  return (
    <Link
      to={`/projects/${project.slug}`}
      viewTransition
      className={styles.channel}
      style={{ "--acc": a.color, "--acc-rgb": a.rgb }}
    >
      <div className={styles.grid}>
        <div className={styles.meta}>
          <span className={styles.index}>{idx}</span>
          <span className={styles.kind}>{project.kind}</span>
          <span className={styles.status} data-status={project.status}>
            {project.status}
          </span>
        </div>

        <div className={styles.body}>
          <h3
            className={styles.title}
            style={{ viewTransitionName: `title-${project.slug}` }}
          >
            {project.name}
          </h3>
          <p className={styles.tagline}>{project.tagline}</p>
          <ul className={styles.stack}>
            {project.stack.slice(0, 5).map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        <div
          className={styles.vis}
          style={{ viewTransitionName: `glyph-${project.slug}` }}
        >
          <ProjectGlyph seed={project.seed} accent={project.accent} />
          <span className={styles.year}>{project.year}</span>
        </div>

        <span className={styles.go} aria-hidden="true">
          →
        </span>
      </div>
      <span className={styles.rule} aria-hidden="true" />
    </Link>
  );
}
