import { useNavigate } from 'react-router-dom'
import { PagesLinks } from '../../shared/PagesLinks'
import { BetSelector } from './components/BetSelector/BetSelector'
import { BuyTicketButton } from './components/BuyTicketButton/BuyTicketButton'
import { CloseButton } from './components/CloseButton/CloseButton'
import { HistoryButton } from './components/HistoryButton/HistoryButton'
import { SpinButton } from './components/SpinButton/SpinButton'
import { TicketBalance } from './components/TicketBalance/TicketBalance'
import { WheelContainer } from './components/WheelContainer/WheelContainer'
import styles from './wheelPage.module.scss'
import { BackButton } from '@vkruglikov/react-telegram-web-app'


const handleBackButtonClick = ({navigate}) => {
    navigate("/main");
}


export const WheelPage = () => {
    return(
        <div className={styles.container}>
            <CloseButton/>
            <TicketBalance/>
            <WheelContainer/>
            <BetSelector/>
            <SpinButton/>
            <div className={styles.container_buttons}>
                <HistoryButton/>
                <BuyTicketButton/>
            </div>
            <BackButton onClick={handleBackButtonClick} />
        </div>
    )
}