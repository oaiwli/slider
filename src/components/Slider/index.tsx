import { useState, useRef, useEffect } from "react";
import styles from "./styles.module.scss";
import { Swipers } from "../Swipers";
import { timePeriods } from "../data/events";
import { TimeCircle } from "../TimeCircle";
import { Switch } from "../Switch";
import gsap from "gsap";

export const Slider = () => {
  const [activePeriod, setActivePeriod] = useState(0);
  const oldYearRef = useRef<HTMLHeadingElement>(null);
  const newYearRef = useRef<HTMLHeadingElement>(null);
  const prevOldYear = useRef<string>(timePeriods[0].range[0].old);
  const prevNewYear = useRef<string>(timePeriods[0].range[0].new);

  const animateNumber = (
    element: HTMLElement,
    newValue: string,
    prevValue: string
  ) => {
    const duration = 1.5;
    const delay = 0.1;

    gsap.fromTo(
      element,
      { textContent: prevValue },
      {
        textContent: newValue,
        duration: duration,
        delay: delay,
        ease: "power1.out",
        snap: { textContent: 1 },
      }
    );
  };

  const handleDotClick = (index: number) => {
    if (index === activePeriod) return;

    const newOldYear = timePeriods[index].range[0].old;
    const newNewYear = timePeriods[index].range[0].new;

    setActivePeriod(index);

    if (oldYearRef.current && newYearRef.current) {
      animateNumber(oldYearRef.current, newOldYear, prevOldYear.current);
      animateNumber(newYearRef.current, newNewYear, prevNewYear.current);
    }

    prevOldYear.current = newOldYear;
    prevNewYear.current = newNewYear;
  };

  const handleNextClick = () => {
    const nextIndex = (activePeriod + 1) % timePeriods.length;
    handleDotClick(nextIndex);
  };

  const handlePrevClick = () => {
    const prevIndex =
      (activePeriod - 1 + timePeriods.length) % timePeriods.length;
    handleDotClick(prevIndex);
  };

  useEffect(() => {
    prevOldYear.current = timePeriods[activePeriod].range[0].old;
    prevNewYear.current = timePeriods[activePeriod].range[0].new;
  }, []);

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.topLeftSquare}></div>
        <div className={styles.topRightSquare}></div>
        <div className={styles.bottomLeftSquare}></div>
        <div className={styles.bottomRightSquare}></div>

        <div className={styles.contentContainer}>
          <div className={styles.header}>
            <div className={styles.line}></div>
            <h2 className={styles.title}>
              Исторические
              <br />
              даты
            </h2>
          </div>

          <TimeCircle
            activePeriod={activePeriod}
            handleDotClick={handleDotClick}
          />

          <div className={styles.centerContainer}>
            <h1 className={styles.oldYear} ref={oldYearRef}>
              {timePeriods[activePeriod].range[0].old}
            </h1>
            <h1 className={styles.newYear} ref={newYearRef}>
              {timePeriods[activePeriod].range[0].new}
            </h1>
          </div>

          <Switch
            activeIndex={activePeriod}
            totalItems={timePeriods.length}
            onNext={handleNextClick}
            onPrev={handlePrevClick}
          />

          <Swipers events={timePeriods[activePeriod].events} />
        </div>
      </div>
    </>
  );
};
