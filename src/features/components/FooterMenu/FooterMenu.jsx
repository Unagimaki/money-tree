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
  const leaf_fall_blue = require("./assets/leaf_fall_blue.mp4");
  const leaf_fall_orange = require("./assets/leaf_fall_orange.mp4");
   
  const tree_blue_img = require("./assets/tree_blue_img.png");
  const boosts_img = require("./assets/boosts_icon.png");
  const shop_img = require("./assets/basket_icon.png");
  const stat_img = require("./assets/medal_icon.png");
  const bonus_img = require("./assets/star_icon.png");
  const game_yellow_img = require("./assets/game_yellow_img.png");
  const game_blue_img = require("./assets/game_blue_img.png");

  const setMainButtonBackground = () => {
    if (currentUrl !== PagesLinks.GAME_URL && currentUrl !== PagesLinks.MAIN_URL) {
      return tree_blue_img
    }
  }

  const zIndex = (currentStep === 3 || currentStep === 5) ? 98 : 5

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
        style={{ zIndex, backgroundImage: `url(${setMainButtonBackground()})` }}
      />
        {
          currentUrl === PagesLinks.MAIN_URL &&
          <video
          onClick={() =>
          currentUrl === PagesLinks.MAIN_URL
            ? navigate(PagesLinks.GAME_URL)
            : navigate(PagesLinks.MAIN_URL)
          } style={{border: 'min(1.27vw, 4.75px) solid #1492A5'}} autoPlay loop muted
            onLoadedData={() => console.log('loaded')} // Вызываем при загрузке видео
            className={styles.main_video}>
            <source src={leaf_fall_blue} type="video/mp4" />
            Ваш браузер не поддерживает видео.
          </video>
        }
        {
          currentUrl === PagesLinks.GAME_URL &&
          <video
            onClick={() =>
              currentUrl === PagesLinks.MAIN_URL
              ? navigate(PagesLinks.GAME_URL)
              : navigate(PagesLinks.MAIN_URL)
              }
            style={{border: 'min(1.27vw, 4.75px) solid #F9F117'}} autoPlay loop muted className={styles.main_video}>
            <source src={leaf_fall_orange} type="video/mp4" />
             Ваш браузер не поддерживает видео.
          </video>
        }
    </div>
  )
}