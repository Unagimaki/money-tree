import { useSelector } from 'react-redux'
import { speenWheel } from '../../services/spinWheel'
import styles from './spinButton.module.scss'

export const SpinButton = ({onClick, isCanSpeen}) => {
    const refresh_icon = require('../../assets/refresh.png')

    return(
        <button disabled={!isCanSpeen} style={{opacity: !isCanSpeen ? .4 : 1}} onClick={onClick} className={styles.container}>
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