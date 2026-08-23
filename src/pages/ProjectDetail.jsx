import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { projects, getProject } from "../data/projects";
import { accent as accentOf } from "../lib/accents";
import ProjectGlyph from "../components/signal/ProjectGlyph";
import ArrowLink from "../components/ui/ArrowLink";
import Reveal from "../components/ui/Reveal";
import styles from "./ProjectDetail.module.css";

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = getProject(slug);

  useEffect(() => {
    if (!project) navigate("/projects", { replace: true });
  }, [project, navigate]);

  if (!project) return null;

  const a = accentOf(project.accent);
  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];
  const prev = projects[(idx - 1 + projects.length) % projects.length];

  const sections = [
    { label: "The problem", body: project.problem },
    { label: "The approach", body: project.approach },
    { label: "The outcome", body: project.outcome },
  ].filter((s) => s.body);

  return (
    <article
      className="page"
      style={{ "--acc": a.color, "--acc-rgb": a.rgb }}
    >
      <Link to="/projects" viewTransition className={styles.back}>
        ← Back to index
      </Link>

      <header className={styles.header}>
        <div className={styles.headMeta}>
          <span className={styles.idx}>
            {String(idx + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
          <span className={styles.kind}>{project.kind}</span>
          <span className={styles.status} data-status={project.status}>
            {project.status}
          </span>
        </div>

        <h1
          className={styles.title}
          style={{ viewTransitionName: `title-${project.slug}` }}
        >
          {project.name}
        </h1>
        <p className={styles.tagline}>{project.tagline}</p>

        <div
          className={styles.visual}
          style={{ viewTransitionName: `glyph-${project.slug}` }}
        >
          <ProjectGlyph seed={project.seed} accent={project.accent} />
        </div>
      </header>

      <div className={styles.specs}>
        <Spec label="Role" value={project.role} />
        <Spec label="Year" value={project.year} />
        <Spec label="Status" value={project.status} />
        {project.metrics?.map((m) => (
          <Spec key={m.label} label={m.label} value={m.value} accent />
        ))}
      </div>

      <div className={styles.layout}>
        <div className={styles.main}>
          <Reveal>
            <p className={styles.lede}>{project.blurb}</p>
          </Reveal>
          {sections.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.05}>
              <section className={styles.section}>
                <h2 className={styles.sectionLabel}>
                  <span className={styles.sectionNum}>0{i + 1}</span>
                  {s.label}
                </h2>
                <p className={styles.sectionBody}>{s.body}</p>
              </section>
            </Reveal>
          ))}
        </div>

        <aside className={styles.aside}>
          {project.highlights?.length > 0 && (
            <div className={styles.panel}>
              <span className={styles.panelHead}>Highlights</span>
              <ul className={styles.highlights}>
                {project.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          )}
          <div className={styles.panel}>
            <span className={styles.panelHead}>Stack</span>
            <ul className={styles.stack}>
              {project.stack.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          {project.links && (
            <div className={styles.links}>
              {project.links.live && (
                <ArrowLink href={project.links.live} variant="solid">
                  Live
                </ArrowLink>
              )}
              {project.links.source && (
                <ArrowLink href={project.links.source} variant="ghost">
                  Source
                </ArrowLink>
              )}
              {project.links.writeup && (
                <ArrowLink href={project.links.writeup} variant="ghost">
                  Write-up
                </ArrowLink>
              )}
            </div>
          )}
        </aside>
      </div>

      <nav className={styles.pager} aria-label="Project navigation">
        <Link to={`/projects/${prev.slug}`} viewTransition className={styles.pagerItem}>
          <span className={styles.pagerDir}>← Prev</span>
          <span className={styles.pagerName}>{prev.name}</span>
        </Link>
        <Link
          to={`/projects/${next.slug}`}
          viewTransition
          className={`${styles.pagerItem} ${styles.pagerNext}`}
        >
          <span className={styles.pagerDir}>Next →</span>
          <span className={styles.pagerName}>{next.name}</span>
        </Link>
      </nav>
    </article>
  );
}

function Spec({ label, value, accent }) {
  return (
    <div className={styles.spec}>
      <span className={styles.specLabel}>{label}</span>
      <span className={accent ? styles.specValueAcc : styles.specValue}>
        {value}
      </span>
    </div>
  );
}
