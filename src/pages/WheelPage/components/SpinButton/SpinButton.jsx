import styles from './spinButton.module.scss'

export const SpinButton = ({onClick, isCanSpeen}) => {
    const refresh_icon = require('../../assets/refresh.png')

    return(
        <button 
            disabled={!isCanSpeen} 
            style={{opacity: !isCanSpeen ? .4 : 1}}
            onClick={onClick}
            className={styles.container}
        >
            <div className={styles.container_inner}>
                <div className={styles.container_inner_title}>Крутить колесо</div> 
            </div>
        </button>
    )
}