import { useDispatch, useSelector } from 'react-redux'
import { getFreeBoost } from '../../../pages/BoostsPage/service/getFreeBoost'
import styles from './freeBoostModal.module.scss'
import { actionSetUserDamage, actionSetUserEnergy } from '../../../state/reducers/userReducer/actions'
import { useNavigate } from 'react-router-dom'
import { PagesLinks } from '../../../shared/PagesLinks'
import { actionSetBoostsChargers, actionSetDamageBoostActive } from '../../../state/reducers/freeBoostsReducer/action'
import { useState } from 'react'
import { actionShowModal } from '../../../state/reducers/alertModalReducer/alertModalReducer'


export const FreeBoostModal = ({handleFreeBoostModalShow, id, type }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const maxEnergy = useSelector((state) => state.user.player.maxEnergy);
  const damage = useSelector((state) => state.user.player.damage);
  const rocket = require("../../assets/rocket.png");
  const energy = require("../../assets/energy.png");
  const close = require("../../assets/close.png");
  const token = useSelector((state) => state.user.token);

  const handleClick = () => {
    if (isLoading) return;
    setIsLoading(true);
    getFreeBoost(token, id)
      .then((res) => {
        if (type === "ENERGY_BOOST") {
          dispatch(actionSetUserEnergy(maxEnergy));
          handleFreeBoostModalShow();
          dispatch(actionShowModal("Энергия восполнена"))
        } else {
          dispatch(actionSetDamageBoostActive(true));
          dispatch(actionSetUserDamage(damage * 10));
          navigate(PagesLinks.GAME_URL);
          handleFreeBoostModalShow();
        }
        dispatch(actionSetBoostsChargers(id));
      })
      .catch((e) => {
        dispatch(actionShowModal("Сегодня вы уже использовали Супербуст!", "Набирайтесь сил и приходите завтра!"))
        })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className={styles.container}>
      <div className={styles.container_wrapper}>
        <button
          className={styles.container_wrapper_close_button}
          onClick={handleFreeBoostModalShow}
        >
          <img src={close} alt="close" />
        </button>
        <div className={styles.container_wrapper_image}>
          <img src={type === "ENERGY_BOOST" ? energy : rocket} alt="bundles" />
        </div>
        <div className={styles.container_wrapper_title}>
          Free буст {type === "ENERGY_BOOST" ? "энергии" : "лифов"}
        </div>
        <div className={styles.container_wrapper_text}>
          {type === "ENERGY_BOOST" ? (
            "Восполняет всю энергию"
          ) : (
            <span>
              х10 лифов за тап в секунду <br /> на 10 секунд
            </span>
          )}
        </div>
        <div className={styles.container_wrapper_subtitle}></div>
        <button
          style={{ opacity: isLoading ? 0.5 : 1 }}
          onClick={handleClick}
          className={styles.container_wrapper_button}
        >
          Получить
        </button>
      </div>
    </div>
  );
};