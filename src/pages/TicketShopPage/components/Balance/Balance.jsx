import { useSelector } from 'react-redux'
import styles from './Balance.module.scss'


export const Balance = () => {
    const ticket_icon = require('../../assets/money_icon.png')
    const balance = useSelector(state => state.user.player.balance)
    return(
        <div className={styles.container}>
            <div className={styles.container_inner}>
                <img src={ticket_icon} alt="ticket_icon" />
                <div className={styles.container_inner_balance}>{balance}</div>
            </div>
        </div>
    )
}