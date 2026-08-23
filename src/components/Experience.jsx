import { experience } from "../data/experience";

export default function Experience() {
  return (
    <section id="experience" className="section">
      <h2 className="section__title">Experience</h2>
      <div className="timeline">
        {experience.map((job, i) => (
          <div key={i} className="timeline__item">
            <div className="timeline__header">
              <h3 className="timeline__role">{job.role}</h3>
              <span className="timeline__company">{job.company}</span>
              <span className="timeline__period">{job.period}</span>
            </div>
            <ul className="timeline__points">
              {job.points.map((point, j) => (
                <li key={j}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
