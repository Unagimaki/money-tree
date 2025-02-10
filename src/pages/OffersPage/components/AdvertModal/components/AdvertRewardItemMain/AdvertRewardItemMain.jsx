import { getBackgroundColor } from '../../helpers/getBackgroundColor'
import { getFontColor } from '../../helpers/getFontColor'
import styles from './advertRewardItemMain.module.scss' 

export const AdvertRewardItemMain = ({place, chance, prize}) => {
    const money = require('../../../../assets/money.png')
    const chip = require('../../../../assets/chip.png')


    return(
        <div className={styles.container}>
            <div className={styles.container_inner}>
                <div className={styles.container_inner_info}>
                    <div className={styles.container_inner_info_place}>{place} место</div>
                    <div className={styles.container_inner_info_inner}>
                        <div className={styles.container_inner_info_inner_reward}>{prize}</div>
                        {
                            chance &&
                            <div style={{backgroundColor: getBackgroundColor(chance), color: getFontColor(chance)}} className={styles.container_inner_info_inner_chance}>Шанс {chance}%</div>
                        }
                    </div>
                </div>
            </div>
            <img className={styles.container_img_money} src={money} alt="money" />
            <img className={styles.container_img_chip} src={chip} alt="chip" />
        </div>
    )
}