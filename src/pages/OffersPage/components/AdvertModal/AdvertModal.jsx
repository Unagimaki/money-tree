import { useDispatch } from 'react-redux'
import styles from './advertModal.module.scss'
import { AdvertReward } from './components/AdvertReward/AdvertReward'
import { AdvertRools } from './components/AdvertRools/AdvertRools'
import { actionHideAdvertModal } from '../../../../state/reducers/advertModalReducer/advertModalReducer'
import { useState } from 'react'

export const AdvertModal = () => {
    const logo = require('../../assets/winline_rect.png')
    const orange = require('../../assets/orange.png')
    const close = require('../../assets/close_btn.png')
    const dispatch = useDispatch()
    const [isHiding, setIsHiding] = useState(false)


    const handleHideAdvertModal = () => {
        // Устанавливаем флаг для запуска анимации
        setIsHiding(true)

        // Время анимации (в миллисекундах)
        const animationDuration = 1000; // Заменить на фактическое время анимации в твоем CSS

        // Используем setTimeout для выполнения действия после завершения анимации
        setTimeout(() => {
            dispatch(actionHideAdvertModal()) // Выполняем диспатч после анимации
        }, animationDuration)
    }

    return(
        <div className={`${styles.container} ${isHiding ? styles.hide : ''}`}>
            <img className={styles.container_orange} src={orange} alt="orange"/>
            <div className={styles.container_inner}>
                <img className={styles.container_inner_logo} src={logo} alt="logo"/>
                <AdvertRools/>
                <AdvertReward/>
                <button className={styles.container_inner_button}>Привязать аккаунт</button>
                <button onClick={handleHideAdvertModal} className={styles.container_inner_close}>
                    <img src={close} alt="close" />
                </button>
            </div>
        </div>
    )
}