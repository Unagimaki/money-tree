import { BetSelector } from './components/BetSelector/BetSelector'
import { BuyTicketButton } from './components/BuyTicketButton/BuyTicketButton'
import { CloseButton } from './components/CloseButton/CloseButton'
import { HistoryButton } from './components/HistoryButton/HistoryButton'
import { SpinButton } from './components/SpinButton/SpinButton'
import { TicketBalance } from './components/TicketBalance/TicketBalance'
import { WheelContainer } from './components/WheelContainer/WheelContainer'
import styles from './wheelPage.module.scss'

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
        </div>
    )
}