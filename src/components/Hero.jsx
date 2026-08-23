import { profile } from "../data/profile";

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero__content">
        <p className="hero__eyebrow">Hi, my name is</p>
        <h1 className="hero__name">{profile.name}</h1>
        <h2 className="hero__role">{profile.role}</h2>
        <p className="hero__tagline">{profile.tagline}</p>
        <div className="hero__cta">
          <a href="#projects" className="btn btn--primary">
            View My Work
          </a>
          <a href="#contact" className="btn btn--ghost">
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
}
