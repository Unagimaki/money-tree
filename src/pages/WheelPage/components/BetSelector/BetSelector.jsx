import { useState } from 'react'
import styles from './betSelector.module.scss'
import { useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const BetSelector = () => {
    const arrowLeft = require('../../assets/arrow-left.png')
    const arrowRight = require('../../assets/arrow-right.png')
    const ticket_icon = require('../../assets/ticket_icon.png')
    const ticketBalance = useSelector(state => state.user.player.tickets)

    const [currentBet, setCurrentBet] = useState(0)

    const incrementBet = () => {
        currentBet < ticketBalance && setCurrentBet(currentBet => currentBet + 1)
    }
    const decrementBet = () => {
        currentBet !== 0 && setCurrentBet(currentBet => currentBet - 1)
    }



    return(
        <div className={styles.container}>
            <div className={styles.container_inner}>
                <button onClick={decrementBet} className={styles.container_inner_button}>
                    <img src={arrowLeft} alt="arrowLeft" />
                </button>
                <div className={styles.container_inner_currentBet}>
                    <div className={styles.container_inner_currentBet_amount}>{currentBet}</div>
                    <img src={ticket_icon} alt="ticket_icon" />
                </div>
                <button onClick={incrementBet} className={styles.container_inner_button}>
                    <img src={arrowRight} alt="arrowRight" />
                </button>
            </div>
        </div>
    )
}