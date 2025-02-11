import React, { useEffect, useState } from "react";
import "../Styles/products.css";
import { useLanguage } from "../Languages/LanguageContext";
import translations from "../Languages/ProductLanguage";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

function Products() {
  const [pro, setPro] = useState([]);
  const [proCat, setProCat] = useState([]);
  const [filterProCat, setFilterProCat] = useState({});
  const { language } = useLanguage();
  const t = translations[language];
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [address, setAddress] = useState('');
  const [phone_number, setPhone_number] = useState('');

  useEffect(() => {
    getPro();
    getProCat();
  }, []);

  async function getPro() {
    let fetchPro = await fetch('https://api.x-solar.uz/api/v1/products/');
    let json = await fetchPro.json();
    let sortPro = json?.sort((a, b) => b.id - a.id);
    setPro(sortPro);
  }

  async function getProCat() {
    let fetchProCat = await fetch('https://api.x-solar.uz/api/v1/products/categories/list/');
    let json = await fetchProCat.json();
    setProCat(json);
  }

  useEffect(() => {
    if (proCat.length > 0 && pro.length > 0) {
      const categorizedProducts = {};
      proCat.forEach((category) => {
        const filteredProducts = pro.filter((product) => product.category === category.id);
        categorizedProducts[category.id] = filteredProducts;
      });
      setFilterProCat(categorizedProducts);
    }
  }, [pro, proCat]);

  const findIdPro = pro?.find((a) => a.id === selectedProduct);

  async function handleOrderSubmit(e) {
    e.preventDefault();
    let formData = {
      first_name,
      last_name,
      address,
      phone_number,
      product: Number(selectedProduct),
    };
    try {
      const responseProd = await fetch("https://api.x-solar.uz/api/v1/support/custom-order/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (responseProd.ok) {
        alert("Buyurtma qabul qilindi!");
        setFirst_name("");
        setLast_name("");
        setPhone_number("");
        setAddress("");
      } else {
        alert("Maydon bo'sh bo'lmasin!");
      }
    } catch (error) {
      alert("Xatolik!");
    }
  }

  return (
    <div id="products">
      <h2>{t.title}</h2>
      <div className="products-container">
        {proCat.map((category) => (
          <div key={category.id} className="product-category">
            <h3>
              {language === "uz"
                ? category.title_uz
                : language === "ru"
                ? category.title_ru
                : category.title_en}
            </h3>
            <Swiper
              spaceBetween={20}
              slidesPerView="auto"
              loop={true}
              breakpoints={{
                320: { slidesPerView: 1.2 },
                480: { slidesPerView: 2.2 },
                768: { slidesPerView: 3.3 },
                1024: { slidesPerView: 4.5 },
              }}
            >
              {filterProCat[category.id]?.map((product) => (
                <SwiperSlide key={product.id}>
                  <div className="product-card">
                    <img src={product.image} alt={product.title_uz} className="product-image" />
                    <h3 className="product-title">
                      {language === "uz"
                        ? product.title_uz
                        : language === "ru"
                        ? product.title_ru
                        : product.title_en}
                    </h3>
                    <p className="product-info">{t.power}: {product.power} </p>
                    <p className="product-price">{t.price}: {product.price.slice(0, -4)} $</p>
                    <a href="#chekout">
                      <button className="buy-button" onClick={() => setSelectedProduct(product.id)}>
                        {t.orderNow}
                      </button>
                    </a>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ))}
      </div>

      {findIdPro && (
        <div id="chekout" className="checkout-container">
          <h2>{t.checkoutTitle}</h2>
          <div className="checkout-card">
            <img src={findIdPro.image} alt={findIdPro.title_uz} className="checkout-image" />
            <div className="checkout-details">
              <h3>
                {language === "uz"
                  ? findIdPro.title_uz
                  : language === "ru"
                  ? findIdPro.title_ru
                  : findIdPro.title_en}
              </h3>
              <p>{t.power}: {findIdPro.power} </p>
              <p className="checkout-price">{t.price}: {findIdPro.price.slice(0, -4)} $</p>
              <p>
                {language === "uz"
                  ? findIdPro.description_uz
                  : language === "ru"
                  ? findIdPro.description_ru
                  : findIdPro.description_en}
              </p>
              <input type="text" placeholder={t.name} value={first_name} onChange={(e) => setFirst_name(e.target.value)} />
              <input type="text" placeholder="Familiyangiz" value={last_name} onChange={(e) => setLast_name(e.target.value)} />
              <input type="text" placeholder={t.address} value={address} onChange={(e) => setAddress(e.target.value)} />
              <input type="tel" placeholder={t.phone} value={phone_number} onChange={(e) => setPhone_number(e.target.value)} />
              <button className="checkout-button" onClick={handleOrderSubmit}>
                {t.confirmOrder}
              </button>
              <a href="#products">
                <button className="back-button" onClick={() => setSelectedProduct(null)}>
                  {t.back}
                </button>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
