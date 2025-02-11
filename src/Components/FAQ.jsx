import React, { useEffect, useState } from 'react';
import '../Styles/faq.css';
import { useLanguage } from '../Languages/LanguageContext';
import translations from '../Languages/FAQLanguage';

function FAQ() {
  const { language } = useLanguage();
  const t = translations[language];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  // GET
  const [faq, setfaq] = useState([]);
  useEffect(() => {
    getFaq()
  }, [])
  async function getFaq() {
    let fetchFaq=await fetch('https://api.x-solar.uz/api/v1/support/faq/');
    let json=await fetchFaq.json();
    setfaq(json)
    
  }
  
  return (
    <section className="faq-section">
      <h2 className="faq-title">{t.faqTitle}</h2>
      {faq?.map((item, index) => (
        <div key={index} className="faq-item">
          <button className="faq-question" onClick={() => toggleFAQ(index)}>
            {item?.question}
          </button>
          <div className={`faq-answer ${activeIndex === index ? "active" : ""}`}>
            {item?.answer}
          </div>
        </div>
      ))}
    </section>
  );
}

export default FAQ;
