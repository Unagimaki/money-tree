import { useDispatch, useSelector } from 'react-redux'
import styles from './offerModal.module.scss'
import { actionSetOfferDone, actionSetOfferModalVisible } from '../../../../state/reducers/offersReducer/actions'
import { useState } from 'react'
import { actionIncreaseUserBalance } from '../../../../state/reducers/userReducer/actions'
import { baseURL, WebApp } from '../../../../App'
import { updatedUrl } from '../../helpers/updatedUrl'
import { hasTargetWord } from '../../helpers/hasTargetWord'
import { formatNumber } from '../../../../helpers/formatNumber'
import { completeOffer } from '../../services/completeOffer'
import { actionShowModal } from '../../../../state/reducers/alertModalReducer/alertModalReducer'

export const OfferModal = () => {
  const [containerClass, setContainerClass] = useState(styles.container);
  const [isLoadingOffer, setIsLoadingOffer] = useState(false);
  const [isChecking, setIsChecking] = useState(false)
  const state = useSelector((state) => state);
  console.log(state);

  const dispatch = useDispatch();
  const offers = useSelector((state) => state.offers);
  const title = useSelector((state) => state.offers.title);
  const text = useSelector((state) => state.offers.text);
  const id = useSelector((state) => state.offers.id);
  const token = useSelector((state) => state.user.token);
  const reward = useSelector((state) => state.offers.reward);
  const url = useSelector((state) => state.offers.url);
  const terms = useSelector((state) => state.offers.terms);
  const imgUrl = useSelector((state) => state.offers.imgUrl);
  const tgId = useSelector((state) => state.user.player.tgId);
  const isCompleted = offers.offers.find((item) => item.id === id).isCompleted;

  const winline_rect_logo = require("../../assets/winline_rect.png");
  const close = require("../../assets/close.png");
  const money_icon = require("../../assets/money.png");
  const limited_img = require("../../assets/limited.png");

  const handleClickClose = () => {
    setContainerClass(styles.container_hide);
    setTimeout(() => dispatch(actionSetOfferModalVisible(false)), 500);
    setTimeout(() => setContainerClass(styles.container), 500);
  };

  const handleClickDone = () => {
    if (isCompleted) return;
    setIsLoadingOffer(true);
    setIsChecking(true)
    completeOffer(token, id)    
      .then(() => {
        dispatch(actionShowModal('Задание выполнено'))
        dispatch(actionIncreaseUserBalance(reward));
        dispatch(actionSetOfferDone(id));
      })
      .catch((e) => {
        e.response.status === 409
          ? dispatch(actionShowModal('Вы уже выполнили это задание!'))
          : dispatch(actionShowModal('Ошибка при проверке!'))
      })
      .finally(() => {
        setIsChecking(false)
        setIsLoadingOffer(false)
      });
  };
  
  const handleCheck = () => {
    if (url.startsWith("https://t.me/")) {
      WebApp.openTelegramLink(url);
    } else {
      WebApp.openLink(updatedUrl(url, "clickid", tgId));
    }
  };

  return (
    <div className={containerClass}>
      {hasTargetWord("депозит", title) && (
        <img
          className={styles.container_limited_img}
          src={limited_img}
          alt="limited_img"
        />
      )}
      <div className={styles.container_wrapper}>
        <div className={styles.container_wrapper_image}>
          <img
            style={{
              width: `${
                !hasTargetWord("winline", title) ? "min(34.67vw, 130px)" : ""
              } `,
            }}
            src={
              hasTargetWord("winline", title)
                ? winline_rect_logo
                : `https://${baseURL}/directus/assets/${imgUrl}`
            }
            alt="offer-image"
          />
        </div>

        <div className={styles.container_wrapper_title}>{title}</div>
        <div className={styles.container_wrapper_text}>{text}</div>
        {terms !== "_" && terms !== "terms" && terms && (
          <div className={styles.container_wrapper_terms}>
            {terms.replace(/\/n\//g, '\n').split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        )}

        <button
          onClick={handleCheck}
          style={{ opacity: `${isCompleted || isLoadingOffer ? 0.2 : 1}` }}
          className={styles.container_wrapper_complete_button}
        >
          {!isLoadingOffer && (isCompleted ? "Выполнено" : "Выполнить")}
          {isLoadingOffer && "Проверяю"}
        </button>

        <button
          className={styles.container_wrapper_close_button}
          onClick={handleClickClose}
        >
          <img src={close} alt="close" />
        </button>

        <div className={styles.container_wrapper_reward}>
          <img
            className={styles.container_wrapper_reward_img}
            src={money_icon}
            alt="money_icon"
          />
          <div className={styles.container_wrapper_reward_title}>
            {formatNumber(reward)}
          </div>
        </div>
        {!isCompleted && (
          <button
            onClick={handleClickDone}
            className={styles.container_wrapper_done_button}
            disabled={isChecking}
          >
            Проверить
          </button>
        )}
      </div>
    </div>
  );
};