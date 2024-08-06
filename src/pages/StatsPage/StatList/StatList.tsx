import { StatItem } from './StatItem/StatItem'
import styles from './statList.module.scss'

export const StatList = () => {
    return(
        <div className={styles.list}>
            <StatItem/>
            <StatItem/>
            <StatItem/>
            <StatItem/>
        </div>
    )
}