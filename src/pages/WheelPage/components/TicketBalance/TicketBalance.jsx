import { useSelector } from 'react-redux'
import styles from './TicketBalance.module.scss'


export const TicketBalance = () => {
    const ticket_icon = require('../../assets/ticket_icon.png')
    const ticket_balance = useSelector(state => state.user.player.tickets)
    return(
        <div className={styles.container}>
            <div className={styles.container_inner}>
                <img src={ticket_icon} alt="ticket_icon" />
                <div className={styles.container_inner_balance}>{ticket_balance}</div>
            </div>
        </div>
    )
}