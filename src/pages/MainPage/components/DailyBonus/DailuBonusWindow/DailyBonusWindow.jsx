import { useDispatch, useSelector } from 'react-redux'
import { DailyBonusItem } from '../DailyBonusItem/DailyBonusItem'
import styles from './dailyBonusWindow.module.scss'
import { actionSetBonusCollected, actionSetBonusWindowVisible } from '../../../../../state/reducers/dailyBonusReducer/dailyBonusReducer'
import { collectDailyBonus } from '../../../services/collectDailyBonus'
import { useEffect, useState } from 'react'
import { actionIncreaseUserBalance, actionSetUserBalance, actionSetUserTickets } from '../../../../../state/reducers/userReducer/actions'
import { actionShowModal } from '../../../../../state/reducers/alertModalReducer/alertModalReducer'

export const DailyBonusWindow = () => {
    const close_icon = require('../../../assets/close_daily_icon.png')
    const dispatch = useDispatch()

    const [isCanCollect, setIsCanCollect] = useState(false)
    const token = useSelector(state => state.user.token);
    const dailyBonusWindowVisible = useSelector(state => state.dailyBonus?.isBonusWindowVisible || null);
    const bonuses = useSelector(state => state.dailyBonus.bonus.dailyBonuses || null)
    const currentStreak = useSelector(state => state.dailyBonus.bonus.currentStreak || null)

    const handleCloseDailyWindow = () => {
        dispatch(actionSetBonusWindowVisible(false))        
    }
    const handleCollectDailyBonus = () => {
        collectDailyBonus(token)
        .then(res => {            
            dispatch(actionSetBonusCollected(bonuses[currentStreak-1].id))
            dispatch(actionSetUserBalance(res.data.totalBalance))
            dispatch(actionSetUserTickets(res.data.totalTickets))
        })
        .catch(e => {
            dispatch(actionShowModal('Ошибка'))
            console.log(e)            
        })
    }

    useEffect(() => {
        if (!bonuses) return
        bonuses[currentStreak-1].isAvailable ? setIsCanCollect(true) : setIsCanCollect(false)
    }, [bonuses])

    if (!dailyBonusWindowVisible ) return

    return(
        <div className={styles.container}>
            <div className={styles.container_dark_background}/>

            <div className={styles.container_wrapper}>
                <div className={styles.container_wrapper_inner}>
                    <button onClick={handleCloseDailyWindow} className={styles.container_wrapper_inner_close_button}>
                        <img src={close_icon} alt="close_icon" />
                    </button>
                
                    <div className={styles.container_wrapper_inner_dailymodal}>
                        <div className={styles.container_wrapper_inner_dailymodal_scroll}>
                            {
                                bonuses.map(item => {
                                    return <DailyBonusItem
                                        day={item.day}
                                        bonus={item?.bonus}
                                        key={item.id}
                                        isAvailable={item.isAvailable}
                                        isCurrentDay={currentStreak}
                                        isCollected={item.isCollected}
                                        ticketReward={item?.ticketReward}
                                    />
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className={styles.container_wrapper_collect_button}>
                    <button onClick={handleCollectDailyBonus} className={`${isCanCollect ? styles.green : styles.blur}`} disabled={!isCanCollect}>
                        {isCanCollect ? 'Собрать' : 'Собрано'}
                    </button>
                </div>
            </div>
            
        </div>
    )
}