import styles from './spinButton.module.scss'

export const SpinButton = () => {
    const refresh_icon = require('../../assets/refresh.png')
    return(
        <button className={styles.container}>
            <div className={styles.container_inner}>
                <div className={styles.container_inner_title}>Крутить колесо</div> 
                <div className={styles.container_inner_text}>
                    <div>Удерживайте для автопрокрутки</div>
                    <img src={refresh_icon} alt="refresh_icon" />
                </div>
            </div>
        </button>
    )
}