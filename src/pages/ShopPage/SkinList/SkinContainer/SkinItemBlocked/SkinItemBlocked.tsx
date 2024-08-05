import styles from './skinItemBlocked.module.scss'

export const SkinItemBlocked = () => {
    const money_icon = require('../assets/money_icon.png')
    const lock = require('../assets/lock.png')
    const dragon = require('../assets/dragon.png')
    return(
        <div className={styles.skin_item}>
            <div className={styles.skin_item_lvl}>2 lvl</div>
            <img className={styles.skin_item_lock} src={lock} alt="lock"/>
            <div className={styles.skin_item_img}>
                <img src={dragon} alt="dragon" />
            </div>
            <div className={styles.skin_item_name}>Наименование</div>

            <button className={styles.skin_item_button}>
                <div className={styles.skin_item_button_text}>
                    <div>
                        Пригласи &nbsp;<span>8 друзей</span>
                    </div>
                    <div>
                        <span>1.000.000 &nbsp;</span><img src={money_icon} alt="money_icon" />
                    </div>                    
                </div>
            </button>
        </div>
    )
}