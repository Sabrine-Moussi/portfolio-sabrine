// src/components/Hero.tsx
import React from "react";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";
import "./Hero.css";

export const Hero: React.FC = () => {
  return (
    <header className="hero">
      <div className="hero-left">
        <p className="hero-tag">Bonjour, je suis</p>
        <h1>Sabrine MOUSSI</h1>
        <h2>Élève Ingénieure en Génie Logiciel & Full‑Stack Developer</h2>
        <p className="hero-subtitle">
          Passionnée par la data engineering et le développement web. À la recherche
          d&apos;un stage de PFE pour mettre en pratique mes compétences en React, Node.js,
          Spring Boot, PostgreSQL & Data.
        </p>
        <div className="hero-actions">
                  <div className="hero-actions">
          {/* Drop-down CV */}
          <div className="dropdown">
            <button className="btn btn-primary dropdown-toggle">
              Télécharger mon CV
            </button>
            <div className="dropdown-menu">
              <a href="/cv-sabrine-fr.pdf" target="_blank" rel="noreferrer">
                CV Français (PDF)
              </a>
              <a href="/cv-sabrine-en.pdf" target="_blank" rel="noreferrer">
                CV Anglais (PDF)
              </a>
            </div>
          </div>

          {/* Drop-down Contact */}
          <div className="dropdown">
            <button className="btn btn-outline dropdown-toggle">
              Me contacter
            </button>
            <div className="dropdown-menu">
              <a href="mailto:sabrine.moussi@sesame.com.tn">
                Par e‑mail
              </a>
              <a
                href="https://www.linkedin.com/in/sabrine-moussi"
                target="_blank"
                rel="noreferrer"
              >
                Via LinkedIn
              </a>
            </div>
          </div>
        </div>
        </div>
        <div className="hero-links">
          <a href="mailto:sabrine.moussi@sesame.com.tn">
            <FaEnvelope /> E‑mail
          </a>
          <a href="https://www.linkedin.com/in/sabrine-moussi" target="_blank" rel="noreferrer">
            <FaLinkedin /> LinkedIn
          </a>
        </div>
      </div>
      <div className="hero-right">
        {/* Remplace par ta vraie photo */}
        <div className="hero-photo" />
        <div className="hero-badge">Data & Web</div>
      </div>
    </header>
  );
};