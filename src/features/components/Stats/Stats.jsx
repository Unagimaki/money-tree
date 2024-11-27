import { useSelector } from 'react-redux'
import StatItem from './StatItem/StatItem'
import styles from './stats.module.scss'
import { damageImg, energyImg } from './assets/statImages'

export const Stats = ({onDamageModalShow}) => {
    const damage = useSelector(state => state.user.player.damage)
    const energy = useSelector(state => state.user.player.energy)
    const currentStep = useSelector((state) => state.tutorial.currentStep);
    const zIndex = currentStep === 2 ? 98 : 2
    return(
        <div style={{zIndex: zIndex}} className={styles.stats}>
            <div className={styles.stats_wrapper}>
                <StatItem text={'Пучки'} type={'damage'} onDamageModalShow={onDamageModalShow} img={damageImg.url} count={damage}/>
                <StatItem text={'Энергия'} type={'energy'} onDamageModalShow={onDamageModalShow} img={energyImg.url} count={energy}/>
            </div>
        </div>
    )
}

