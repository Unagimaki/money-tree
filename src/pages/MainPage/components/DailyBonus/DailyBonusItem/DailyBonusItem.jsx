import styles from './dailyBonusItem.module.scss'
import { getDayStyle } from './helpers/getDayStyle'

export const DailyBonusItem = ({isAvailable, isCurrentDay, isCollected, bonus, day}) => {
    const money_icon = require('../../../assets/money_icon.png')
    const collected_icon = require('../../../assets/collected_icon.png')
    return(
        <div
            style={{
                border: isCurrentDay === day ? 'min(0.27vw, 1px) solid #8CDB4E' : '',
                background: isCurrentDay !== day ? 'linear-gradient(to right, #202020, #223B37)' : 'linear-gradient(to right, #202020, #171E17)'
            }}
            className={styles.container}
        >
            <div className={styles.container_inner}>
                <div
                    style={getDayStyle(isAvailable, isCurrentDay === day)}
                    className={styles.container_inner_day_count}
                >
                    {day} день
                </div>
                <div className={styles.container_inner_day_reward}>
                    <div className={styles.container_inner_day_reward_num}>{bonus}</div>
                    <img src={money_icon} alt="money_icon" />
                </div>
            </div>
            {
                isCollected &&
                <div className={styles.container_collected_wrapper}>
                    <div className={styles.container_collected_wrapper_mask}/>
                    <div className={styles.container_collected_wrapper_img}>
                        <img src={collected_icon} alt="collected_icon" />
                    </div>
                </div>
            }
        </div>
    )
}