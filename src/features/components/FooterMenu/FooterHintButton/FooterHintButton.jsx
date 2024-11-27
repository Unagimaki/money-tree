import { useLocation } from "react-router-dom";
import styles from "./footerHintButton.module.scss";
import { PagesLinks } from "../../../../shared/PagesLinks";

export const FooterHintButton = ({text}) => {
    const currentUrl = useLocation().pathname;

    return (
      <div className={styles.container}>
        <button
          style={{
            width:
              currentUrl !== PagesLinks.GAME_URL
                ? "min(28.8vw, 108px)"
                : "min(38.67vw, 145px)",
          }}
          className={styles.container_inner}
        >
          {text}
        </button>
      </div>
    );
}