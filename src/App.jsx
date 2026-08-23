import { Routes, Route, useLocation } from "react-router-dom";
import { useLayoutEffect } from "react";
import { useLenis } from "./lib/useLenis";
import InstrumentPanel from "./components/layout/InstrumentPanel";
import Footer from "./components/layout/Footer";
import SignalField from "./components/signal/SignalField";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Experience from "./pages/Experience";
import About from "./pages/About";
import Resume from "./pages/Resume";
import NotFound from "./pages/NotFound";

function ScrollToTop() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  useLenis();

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollToTop />
      <SignalField />
      <InstrumentPanel />
      <div className="shell">
        <main id="main" className="shell__main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/about" element={<About />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}
