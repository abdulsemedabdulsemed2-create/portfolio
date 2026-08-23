import Hero from "../components/home/Hero";
import StatsStrip from "../components/home/StatsStrip";
import SectionHeader from "../components/ui/SectionHeader";
import Marquee from "../components/ui/Marquee";
import Reveal from "../components/ui/Reveal";
import ArrowLink from "../components/ui/ArrowLink";
import ProjectChannel from "../components/projects/ProjectChannel";
import { featuredProjects } from "../data/projects";
import { skills } from "../data/skills";
import { profile } from "../data/profile";
import styles from "./Home.module.css";

const tickerItems = skills.flatMap((s) => s.items);

export default function Home() {
  return (
    <div className={styles.home}>
      <div className="page">
        <Hero />
      </div>

      <section className={`page ${styles.block}`} aria-label="Stats">
        <StatsStrip />
      </section>

      <div className={styles.ticker}>
        <Marquee items={tickerItems} />
      </div>

      <section className={`page ${styles.block}`} aria-labelledby="featured">
        <div id="featured">
          <SectionHeader
            index="01"
            eyebrow="Selected signals"
            title="Projects worth transmitting"
            action="Open full index"
            actionTo="/projects"
          />
        </div>
        <div className={styles.channels}>
          {featuredProjects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.05}>
              <ProjectChannel project={p} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className={`page ${styles.block} ${styles.outro}`}>
        <Reveal>
          <p className={styles.outroLabel}>// transmission</p>
          <p className={styles.outroText}>
            One internship, a stack of side projects, and a stubborn habit of
            rebuilding things from scratch to understand them.{" "}
            <span className={styles.outroDim}>
              Here&apos;s where I&apos;ve been and where I&apos;m headed.
            </span>
          </p>
          <div className={styles.outroLinks}>
            <ArrowLink to="/experience" variant="ghost">
              Experience log
            </ArrowLink>
            <ArrowLink to="/about" variant="ghost">
              About {profile.name.split(" ")[0]}
            </ArrowLink>
            <ArrowLink to="/resume" variant="ghost">
              Resume
            </ArrowLink>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
