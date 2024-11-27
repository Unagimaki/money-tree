import { useSelector } from 'react-redux'
import styles from './freeBoostItem.module.scss'


export const FreeBoostItem = ({handleAlertModalShow, type, id, handleFreeBoostModalShow, title}) => {
    const roket_img = require('../../../assets/rocket_icon.png')
    const energy_img = require('../../../assets/energy_icon.png')
    const text = type !== 'ENERGY_BOOST' ? 'х10 лифов за тап в секунду на 10 секунд' : 'Восполняет всю энергию'
    const img = type !== "ENERGY_BOOST" ? roket_img : energy_img
    const freeBoosts = useSelector(state => state.freeBoosts.freeBoosts)
    const charges = freeBoosts.find(item => item.id === id).charge

    const handleUseFreeBoost = () => {
        charges !== 0
          ? handleFreeBoostModalShow(id, type)
          : handleAlertModalShow(
              "Сегодня вы уже использовали Супербуст!",
              "Набирайтесь сил и приходите завтра!"
            );
    }

    return (
      <div onClick={handleUseFreeBoost} className={styles.boost_item}>
        <div
          style={{ filter: `${charges === 0 ? "grayscale(100%)" : ""} ` }}
          className={styles.boost_item_img_container}
        >
          <img src={img} alt={type} />
        </div>
        <div
          style={{ color: `${charges === 0 ? "#393939" : ""}` }}
          className={styles.boost_item_info}
        >
          <div className={styles.boost_item_info_title}>{title}</div>
          <div className={styles.boost_item_info_text}>{text}</div>
        </div>
      </div>
    );
}