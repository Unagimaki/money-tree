import { useDispatch, useSelector } from 'react-redux'
import { BuyTicketButton } from './components/BuyTicketButton/BuyTicketButton'
import { CloseButton } from './components/CloseButton/CloseButton'
import { HistoryButton } from './components/HistoryButton/HistoryButton'
import { TicketBalance } from './components/TicketBalance/TicketBalance'
import { WheelContainer } from './components/WheelContainer/WheelContainer'
import styles from './wheelPage.module.scss'
import { BackButton } from '@vkruglikov/react-telegram-web-app'
import { getPrizes } from './services/getPrizes'
import { useEffect } from 'react'
import { actionSetPrizes } from '../../state/reducers/wheelReducer/wheelReducer'
import { WheelModal } from './components/WheelModal/WheelModal'

export const WheelPage = ({navigate}) => {

    const handleBackButtonClick = () => {
        navigate("/main");
    }
    const prizes = useSelector((state) => state.wheel.prizes);
    const token = useSelector(state => state.user.token)
    const wheelModalVisible = useSelector(state => state.wheel.wheelModalVisible)
    const dispatch = useDispatch()

    useEffect(() => {
      getPrizes(token, 1)
      .then(res => {
        console.log(res);
        
          dispatch(actionSetPrizes(res.data))
      })
    }, [])

    return(
        <div className={styles.container}>
            <CloseButton/>
            <TicketBalance/>
            {
                prizes.length > 0 && <WheelContainer prizes={prizes}/>
            }
            <div className={styles.container_buttons}>
                <HistoryButton/>
                <BuyTicketButton/>
            </div>
            {
                wheelModalVisible &&
                <WheelModal/>
            }
            <BackButton onClick={handleBackButtonClick} />
        </div>
    )
}