import React, { useEffect, useState } from 'react';
import '../Styles/survey.css';
import { useLanguage } from '../Languages/LanguageContext';
import translations from '../Languages/SurveyLanguage';

function Survey() {
  const { language } = useLanguage();
  const t = translations[language];

  const [formSer, setSer] = useState('');
  const [formLoc, setLoc] = useState('');
  const [formName, setname] = useState('');
  const [formPhone, setPhone] = useState('');
  const [selectedId, setSelectedId] = useState(""); // Tanlangan ID
  const [selectedId2, setSelectedId2] = useState(""); // Tanlangan ID
  const handleChange = (e) => {
    const selectedOption = e.target.selectedOptions[0]; // Tanlangan option elementi
    const selectedId = selectedOption.getAttribute("data-id"); // ID ni olish

    setSer(e.target.value); // Shahar nomini saqlash
    setSelectedId(selectedId); // ID ni saqlash
  };
  const handleChange2 = (e) => {
    const selectedOption = e.target.selectedOptions[0]; // Tanlangan option elementi
    const selectedId = selectedOption.getAttribute("data-id"); // ID ni olish

    setLoc(e.target.value); // Shahar nomini saqlash
    setSelectedId2(selectedId); // ID ni saqlash
  };
 

  async function handleSubmit(e) {
    e.preventDefault();
    let ready = {
      name: formName,
      phone_number: formPhone,
      category: selectedId,
      address: selectedId2
    }
    try {
      let responceSur = await fetch("https://api.x-solar.uz/api/v1/support/order/", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ready)
      });
      if (responceSur.ok) {
        alert("Malumot yuborildi siz bilan bog'lanamiz");
        setLoc('');
        setPhone("");
        setSer("");
        setname('')
      } else {
        alert("Malumot yuborilmadi bo'sh joylarga e'tibor bering!")
      }

    } catch (error) {
      alert("xatolik!")
    }

  };
  //GET
  const [add, setAdd] = useState([]);
  useEffect(() => {
    getAdd()
  }, [])
  async function getAdd() {
    let fetchAdd = await fetch(`https://api.x-solar.uz/api/v1/support/addresses/`);
    let json = await fetchAdd.json();
    setAdd(json)

  }
  //GET2
  const [cat, setCat] = useState([]);
  useEffect(() => {
    getCat()
  }, [])
  async function getCat() {
    let fetchCat = await fetch(`https://api.x-solar.uz/api/v1/support/order-categories/`);
    let json = await fetchCat.json();
    setCat(json)

  }

  return (
    <section id='survey' className="survey-section">
      <h2 className="survey-title">{t.surveyTitle}</h2>
      <div className="survey-container">
        <form onSubmit={handleSubmit}>
          <label>{t.serviceQuestion}</label>
          <select name="service" value={formSer} onChange={handleChange} required>
            <option value="">{t.selectOption}</option>
            {cat?.map((cat) => {
              return (
                <option key={cat?.id} data-id={cat?.id} value={cat?.title_en}> {language === "uz" ? cat?.title_uz : language === "ru" ? cat?.title_en : cat?.title_ru}</option>
              )
            })}
          </select>

          <label>{t.locationQuestion}</label>

          <select name="location" value={formLoc} onChange={handleChange2} required>
            <option value="">{t.selectOption}</option>
            {add?.map((item, index) => (
              <option data-id={item?.id} key={index} value={item?.city_en}>
                {language === "uz" ? item?.city_uz : language === "ru" ? item?.city_ru : item?.city_en}
              </option>
            ))}
          </select>

          <label>{t.name}</label>
          <input type="text" name="name" value={formName} onChange={(e) => setname(e.target.value)} required />

          <label>{t.phone}</label>
          <input type="tel" name="phone" value={formPhone} onChange={(e) => setPhone(e.target.value)} required />

          <button type="submit" className="survey-button">{t.submit}</button>
        </form>
      </div>
    </section>
  );
}

export default Survey;
