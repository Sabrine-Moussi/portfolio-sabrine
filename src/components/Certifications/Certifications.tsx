// src/components/Certifications/Certifications.tsx
import React from "react";
import "./Certifications.css";

type Certification = {
  title: string;
  provider: string;
  period: string;
  type: "data" | "cloud" | "dev";
};

const certifications: Certification[] = [
  {
    title: "Data-Analytics",
    provider: "CERTIPORT",
    period: "Mars 2024",
    type: "data"
  },
  {
    title: "Cloud Foundations",
    provider: "AWS Academy",
    period: "Octobre 2025",
    type: "cloud"
  },
  {
    title: "Python",
    provider: "CERTIPORT",
    period: "Décembre 2025",
    type: "dev"
  },
  {
    title: "Formation Java OCA",
    provider: "SIP ACADEMY",
    period: "Décembre 2025 – Aujourd'hui",
    type: "dev"
  }
];

export const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="section certifications-section">
      <div className="section-header">
        <h2>Certification Académique</h2>
        <p>Les certifications qui renforcent mon profil en data, cloud et développement.</p>
      </div>

      <div className="certifications-grid">
        {certifications.map((c) => (
          <article key={c.title} className={`cert-card cert-${c.type}`}>
            <div className="cert-pill">{c.type === "data" ? "Data" : c.type === "cloud" ? "Cloud" : "Dev"}</div>
            <h3>{c.title}</h3>
            <p className="cert-provider">{c.provider}</p>
            <p className="cert-period">{c.period}</p>
          </article>
        ))}
      </div>
    </section>
  );
};