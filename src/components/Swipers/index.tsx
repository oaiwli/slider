import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./styles.module.scss";

interface Event {
  year: string;
  text: string;
}

interface CustomSwiperProps {
  events: Event[];
}

export const Swipers = ({ events }: CustomSwiperProps) => {
  return (
    <div className={styles.sliderWrapper}>
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: `.${styles.customNavButtonNext}`,
          prevEl: `.${styles.customNavButtonPrev}`,
        }}
        slidesPerView={3}
        spaceBetween={30}
        className={styles.customSwiper}
      >
        {events.map((event, index) => (
          <SwiperSlide key={index} className={styles.slide}>
            <div className={styles.slideContent}>
              <h3 className={styles.slideYear}>{event.year}</h3>
              <p className={styles.slideText}>{event.text}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        className={`${styles.customNavButton} ${styles.customNavButtonNext}`}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 7 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1L6 6L1 11"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div
        className={`${styles.customNavButton} ${styles.customNavButtonPrev}`}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 7 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 1L1 6L6 11"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};
