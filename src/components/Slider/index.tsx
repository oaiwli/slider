import styles from "./styles.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const Slider = () => {
  const slides = [
    {
      year: "2015",
      text: "13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды",
    },
    {
      year: "2016",
      text: "Телескоп «Хаббл» обнаружил самую удалённую из всех обнаруженных галактик, получившую обозначение GN-z11",
    },
    {
      year: "2017",
      text: "Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi",
    },
    {
      year: "2018",
      text: "Запуск космического телескопа TESS для поиска экзопланет",
    },
    {
      year: "2019",
      text: "Первое изображение тени чёрной дыры, полученное проектом Event Horizon Telescope",
    },
    {
      year: "2020",
      text: "Компания SpaceX впервые отправила астронавтов на МКС на корабле Crew Dragon",
    },
  ];

  return (
    <div className={styles.mainContainer}>
      <div className={styles.topLeftSquare}></div>
      <div className={styles.topRightSquare}></div>
      <div className={styles.bottomLeftSquare}></div>
      <div className={styles.bottomRightSquare}></div>

      <div className={styles.contentContainer}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Исторические
            <br />
            даты
          </h2>
        </div>
        <div className={styles.centerContainer}>
          <h1 className={styles.mainText}>2015 2025</h1>
        </div>

        <div className={styles.sliderWrapper}>
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            slidesPerView={3}
            spaceBetween={30}
            className={styles.customSwiper}
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index} className={styles.slide}>
                <div className={styles.slideContent}>
                  <h3 className={styles.slideYear}>{slide.year}</h3>
                  <p className={styles.slideText}>{slide.text}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className={`swiper-button-next ${styles.customNavButton}`}></div>
          <div className={`swiper-button-prev ${styles.customNavButton}`}></div>
        </div>
      </div>
    </div>
  );
};
