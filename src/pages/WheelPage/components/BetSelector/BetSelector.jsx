import { useEffect, useState } from 'react'
import styles from './betSelector.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getPrizes } from '../../services/getPrizes'
import { actionSetPrizes } from '../../../../state/reducers/wheelReducer/wheelReducer'
import { actionShowModal } from '../../../../state/reducers/alertModalReducer/alertModalReducer'

export const BetSelector = ({onDataChange, isSpeeningNow}) => {
    const arrowLeft = require('../../assets/arrow-left.png')
    const arrowRight = require('../../assets/arrow-right.png')
    const ticket_icon = require('../../assets/ticket_icon.png')
    const dispatch = useDispatch()
    const ticketBalance = useSelector(state => state.user.player.tickets)
    const token = useSelector(state => state.user.token)
    const [currentBet, setCurrentBet] = useState(1)


    const betSteps = [1, 5, 10, 20, 30, 40, 50]

    const incrementBet = () => {
        if (isSpeeningNow) return

        const currentIndex = betSteps.indexOf(currentBet)
        if (currentIndex === betSteps.length - 1) {
            dispatch(actionShowModal('Максимальная сумма прокрутки 50 билетов'))
            return
        }

        const nextBet = betSteps[currentIndex + 1]
        if (nextBet > ticketBalance) {
            dispatch(actionShowModal('Недостаточно билетов'))
            return
        }

        setCurrentBet(nextBet)
    }

    const decrementBet = () => {
        if (isSpeeningNow) return

        const currentIndex = betSteps.indexOf(currentBet)
        if (currentIndex > 0) {
            setCurrentBet(betSteps[currentIndex - 1])
        }
    }


    useEffect(() => {
        if (isSpeeningNow) return
        onDataChange(currentBet)
        getPrizes(token, currentBet)
        .then(res => {
            dispatch(actionSetPrizes(res.data))
        })
    }, [currentBet])





    return(
        <div className={styles.container}>
            <div className={styles.container_inner}>
                <button style={{opacity: !isSpeeningNow ? 1 : 0.6}} onClick={decrementBet} className={styles.container_inner_button}>
                    <img src={arrowLeft} alt="arrowLeft" />
                </button>
                <div className={styles.container_inner_currentBet}>
                    <div className={styles.container_inner_currentBet_amount}>{currentBet}</div>
                    <img src={ticket_icon} alt="ticket_icon" />
                </div>
                <button style={{opacity: !isSpeeningNow ? 1 : 0.6}} onClick={incrementBet} className={styles.container_inner_button}>
                    <img src={arrowRight} alt="arrowRight" />
                </button>
            </div>
        </div>
    )
}