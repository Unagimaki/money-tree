import { useEffect } from 'react'
import { PartnerWinItem } from './components/PartnerWinItem/PartnerWinItem'
import { RecentWinItem } from './components/RecentWinItem/RecentWinItem'
import styles from './wheelPrizesHostoryPage.module.scss'
import { getData } from '../../services/getData'
import { useDispatch, useSelector } from 'react-redux'
import { actionSetPrizes } from '../../state/reducers/wheelReducer/wheelReducer'
import { PagesLinks } from '../../shared/PagesLinks'


export const WheelPrizesHostoryPage = ({navigate}) => {
    
    const token = useSelector(state => state.user.token)
    const dispatch = useDispatch()
    const prizes = useSelector(state => state?.prizesHistory?.prizes)
    const promoPrizes = (prizes || []).filter(item => item.prizeType === 'SPONSOR')
    const close_icon = require('./assets/close_icon.png')
    const handleHistory = () => {
        getData(token, 'wheel/player-prizes')
        .then(res => {
            console.log(res)
            
            dispatch(actionSetPrizes(res.data))
        })
        .catch(e => console.log(e))
    }

    useEffect(() => {
        handleHistory()
    }, [])

    const handleClose = () => {
        navigate(PagesLinks.WHEEL_URL)
    }
    if (!prizes) {
        return null // или можно показать лоадер, заглушку и т.д.
    }
    return(
        <div className={styles.container}>
            <img onClick={handleClose} className={styles.container_close_icon} src={close_icon} alt="close" />
            <div className={styles.container_inner}>
                <div className={styles.container_inner_title}>История</div>

                {/* <div className={styles.container_inner_partners_rewards}>
                    <div className={styles.container_inner_partners_rewards_title}>Награды от партнеров</div>

                    <div className={styles.container_inner_partners_rewards_wrapper}>
                        {
                            promoPrizes.map(item => {
                                return <PartnerWinItem
                                    isUsed={item.isUsed}
                                    link={item.link}
                                    key={item.id}
                                    value={item.value}
                                />
                            })
                        }
                        <div className={styles.container_inner_partners_rewards_wrapper_text}>Нет наград</div>
                    </div>
                </div> */}
                <div className={styles.container_inner_recent_winnings}>
                    <div className={styles.container_inner_recent_winnings_title}>Крайние выигрыши</div>
                    <div className={styles.container_inner_recent_winnings_wrapper}>
                        {
                            prizes.map(item => {
                                return <RecentWinItem
                                    isUsed={item.isUsed}
                                    prizeType={item.prizeType}
                                    value={item.value}
                                    key={item.id}
                                />
                            })
                        }
                        
                    </div>
                </div>
            </div>
        </div>
    )
}