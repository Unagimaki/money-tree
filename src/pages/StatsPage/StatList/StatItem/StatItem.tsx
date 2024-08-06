import styles from './statItem.module.scss'

export const StatItem = () => {
    const money_icon = require('../../assets/money_icon.png')
    const profile_img = require('../../assets/profile_img.png')
 
    return(
        <div className={styles.item}>
            <div className={styles.item_profile}>
                <img src={profile_img} alt="profile_img" />
                <div className={styles.item_profile_info}>
                    <div className={styles.item_profile_info_name}>Alex</div>
                    <div className={styles.item_profile_info_place}>#100</div>
                </div>
            </div>
            <div className={styles.item_count}>
                <div className={styles.item_count_img}>
                    <img src={money_icon} alt="money_icon" />
                </div>
                <div className={styles.item_count_text}>1.000.000</div>
            </div>
        </div>
    )
}