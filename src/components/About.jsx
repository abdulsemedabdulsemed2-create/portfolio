import { profile } from "../data/profile";

export default function About() {
  return (
    <section id="about" className="section">
      <h2 className="section__title">About Me</h2>
      <div className="about">
        <p>{profile.about}</p>
        <p className="about__location">📍 {profile.location}</p>
      </div>
    </section>
  );
}
