import React, { useEffect, useState } from 'react';
import '../Styles/hero.css';
import { useLanguage } from "../Languages/LanguageContext";
import translations from "../Languages/HeroLanguage";

function Hero() {
  const { language } = useLanguage();
  const t = translations[language];

  // GET request
  const [home, setHome] = useState({});
  useEffect(() => {
    getHero();
  }, []);

  async function getHero() {
    try {
      const response = await fetch('https://api.x-solar.uz/api/v1/');
      const json = await response.json();
      setHome(json[0]);
    } catch (error) {
      console.error("Error fetching hero data:", error);
    }
  }

  return (
    <section id='home' className="hero">
      {/* JSON-LD Schema Markup for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "X-Solar",
          "url": "https://x-solar.uz",
          "logo": "https://api.x-solar.uz/media/images/home_solor.jpg",
          "description": home?.landing_page_description_uz || "Quyosh panellari va energiya yechimlari",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+998901234567",
            "contactType": "customer service"
          }
        })}
      </script>

      {/* Background Video */}
      <video className="hero-video" autoPlay loop muted playsInline>
        <source src={`${process.env.PUBLIC_URL}/video.mp4`} type="video/mp4" />
        Sizning brauzeringiz ushbu videoni qo‘llab-quvvatlamaydi.
      </video>

      {/* Hero Content */}
      <div className="hero-content">
        <h1 className="hero-title">
          {language === "uz" ? home?.company_title_uz : language === "ru" ? home?.company_title_ru : home?.company_title_en}
        </h1>
        <h2 className="hero-subtitle">
          {language === "uz" ? home?.landing_page_description_uz : language === "ru" ? home?.landing_page_description_ru : home?.landing_page_description_en}
        </h2>

        {/* Call to Action Buttons */}
        <div className="hero-buttons">
          <a href="#contact">
            <button className="cta-button primary">{t.contact}</button>
          </a>
          <a href="#survey">
            <button className="cta-button secondary">{t.order}</button>
          </a>
        </div>

      
      </div>
    </section>
  );
}

export default Hero;
