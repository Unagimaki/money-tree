import styles from './prizeSelector.module.scss'

export const PrizeSelector = () => {
    const prize_select = require('../../assets/prize_select.png')
    return(
        <div className={styles.container}>
            <img src={prize_select} alt="prize_select" />
        </div>
    )
}