// src/components/Contact.tsx
import React, { useState } from "react";
import { FaEnvelope, FaLinkedin } from "react-icons/fa";
import "./Contact.css";

export const Contact: React.FC = () => {
  const [status, setStatus] = useState<"" | "sent">("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici tu peux brancher un service (Formspree, EmailJS, backend perso…)
    setStatus("sent");
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="section-header">
        <h2>Me contacter</h2>
        <p>Discutons de votre prochain projet ou de mon futur stage PFE.</p>
      </div>

      <div className="contact-grid">
        <div className="contact-card">
          <h3>Écrivez‑moi</h3>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <label>Nom complet</label>
              <input type="text" name="name" placeholder="Votre nom" required />
            </div>
            <div className="form-row">
              <label>E‑mail</label>
              <input type="email" name="email" placeholder="votre@email.com" required />
            </div>
            <div className="form-row">
              <label>Message</label>
              <textarea name="message" rows={4} placeholder="Parlez‑moi de votre besoin..." required />
            </div>
            <button type="submit" className="btn btn-primary">
              Envoyer le message
            </button>
            {status === "sent" && (
              <p className="form-success">Merci, votre message a été simulé comme envoyé 🤍</p>
            )}
          </form>
        </div>

        <div className="contact-info">
          <h3>Coordonnées</h3>
          <p>Vous pouvez aussi me joindre directement :</p>
          <ul>
            <li>
              <FaEnvelope />
              <a href="mailto:sabrine.moussi@sesame.com.tn">
                sabrine.moussi@sesame.com.tn
              </a>
            </li>
            <li>
              <FaLinkedin />
              <a
                href="https://www.linkedin.com/in/sabrine-moussi"
                target="_blank"
                rel="noreferrer"
              >
                linkedin.com/in/sabrine-moussi
              </a>
            </li>
          </ul>
          <p className="contact-note">
            Basée en Tunisie, ouverte aux opportunités de stage PFE en Data Engineering
            et Développement Web.
          </p>
        </div>
      </div>
    </section>
  );
};