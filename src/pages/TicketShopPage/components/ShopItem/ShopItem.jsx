import { useDispatch } from 'react-redux'
import { buyTicket } from '../../service/buyTicket'
import styles from './shopItem.module.scss'
import { actionSetUserBalance, actionSetUserTickets } from '../../../../state/reducers/userReducer/actions'
import { actionShowModal } from '../../../../state/reducers/alertModalReducer/alertModalReducer'
import { useState } from 'react'

export const ShopItem = ({id, price, tickets, token, showModal, isModalVisible}) => {
    const ticket_icon = require('../../assets/ticket_icon.png')
    const money_icon = require('../../assets/money_icon.png')
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch()

    const handleBuy = (id, token) => {
        setIsLoading(true)
        buyTicket(id, token)
        .then(res => {
            console.log(res)
            dispatch(actionSetUserTickets(res.data.totalTickets))
            dispatch(actionSetUserBalance(res.data.playerNewBalance))
            showModal(tickets)
        })
        .catch(e => {
            dispatch(actionShowModal('Ошибка при покупке'))
        })
        .finally(() => setIsLoading(false))
    }
    
    return(
        <div className={styles.container}>
            <div className={styles.container_inner}>
                <div className={styles.container_inner_tickets}>
                    <img src={ticket_icon} alt="ticket_icon" />
                    <div>{tickets}</div>
                </div>
                <button disabled={isLoading} style={{opacity: isLoading ? .5 : 1}} onClick={() => handleBuy(id, token)} className={styles.container_inner_price_button}>
                    <img src={money_icon} alt="money_icon" />
                    <div>{price}</div>
                </button>
            </div>
        </div>
    )
}