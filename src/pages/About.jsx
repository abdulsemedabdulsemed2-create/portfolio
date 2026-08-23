import SectionHeader from "../components/ui/SectionHeader";
import Reveal from "../components/ui/Reveal";
import ArrowLink from "../components/ui/ArrowLink";
import { profile } from "../data/profile";
import { skills } from "../data/skills";
import { socials } from "../data/socials";
import { useClock } from "../lib/hooks";
import styles from "./About.module.css";

function SkillBand({ band }) {
  return (
    <div className={styles.band}>
      <div className={styles.bandHead}>
        <span className={styles.bandName}>{band.band}</span>
        <span className={styles.bandLevel}>{band.level}%</span>
      </div>
      <div className={styles.meter}>
        <span className={styles.meterFill} style={{ width: `${band.level}%` }} />
      </div>
      <ul className={styles.bandItems}>
        {band.items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
}

export default function About() {
  const clock = useClock(profile.timezone);

  return (
    <div className="page">
      <SectionHeader index="03" eyebrow="Operator profile" title="About" accent="var(--azure)" />

      <div className={styles.top}>
        <div className={styles.bioCol}>
          <Reveal>
            <p className={styles.lede}>{profile.intro}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <p className={styles.bio}>{profile.bio}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className={styles.currently}>
              <span className={styles.currentlyTag}>// right now</span>
              {profile.currently}
            </p>
          </Reveal>
        </div>

        <aside className={styles.card}>
          <Field label="Name" value={profile.name} />
          <Field label="Based in" value={profile.location} />
          <Field label="Local time" value={`${clock} ${profile.tzLabel}`} mono />
          <Field label="Status" value={profile.availableLabel} accent={profile.available} />
          <div className={styles.field}>
            <span className={styles.fieldLabel}>Now learning</span>
            <ul className={styles.tags}>
              {profile.nowLearning.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <section className={styles.principles} aria-label="Operating principles">
        <span className={styles.blockLabel}>// operating principles</span>
        <ol className={styles.principleList}>
          {profile.principles.map((p, i) => (
            <Reveal as="li" key={p} delay={i * 0.04}>
              <span className={styles.principleNum}>0{i + 1}</span>
              <span className={styles.principleText}>{p}</span>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className={styles.skills} aria-label="Skills">
        <span className={styles.blockLabel}>// signal bands · capabilities</span>
        <div className={styles.bands}>
          {skills.map((b, i) => (
            <Reveal key={b.band} delay={i * 0.05}>
              <SkillBand band={b} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className={styles.connect}>
        <span className={styles.blockLabel}>// open channels</span>
        <div className={styles.channels}>
          {socials.map((s) => (
            <ArrowLink key={s.key} href={s.url} variant="ghost" className={styles.channel}>
              {s.label} <span className={styles.handle}>{s.handle}</span>
            </ArrowLink>
          ))}
        </div>
      </section>
    </div>
  );
}

function Field({ label, value, mono, accent }) {
  return (
    <div className={styles.field}>
      <span className={styles.fieldLabel}>{label}</span>
      <span
        className={styles.fieldValue}
        data-mono={mono || undefined}
        data-accent={accent || undefined}
      >
        {value}
      </span>
    </div>
  );
}
