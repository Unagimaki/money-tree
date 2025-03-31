import styles from './HistoryButton.module.scss'

export const HistoryButton = ({handleHistory}) => {
    const clock = require('../../assets/clock.png')
    return(
        <button onClick={handleHistory} className={styles.container}>
            <div>История</div>
            <img src={clock} alt="clock"/>
        </button>
    )
}