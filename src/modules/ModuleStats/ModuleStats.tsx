import styles from './moduleStats.module.scss'
import { ModuleStatsItem } from './ModuleStatsItem/ModuleStatsItem'

export const ModuleStats = () => {
    const damage = require('../assets/damage_icon.png')
    const energy = require('../assets/energy_icon.png')

    return(
        <div className={styles.stats}>
            <ModuleStatsItem img={damage} text={'Урон 60'}/>
            <ModuleStatsItem img={energy} text={'11 000'}/>
        </div>
    )
}