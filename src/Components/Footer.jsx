import React, { useEffect, useState } from 'react';
import '../Styles/footer.css';
import { useLanguage } from "../Languages/LanguageContext"; // Tilni boshqarish uchun
import translations from "../Languages/FooterLanguage"; // Tarjimalar
function Footer() {
  const { language } = useLanguage();
  const t = translations[language];
  const [email,setEmail]=useState('')
  async function handleFeedbackSubmit(e) {
    e.preventDefault();
    if (email.trim() !== "") {
      const newEntry = {
        email: email,
        
      };
      try {
        let responce = await fetch('https://api.x-solar.uz/api/v1/support/email-requests/', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newEntry)
        })
        if (responce.ok) {
          alert("Fikringiz uchun rahmat!")
        } else {
          alert("Malumot yuborilmadi")
        }

      } catch (error) {
        alert("xatolik")
      }
     setEmail("")
    } else {
      alert("Maydon bo'sh bo'lmasin")
    }
  };
  //GET
    const [add, setAdd] = useState([]);
    useEffect(() => {
      getAdd()
    }, [])
    async function getAdd() {
      let fetchAdd = await fetch(`https://api.x-solar.uz/api/v1/social-links/`);
      let json = await fetchAdd.json();
      setAdd(json)
  
    }
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Kompaniya nomi va qisqacha ta'rif */}
        <div className="footer-about">
          <h2 className="devosoft-logo">DEVOSOFT</h2>
          <p>{t.companyDescription}</p>
        </div>

        {/* Sayt navigatsiyasi */}
        <div className="footer-links">
          <h3>{t.siteNavigation}</h3>
          <ul>
            <li><a href="#home">{t.home}</a></li>
            <li><a href="#about">{t.about}</a></li>
            <li><a href="#portfolio">{t.portfolio}</a></li>
            <li><a href="#products">{t.products}</a></li>
            <li><a href="#contact">{t.contact}</a></li>
          </ul>
        </div>

        {/* Ijtimoiy tarmoqlar */}
        <div className="footer-social">
          <h3>{t.socialNetworks}</h3>
          <div className="social-icons">
            {add?.map((item)=>{
              return(
                <a key={item?.id} href={item?.link}><img style={{width:"40px"}} src={item?.icon} alt={item?.title} /></a>

              )
            })}
          
          </div>
        </div>

        {/* Obuna bo'lish formasi */}
        <div className="footer-subscribe">
          <h3>{t.subscribe}</h3>
          <form onSubmit={(e)=>handleFeedbackSubmit(e)}>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder={t.emailPlaceholder} />
            <button type="submit">{t.subscribeButton}</button>
          </form>
        </div>
      </div>

      {/* Pastki qism (Copyright) */}
      <div className="footer-bottom">
        <p>{t.copyright}</p>
      </div>
    </footer>
  );
}

export default Footer;
