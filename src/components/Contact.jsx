import { profile } from "../data/profile";

export default function Contact() {
  return (
    <section id="contact" className="section section--center">
      <h2 className="section__title">Get In Touch</h2>
      <p className="contact__text">
        I'm open to new opportunities and collaborations. Feel free to reach out!
      </p>
      <a href={`mailto:${profile.email}`} className="btn btn--primary">
        Say Hello
      </a>
      <div className="contact__socials">
        <a href={profile.socials.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href={profile.socials.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
      </div>
    </section>
  );
}
