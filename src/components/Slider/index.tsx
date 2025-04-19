import styles from "./styles.module.scss";

export const Slider = () => {
  return (
    <div className={styles.sliderContainer}>
      <div className={styles.topLeftSquare}></div>
      <div className={styles.topRightSquare}></div>
      <div className={styles.bottomLeftSquare}></div>
      <div className={styles.bottomRightSquare}></div>

      <div className={styles.contentContainer}>
        <h2 className={styles.title}>
          Исторические
          <br />
          даты
        </h2>
      </div>
    </div>
  );
};
