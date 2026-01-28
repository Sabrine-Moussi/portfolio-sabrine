// src/components/About/About.tsx
import React from "react";
import "./About.css";

export const About: React.FC = () => {
  return (
    <section id="about" className="section about-section">
      <div className="about-inner">
        <div className="about-text">
          <h2>À propos de moi</h2>
          <p className="about-intro">
            Élève ingénieure en Génie Logiciel à SESAME, je suis passionnée par la
            data engineering et le développement full‑stack. Je recherche un stage
            de PFE qui me permette d&apos;appliquer mes compétences techniques dans un
            environnement stimulant.
          </p>
          <p>
            J&apos;ai eu l&apos;occasion de travailler sur des projets variés : applications
            web avec React, Angular et Spring Boot, solutions décisionnelles avec
            Power BI, Talend et Pentaho, ainsi que des projets de Machine Learning
            pour l&apos;analyse de données. Ces expériences m&apos;ont appris à concevoir
            des solutions complètes, du backend à la visualisation.
          </p>
          <p>
            Curieuse, rigoureuse et organisée, j&apos;apprécie particulièrement les équipes
            où l&apos;on partage les connaissances, on prend soin de la qualité du code
            et on reste à l&apos;écoute des besoins métiers.
          </p>
          <div className="about-highlights">
            <div>
              <span className="label">Domaines clés</span>
              <p>Web Full‑Stack, Data Engineering, BI & Analytics</p>
            </div>
            <div>
              <span className="label">Ce que je recherche</span>
              <p>Stage PFE en Data / Web, avec encadrement technique et impact réel</p>
            </div>
          </div>
        </div>

        <div className="about-aside">
          <div className="about-card">
            <h3>En quelques mots</h3>
            <ul>
              <li>🎓 Cycle Ingénieur en Informatique – SESAME</li>
              <li>📊 Licence en Big Data & Analyse de Données – Université Centrale</li>
              <li>💻 Expérience en React, Node.js, Spring Boot, PostgreSQL, Power BI</li>
              <li>🤝 Esprit d&apos;équipe, autonomie, sens du détail</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};