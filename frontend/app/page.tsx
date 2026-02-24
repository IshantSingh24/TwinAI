import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import ChatWidget from "./components/ChatWidget";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <footer className="footer">
        <p>
          Designed &amp; built by{" "}
          <span className="footer-accent">Ishant Singh</span> — 2026
        </p>
      </footer>
      <ChatWidget />
    </main>
  );
}
