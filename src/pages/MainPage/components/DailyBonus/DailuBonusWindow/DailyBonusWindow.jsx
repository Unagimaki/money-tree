import { useDispatch, useSelector } from 'react-redux'
import { DailyBonusItem } from '../DailyBonusItem/DailyBonusItem'
import styles from './dailyBonusWindow.module.scss'
import { actionSetBonusCollected, actionSetBonusWindowVisible } from '../../../../../state/reducers/dailyBonusReducer/dailyBonusReducer'
import { collectDailyBonus } from '../../../services/collectDailyBonus'
import { useEffect, useState } from 'react'
import { actionIncreaseUserBalance } from '../../../../../state/reducers/userReducer/actions'

export const DailyBonusWindow = ({handleAlertModalShow}) => {
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
            console.log(res)
            dispatch(actionSetBonusCollected(bonuses[currentStreak-1].id))
            dispatch(actionIncreaseUserBalance(bonuses[currentStreak-1].bonus))
            handleAlertModalShow("Бонус собран", "", "success");

        })
        .catch(e => {
            handleAlertModalShow("Ошибка", "", "warning");
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
            <button onClick={handleCloseDailyWindow} className={styles.container_close_button}>
                <img src={close_icon} alt="close_icon" />
            </button>
            <div className={styles.container_wrapper}>
                <div className={styles.container_wrapper_dailymodal}>
                    <div className={styles.container_wrapper_dailymodal_scroll}>
                        {
                            bonuses.map(item => {
                                return <DailyBonusItem
                                    day={item.day}
                                    bonus={item.bonus}
                                    key={item.id}
                                    isAvailable={item.isAvailable}
                                    isCurrentDay={currentStreak}
                                    isCollected={item.isCollected}
                                />
                            })
                        }
                    </div>
                </div>
            </div>
            <div onClick={handleCollectDailyBonus} className={styles.container_collect_button_wrapper}>
                <button className={`${isCanCollect ? styles.green : styles.blur}`}>
                    {isCanCollect ? 'Собрать' : 'Собрано'}
                </button>
            </div>
        </div>
    )
}