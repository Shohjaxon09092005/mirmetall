import React, { useEffect, useState } from 'react';
import '../Styles/testimonials.css';
import { useLanguage } from '../Languages/LanguageContext';
import translations from '../Languages/TestimonialsLanguage';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Testimonials() {
  const { language } = useLanguage();
  const t = translations[language];

  const [newFeedback, setNewFeedback] = useState("");
  const [newName, setNewName] = useState("");
  const [rating, setRating] = useState(0);
  const [feedbackList, setFeedbackList] = useState('');

  async function handleFeedbackSubmit(e) {
    e.preventDefault();
    if (newFeedback.trim() !== "" && newName.trim() !== "" && rating > 0) {
      const newEntry = {
        name: newName,
        text: newFeedback,
        rating: rating,
      };
      try {
        let responce = await fetch('https://api.x-solar.uz/api/v1/support/feedback/', {
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
      setFeedbackList([...feedbackList, newEntry]);
      setNewFeedback("");
      setNewName("")
      setRating(0);
    } else {
      alert("Maydon bo'sh bo'lmasin")
    }
  };
  //GET
  const[feed,setFeed]=useState([]);
  useEffect(()=>{
    getFeed()
  },[])
  async function getFeed() {
    let fetchFeed=await fetch("https://api.x-solar.uz/api/v1/support/feedback/");
    let json=await fetchFeed.json();
    let sortFeed=json?.sort((a,b)=>b.id-a.id);
    setFeed(sortFeed)
    
  }
  
  return (
    <section className="testimonials-section">
      <h2 className="testimonials-title">{t.testimonialsTitle}</h2>
      {/* Swiper Slider */}
      <Swiper
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        spaceBetween={30}
        breakpoints={{
          320: { slidesPerView: 1 },
          400: { slidesPerView: 1.5 },// 📱 Kichik ekran (mobil) - 1 ta slayd
          600: { slidesPerView: 2.1 },// 📱 Kichik ekran (mobil) - 1 ta slayd
          800: { slidesPerView: 2.3 }, // 📱 Tablet - 2 ta slayd
          1024: { slidesPerView: 3 }, // 🖥️ Kompyuter - 3.2 ta slayd
          1400: { slidesPerView: 3.2 } // 📺 Katta ekran - 4 ta slayd
        }}
        navigation
        pagination={{ clickable: true }}
        mousewheel
        keyboard
        loop={true}
        loopFillGroupWithBlank={true}
        className="testimonial-swiper"
      >
        {feed?.map((item, index) => (
          <SwiperSlide key={index} className="testimonial-card">
            <p className="testimonial-text">"{item?.text}"</p>
            <p className="testimonial-author">— {item?.name}</p>
            <div className="testimonial-stars">
              {Array.from({ length: item?.rating }, (_, i) => (
                <span key={i} className="star">★</span>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Fikr-mulohaza qoldirish formasi */}
      <div className="feedback-form">
        <h3>{t.leaveFeedback}</h3>
        <input value={newName} onChange={(e) => setNewName(e.target.value)} className='input_name' type="text" placeholder='Ism familiyangizni kiriting' />
        <textarea
          className="feedback-input"
          placeholder={t.placeholder}
          value={newFeedback}
          onChange={(e) => setNewFeedback(e.target.value)}
        />
        <div className="star-rating">
          {Array.from({ length: 5 }, (_, i) => (
            <span
              key={i}
              className={`star-input ${i < rating ? "active" : ""}`}
              onClick={() => setRating(i + 1)}
            >
              ★
            </span>
          ))}
        </div>
        <button className="submit-btn" onClick={handleFeedbackSubmit}>
          {t.submit}
        </button>
      </div>
    </section>
  );
}

export default Testimonials;
