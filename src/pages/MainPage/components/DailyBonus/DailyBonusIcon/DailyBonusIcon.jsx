import { useDispatch } from 'react-redux'
import styles from './dailyBonusIcon.module.scss'
import { actionSetBonusWindowVisible } from '../../../../../state/reducers/dailyBonusReducer/dailyBonusReducer'

export const DailyBonusIcon = () => {
    const isBonusGet = true
    const dispatch = useDispatch()

    const handleCloseDailyWindow = () => {
        dispatch(actionSetBonusWindowVisible(true))        
    }
    return(
        <div onClick={handleCloseDailyWindow} className={styles.container}>
            {
                isBonusGet &&
                <div className={styles.container_marked}/>
            }
        </div>
    )
}