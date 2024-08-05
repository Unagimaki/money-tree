import { StatButton } from './StatButton/StatButton'
import { StatCount } from './StatCount/StatCount'
import { StatList } from './StatList/StatList'
import styles from './statPage.module.scss'
import { StatTitle } from './StatTitle/StatTitle'

export const StatPage = () => {
    return(
        <div className={styles.stat_page}>
            <StatTitle/>
            <StatCount/>
            <StatList/>
            <StatButton/>
        </div>
    )
}