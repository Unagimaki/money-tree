import { useLocation, useNavigate } from "react-router-dom"
import FooterMenuButton from "./FooterMenuButton/FooterMenuButton"
import styles from './footerMenu.module.scss'
import { PagesLinks } from "../../../shared/PagesLinks"
import { useSelector } from "react-redux"
import { FooterHintButton } from "./FooterHintButton/FooterHintButton"

export const FooterMenu = () => {
    const navigate = useNavigate()
    const currentUrl = useLocation().pathname
    const currentStep = useSelector((state) => state.tutorial.currentStep);
    const isHintActive = useSelector((state) => state.tutorial.isHintVisible); 
    const boosts_img = require("./assets/boosts_icon.png");
    const shop_img = require("./assets/basket_icon.png");
    const stat_img = require("./assets/medal_icon.png");
    const bonus_img = require("./assets/star_icon.png");
    const tree_img = require("./assets/tree_img.png");

    const zIndex = (currentStep === 3 || currentStep === 5) ? 99 : 5

    return (
      <div className={styles.wrapper}>
        <div className={styles.footer_background} />
        <FooterMenuButton img={boosts_img} text="Бусты" left="6.4vw" to={PagesLinks.BOOSTS_URL} />
        <FooterMenuButton img={shop_img} text="Скины" left="24.27vw" to={PagesLinks.SHOP_URL} />
        <FooterMenuButton img={stat_img} text="Стата" left="60vw" to={PagesLinks.STATS_URL} />
        <FooterMenuButton img={bonus_img} text="Бонусы" left="77.87vw" to={PagesLinks.BONUS_URL} />
        {
          isHintActive.toMainButton && currentUrl === PagesLinks.GAME_URL && <FooterHintButton text={'На главную'} />
        }
        {
          isHintActive.toGameButton && currentUrl === PagesLinks.MAIN_URL && <FooterHintButton text={'Играть'} />
        }

        <div
          onClick={() =>
            currentUrl === PagesLinks.MAIN_URL
              ? navigate(PagesLinks.GAME_URL)
              : navigate(PagesLinks.MAIN_URL)
          }
          className={styles.main_button}
          style={{ zIndex }}
        >
          <img src={tree_img} alt="tree_img" />
        </div>
      </div>
    );
}