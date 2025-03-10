import styles from './HistoryButton.module.scss'

export const HistoryButton = () => {
    const clock = require('../../assets/clock.png')
    return(
        <div className={styles.container}>
            <div>История</div>
            <img src={clock} alt="clock"/>
        </div>
    )
}