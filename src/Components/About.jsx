import React, { useEffect, useRef, useState } from 'react'
import '../Styles/about.css'
import { useLanguage } from '../Languages/LanguageContext';
import translations from '../Languages/ConatctLanguage';
function About() {
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
  //POST
  let nameC = useRef();
  let tel = useRef();
  let text = useRef();
  async function conatactForm(e) {
    e.preventDefault();
    let ready = {
      name: nameC.current.value.trim(),
      phone_number: tel.current.value.trim(),
      text: text.current.value.trim()
    };
    try {
      const responseCon = await fetch('https://api.x-solar.uz/api/v1/support/contact/', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(ready),
      });
      if(responseCon.ok){
        alert("Malumot yuborildi!")
        nameC.current.value=""
        tel.current.value=""
        text.current.value=""
      }else{
        alert("Malumot yuborilmadi")
      }

    } catch (error) {
      alert("Xatolik")
    }


  }
  return (
    <section id='contact' className="contact-section">
      <h2 className="contact-title">{t.contact}</h2>
      <div className="contact-container">
        {/* Aloqa Ma'lumotlari */}
        <div className="contact-info">
          <h3>{t.contactUs}</h3>
          <p>📞 {t.phone}: <a href="tel:+998901234567">{home?.phone_number}</a></p>
          <p>✉️ {t.email}:<a href="mailto:info@company.com">{home?.email}</a></p>
          <p>📍 {t.address}: {home?.address}</p>
        </div>

        {/* Aloqa Formasi */}
        <div className="contact-form">
          <h3>{t.sendMessage}</h3>
          <form onSubmit={(e) => conatactForm(e)}>
            <input ref={nameC} type="text" placeholder={t.name} required />
            <input ref={tel} type="tel" placeholder={t.phoneNumber} required />
            <textarea ref={text} rows="4" placeholder={t.message} required></textarea>
            <button type='submit' className="send-button">{t.send}</button>
          </form>
        </div>
      </div>

      {/* Google Xarita */}
      <div className="map-container">
        <iframe
          title="Company Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d519.4254024028676!2d68.79703388938157!3d40.494423899930524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38b207bc78578ebd%3A0x247d6e4d79386329!2sX_SOLAR!5e0!3m2!1suz!2s!4v1738302485904!5m2!1suz!2s"
          width="100%"
          height="100%"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </section>
  )
}

export default About
