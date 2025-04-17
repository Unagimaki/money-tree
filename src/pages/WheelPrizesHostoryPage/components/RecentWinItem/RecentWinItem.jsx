import { formatNumber } from '../../../../helpers/formatNumber'
import styles from './recentWinItem.module.scss'

export const RecentWinItem = ({value, prizeType, isUsed}) => {
    const money_icon = require('../../assets/money_icon.png')
    const refresh_circle = require('../../assets/refresh-circle.png')
    const ticket_icon = require('../../assets/ticket.png')

    const handleImage = () => {
        if (prizeType === 'LEAFS') {
            return money_icon
        } else if (prizeType === 'RESPIN') {
            return refresh_circle
        } else if (prizeType === 'TICKETS') {
            return ticket_icon
        }
    }

    return(
        <div className={styles.container}>
            <div className={styles.container_inner}>
                <img src={handleImage()} alt="money_icon"/>
                <div className={styles.container_inner_text}>{formatNumber(value)}</div>
            </div>
        </div>
    )
}