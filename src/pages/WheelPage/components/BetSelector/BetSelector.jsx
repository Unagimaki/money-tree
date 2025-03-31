import { useEffect, useState } from 'react'
import styles from './betSelector.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getPrizes } from '../../services/getPrizes'
import { actionSetPrizes } from '../../../../state/reducers/wheelReducer/wheelReducer'
import { actionShowModal } from '../../../../state/reducers/alertModalReducer/alertModalReducer'

export const BetSelector = ({onDataChange, isCanSpeen}) => {
    const arrowLeft = require('../../assets/arrow-left.png')
    const arrowRight = require('../../assets/arrow-right.png')
    const ticket_icon = require('../../assets/ticket_icon.png')
    const dispatch = useDispatch()
    const ticketBalance = useSelector(state => state.user.player.tickets)
    const token = useSelector(state => state.user.token)
    const [currentBet, setCurrentBet] = useState(1)

    const incrementBet = () => {
        if (!isCanSpeen) return
        if (currentBet == ticketBalance) {
            dispatch(actionShowModal('Недостаточно билетов'))
        } else {
            setCurrentBet(currentBet => currentBet + 1)
        }
    }
    const decrementBet = () => {
        if (!isCanSpeen) return
        currentBet !== 1 && setCurrentBet(currentBet => currentBet - 1)
    }

    useEffect(() => {
        if (!isCanSpeen) return
        onDataChange(currentBet)
        getPrizes(token, currentBet)
        .then(res => {
            dispatch(actionSetPrizes(res.data))
        })
    }, [currentBet])





    return(
        <div className={styles.container}>
            <div className={styles.container_inner}>
                <button style={{opacity: isCanSpeen ? 1 : 0.6}} onClick={decrementBet} className={styles.container_inner_button}>
                    <img src={arrowLeft} alt="arrowLeft" />
                </button>
                <div className={styles.container_inner_currentBet}>
                    <div className={styles.container_inner_currentBet_amount}>{currentBet}</div>
                    <img src={ticket_icon} alt="ticket_icon" />
                </div>
                <button style={{opacity: isCanSpeen ? 1 : 0.6}} onClick={incrementBet} className={styles.container_inner_button}>
                    <img src={arrowRight} alt="arrowRight" />
                </button>
            </div>
        </div>
    )
}