import styles from './advertRewardItem.module.scss'

export const AdvertRewardItem = ({place, count, type, color = '#fff'}) => {
    const money = require('../../../../assets/money.png')
    return(
        <div className={styles.container}>
            <div className={styles.container_text}>{place} Место&nbsp;&#8211;&nbsp;</div>
            <div className={styles.container_count}> <span style={{color: `${color}`}}>{count}</span> {type}</div>
            <img src={money} alt="money" />
        </div>
    )
}