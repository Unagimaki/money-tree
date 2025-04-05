import { useDispatch, useSelector } from 'react-redux'
import styles from './dailyBonusModal.module.scss'
import { actionSetModalVisible } from '../../../../../state/reducers/dailyBonusReducer/dailyBonusReducer'

export const DailyBonusModal = () => {
    const amount = useSelector(state => state.dailyBonus.currentPrize.amount)
    const dispatch = useDispatch()

    const money_icon = require('../../../assets/money_icon.png')

    const handleCloseModal = () => {
        dispatch(actionSetModalVisible(false))
    }

    return(
        <div className={styles.container}>
            <div className={styles.container_dark_background}/>
            <div className={styles.container_wrapper}>
                <div className={styles.container_wrapper_modal}>
                    <div className={styles.container_wrapper_modal_title}>Успешно</div>
                    <div className={styles.container_wrapper_modal_prize}>
                        <div className={styles.container_wrapper_modal_prize_amount}>+{amount}</div>
                        <img className={styles.container_wrapper_modal_prize_img} src={money_icon}  alt='img'/>
                    </div>
                    <button onClick={handleCloseModal} className={styles.container_wrapper_modal_button}>Закрыть</button>
                </div>
            </div>
        </div>
    )
}