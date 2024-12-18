import { useDispatch, useSelector } from 'react-redux'
import { DailyBonusItem } from '../DailyBonusItem/DailyBonusItem'
import styles from './dailyBonusWindow.module.scss'
import { actionSetBonusWindowVisible } from '../../../../../state/reducers/dailyBonusReducer/dailyBonusReducer'

export const DailyBonusWindow = () => {
    const close_icon = require('../../../assets/close_daily_icon.png')
    const dispatch = useDispatch()

    const dailyBonusWindowVisible = useSelector(state => state.dailyBonus?.isBonusWindowVisible || null);
    const bonuses = useSelector(state => state.dailyBonus?.bonus || null);
    
    const handleCloseDailyWindow = () => {
        dispatch(actionSetBonusWindowVisible(false))        
    }

    if (!dailyBonusWindowVisible || !bonuses) return

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
                                    isCollected={item.isCollected}
                                />
                            })
                        }
                    </div>
                </div>
            </div>
            <div className={styles.container_collect_button_wrapper}>
                {/* <button className={`${!isCollected ? styles.green : styles.blur}`}>
                    {isCollected ? 'Собрано' : 'Собрано'}
                </button> */}
            </div>
        </div>
    )
}