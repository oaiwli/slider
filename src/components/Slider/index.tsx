import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { Swipers } from "../Swipers";
import { gsap } from "gsap";
import { timePeriods } from "../data/events";

export const Slider = () => {
  const [activePeriod, setActivePeriod] = useState(0);
  const circleRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);
  const circleLineRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (!circleRef.current || !circleLineRef.current) return;

    const radius = 150;
    const center = { x: 0, y: 0 };
    const dots = timePeriods.length;

    // анимка круговой линии
    gsap.fromTo(
      circleLineRef.current,
      { strokeDashoffset: 942 },
      {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power2.out",
      }
    );

    // точки
    dotsRef.current.forEach((dot, index) => {
      if (!dot) return;

      const angle = (index * (360 / dots) - 90) * (Math.PI / 180);
      const x = center.x + radius * Math.cos(angle);
      const y = center.y + radius * Math.sin(angle);

      gsap.set(dot, {
        x,
        y,
        opacity: 0,
      });

      gsap.to(dot, {
        opacity: 1,
        duration: 0.8,
        delay: index * 0.1,
      });
    });

    animateActiveDot();
  }, [activePeriod]);

  const animateActiveDot = () => {
    dotsRef.current.forEach((dot, index) => {
      if (!dot) return;

      const dotContent = dot.querySelector(`.${styles.dotContent}`);

      if (index === activePeriod) {
        gsap.to(dot, {
          width: 40,
          height: 40,
          scale: 1,
          backgroundColor: "transparent",
          borderColor: "#42567A",
          borderWidth: "1px",
          duration: 0.3,
        });

        if (dotContent) {
          gsap.to(dotContent, {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            color: "#42567A",
          });
        }
      } else {
        gsap.to(dot, {
          width: 10,
          height: 10,
          scale: 1,
          backgroundColor: "#42567A",
          borderColor: "transparent",
          duration: 0.3,
        });

        if (dotContent) {
          gsap.to(dotContent, {
            opacity: 0,
            scale: 0.5,
            duration: 0.3,
          });
        }
      }
    });
  };

  const handleDotClick = (index: number) => {
    if (index === activePeriod) return;

    setActivePeriod(index);

    gsap.fromTo(
      dotsRef.current[index],
      { scale: 1.2 },
      {
        scale: 1,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
      }
    );
  };

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
        <div ref={circleRef} className={styles.timeCircle}>
          <svg className={styles.circleSvg} viewBox="0 0 320 320">
            <circle
              ref={circleLineRef}
              cx="160"
              cy="160"
              r="150"
              fill="transparent"
              stroke="#42567A"
              strokeWidth="1"
              strokeDasharray="942"
              strokeDashoffset="942"
              strokeOpacity="0.2"
            />
          </svg>

          {timePeriods.map((period, index) => (
            <div
              key={period.id}
              ref={(el) => (dotsRef.current[index] = el)}
              className={styles.timeDot}
              onClick={() => handleDotClick(index)}
              style={{
                top: "48%",
                left: "48%",
                zIndex: "110",
              }}
            >
              <div className={styles.dotContent}>{index + 1}</div>
              <span className={styles.tooltip}>
                {period.range[0].old} - {period.range[0].new}
              </span>
            </div>
          ))}
        </div>
        <div className={styles.centerContainer}>
          <h1 className={styles.oldYear}>
            {timePeriods[activePeriod].range[0].old}
          </h1>
          <h1 className={styles.newYear}>
            {timePeriods[activePeriod].range[0].new}
          </h1>
        </div>

        <Swipers events={timePeriods[activePeriod].events} />
      </div>
    </div>
  );
};
