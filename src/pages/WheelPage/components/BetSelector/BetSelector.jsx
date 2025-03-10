import styles from './betSelector.module.scss'

export const BetSelector = () => {
    const arrowLeft =require('../../assets/arrow-left.png')
    const arrowRight =require('../../assets/arrow-right.png')
    const ticket_icon = require('../../assets/ticket_icon.png')

    return(
        <div className={styles.container}>
            <div className={styles.container_inner}>
                <div className={styles.container_inner_button}>
                    <img src={arrowLeft} alt="arrowLeft" />
                </div>
                <div className={styles.container_inner_currentBet}>
                    <div className={styles.container_inner_currentBet_amount}>0</div>
                    <img src={ticket_icon} alt="ticket_icon" />
                </div>
                <div className={styles.container_inner_button}>
                    <img src={arrowRight} alt="arrowRight" />
                </div>
            </div>
        </div>
    )
}