import SectionHeader from "../components/ui/SectionHeader";
import Reveal from "../components/ui/Reveal";
import { experienceByChannel } from "../data/experience";
import styles from "./Experience.module.css";

const work = experienceByChannel("work");
const education = experienceByChannel("education");
const leadership = experienceByChannel("leadership");

function PrimaryEntry({ entry }) {
  return (
    <article className={styles.primary}>
      <div className={styles.node}>
        <span className={styles.nodeDot} data-live={entry.current} />
        <span className={styles.nodeLine} />
      </div>
      <div className={styles.primaryBody}>
        <div className={styles.primaryHead}>
          <div>
            <h3 className={styles.role}>{entry.role}</h3>
            <p className={styles.org}>
              {entry.org}
              {entry.location && <span className={styles.loc}> · {entry.location}</span>}
            </p>
          </div>
          <span className={styles.period}>{entry.period}</span>
        </div>
        <p className={styles.summary}>{entry.summary}</p>
        <ul className={styles.points}>
          {entry.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        {entry.stack && (
          <ul className={styles.stack}>
            {entry.stack.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

function SecondaryEntry({ entry }) {
  return (
    <article className={styles.secondary}>
      <div className={styles.secHead}>
        <h4 className={styles.secRole}>{entry.role}</h4>
        {entry.current && <span className={styles.liveTag}>LIVE</span>}
      </div>
      <p className={styles.secOrg}>{entry.org}</p>
      <p className={styles.secPeriod}>{entry.period}</p>
      <p className={styles.secSummary}>{entry.summary}</p>
      <ul className={styles.secPoints}>
        {entry.points.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    </article>
  );
}

export default function Experience() {
  return (
    <div className="page">
      <SectionHeader index="02" eyebrow="Signal log" title="Where I've operated" />

      <div className={styles.track}>
        <div className={styles.trackLabel}>
          <span className={styles.channelTag}>CH-01</span>
          <span>Primary channel — work</span>
        </div>
        {work.map((e, i) => (
          <Reveal key={e.org} delay={i * 0.05}>
            <PrimaryEntry entry={e} />
          </Reveal>
        ))}
      </div>

      <div className={styles.secondaries}>
        <section className={styles.column}>
          <div className={styles.trackLabel}>
            <span className={styles.channelTag}>CH-02</span>
            <span>Education</span>
          </div>
          {education.map((e) => (
            <Reveal key={e.org}>
              <SecondaryEntry entry={e} />
            </Reveal>
          ))}
        </section>

        <section className={styles.column}>
          <div className={styles.trackLabel}>
            <span className={styles.channelTag}>CH-03</span>
            <span>Leadership</span>
          </div>
          {leadership.map((e) => (
            <Reveal key={e.org}>
              <SecondaryEntry entry={e} />
            </Reveal>
          ))}
        </section>
      </div>
    </div>
  );
}
