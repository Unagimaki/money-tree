import styles from './alert.module.scss';

export const Alert = ({ handleCloseAlert, title, text = '', type }) => {
  const money_icon = require("./assets/money_icon.png");
  const borderColor = type === "warning" ? "#B3261E" : "#fff";

  return (
    <div className={styles.container}>
      <div
        style={{
          border: `min(0.53vw, 2px) solid ${borderColor}`,
        }}
        className={styles.container_inner}
      >
        <img
          className={styles.container_inner_icon}
          src={money_icon}
          alt="money_icon"
        />
        <div className={styles.container_inner_text}>
          <div className={styles.container_inner_text_title}>{title}</div>
          <div className={styles.container_inner_text_subtitle}>{text}</div>
        </div>
        <button
          onClick={handleCloseAlert}
          className={styles.container_inner_button}
        >
          ОК
        </button>
      </div>
    </div>
  );
};