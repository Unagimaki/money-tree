import styles from './skinItem.module.scss'

export const SkinItem = () => {
    const money_icon = require('../assets/money_icon.png')
    const dragon = require('../assets/dragon.png')
    return(
        <div className={styles.skin_item}>
            <div className={styles.skin_item_lvl}>1 lvl</div>
            <div className={styles.skin_item_img}>
                <img src={dragon} alt="dragon" />
            </div>
            <div className={styles.skin_item_name}>Наименование</div>
            <div className={styles.skin_item_profit}>
                <div className={styles.skin_item_profit_text}>
                    Доход в час
                </div>
                <div className={styles.skin_item_profit_count}>
                    <img src={money_icon} alt="money_icon"/>
                    <span>+20%</span>
                </div>
            </div>
            <button className={styles.skin_item_button}>
                <div className={styles.skin_item_button_text}>
                    Купить за 1000
                </div>
                <img src={money_icon} alt="money_icon" />
            </button>
        </div>
    )
}