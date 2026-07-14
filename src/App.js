import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Lenis from "lenis";

import Nav from "./components/Nav";
import Cursor from "./components/Cursor";
import ScrollProgress from "./components/ScrollProgress";
import Hero from "./sections/Hero";
import Work from "./sections/Work";
import About from "./sections/About";
import Stack from "./sections/Stack";
import Contact from "./sections/Contact";
import ProjectBlog from "./components/pages/ProjectBlog";

import "./styles/site.css";

function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Work />
        <About />
        <Stack />
        <Contact />
      </main>
    </>
  );
}

export default function App() {
  const location = useLocation();

  useEffect(() => {
    const reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    // Lighter, more natural smoothing (less "long glide")
    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Start each page at the top when navigating between routes.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="app">
      <div className="grain" aria-hidden="true" />
      <ScrollProgress />
      <Cursor />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:slug" element={<ProjectBlog />} />
      </Routes>
    </div>
  );
}
