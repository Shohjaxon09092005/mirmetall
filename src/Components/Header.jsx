import React, { useState } from "react";
import "../Styles/header.css";
import logo from "../Images/solor-removebg-preview.png";
import { useLanguage } from "../Languages/LanguageContext";
import translations from "../Languages/HeaderLanguage";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, changeLanguage } = useLanguage();
  const t = translations[language];

  const handleLanguageChange = (event) => {
    changeLanguage(event.target.value);
  };

  return (
    <header className="header">
      <a href="#home" className="logo">
        <img src={logo} alt="Solar Energy Logo" width="150" height="auto" loading="lazy" />
      </a>
      
      {/* Accessible Hamburger Menu */}
      <div className="modal_wrapper">
        <button 
          className="menu-toggle" 
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen} // ← Faqat shu tugmaga kerak
          aria-controls="main-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
        <nav id="main-navigation" className={`nav ${menuOpen ? "open" : ""}`}>
          <ul>
            <li><a href="#about">{t.about}</a></li>
            <li><a href="#portfolio">{t.portfolio}</a></li>
            <li><a href="#products">{t.products}</a></li>
            <li><a href="#contact">{t.contact}</a></li>
            <li><a href="#survey">{t.survey}</a></li>
          </ul>
        </nav>
      </div>

      {/* Language Selector */}
      <div className="language-select">
        <select 
          id="language-select" 
          value={language} 
          onChange={handleLanguageChange} 
          aria-label="Select language"
        >
          <option value="uz">O'zbekcha</option>
          <option value="ru">Русский</option>
          <option value="eng">English</option>
        </select>
      </div>
    </header>
  );
}

export default Header;
