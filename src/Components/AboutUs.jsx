import React, { useEffect, useState } from 'react';
import '../Styles/aboutUs.css';
import { useLanguage } from "../Languages/LanguageContext";
import translations from "../Languages/AboutLanguage";

function AboutUs() {
  const { language } = useLanguage();
  const t = translations[language];
  //GET
  const [home, setHome] = useState([]);
  useEffect(() => {
    getHero()
  }, [])
  async function getHero() {
    let fetchHero = await fetch('https://api.x-solar.uz/api/v1/');
    let json = await fetchHero.json()
    setHome(json[0])

  }
  return (
    <div>
      <section id='about' className="about-us">
        <div className="about-us-content">
          <h2 className="about-us-title">{t.title}</h2>
          <p className="about-us-text">{language==="uz"?home?.about_page_description_uz:language==="ru"?home?.about_page_description_ru:home?.about_page_description_en}</p>
          <div className="about-us-stats">
            <div className="stat">
              <h3 className="stat-title">{home?.experience}+</h3>
              <p className="stat-subtitle">{t.experience}</p>
            </div>
            <div className="stat">
              <h3 className="stat-title">{home?.installed_panels}+</h3>
              <p className="stat-subtitle">{t.panels}</p>
            </div>
            <div className="stat">
              <h3 className="stat-title">{home?.customers}+</h3>
              <p className="stat-subtitle">{t.clients}</p>
            </div>
          </div>
          <p className="about-us-text">{t.mission}</p>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
