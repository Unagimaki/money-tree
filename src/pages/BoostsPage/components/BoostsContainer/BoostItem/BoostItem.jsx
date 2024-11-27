import { useDispatch } from 'react-redux'
import styles from './boostItem.module.scss'
import { actionUpgradeBoostLevel } from '../../../../../state/reducers/boostsReducer/action'
import { actionSetUserBalance, actionSetUserDamage, actionSetUserEnergy, actionSetUserMaxEnergy, actionSetUserRegeneration } from '../../../../../state/reducers/userReducer/actions'
import { buyBoost } from '../../../service/buyBoost'
import { buyAutoBotLevel } from '../../../service/buyAutoBotLevel'
import { actionUpdateAutoBotLevel } from '../../../../../state/reducers/autobotReducer/action'
import { formatNumber } from '../../../../../helpers/formatNumber'
import { useState } from 'react'

export const BoostItem = ({
  currentLevel,
  type,
  level,
  price,
  boostId,
  boostLevelId,
  token,
  text,
  title,
  handleAlertModalShow,
}) => {
  const money_icon = require("../../../assets/money_icon.png");
  const autobot = require("../../../assets/autobot.png");
  const energy = require("../../../assets/energy.png");
  const damage = require("../../../assets/damage.png");
  const regeneration = require("../../../assets/regeneration.png");

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const buyBoostItem = () => {
    if (currentLevel == 10 || isLoading) return;
    setIsLoading(true);
    buyBoost(token, boostId, boostLevelId)
      .then((res) => {
        const updatedPlayer = res.data.updatedPlayer;
        dispatch(actionUpgradeBoostLevel(type));
        dispatch(actionSetUserBalance(updatedPlayer.balance));
        dispatch(actionSetUserDamage(updatedPlayer.damage));
        dispatch(actionSetUserEnergy(updatedPlayer.energy));
        dispatch(actionSetUserMaxEnergy(updatedPlayer.maxEnergy));
        dispatch(actionSetUserRegeneration(updatedPlayer.regeneration));
        setIsLoading(false);
        handleAlertModalShow("Буст успешно куплен", "", "success");
      })
      .catch((e) => {
        e.response.status === 409
          ? handleAlertModalShow(
              "Недостаточно средств!",
              "Продолжайте копить лифы!",
              "warning"
            )
          : handleAlertModalShow("Ошибка при покупке", "", "warning");
        setIsLoading(false);
      })
  };
  const buyBotItem = () => {
    if (currentLevel == 10 || isLoading) return;
    setIsLoading(true);
    buyAutoBotLevel(token, boostId, boostLevelId)
      .then((res) => {
        dispatch(actionUpdateAutoBotLevel());
        dispatch(actionSetUserBalance(res.data.updatedPlayer.balance));
        setIsLoading(false);
        handleAlertModalShow("Буст успешно куплен", "", "success");
      })
      .catch((e) => {
        e.response.status === 409
          ? handleAlertModalShow(
              "Недостаточно средств!",
              "Продолжайте копить лифы!",
              "warning"
            )
          : handleAlertModalShow("Ошибка при покупке", "", "warning");
        setIsLoading(false);
      })
  };
  const setImage = () => {
    switch (type) {
      case "DAMAGE":
        return damage;
      case "REGENERATION":
        return regeneration;
      case "ENERGY":
        return energy;
      case "AUTOBOT":
        return autobot;
      default:
        return autobot;
    }
  };

  const setDescription = () => {
    switch (type) {
      case "DAMAGE":
        return "Урон за тап";
      case "REGENERATION":
        return "Энергия";
      case "ENERGY":
        return "Объем";
    }
  };

  return (
    <div className={styles.item}>
      <div className={styles.item_level}>
        {currentLevel !== 10 ? currentLevel + 1 : currentLevel} lvl
      </div>
      <div className={styles.item_img}>
        <img src={setImage()} alt="imgURL" />
      </div>
      <div className={styles.item_title}>{title}</div>
      <div className={styles.item_text}>
        <div className={styles.item_text_description}>
          {type === "AUTOBOT" ? "Фармит" : setDescription()}
        </div>
        {currentLevel !== 10 && (
          <div className={styles.item_text_info}>
            <div>+{level}</div>
            <img
              src={type === "AUTOBOT" ? money_icon : setImage()}
              alt="imgURL"
            />
          </div>
        )}
      </div>
      <button
        style={{ opacity: isLoading ? 0.5 : 1 }}
        onClick={type !== "AUTOBOT" ? buyBoostItem : buyBotItem}
        className={styles.item_button}
      >
        <div>
          {currentLevel > 0 && price
            ? "Апнуть за"
            : currentLevel === 0
            ? "Купить за"
            : "Максимум"}
          &nbsp;{formatNumber(price)}
        </div>
        <img src={money_icon} alt="money_icon" />
      </button>
    </div>
  );
};