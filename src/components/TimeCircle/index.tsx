import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./styles.module.scss";
import { timePeriods } from "../data/events";

interface TimeCircleProps {
  activePeriod: number;
  handleDotClick: (index: number) => void;
}

export const TimeCircle = ({
  activePeriod,
  handleDotClick,
}: TimeCircleProps) => {
  const circleRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);
  const circleLineRef = useRef<SVGCircleElement>(null);
  const maskRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (!circleRef.current || !circleLineRef.current || !maskRef.current)
      return;

    const radius = 150;
    const center = { x: 0, y: 0 };
    const dots = timePeriods.length;

    gsap.set(circleLineRef.current, {
      strokeDashoffset: 0,
    });

    dotsRef.current.forEach((dot, index) => {
      if (!dot) return;

      const angle = (index * (360 / dots) - 90) * (Math.PI / 180);
      const x = center.x + radius * Math.cos(angle);
      const y = center.y + radius * Math.sin(angle);

      gsap.set(dot, {
        x,
        y,
        opacity: 1,
      });

      if (index === activePeriod) {
        gsap.set(maskRef.current, {
          attr: {
            cx: 160 + x,
            cy: 160 + y,
          },
        });
      }
    });

    animateActiveDot();
  }, [activePeriod]);

  const handleDotHover = (index: number, isHovered: boolean) => {
    const dot = dotsRef.current[index];
    if (!dot) return;

    const dotContent = dot.querySelector(`.${styles.dotContent}`);
    const dotBackground = dot.querySelector(`.${styles.dotBackground}`);

    if (isHovered && index !== activePeriod) {
      gsap.to(dot, {
        width: 40,
        height: 40,
        backgroundColor: "transparent",
        borderColor: "#42567A",
        borderWidth: "1px",
        duration: 0.3,
      });

      if (dotBackground) {
        gsap.to(dotBackground, {
          opacity: 1,
          duration: 0.3,
        });
      }

      if (dotContent) {
        gsap.to(dotContent, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
        });
      }
    } else if (index !== activePeriod) {
      gsap.to(dot, {
        width: 10,
        height: 10,
        backgroundColor: "#42567A",
        borderColor: "transparent",
        duration: 0.3,
      });

      if (dotBackground) {
        gsap.to(dotBackground, {
          opacity: 0,
          duration: 0.3,
        });
      }

      if (dotContent) {
        gsap.to(dotContent, {
          opacity: 0,
          scale: 0.5,
          duration: 0.3,
        });
      }
    }
  };

  const animateActiveDot = () => {
    dotsRef.current.forEach((dot, index) => {
      if (!dot || !maskRef.current) return;

      const dotContent = dot.querySelector(`.${styles.dotContent}`);
      const dotBackground = dot.querySelector(`.${styles.dotBackground}`);
      const radius = 150;
      const center = { x: 0, y: 0 };
      const angle = (index * (360 / timePeriods.length) - 90) * (Math.PI / 180);
      const x = center.x + radius * Math.cos(angle);
      const y = center.y + radius * Math.sin(angle);

      if (index === activePeriod) {
        gsap.to(dot, {
          width: 40,
          height: 40,
          backgroundColor: "transparent",
          borderColor: "#42567A",
          borderWidth: "1px",
          duration: 0.3,
        });

        if (dotBackground) {
          gsap.to(dotBackground, {
            opacity: 1,
            duration: 0.3,
          });
        }

        gsap.to(maskRef.current, {
          attr: {
            cx: 160 + x,
            cy: 160 + y,
          },
          duration: 0.3,
        });

        if (dotContent) {
          gsap.to(dotContent, {
            opacity: 1,
            scale: 1,
            duration: 0.3,
          });
        }
      } else {
        gsap.to(dot, {
          width: 10,
          height: 10,
          backgroundColor: "#42567A",
          borderColor: "transparent",
          duration: 0.3,
        });

        if (dotBackground) {
          gsap.to(dotBackground, {
            opacity: 0,
            duration: 0.3,
          });
        }

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

  return (
    <div ref={circleRef} className={styles.timeCircle}>
      <svg className={styles.circleSvg} viewBox="0 0 320 320">
        <defs>
          <mask id="circleMask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            <circle ref={maskRef} r="21" fill="black" cx="160" cy="10" />
          </mask>
        </defs>
        <circle
          ref={circleLineRef}
          cx="160"
          cy="160"
          r="150"
          fill="transparent"
          stroke="#42567A"
          strokeWidth="1"
          strokeDasharray="942"
          strokeOpacity="0.2"
          mask="url(#circleMask)"
        />
      </svg>

      {timePeriods.map((period, index) => (
        <div
          key={period.id}
          ref={(el) => (dotsRef.current[index] = el)}
          className={styles.timeDot}
          onClick={() => handleDotClick(index)}
          onMouseEnter={() => handleDotHover(index, true)}
          onMouseLeave={() => handleDotHover(index, false)}
          style={{
            top: "50%",
            left: "50%",
            zIndex: "110",
          }}
        >
          <div className={styles.dotBackground} />
          <div className={styles.dotContent}>{index + 1}</div>
        </div>
      ))}
    </div>
  );
};
