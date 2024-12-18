import styles from './statItem.module.scss'
import { formatNumber } from '../../../../../../helpers/formatNumber'

export const StatItem = ({rank, name, balance, imgUrl}) => {
    const money_icon = require('../../../../assets/money_icon.png')

    const first = require('../../../../assets/medal-star.png')
    const second = require('../../../../assets/award.png')
    const third = require('../../../../assets/medal.png')
    
    return(
        <div className={styles.item}>
            <div className={styles.item_profile}>
                {
                    imgUrl && <img src={imgUrl} alt="imgUrl" />
                }
                {
                    (rank === 1 || rank === 2 || rank === 3) &&
                    <img src={rank === 1 ? first : rank === 2 ? second : third} className={styles.item_profile_place_icon}/>
                }
                <div className={styles.item_profile_info}>
                    <div className={styles.item_profile_info_name}>{name}</div>
                    <div className={styles.item_profile_info_place}>
                        #{rank}                   
                    </div>
                </div>
            </div>
            <div className={styles.item_count}>
                <div className={styles.item_count_img}>
                    <img src={money_icon} alt="money_icon" />
                </div>
                <div className={styles.item_count_text}>{formatNumber(balance)}</div>
            </div>
        </div>
    )
}