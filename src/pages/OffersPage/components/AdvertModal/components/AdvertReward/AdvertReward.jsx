import { AdvertRewardItem } from '../AdvertRewardItem/AdvertRewardItem'
import styles from './advertReward.module.scss'

export const AdvertReward = () => {
    return(
        <div className={styles.container}>
            <div className={styles.container_title}>Награды</div>
            <div className={styles.container_inner}>
                <div className={styles.container_inner_first}>
                    <AdvertRewardItem place={'1.'} count={200} type={'млн'} color={'#8CDB4E'}/>
                    <AdvertRewardItem place={'2.'} count={100} type={'млн'} color={'#8CDB4E'}/>
                    <AdvertRewardItem place={'3.'} count={50} type={'млн'} color={'#8CDB4E'}/>
                    <AdvertRewardItem place={'4.'} count={25} type={'млн'} color={'#8CDB4E'}/>
                    <AdvertRewardItem place={'5.'} count={10} type={'млн'} color={'#8CDB4E'}/>
                </div>
                <div className={styles.container_inner_second}>
                    <AdvertRewardItem place={'6-100'} count={5} type={'млн'} color={'#8CDB4E'}/>
                    <AdvertRewardItem place={'101-500'} count={1} type={'млн'} color={'#8CDB4E'}/>
                    <AdvertRewardItem place={'501-1000'} count={500} type={'тыс'} color={'#8CDB4E'}/>
                    <AdvertRewardItem place={'1001+'} count={100} type={'тыс'} color={'#8CDB4E'}/>
                </div>
            </div>
        </div>
    )
}