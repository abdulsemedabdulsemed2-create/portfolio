import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { nav, site } from "../../data/site";
import { profile } from "../../data/profile";
import { useClock, useMediaQuery } from "../../lib/hooks";
import { cn } from "../../lib/cn";
import styles from "./InstrumentPanel.module.css";

function StatusReadout() {
  const clock = useClock(profile.timezone);
  return (
    <div className={styles.readout}>
      <span className={styles.led} data-on={profile.available} aria-hidden="true" />
      <span className={styles.readoutText}>
        {profile.available ? "OPEN TO WORK" : "HEADS DOWN"}
      </span>
      <time className={styles.clock}>
        {clock} {profile.tzLabel}
      </time>
    </div>
  );
}

// Desktop: a single top navigation bar (wordmark · links · status).
// Mobile: top bar + slide-in drawer.
export default function InstrumentPanel() {
  const isMobile = useMediaQuery("(max-width: 900px)");
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const clock = useClock(profile.timezone);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {!isMobile && (
        <header className={styles.header}>
          <NavLink to="/" className={styles.wordmark} viewTransition>
            {site.wordmark}
          </NavLink>

          <nav className={styles.nav} aria-label="Primary">
            <ul className={styles.navList}>
              {nav.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === "/"}
                    viewTransition
                    className={({ isActive }) =>
                      cn(styles.navLink, isActive && styles.navLinkActive)
                    }
                  >
                    <span className={styles.navIndex}>{item.id}</span>
                    <span className={styles.navLabel}>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.status}>
            <span className={styles.led} data-on={profile.available} aria-hidden="true" />
            <span className={styles.statusText}>
              {profile.available ? "OPEN TO WORK" : "HEADS DOWN"}
            </span>
            <time className={styles.clock}>
              {clock} {profile.tzLabel}
            </time>
          </div>
        </header>
      )}

      {isMobile && (
        <>
          <div className={styles.mobileBar}>
            <NavLink to="/" className={styles.mobileMark} viewTransition>
              {site.wordmark}
            </NavLink>
            <StatusReadout />
            <button
              className={styles.burger}
              aria-expanded={open}
              aria-controls="mobile-drawer"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span data-open={open} />
              <span data-open={open} />
            </button>
          </div>

          <div
            id="mobile-drawer"
            className={cn(styles.drawer, open && styles.drawerOpen)}
            hidden={!open}
          >
            <ul className={styles.drawerNav}>
              {nav.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === "/"}
                    viewTransition
                    className={({ isActive }) =>
                      cn(styles.drawerLink, isActive && styles.drawerLinkActive)
                    }
                  >
                    <span className={styles.drawerIndex}>{item.id}</span>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
}
