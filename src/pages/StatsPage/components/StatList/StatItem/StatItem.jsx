import styles from './statItem.module.scss'
import { formatNumber } from '../../../../../helpers/formatNumber'

export const StatItem = ({rank, name, balance, imgUrl}) => {
    const money_icon = require('../../../assets/money_icon.png')
    console.log(imgUrl);
    
    return(
        <div className={styles.item}>
            <div className={styles.item_profile}>
                {
                    imgUrl && <img src={imgUrl} alt="imgUrl" />
                }
                <div className={styles.item_profile_info}>
                    <div className={styles.item_profile_info_name}>{name}</div>
                    <div className={styles.item_profile_info_place}>#{rank}</div>
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