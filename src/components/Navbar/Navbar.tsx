// src/components/Navbar.tsx
import React from "react";
import "./Navbar.css";

const links = [
  { id: "hero", label: "Accueil" },
  { id: "about", label: "À propos" },
  { id: "experience", label: "Expérience" },
  { id: "projects", label: "Projets" },
  { id: "skills", label: "Compétences" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" }
];

export const Navbar: React.FC = () => {
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="navbar-logo">Sabrine<span>.</span></div>
        <ul className="navbar-links">
          {links.map((link) => (
            <li key={link.id} onClick={() => handleScroll(link.id)}>
              {link.label}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};