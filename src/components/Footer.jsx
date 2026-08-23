import { profile } from "../data/profile";

export default function Footer() {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} {profile.name}. Built with React & Vite.
      </p>
    </footer>
  );
}
