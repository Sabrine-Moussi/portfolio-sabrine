// src/components/Experience.tsx
import React from "react";
import "./Experience.css";

type ExperienceItem = {
  title: string;
  company: string;
  period: string;
  location?: string;
  type?: string;
  bullets: string[];
};

const proExperiences: ExperienceItem[] = [
  {
    title: "Freelance | Développement d’un site vitrine & espace de gestion",
    company: "AGORA CHAUSSURES",
    period: "Septembre 2025 – Aujourd’hui",
    bullets: [
      "Création d’un site vitrine pour la présentation des produits.",
      "Conception d’un espace de gestion interne pour le suivi des stocks et des commandes.",
      "Développement frontend avec React & TypeScript.",
      "Développement backend avec Node.js / Express & base de données PostgreSQL.",
      "Mise en place de l’hébergement & déploiement cloud de la solution."
    ]
  },
  {
    title: "Stagiaire | Plateforme d’analyse de données interactive (ML)",
    company: "ENSI",
    period: "Juin 2025 – Août 2025",
    bullets: [
      "Importation et manipulation de datasets génétiques multi‑formats.",
      "Nettoyage & exploration des données via des scripts Python exécutés sur la plateforme.",
      "Application de modèles de Machine Learning pour la détection de patterns génétiques.",
      "Génération automatique de dashboards interactifs à l’aide de Power BI.",
      "Technologies : Python, Pandas, Scikit‑learn, Power BI, REST API."
    ]
  },
  {
    title: "Full‑Stack Developer (Stage)",
    company: "Ms Consulting | Projet Cotunac (Backend & Frontend)",
    period: "Septembre 2024 – Février 2025",
    bullets: [
      "Création de l’architecture backend avec Spring Boot (API REST pour communication avec le frontend).",
      "Conception & intégration de la base de données PostgreSQL.",
      "Mise en place de mécanismes de sécurité avec authentification JWT.",
      "Réalisation de tests unitaires avec JUnit selon la méthodologie AAA.",
      "Développement de la partie frontend avec Angular."
    ]
  },
  {
    title: "Stagiaire | Projet météorologique (ML)",
    company: "DYNO",
    period: "Juin 2023 – Août 2023",
    bullets: [
      "Développement d’une application de prévisions météorologiques avec Machine Learning à long terme pour la Tunisie."
    ]
  },
  {
    title: "Stagiaire PFE | Solution décisionnelle",
    company: "IDYNO",
    period: "Février 2023 – Juin 2023",
    bullets: [
      "Conception d’une solution décisionnelle pour une application mobile AFCO.",
      "Développement d’un tableau de bord dynamique avec Talend, Pentaho Data Integration, PostgreSQL & Power BI."
    ]
  }
];

const academicExperiences: ExperienceItem[] = [
  {
    title: "Cycle Ingénieur en Informatique",
    company: "SESAME",
    period: "2023 – 2026",
    bullets: ["Spécialisation en Génie Logiciel & Big Data / Data Engineering."]
  },
  {
    title: "Licence en Big Data et Analyse de Données",
    company: "Université Centrale",
    period: "2020 – 2023",
    bullets: ["Focus sur la modélisation de données, l’analytique et la visualisation."]
  }
];

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="section">
      <div className="section-header">
        <h2>Expérience</h2>
        <p>Ce que j’ai construit et appris au fil de mon parcours.</p>
      </div>

      <div className="experience-columns">
        <div className="experience-column">
          <h3 className="column-title">Expérience professionnelle</h3>
          <div className="timeline">
            {proExperiences.map((exp, idx) => (
              <article key={idx} className="experience-card">
                <span className="experience-period">{exp.period}</span>
                <h4>{exp.title}</h4>
                <p className="experience-company">{exp.company}</p>
                <ul>
                  {exp.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>

        <div className="experience-column">
          <h3 className="column-title">Parcours académique</h3>
          <div className="timeline">
            {academicExperiences.map((exp, idx) => (
              <article key={idx} className="experience-card">
                <span className="experience-period">{exp.period}</span>
                <h4>{exp.title}</h4>
                <p className="experience-company">{exp.company}</p>
                <ul>
                  {exp.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};