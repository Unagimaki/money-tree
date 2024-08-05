import { FC } from 'react'
import styles from './boostModal.module.scss'

interface props {
    boostModalIsVisible: boolean
    handleModal?: () => void
}

export const BoostModal: FC<props> = ({boostModalIsVisible, handleModal}) => {
    const close = require('../assets/close.png')
    const rocket = require('../assets/rocket_icon.png')
    
    return(
        <div className={`${styles.modal} ${boostModalIsVisible ? styles.visible : styles.hidden}`}>
            <button onClick={handleModal} className={styles.modal_close}>
                <img src={close} alt="close" />
            </button>
            <div className={styles.modal_img}>
                <img src={rocket} alt="rocket" />
            </div>
            <div className={styles.modal_title}>Free буст монет</div>
            <div className={styles.modal_subtitle}>х10 монет за тап в секунду на <br/> 10 секунд</div>
            <div className={styles.modal_free}>Бесплатно</div>
            <button className={styles.modal_button}>Получить</button>
        </div>
    )
}