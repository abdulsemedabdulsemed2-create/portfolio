import SectionHeader from "../components/ui/SectionHeader";
import ArrowLink from "../components/ui/ArrowLink";
import { profile } from "../data/profile";
import { experience } from "../data/experience";
import { skills } from "../data/skills";
import { projects } from "../data/projects";
import { socials } from "../data/socials";
import styles from "./Resume.module.css";

const roleTitle = profile.roles[0];

export default function Resume() {
  return (
    <div className="page">
      <SectionHeader index="04" eyebrow="Printable record" title="Resume" />

      <div className={styles.actions}>
        <ArrowLink href={profile.resumeUrl} variant="solid">
          Download PDF
        </ArrowLink>
        <ArrowLink href={`mailto:${profile.email}`} variant="ghost">
          Email me
        </ArrowLink>
      </div>

      <article className={styles.sheet}>
        <header className={styles.docHead}>
          <div>
            <h2 className={styles.docName}>{profile.name}</h2>
            <p className={styles.docRole}>{roleTitle}</p>
          </div>
          <ul className={styles.contact}>
            <li>{profile.location}</li>
            <li>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </li>
            {socials
              .filter((s) => s.key !== "email")
              .map((s) => (
                <li key={s.key}>
                  <a href={s.url} target="_blank" rel="noreferrer noopener">
                    {s.handle}
                  </a>
                </li>
              ))}
          </ul>
        </header>

        <Block title="Experience">
          {experience.map((e) => (
            <div className={styles.row} key={e.org + e.role}>
              <div className={styles.rowMeta}>
                <span className={styles.period}>{e.period}</span>
                <span className={styles.channel}>{e.channel}</span>
              </div>
              <div className={styles.rowBody}>
                <h4 className={styles.rowRole}>
                  {e.role} <span className={styles.at}>· {e.org}</span>
                </h4>
                <ul className={styles.bullets}>
                  {e.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </Block>

        <Block title="Selected projects">
          {projects.slice(0, 4).map((p) => (
            <div className={styles.row} key={p.slug}>
              <div className={styles.rowMeta}>
                <span className={styles.period}>{p.year}</span>
                <span className={styles.channel}>{p.kind}</span>
              </div>
              <div className={styles.rowBody}>
                <h4 className={styles.rowRole}>{p.name}</h4>
                <p className={styles.projBlurb}>{p.blurb}</p>
                <p className={styles.projStack}>{p.stack.join(" · ")}</p>
              </div>
            </div>
          ))}
        </Block>

        <Block title="Skills">
          <ul className={styles.skillGrid}>
            {skills.map((b) => (
              <li key={b.band}>
                <span className={styles.skillBand}>{b.band}</span>
                <span className={styles.skillItems}>{b.items.join(", ")}</span>
              </li>
            ))}
          </ul>
        </Block>
      </article>
    </div>
  );
}

function Block({ title, children }) {
  return (
    <section className={styles.block}>
      <h3 className={styles.blockTitle}>{title}</h3>
      <div className={styles.blockBody}>{children}</div>
    </section>
  );
}
