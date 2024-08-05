import { FC } from 'react'
import styles from './BalanceModule.module.scss'

interface props {
    top?: string
}

export const BalanceModule: FC<props> = ({top}) => {
    const img  = require('./assets/money_icon.png')
    return(
        <div style={{top: top}} className={styles.balance}>
            <img className={styles.balance_img} src={img} alt="money_icon" />
            <div className={styles.balance_text}>
                126,147,475
            </div>
        </div>
    )
}