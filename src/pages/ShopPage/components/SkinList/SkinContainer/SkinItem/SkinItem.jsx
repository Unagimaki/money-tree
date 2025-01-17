import { useEffect, useState } from 'react'
import styles from './skinItemBlocked.module.scss'
import { buySkin } from '../../../../service/buySkin'
import { useDispatch, } from 'react-redux'
import { actionIncrementShopItemLevel } from '../../../../../../state/reducers/shopReducer/actions'
import { actionSetUserBalance, actionSetUserDamage, actionSetUserEnergy, actionSetUserMaxEnergy } from '../../../../../../state/reducers/userReducer/actions'
import { formatNumber } from '../../../../../../helpers/formatNumber'
import { baseURL } from '../../../../../../App'

export const SkinItem = ({
    currentLevel,
    shopItemLevel,
    price,
    title,
    upgrade,
    referralRequiredAmount,
    playerReferralsCount,
    shopItemLevelId,
    token,
    shopItemId,
    userBalance,
    fileId,
    handleAlertModalShow,
    type
}) => {
    const dispatch = useDispatch()
    const money_icon = require(`../assets/money_icon.png`)
    const lock = require('../assets/lock.png')
    const [isLoading, setIsLoading] = useState(false)

    const [isReferralCountEnough, setIsReferralCountEnough] = useState(false)
    const [isPreviousLevelPurchased, setIsPreviousLevelPurchased] = useState(false)
    const [isEnoughBalance, setIsEnoughBalance] = useState(false)
    const [isItemAlreadyPurchased, setIsItemAlreadyPurchased] = useState(false)

    useEffect(() => {        
      setIsEnoughBalance(userBalance >= price)
      setIsReferralCountEnough(playerReferralsCount >= referralRequiredAmount)
      setIsPreviousLevelPurchased(shopItemLevel === 1 || currentLevel === shopItemLevel - 1)
      setIsItemAlreadyPurchased(currentLevel >= shopItemLevel)
    }, [userBalance, playerReferralsCount, currentLevel, price, referralRequiredAmount, shopItemLevel])

    
    const handleBuy = (token, shopItemId, shopItemLevelId) => {
        if (isLoading) return
        setIsLoading(true)
        buySkin(token, shopItemId, shopItemLevelId)
          .then((res) => {
            console.log(res);
            const updatedPlayer = res.data.updatedPlayer;
            dispatch(actionSetUserBalance(updatedPlayer.balance));
            dispatch(actionIncrementShopItemLevel(shopItemId));
            dispatch(actionSetUserDamage(updatedPlayer.damage));
            dispatch(actionSetUserEnergy(updatedPlayer.energy));
            dispatch(actionSetUserMaxEnergy(updatedPlayer.maxEnergy));
            handleAlertModalShow(`Скин успешно куплен", "", "success`);
            handleAlertModalShow(`${res.data.message}`, "", "success");

            // осталось сделать апдейт бота
          })
          .catch(() => handleAlertModalShow("Ошибка при покупке", "", "warning"))
          .finally(() => setIsLoading(false));
    }

    const setDescription = () => {
      switch (type) {
        case 'DAMAGE':
            return 'Лифов за тап'
        case 'REGENERATION':
            return 'Энергия в сек'
        case 'ENERGY':
            return 'Объем'
        case 'AUTOBOT':
            return 'Эффективность'
      }
    }

    return (
      <div
        className={`${styles.skin_item} ${
          !isPreviousLevelPurchased && !isItemAlreadyPurchased
            ? styles.show_after
            : ""
        }`}
      >
        <div className={styles.skin_item_lvl}>{shopItemLevel} lvl</div>
        {!isPreviousLevelPurchased && !isItemAlreadyPurchased && (
          <img className={styles.skin_item_lock} src={lock} alt="lock" />
        )}

        <img
          className={styles.skin_item_image}
          src={`https://${baseURL}/directus/assets/${fileId}`}
          alt="shopImg"
        />
        <div className={styles.skin_item_name}>{title}</div>
        {(
          <div className={styles.skin_item_description}>
            <div className={styles.skin_item_description_text}>
              {setDescription()}
            </div>
            <div className={styles.skin_item_description_inner}>
              <img
                className={styles.skin_item_description_img}
                src={money_icon}
                alt="money_icon"
              />
              <div>+{upgrade}%</div>
            </div>
          </div>
        )}

        {isReferralCountEnough &&
          isPreviousLevelPurchased &&
          isEnoughBalance &&
          !isItemAlreadyPurchased && (
            <button
              style={{ opacity: isLoading ? 0.5 : 1 }}
              onClick={() => handleBuy(token, shopItemId, shopItemLevelId)}
              className={styles.skin_item_button}
            >
              <div className={styles.skin_item_button_text}>
                {formatNumber(price)}
              </div>
              <img src={money_icon} alt="money_icon" />
            </button>
          )}
        {isItemAlreadyPurchased && (
          <div className={styles.skin_item_button}>
            <div className={styles.skin_item_button_text}>Куплено</div>
          </div>
        )}
        {(!isEnoughBalance ||
          !isReferralCountEnough ||
          !isPreviousLevelPurchased) &&
          !isItemAlreadyPurchased && (
            <div
              style={{
                background: `${
                  isPreviousLevelPurchased && !isItemAlreadyPurchased
                    ? "#2D2D2D"
                    : "linear-gradient(45deg, #202020 0%, #171E17 100%)"
                }`,
              }}
              className={styles.skin_item_info}
            >
              {!isReferralCountEnough && (
                <div>
                  Пригласи{" "} + {" "}
                  <span>
                    {referralRequiredAmount - playerReferralsCount < 0
                      ? 0
                      : referralRequiredAmount - playerReferralsCount}{" "}
                    {referralRequiredAmount - playerReferralsCount < 5 ? 'друга' : 'друзей'}
                  </span>
                </div>
              )}
              {price > 0 && (
                <div>
                  <span>{formatNumber(price)}</span>{" "}
                  <img src={money_icon} alt="money_icon" />{" "}
                </div>
              )}
              {!isPreviousLevelPurchased &&
                isEnoughBalance &&
                isReferralCountEnough && <div>Купи предыдущий</div>}
            </div>
          )}
      </div>
    );
}