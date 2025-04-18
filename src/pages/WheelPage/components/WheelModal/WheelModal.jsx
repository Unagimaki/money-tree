import { useDispatch, useSelector } from 'react-redux'
import styles from './wheelModal.module.scss'
import { actionSetModalVisible } from '../../../../state/reducers/wheelReducer/wheelReducer'
import { formatNumber } from '../../../../helpers/formatNumber'

export const WheelModal = () => {

    const ticket_img = require('../../assets/ticket_icon.png')
    const money_icon = require('../../assets/money_icon.png')
    const sponsor = require('../../assets/1win.png')
    const refresh_circle = require('../../assets/refresh-circle.png')

    const TICKETS = 'TICKETS'
    const RESPIN = 'RESPIN'
    const SPONSOR = 'SPONSOR'
    const LEAFS = 'LEAFS'

    const dispatch = useDispatch()

    const currentPrize = useSelector(state => state.wheel.currentPrize)

    const handleCloseModal = () => {
        dispatch(actionSetModalVisible(false))
    }

    const handleImage = () => {
        if (currentPrize.prizeType === TICKETS) {
            return ticket_img
        } else if (currentPrize.prizeType === RESPIN) {
            return refresh_circle
        } else if (currentPrize.prizeType === SPONSOR) {
            return sponsor
        } else {
            return money_icon
        }
    } 

    return(
        <div className={styles.container}>
            <div className={styles.container_dark_background}/>
            <div className={styles.container_wrapper}>
                <div className={styles.container_wrapper_modal}>
                    <div className={styles.container_wrapper_modal_title}>Успешно</div>
                    <div className={styles.container_wrapper_modal_prize}>
                        <div className={styles.container_wrapper_modal_prize_amount}>+{formatNumber(currentPrize.amount)}</div>
                        <img className={styles.container_wrapper_modal_prize_img} src={handleImage()} alt='img'/>
                    </div>
                    <button onClick={handleCloseModal} className={styles.container_wrapper_modal_button}>Закрыть</button>
                </div>
            </div>
        </div>
    )
}