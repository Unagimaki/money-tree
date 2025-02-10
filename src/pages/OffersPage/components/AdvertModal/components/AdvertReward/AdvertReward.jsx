import { AdvertRewardItem } from '../AdvertRewardItem/AdvertRewardItem'
import { AdvertRewardItemMain } from '../AdvertRewardItemMain/AdvertRewardItemMain'
import styles from './advertReward.module.scss'

export const AdvertReward = ({data}) => {
    return(
        <div className={styles.container}>
            <div className={styles.container_title}>Награды</div>
            <AdvertRewardItemMain chance={data.chance[0]?.chance} place={data.chance[0].place} prize={data.chance[0].prize} />
            <div className={styles.container_inner}>
                {
                    data.chance.slice(1).map((item, index) => {
                        return <AdvertRewardItem
                            chance={item?.chance}
                            prize={item.prize}
                            place={item.place}
                            key={index}
                        />
                    })
                }
            </div>
        </div>
    )
}