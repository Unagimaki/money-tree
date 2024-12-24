import { useDispatch, useSelector } from 'react-redux'
import styles from './dailyBonusIcon.module.scss'
import { actionSetBonusWindowVisible } from '../../../../../state/reducers/dailyBonusReducer/dailyBonusReducer'
import { useEffect, useState } from 'react'

export const DailyBonusIcon = () => {
    const dispatch = useDispatch()
    const bonuses = useSelector(state => state.dailyBonus.bonus.dailyBonuses || null)
    const currentStreak = useSelector(state => state.dailyBonus.bonus.currentStreak || null)

    const [isCanCollect, setIsCanCollect] = useState(false)
    
    useEffect(() => {
        if (!bonuses) return
        bonuses[currentStreak-1].isAvailable ? setIsCanCollect(true) : setIsCanCollect(false)
    }, [bonuses])

    const handleCloseDailyWindow = () => {
        dispatch(actionSetBonusWindowVisible(true))        
    }
    return(
        <div onClick={handleCloseDailyWindow} className={styles.container}>
            {
                isCanCollect &&
                <div className={styles.container_marked}/>
            }
        </div>
    )
}