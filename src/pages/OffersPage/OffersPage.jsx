import styles from './bonusPage.module.scss'
import { InviteInfo } from './components/InviteInfo/InviteInfo'
import { TaskContainer } from './components/TaskContainer/TaskContainer'
import { InviteButtons } from './components/InviteButtons/InviteButtons'
import { Balance } from '../../features/components/Balance/Balance'
import { BackButton } from '@vkruglikov/react-telegram-web-app'
import { useDispatch, useSelector } from 'react-redux'
import { actionSetOfferModalVisible } from '../../state/reducers/offersReducer/actions'
import { Advert } from './components/Advert/Advert'
import useCheckTime from '../../features/hooks/useCheckTime'
import { useEffect } from 'react'


const OffersPage = ({navigate}) => {
    const offerModalVisible = useSelector(state => state.offers.isVisible)
    const dispatch = useDispatch()
    const handleBackButtonClick = () => {
        if (offerModalVisible) {
            dispatch(actionSetOfferModalVisible(false))
        } else {
            navigate('/main');
        }
    }
    const { updateTimestamp } = useCheckTime();
    useEffect(() => {
        updateTimestamp(); // Обновляем время при открытии страницы
    }, []);
    return(
        <div className={styles.bonus_page}>
            <Balance top={'min(11.73vw, 44px'}/>
            <InviteInfo/>
            <InviteButtons/>
            <Advert/>
            <TaskContainer/>
            <BackButton onClick={handleBackButtonClick}/>
        </div>
    )
}

export default OffersPage