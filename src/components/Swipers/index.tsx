import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./styles.module.scss";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Swiper as SwiperType } from "swiper";

interface Event {
  year: string;
  text: string;
}

interface CustomSwiperProps {
  events: Event[];
}

export const Swipers = ({ events }: CustomSwiperProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const prevEvents = useRef<Event[]>(events);
  const nextButtonRef = useRef<HTMLDivElement>(null);
  const prevButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current || prevEvents.current === events) return;

    setIsAnimating(true);

    gsap.to(wrapperRef.current.querySelectorAll(".swiper-slide"), {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        prevEvents.current = events;
        setIsAnimating(false);

        gsap.fromTo(
          wrapperRef.current.querySelectorAll(".swiper-slide"),
          { opacity: 0 },
          { opacity: 1, duration: 0.5 }
        );
      },
    });
  }, [events]);

  useEffect(() => {
    if (nextButtonRef.current) {
      gsap.to(nextButtonRef.current, {
        opacity: isEnd ? 0 : 1,
        duration: 0.3,
        ease: "power2.out",
        pointerEvents: isEnd ? "none" : "auto",
      });
    }

    if (prevButtonRef.current) {
      gsap.to(prevButtonRef.current, {
        opacity: isBeginning ? 0 : 1,
        duration: 0.3,
        ease: "power2.out",
        pointerEvents: isBeginning ? "none" : "auto",
      });
    }
  }, [isBeginning, isEnd]);

  const handleSwiper = (swiper: SwiperType) => {
    swiperRef.current = swiper;
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);

    swiper.on("slideChange", () => {
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
    });
  };

  return (
    <div className={styles.sliderWrapper} ref={wrapperRef}>
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: `.${styles.customNavButtonNext}`,
          prevEl: `.${styles.customNavButtonPrev}`,
        }}
        slidesPerView={3}
        spaceBetween={30}
        className={styles.customSwiper}
        onSwiper={handleSwiper}
        onSlideChange={() => {
          if (swiperRef.current) {
            setIsBeginning(swiperRef.current.isBeginning);
            setIsEnd(swiperRef.current.isEnd);
          }
        }}
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
        ref={nextButtonRef}
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
        ref={prevButtonRef}
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
