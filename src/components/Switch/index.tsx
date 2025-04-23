import styles from "./styles.module.scss";

interface SwitchProps {
  activeIndex: number;
  totalItems: number;
  onNext: () => void;
  onPrev: () => void;
}

export const Switch = ({
  activeIndex,
  totalItems,
  onNext,
  onPrev,
}: SwitchProps) => {
  const isFirst = activeIndex === 0;
  const isLast = activeIndex === totalItems - 1;

  return (
    <div className={styles.switchBox}>
      <p className={styles.switchText}>
        {`${String(activeIndex + 1).padStart(2, "0")}/${String(
          totalItems
        ).padStart(2, "0")}`}
      </p>
      <div className={styles.switchButtons}>
        <div
          className={`${styles.switchButton} ${styles.switchButtonPrev} ${
            isFirst ? styles.disabled : ""
          }`}
          onClick={!isFirst ? onPrev : undefined}
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
        <div
          className={`${styles.switchButton} ${styles.switchButtonNext} ${
            isLast ? styles.disabled : ""
          }`}
          onClick={!isLast ? onNext : undefined}
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
      </div>
    </div>
  );
};
