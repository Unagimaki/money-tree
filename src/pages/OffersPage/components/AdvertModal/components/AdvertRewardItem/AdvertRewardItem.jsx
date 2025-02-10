import { getBackgroundColor } from '../../helpers/getBackgroundColor'
import { getFontColor } from '../../helpers/getFontColor'
import styles from './advertRewardItem.module.scss'

export const AdvertRewardItem = ({place, prize, chance}) => {
    const money = require('../../../../assets/money.png')

    return(
        <div className={styles.container}>
            <div className={styles.container_inner}>
                <div className={styles.container_inner_info}>
                    <div className={styles.container_inner_info_place}>{place} место</div>
                    <div style={{backgroundColor: getBackgroundColor(chance), color: getFontColor(chance)}} className={styles.container_inner_info_chance}>Шанс {chance}%</div>
                    <div className={styles.container_inner_info_reward}>{prize}</div>
                </div>
                <img src={money} className={styles.container_inner_img} alt="money" />
            </div>
        </div>
    )
}