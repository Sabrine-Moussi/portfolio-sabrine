// src/components/Skills.tsx
import React from "react";
import "./Skills.css";

type SkillCategory = {
  title: string;
  skills: string[];
};

const backend: SkillCategory = {
  title: "Backend & APIs",
  skills: ["Spring Boot", "Node.js", "Express.js", "ASP.NET Core", "Django"]
};

const frontend: SkillCategory = {
  title: "Frontend & Web",
  skills: ["React.js", "Angular", "TypeScript", "JavaScript", "HTML5", "CSS3"]
};

const databases: SkillCategory = {
  title: "Bases de données",
  skills: ["PostgreSQL", "MySQL", "SQL Server", "NoSQL", "MongoDB", "Neo4j"]
};

const data: SkillCategory = {
  title: "Data & BI",
  skills: ["Power BI", "Talend", "Pentaho Data Integration", "Pandas", "Scikit‑learn"]
};

const devops: SkillCategory = {
  title: "DevOps & Outils",
  skills: ["Docker", "Kubernetes", "GitLab CI/CD", "Git", "Postman"]
};

const categories = [frontend, backend, databases, data, devops];

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="section skills-section">
      <div className="section-header">
        <h2>Compétences techniques</h2>
        <p>Les technologies avec lesquelles je suis à l’aise au quotidien.</p>
      </div>

      <div className="skills-grid">
        {categories.map((cat) => (
          <article key={cat.title} className="skills-card">
            <h3>{cat.title}</h3>
            <div className="skills-tags">
              {cat.skills.map((skill) => (
                <span key={skill} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};