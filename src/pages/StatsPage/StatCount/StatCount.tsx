import styles from './statCount.module.scss'

export const StatCount = () => {
    const money_icon = require('../assets/money_icon.png')
    return(
        <div className={styles.count}>
            <div className={styles.count_first}>
                <div className={styles.count_first_text}>1.000.000</div>
                <img className={styles.count_first_img} src={money_icon} alt="money_icon" /> 
            </div>
            <div>\</div>
            <div className={styles.count_first}>
                <div className={styles.count_first_text}>1.000.000</div>
                <img className={styles.count_first_img} src={money_icon} alt="money_icon" />
            </div>
        </div>
    )
}