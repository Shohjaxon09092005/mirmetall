import React, { useState, useEffect, useMemo } from "react";
import "../Styles/portfolio.css";
import { useLanguage } from "../Languages/LanguageContext";
import translations from "../Languages/PortfolioLanguage";

// ✅ Swiper importlarini to‘g‘ri qilish
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const Portfolio = () => {
  const { language } = useLanguage();
  const t = useMemo(() => translations[language], [language]);

  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    fetchProjects();
    fetchCategories();
  }, [language]);

  async function fetchProjects() {
    try {
      let response = await fetch("https://api.x-solar.uz/api/v1/projects/");
      let data = await response.json();
      let sortedProjects = data.sort((a, b) => b.id - a.id);
      setProjects(sortedProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  }

  async function fetchCategories() {
    try {
      let response = await fetch("https://api.x-solar.uz/api/v1/projects/categories/list/");
      let data = await response.json();
      setCategories(data);
      setSelectedCategory(null); // "Barchasi"ni tanlash
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  // Kategoriyalar bo‘yicha filter
  const filteredProjects = selectedCategory
    ? projects.filter((project) => project.categories.includes(selectedCategory.id))
    : projects;

  // Sahifaga ajratish
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedProjects = filteredProjects.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section id="portfolio" className="portfolio">
      <div className="portfolio-header">
        <h2 className="portfolio-title1">{t.title}</h2>
        <div className="portfolio-categories">
          <button
            onClick={() => { setSelectedCategory(null); setCurrentPage(1); }}
            className={`category-button ${!selectedCategory ? "active" : ""}`}
          >
            {t.all}
          </button>
          {categories.map((category) => (
            <button
              key={category?.id}
              onClick={() => { setSelectedCategory(category); setCurrentPage(1); }}
              className={`category-button ${selectedCategory?.id === category.id ? "active" : ""}`}
            >
              {`${language==="uz"?category?.title_uz:language==="ru"?category?.title_ru:category?.title_en}`}
            </button>
          ))}
        </div>
      </div>

      <div className="portfolio-gallery">
        {displayedProjects.map((project) => (
          <div key={project.id} className="portfolio-item">
            <Swiper
              spaceBetween={10}
              slidesPerView={1}
              loop={true}
              autoplay={{ delay: 5000 }}
              modules={[Autoplay, Navigation, Pagination]} // ✅ Modullarni to‘g‘ri kiritish
            >
              <SwiperSlide>
                <div className="portfolio-image-wrapper">
                  {project?.video ? (
                    <video className="portfolio-video" src={project?.video} controls autoPlay muted />
                  ) : (
                    <img src={project?.image} alt={`${language==="uz"?project?.title_uz:language==="ru"?project?.title_ru:project?.title_en}`} className="portfolio-image" />
                  )}
                  <div className="portfolio-info">
                    <h3 className="portfolio-title">{`${language==="uz"?project?.title_uz:language==="ru"?project?.title_ru:project?.title_en}`}</h3>
                    <p className="portfolio-description">{`${language==="uz"?project?.description_uz:language==="ru"?project?.description_ru:project?.description_en}`}</p>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`pagination-button ${currentPage === index + 1 ? "active" : ""}`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
