import styles from './BalanceModule.module.scss'

export const BalanceModule = () => {
    const img  = require('./assets/money_icon.png')
    return(
        <div className={styles.balance}>
            <img className={styles.balance_img} src={img} alt="money_icon" />
            <div className={styles.balance_text}>
                126,147,475
            </div>
        </div>
    )
}