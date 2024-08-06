import styles from './statButton.module.scss'

export const StatButton = () => {
    const tether = require('../assets/tether.png')
    return(
        <button className={styles.button}>
            <div className={styles.button_text}>Вывод USDT &nbsp;</div>
            <img className={styles.button_icon} src={tether} alt="tether" />
        </button>
    )
}