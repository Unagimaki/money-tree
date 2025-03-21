import { useNavigate } from 'react-router-dom'
import styles from './buyTicketButton.module.scss'
import { PagesLinks } from '../../../../shared/PagesLinks'

export const BuyTicketButton = () => {
    const navigate = useNavigate()
    return(
        <button onClick={() => navigate(PagesLinks.TICKET_SHOP_URL)} className={styles.container}>
            Купить билеты
        </button>
    )
}