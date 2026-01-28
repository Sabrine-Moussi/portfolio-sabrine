// src/components/Projects.tsx
import React from "react";
import { FaCode, FaDatabase, FaChartBar } from "react-icons/fa";
import "./Projects.css";

type Project = {
  name: string;
  context: string;
  techs: string[];
  icon: "web" | "data" | "devops";
  description: string;
};

const projects: Project[] = [
  {
    name: "Projet e‑commerce",
    context: "Projet académique",
    icon: "web",
    techs: ["React.js", "Django"],
    description:
      "Développement d’une plateforme e‑commerce avec interface utilisateur moderne, gestion du catalogue produits et système d’authentification."
  },
  {
    name: "Gestion de Timesheets",
    context: "Projet académique",
    icon: "web",
    techs: ["React.js", "ASP.NET Core", "CI/CD"],
    description:
      "Application de gestion des temps pour les collaborateurs avec authentification, gestion de rôles et pipeline de déploiement continu."
  },
  {
    name: "Projet BI | SONEDBE",
    context: "Projet académique",
    icon: "data",
    techs: ["Talend", "Power BI"],
    description:
      "Mise en place d’un flux ETL et de tableaux de bord décisionnels pour le suivi et l’analyse des indicateurs de performance."
  },
  {
    name: "Projet DevOps (en cours)",
    context: "Projet académique",
    icon: "devops",
    techs: ["Docker", "Kubernetes", "GitLab CI/CD"],
    description:
      "Industrialisation du cycle de vie d’une application via conteneurisation, orchestration Kubernetes et pipelines GitLab CI/CD."
  }
];

const iconMap = {
  web: <FaCode />,
  data: <FaChartBar />,
  devops: <FaDatabase />
};

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="section projects-section">
      <div className="section-header">
        <h2>Projets académiques</h2>
        <p>Quelques projets qui reflètent mon intérêt pour le web, la data et le DevOps.</p>
      </div>

      <div className="projects-grid">
        {projects.map((p) => (
          <article key={p.name} className="project-card">
            <div className={`project-icon project-icon-${p.icon}`}>{iconMap[p.icon]}</div>
            <h3>{p.name}</h3>
            <p className="project-context">{p.context}</p>
            <p className="project-description">{p.description}</p>
            <div className="project-tags">
              {p.techs.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};