// src/App.tsx
import React from "react";
import { Navbar } from "./components/Navbar/Navbar";
import { Hero } from "./components/Hero/Hero";
import { About } from "./components/About/About";
import { Experience } from "./components/Experience/Experience";
import { Projects } from "./components/Projects/Projects";
import { Skills } from "./components/Skills/Skills";
import { Contact } from "./components/Contact/Contact";
import { Certifications } from "./components/Certifications/Certifications";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="app">
      <Navbar />

      <main>
        {/* Assure-toi que chaque composant retourne bien une <section id="..."> */}
        <Hero />        {/* section id="hero" */}
        <About />       {/* section id="about" */}
        <Experience />  {/* section id="experience" */}
        <Projects />    {/* section id="projects" */}
        <Skills />      {/* section id="skills" */}
        <Certifications /> {/* section id="certifications" */}
        <Contact />     {/* section id="contact" */}
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Sabrine Moussi — Portfolio.</p>
      </footer>
    </div>
  );
};

export default App;