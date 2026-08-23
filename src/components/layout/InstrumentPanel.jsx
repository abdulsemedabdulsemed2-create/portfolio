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

// Desktop: fixed vertical rail + top coordinate bar.
// Mobile: top bar + slide-in drawer.
export default function InstrumentPanel() {
  const isMobile = useMediaQuery("(max-width: 900px)");
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const active = nav.find(
    (n) =>
      n.to === location.pathname ||
      (n.to !== "/" && location.pathname.startsWith(n.to)),
  );

  return (
    <>
      {/* Top coordinate bar */}
      <header className={styles.topbar}>
        <div className={styles.crumb}>
          <span className={styles.crumbMark}>◆</span>
          <span className={styles.crumbPath}>
            SIGNAL<span className={styles.slash}>/</span>
            <span className={styles.crumbActive}>
              {active ? active.label : "404"}
            </span>
          </span>
        </div>
        <div className={styles.coords} aria-hidden="true">
          <span>{site.coords.lat}</span>
          <span className={styles.dim}>{site.coords.lon}</span>
          <span className={styles.dim}>{profile.location}</span>
        </div>
      </header>

      {!isMobile && (
        <nav className={styles.rail} aria-label="Primary">
          <NavLink to="/" className={styles.wordmark} viewTransition>
            {site.wordmark}
          </NavLink>

          <ul className={styles.railNav}>
            {nav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  viewTransition
                  className={({ isActive }) =>
                    cn(styles.railLink, isActive && styles.railLinkActive)
                  }
                >
                  <span className={styles.railIndex}>{item.id}</span>
                  <span className={styles.railLabel}>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          <div className={styles.railFoot}>
            <span className={styles.led} data-on={profile.available} aria-hidden="true" />
          </div>
        </nav>
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
